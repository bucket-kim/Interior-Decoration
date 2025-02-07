import * as THREE from 'three';

export interface UIModuleTypes {
  loaded: boolean;
  setLoaded: (loaded: boolean) => void;

  scaleRoomButtonClick: boolean;
  setScaleRoomButtonClick: (scaleRoomButtonClick: boolean) => void;

  interiorData: THREE.Object3D[];
  setInteriorData: (interiorData: THREE.Object3D[]) => void;

  token: string;
  setToken: (token: string) => void;
}
