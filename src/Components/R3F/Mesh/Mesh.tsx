import { Center } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { FC, useRef } from 'react';
import * as THREE from 'three';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../../State/useGlobalState';

interface MeshProps {
  state: any;
}

const Mesh: FC<MeshProps> = ({ state }) => {
  const furnitureRef = useRef<THREE.Group[]>([]);

  const { boxes } = useGlobalState((state) => {
    return {
      boxes: state.boxes,
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
    <>
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
    </>
  );
};

export default Mesh;
