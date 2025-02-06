import { Center } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { FC, Fragment, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useSnapshot } from 'valtio';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../../State/useGlobalState';
import MeshControls from './MeshControls/MeshControls';

interface MeshProps {
  state: any;
  interiorModels: THREE.Group;
}

const Mesh: FC<MeshProps> = ({ state, interiorModels }) => {
  const furnitureRef = useRef<THREE.Group[]>([]);

  const snap = useSnapshot(state);

  const [modelMap, setModelMap] = useState<Record<string, THREE.Object3D>>({});

  const { furnitures, updateFurniturePosition } = useGlobalState((state) => {
    return {
      furnitures: state.furnitures,
      updateFurniturePosition: state.updateFurniturePosition,
      // updateFurnitureRotation: state.updateFurnitureRotation,
    };
  }, shallow);

  const { furnitureClick, contextMenu, pointerMiss } = MeshControls();

  const handleFurnitureClick = (e: ThreeEvent<MouseEvent>) => {
    furnitureClick(e, furnitureRef, state);
  };

  const handleContextMenu = (e: ThreeEvent<MouseEvent>) => {
    contextMenu(e, furnitureRef, snap, state);
  };

  const handlePointerMiss = (e: MouseEvent) => {
    pointerMiss(e, state);
  };

  const handleTransformEnd = (index: number) => {
    if (furnitureRef.current[index] && furnitures[index]) {
      // Get the current position from the ref and update state
      const newPosition = furnitureRef.current[index].position.clone();
      const newRotation = furnitureRef.current[index].rotation.clone();

      updateFurniturePosition(
        furnitures[index].modelIndex,
        new THREE.Vector3(newPosition.x, newPosition.y, newPosition.z),
      );
      // updateFurnitureRotation(
      //   furnitures[index].modelIndex,
      //   new THREE.Vector3(newRotation.x, newRotation.y, newRotation.z),
      // );
      console.log('Updated furniture:', {
        position: newPosition,
        // rotation: newRotation,
      });
    }
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
