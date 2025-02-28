import { Center, Html } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { FC, Fragment, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useSnapshot } from 'valtio';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../../State/useGlobalState';
import useMeshControls from './MeshControls/MeshControls';

interface MeshProps {
  state: any;
  interiorModels: THREE.Group;
}

const Mesh: FC<MeshProps> = ({ state, interiorModels }) => {
  const furnitureRef = useRef<THREE.Group[]>([]);

  const snap = useSnapshot(state);

  const [modelMap, setModelMap] = useState<Record<string, THREE.Object3D>>({});

  const { furnitures, setFurnitures, updateFurniturePosition } = useGlobalState(
    (state) => {
      return {
        furnitures: state.furnitures,
        setFurnitures: state.setFurnitures,
        updateFurniturePosition: state.updateFurniturePosition,
        // updateFurnitureRotation: state.updateFurnitureRotation,
      };
    },
    shallow,
  );

  const { furnitureClick, contextMenu, pointerMiss } = useMeshControls(
    furnitureRef,
    state,
    snap,
  );

  const handleFurnitureClick = (e: ThreeEvent<MouseEvent>) => {
    furnitureClick(e);
  };

  const handleContextMenu = (e: ThreeEvent<MouseEvent>) => {
    contextMenu(e);
  };

  const handlePointerMiss = (e: MouseEvent) => {
    pointerMiss(e);
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

  useEffect(() => {
    if (!furnitureRef.current) return;

    furnitureRef.current.forEach((furniture, index) => {
      if (furniture && furnitures[index]) {
        // Only update if position has actually changed

        if (furniture.position !== furnitures[index].position) {
          updateFurniturePosition(
            furnitures[index].modelIndex,
            furniture.position,
          );
        }
      }
    });
  }, [furnitureRef.current]);

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
                rotation={[
                  furniture.rotation.x,
                  furniture.rotation.y,
                  furniture.rotation.z,
                ]}
                name={`${furniture.modelIndex}`}
                onContextMenu={handleContextMenu}
                onClick={handleFurnitureClick}
                onPointerMissed={handlePointerMiss}
                scale={0.5}
                ref={(el: any) => {
                  furnitureRef.current[index] = el;
                }}
              >
                {snap.current === furniture.modelIndex && (
                  <Html
                    as="div"
                    style={{ fontFamily: 'sans-serif' }}
                    position={[-2, 2, 0]}
                    center
                    prepend
                  >
                    <div
                      style={{
                        width: '3rem',
                        height: '3rem',
                        background: 'skyblue',
                        margin: 'auto',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        const updatedFurnitures = furnitures.filter(
                          (item) => item.id !== furniture.id,
                        );
                        setFurnitures(updatedFurnitures);
                        console.log('id deleted ' + furniture.id);
                      }}
                    >
                      <h1 style={{ margin: '0', color: 'white' }}>X</h1>
                    </div>
                  </Html>
                )}
                <mesh
                  name={furniture.modelIndex}
                  castShadow
                  receiveShadow
                  geometry={model.geometry}
                  // scale={0.5}
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
