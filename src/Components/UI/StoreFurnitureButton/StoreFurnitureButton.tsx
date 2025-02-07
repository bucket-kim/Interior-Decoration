import { shallow } from 'zustand/shallow';
import supabase from '../../../context/Supabase/Supabase';
import { useGlobalState } from '../../../State/useGlobalState';

const StoreFurnitureButton = () => {
  const { furnitures } = useGlobalState((state) => {
    return {
      furnitures: state.furnitures,
    };
  }, shallow);

  const handleSaveFurnitures = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

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
