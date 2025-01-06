import { Center } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { FC, Fragment, useRef } from 'react';
import * as THREE from 'three';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../../State/useGlobalState';

interface MeshProps {
  state: any;
  interiorModels: THREE.Group | THREE.Object3D;
}

const Mesh: FC<MeshProps> = ({ state, interiorModels }) => {
  const furnitureRef = useRef<THREE.Group[]>([]);

  const { boxes, furnitures } = useGlobalState((state) => {
    return {
      boxes: state.boxes,
      furnitures: state.furnitures,
    };
  }, shallow);

  const handlFurnitureClick = (e: ThreeEvent<MouseEvent>) => {
    if (!furnitureRef.current) return;
    e.stopPropagation();
    furnitureRef.current.map((furniture) => {
      state.current = furniture.name;
      console.log(state.current);
    });
  };

  const handlePointerMiss = (e: MouseEvent) => {
    e.type === 'click' && (state.current = null);
  };

  return (
    <Fragment>
      {furnitures && furnitures.length > 0
        ? furnitures.map((furniture, index) => (
            <Center
              top
              key={furniture.id}
              position={[
                furniture.position.x,
                furniture.position.y,
                furniture.position.z,
              ]}
              name={furniture.name}
              onClick={handlFurnitureClick}
              onPointerMissed={handlePointerMiss}
              ref={(el: any) => {
                furnitureRef.current[index] = el;
              }}
            >
              <primitive
                object={interiorModels.clone()}
                scale={1}
                // You might need to filter/find the correct model based on furniture.modelName
              />
            </Center>
          ))
        : null}
      {boxes && boxes.length > 0
        ? boxes.map((box, index) => (
            <Center
              top
              key={box.id}
              position={[box.position.x, box.position.y, box.position.z]}
              name={box.name}
              onClick={handlFurnitureClick}
              onPointerMissed={handlePointerMiss}
              ref={(el: any) => {
                // if (!furnitureRef.current) return;
                furnitureRef.current[index] = el;
              }}
            >
              <mesh>
                <boxGeometry />
                <meshNormalMaterial />
              </mesh>
            </Center>
          ))
        : null}
    </Fragment>
  );
};

export default Mesh;
