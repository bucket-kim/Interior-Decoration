import { immer } from 'zustand/middleware/immer';
import { createWithEqualityFn } from 'zustand/traditional';
import { GetState, GlobalStateTypes, SetState } from './GlobalStateTypes';
import { R3FModule } from './R3FModule/R3FModule';
import { UIModule } from './UIModule/UIModule';

const storeModules = (
  set: SetState<GlobalStateTypes>,
  get: GetState<GlobalStateTypes>,
) => ({
  ...UIModule({ set, get }),
  ...R3FModule({ set, get }),
});
const immerWrapper = immer<GlobalStateTypes>((set, get) =>
  storeModules((partial) => set(partial), get),
);

const useGlobalState = createWithEqualityFn(immerWrapper);

export { useGlobalState };
