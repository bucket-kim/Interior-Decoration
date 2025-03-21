import { shallow } from 'zustand/shallow';
import supabase from '../../../context/Supabase/Supabase';
import { useGlobalState } from '../../../State/useGlobalState';

const StoreFurnitureButton = () => {
  const { furnitures, roomScale, areaLightPosition } = useGlobalState(
    (state) => {
      return {
        furnitures: state.furnitures,
        roomScale: state.roomScale,
        areaLightPosition: state.areaLightPosition,
      };
    },
    shallow,
  );

  const saveRoomScale = async (userId: string) => {
    try {
      const { data: existingSetting } = await supabase
        .from('room_settings')
        .select('id')
        .eq('user_id', userId)
        .single();

      if (existingSetting) {
        const { error } = await supabase
          .from('room_settings')
          .update({
            scale_x: roomScale.x,
            scale_z: roomScale.y,
            // add area light position update
            area_light_x: areaLightPosition.x,
            area_light_y: areaLightPosition.y,
            area_light_z: areaLightPosition.z,
            updated_at: new Date().toISOString(),
          })
          .eq('id', existingSetting.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from('room_settings').insert({
          user_id: userId,
          scale_x: roomScale.x,
          scale_z: roomScale.y,
          // area light insertion
          area_light_x: areaLightPosition.x,
          area_light_y: areaLightPosition.y,
          area_light_z: areaLightPosition.z,
          created_at: new Date().toISOString(),
        });

        if (error) throw error;
        console.log('room scaled saved successfully');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSaveFurnitures = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      saveRoomScale(user.id);

      const { data: existingFurniture } = await supabase
        .from('furnitures')
        .select('id')
        .eq('user_id', user.id);

      const furnitureData = furnitures.map((furniture) => ({
        modelIndex: furniture.modelIndex,
        name: furniture.name,
        position: furniture.position,
        rotation: furniture.rotation || { x: 0, y: 0, z: 0 },
        user_id: user.id,
        created_at: new Date().toISOString(),
      }));

      if (!existingFurniture || existingFurniture.length === 0) {
        console.log('creating new furniture records');
        const { data, error } = await supabase
          .from('furnitures')
          .insert(furnitureData)
          .select();

        if (error) throw error;
        console.log('succesfully created furniture data', data);
      } else {
        console.log('updating data');

        const existingIds = new Set(existingFurniture.map((f) => f.id));

        const itemsToUpdate = furnitures.filter(
          (f) => f.id && existingIds.has(f.id),
        );
        const itemsToCreate = furnitures.filter(
          (f) => !f.id || !existingIds.has(f.id),
        );
        // Find items to delete (existing IDs that aren't in current furniture)
        const currentIds = new Set(
          furnitures.filter((f) => f.id).map((f) => f.id),
        );
        const idsToDelete = Array.from(existingIds).filter(
          (id) => !currentIds.has(id),
        );

        if (idsToDelete.length > 0) {
          console.log('Deleting removed furniture');
          const { error: deleteError } = await supabase
            .from('furnitures')
            .delete()
            .in('id', idsToDelete);

          if (deleteError) throw deleteError;
        }
        // Perform updates
        for (const item of itemsToUpdate) {
          const { error: updateError } = await supabase
            .from('furnitures')
            .update({
              modelIndex: item.modelIndex,
              name: item.name,
              position: item.position,
              rotation: item.rotation,
            })
            .eq('id', item.id);

          if (updateError) throw updateError;
        }

        // Perform new insertions
        if (itemsToCreate.length > 0) {
          const { error: insertError } = await supabase
            .from('furnitures')
            .insert(itemsToCreate);

          if (insertError) throw insertError;
        }
      }
      console.log('Furniture layout saved successfully!');
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleSaveFurnitures}>Save Furnitures</button>;
};

export default StoreFurnitureButton;
