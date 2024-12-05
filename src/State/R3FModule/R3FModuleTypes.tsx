import * as THREE from 'three';

export interface BoxMesh {
  id: string;
  name: string;
  position: THREE.Vector3;
}

export interface R3FModuleTypes {
  meshClick: boolean;
  setMeshClick: (meshClick: boolean) => void;

  boxes: BoxMesh[];
  addBox: () => void;
  removeBox: () => void;
}
