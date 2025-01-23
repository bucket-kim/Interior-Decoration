import * as THREE from 'three';

export interface BoxMesh {
  id: string;
  name: string;
  position: THREE.Vector3;
}

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
  // removeFurnitures: (modelName: string) => void;
}
