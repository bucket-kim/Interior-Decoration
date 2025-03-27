import { ThreeEvent } from '@react-three/fiber';
import { RefObject } from 'react';
import * as THREE from 'three';

const useMeshControls = (
  furnitureRef: RefObject<THREE.Group[]>,
  state: any,
  snap: any,
) => {
  const furnitureClick = (e: ThreeEvent<MouseEvent>) => {
    if (!furnitureRef.current) return;
    e.stopPropagation();

    const objectName = e.object?.name;

    if (!objectName) {
      console.log('furniture click: object name not found');
      return;
    }

    const findFurniture = furnitureRef.current.find((furniture) => {
      return furniture.name === objectName;
    });

    if (findFurniture) {
      state.current = findFurniture.name;
    }
  };
  const contextMenu = (e: ThreeEvent<MouseEvent>) => {
    if (!furnitureRef.current) return;
    e.stopPropagation();
    furnitureRef.current.map((furniture) => {
      snap.current === furniture.name && (state.mode = (snap.mode + 1) % 3);
    });
  };

  const pointerMiss = (e: MouseEvent) => {
    e.type === 'click' && (state.current = null);
  };
  return { furnitureClick, contextMenu, pointerMiss };
};

export default useMeshControls;
