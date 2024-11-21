import { globalStateApiType } from '../GlobalStateTypes';

const R3FModule = ({ set }: globalStateApiType) => {
  return {
    meshClick: false,
    setMeshClick: (meshClick: boolean) => {
      set({ meshClick: meshClick });
    },
  };
};

export { R3FModule };
