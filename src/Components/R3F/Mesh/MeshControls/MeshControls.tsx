import { ThreeEvent } from '@react-three/fiber';
import { RefObject } from 'react';
import * as THREE from 'three';

const MeshControls = () => {
  const furnitureClick = (
    e: ThreeEvent<MouseEvent>,
    furnitureRef: RefObject<THREE.Group[]>,
    state: any,
  ) => {
    if (!furnitureRef.current) return;
    e.stopPropagation();
    const findFurniture = furnitureRef.current.find((furniture) => {
      return furniture.name === e.object.name;
    });

    if (findFurniture) {
      state.current = findFurniture.name;
    }
  };
  const contextMenu = (
    e: ThreeEvent<MouseEvent>,
    furnitureRef: RefObject<THREE.Group[]>,
    snap: any,
    state: any,
  ) => {
    if (!furnitureRef.current) return;
    e.stopPropagation();
    furnitureRef.current.map((furniture) => {
      snap.current === furniture.name && (state.mode = (snap.mode + 1) % 3);
    });
  };

  const pointerMiss = (e: MouseEvent, state: any) => {
    e.type === 'click' && (state.current = null);
  };
  return { furnitureClick, contextMenu, pointerMiss };
};

export default MeshControls;
