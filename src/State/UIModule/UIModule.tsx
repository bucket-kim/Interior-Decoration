import * as THREE from 'three';
import { globalStateApiType } from '../GlobalStateTypes';

const UIModule = ({ set }: globalStateApiType) => {
  return {
    loaded: false,
    setLoaded: (loaded: boolean) => {
      set({ loaded: loaded });
    },

    scaleRoomButtonClick: false,
    setScaleRoomButtonClick: (scaleRoomButtonClick: boolean) => {
      set({ scaleRoomButtonClick: scaleRoomButtonClick });
    },

    interiorData: [] as THREE.Object3D[],
    setInteriorData: (interiorData: THREE.Object3D[]) => {
      set({ interiorData: interiorData });
    },

    token: '',
    setToken: (token: string) => {
      set({ token: token });
    },
  };
};

export { UIModule };
