import { useEffect } from 'react';
import * as THREE from 'three';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../State/useGlobalState';
import { useAuth } from './AuthProvider';

const FurnitureLoader = () => {
  const { setFurnitures } = useGlobalState((state) => {
    return {
      setFurnitures: state.setFurnitures,
    };
  }, shallow);

  const { token, user, isLoading } = useAuth();

  useEffect(() => {
    const loadFurnitures = async () => {
      try {
        if (isLoading) return;
        if (!token || !user) return;
        const response = await fetch(
          `http://localhost:8080/api/furnitures/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('failed to load furnitures');
        }

        const data = await response.json();

        const furnituresData = data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          modelIndex: item.modelIndex,
          position: new THREE.Vector3(
            item.positionX,
            item.positionY,
            item.positionZ,
          ),
          rotation: new THREE.Vector3(
            item.rotationX,
            item.rotationY,
            item.rotationZ,
          ),
        }));

        console.log(furnituresData);

        setFurnitures(furnituresData);
      } catch (error) {
        console.log(error);
      }
    };
    loadFurnitures();
  }, [user, token, isLoading]);

  return null;
};

export default FurnitureLoader;
