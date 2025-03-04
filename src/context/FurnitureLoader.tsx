import { useEffect } from 'react';
import * as THREE from 'three';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../State/useGlobalState';
import supabase from './Supabase/Supabase';

const FurnitureLoader = () => {
  const { setFurnitures, setRoomScale } = useGlobalState((state) => {
    return {
      setFurnitures: state.setFurnitures,
      setRoomScale: state.setRoomScale,
    };
  }, shallow);
  const loadFurnitures = async (userId: string) => {
    try {
      const { data: furnituresData, error: furnitureError } = await supabase
        .from('furnitures')
        .select('*')
        .eq('user_id', userId);

      if (furnitureError) throw furnitureError;

      if (!furnituresData) return;

      const transformedFurnitures = furnituresData.map((item) => ({
        id: item.id,
        name: item.name,
        modelIndex: item.modelIndex,
        position: new THREE.Vector3(
          item.position.x,
          item.position.y,
          item.position.z,
        ),
        rotation: new THREE.Vector3(
          item.rotation.x,
          item.rotation.y,
          item.rotation.z,
        ),
      }));

      if (!transformedFurnitures) return;

      setFurnitures(transformedFurnitures);
    } catch (error) {
      console.log(error);
    }
  };

  const loadRoomSettings = async (userId: string) => {
    try {
      const { data: roomSettings, error: roomError } = await supabase
        .from('room_settings')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (roomError && roomError.code !== 'PGRST116') throw roomError;
      if (roomSettings) {
        const scaleX = roomSettings.scale_x || 5;
        const scaleZ = roomSettings.scale_z || 5;
        setRoomScale(new THREE.Vector2(scaleX, scaleZ));
        console.log('room scale loaded ', { x: scaleX, z: scaleZ });
      } else {
        console.log('No room setting found');
      }
    } catch (error) {
      console.log('error loading room setting ' + error);
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;
        if (!user) return;

        await loadFurnitures(user.id);
        await loadRoomSettings(user.id);
      } catch (error) {}
    };

    loadUserData();

    const furnitureChannel = supabase
      .channel('furniture_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'furnitures',
        },
        (payload) => {
          console.log('Database change detected:', payload);
          loadUserData(); // Reload data when changes occur
        },
      )
      .subscribe();

    const roomSettingChannel = supabase
      .channel('room_settings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'room_settings',
        },
        (payload) => {
          console.log('Database change deteced: ', payload);
          loadUserData();
        },
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      furnitureChannel.unsubscribe();
      roomSettingChannel.unsubscribe();
    };
  }, []);

  return null;
};

export default FurnitureLoader;
