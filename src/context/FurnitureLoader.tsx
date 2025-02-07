import { useEffect } from 'react';
import * as THREE from 'three';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../State/useGlobalState';
import supabase from './Supabase/Supabase';

const FurnitureLoader = () => {
  const { setFurnitures } = useGlobalState((state) => {
    return {
      setFurnitures: state.setFurnitures,
    };
  }, shallow);

  useEffect(() => {
    const loadFurnitures = async () => {
      try {
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError) throw userError;

        if (!user) return;

        const { data: furnituresData, error: furnitureError } = await supabase
          .from('furnitures')
          .select('*')
          .eq('user_id', user.id);

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

        console.log(transformedFurnitures);

        setFurnitures(transformedFurnitures);
      } catch (error) {
        console.log(error);
      }
    };
    loadFurnitures();

    const channel = supabase
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
          loadFurnitures(); // Reload data when changes occur
        },
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      channel.unsubscribe();
    };
  }, []);

  return null;
};

export default FurnitureLoader;
