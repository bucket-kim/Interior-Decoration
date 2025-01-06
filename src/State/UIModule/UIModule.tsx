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

    interiorData: [],
    setInteriorData: (interiorData: []) => {
      set({ interiorData: interiorData });
    },
  };
};

export { UIModule };
