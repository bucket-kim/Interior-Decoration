import * as THREE from 'three';
import { globalStateApiType } from '../GlobalStateTypes';
import { FurnitureMesh } from './R3FModuleTypes';

const R3FModule = ({ set }: globalStateApiType) => {
  return {
    meshClick: false,
    setMeshClick: (meshClick: boolean) => {
      set({ meshClick: meshClick });
    },

    furnitures: [] as FurnitureMesh[],
    addFurnitures: (modelName: string) =>
      set((state) => {
        const newMesh: FurnitureMesh = {
          id: crypto.randomUUID(),
          name: modelName,
          modelIndex: `${modelName}_${(state.furnitures.length + 1).toString().padStart(3, '0')}`,
          position: new THREE.Vector3(0, 0.25, 0),
        };
        return { furnitures: [...state.furnitures, newMesh] };
      }),

    updateFurniturePosition: (modelIndex: string, position: THREE.Vector3) =>
      set((state) => ({
        furnitures: state.furnitures.map((furniture) =>
          furniture.modelIndex === modelIndex
            ? { ...furniture, position: position.clone() }
            : furniture,
        ),
      })),
  };
};

export { R3FModule };
