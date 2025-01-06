import * as THREE from 'three';
import { globalStateApiType } from '../GlobalStateTypes';
import { BoxMesh, FurnitureMesh } from './R3FModuleTypes';

const R3FModule = ({ set }: globalStateApiType) => {
  return {
    meshClick: false,
    setMeshClick: (meshClick: boolean) => {
      set({ meshClick: meshClick });
    },

    furnitures: [],
    addFurnitures: (modelName: string) =>
      set((state) => {
        const newMesh: FurnitureMesh = {
          id: crypto.randomUUID(),
          name: `furnitures${(state.furnitures.length + 1).toString().padStart(3, '0')}`,
          modelName: modelName,
          position: new THREE.Vector3(0, 0, 0),
        };
        return { furnitures: [...state.furnitures, newMesh] };
      }),

    boxes: [],
    addBox: () =>
      set((state) => {
        const newMesh: BoxMesh = {
          id: crypto.randomUUID(),
          name: `square${(state.boxes.length + 1).toString().padStart(3, '0')}`,
          position: new THREE.Vector3(state.boxes.length * 2, 0, 0),
        };
        return { boxes: [...state.boxes, newMesh] };
      }),
  };
};

export { R3FModule };
