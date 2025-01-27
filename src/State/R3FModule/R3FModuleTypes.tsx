import * as THREE from 'three';

export interface FurnitureMesh {
  id: string;
  name: string;
  modelIndex: string;
  position: THREE.Vector3;
}

export interface R3FModuleTypes {
  meshClick: boolean;
  setMeshClick: (meshClick: boolean) => void;

  furnitures: FurnitureMesh[];
  addFurnitures: (modelName: string) => void;

  updateFurniturePosition: (
    modelIndex: string,
    newPosition: THREE.Vector3,
  ) => void;
}
