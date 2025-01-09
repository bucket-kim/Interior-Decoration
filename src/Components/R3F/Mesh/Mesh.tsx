import { Center } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { FC, Fragment, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useSnapshot } from 'valtio';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../../State/useGlobalState';

interface MeshProps {
  state: any;
  interiorModels: THREE.Group;
}

const Mesh: FC<MeshProps> = ({ state, interiorModels }) => {
  const furnitureRef = useRef<THREE.Group[]>([]);

  const snap = useSnapshot(state);

  const [modelMap, setModelMap] = useState<Record<string, THREE.Object3D>>({});

  const { furnitures } = useGlobalState((state) => {
    return {
      furnitures: state.furnitures,
    };
  }, shallow);

  const handlFurnitureClick = (e: ThreeEvent<MouseEvent>) => {
    if (!furnitureRef.current) return;
    e.stopPropagation();
    const findFurniture = furnitureRef.current.find((furniture) => {
      return furniture.name === e.object.name;
    });

    if (findFurniture) {
      state.current = findFurniture.name;
    }
  };

  const handleContextMenu = (e: ThreeEvent<MouseEvent>) => {
    if (!furnitureRef.current) return;
    e.stopPropagation();
    furnitureRef.current.map((furniture) => {
      snap.current === furniture.name && (state.mode = (snap.mode + 1) % 3);
    });
  };

  const handlePointerMiss = (e: MouseEvent) => {
    e.type === 'click' && (state.current = null);
  };

  useEffect(() => {
    if (!interiorModels) return;

    const newModelMap: Record<string, THREE.Object3D> = {};

    (interiorModels as unknown as THREE.Group).traverse((child) => {
      if (child instanceof THREE.Mesh) {
        newModelMap[child.name] = child;
      }
    });

    setModelMap(newModelMap);
  }, [interiorModels]);

  return (
    <Fragment>
      {furnitures && furnitures.length > 0
        ? furnitures.map((furniture, index) => {
            const model = modelMap[furniture.name] as THREE.Mesh;
            if (!model) return;
            return (
              <Center
                receiveShadow
                castShadow
                top
                key={furniture.id}
                position={[
                  furniture.position.x,
                  furniture.position.y,
                  furniture.position.z,
                ]}
                name={furniture.name}
                onContextMenu={handleContextMenu}
                onClick={handlFurnitureClick}
                onPointerMissed={handlePointerMiss}
                ref={(el: any) => {
                  furnitureRef.current[index] = el;
                }}
              >
                {/* <primitive
                    object={model.clone()}
                    scale={0.5}
                    material={
                      new THREE.MeshStandardMaterial({
                        color: '#ffffff',
                        side: THREE.DoubleSide,
                      })
                    }
                  /> */}
                <mesh
                  name={furniture.name}
                  castShadow
                  receiveShadow
                  geometry={model.geometry}
                  scale={0.5}
                >
                  <meshStandardMaterial />
                </mesh>
              </Center>
            );
          })
        : null}
    </Fragment>
  );
};

export default Mesh;
