import * as THREE from 'three';

export interface FurnitureMesh {
  id: string;
  name: string;
  modelIndex: string;
  position: THREE.Vector3;
  rotation: THREE.Vector3;
  // userId: string;
}

export interface R3FModuleTypes {
  meshClick: boolean;
  setMeshClick: (meshClick: boolean) => void;

  roomScale: THREE.Vector2;
  setRoomScale: (number: THREE.Vector2) => void;

  furnitures: FurnitureMesh[];
  setFurnitures: (furnitures: FurnitureMesh[]) => void;
  addFurnitures: (modelName: string) => void;

  updateFurniturePosition: (
    modelIndex: string,
    newPosition: THREE.Vector3,
  ) => void;
  updateFurnitureRotation: (
    modelIndex: string,
    newRotation: THREE.Vector3,
  ) => void;

  areaLightPosition: THREE.Vector3;
  updateAreaLightPosition: (position: THREE.Vector3) => void;
}
