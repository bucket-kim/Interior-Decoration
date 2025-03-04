import * as THREE from 'three';
import { globalStateApiType } from '../GlobalStateTypes';
import { FurnitureMesh } from './R3FModuleTypes';

const R3FModule = ({ set }: globalStateApiType) => {
  return {
    meshClick: false,
    setMeshClick: (meshClick: boolean) => {
      set({ meshClick: meshClick });
    },

    roomScale: new THREE.Vector2(5, 5),
    setRoomScale: (roomScale: THREE.Vector2) => {
      set({ roomScale: roomScale });
    },

    furnitures: [] as FurnitureMesh[],
    setFurnitures: (furnitures: FurnitureMesh[]) => set({ furnitures }),
    addFurnitures: (modelName: string) =>
      set((state) => {
        const newMesh: FurnitureMesh = {
          id: crypto.randomUUID(),
          name: modelName,
          modelIndex: `${modelName}_${(state.furnitures.length + 1).toString().padStart(3, '0')}`,
          position: new THREE.Vector3(0, 0, 0),
          rotation: new THREE.Vector3(0, 0, 0),
          // userId: '',
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
    updateFurnitureRotation: (modelIndex: string, rotation: THREE.Vector3) =>
      set((state) => ({
        furnitures: state.furnitures.map((furniture) =>
          furniture.modelIndex === modelIndex
            ? { ...furniture, rotation: rotation.clone() }
            : furniture,
        ),
      })),
  };
};

export { R3FModule };
