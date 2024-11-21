import { Center } from '@react-three/drei';
import { ThreeEvent } from '@react-three/fiber';
import { FC, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useSnapshot } from 'valtio';

interface RoomFloorProps {
  state: any;
}

const RoomFloor: FC<RoomFloorProps> = ({ state }) => {
  const floorRef = useRef<THREE.Mesh>(null);
  const centerFloorRef = useRef<THREE.Group>(null);

  const snap = useSnapshot(state);

  const handleMeshClick = (e: ThreeEvent<MouseEvent>) => {
    if (!floorRef.current) return;
    e.stopPropagation();
    state.current = floorRef.current.name;
  };

  const handlePointerMissed = (e: MouseEvent) => {
    e.type === 'click' && (state.current = null);
  };

  useEffect(() => {
    if (!centerFloorRef.current) return;
    console.log(centerFloorRef.current);
  }, []);

  return (
    <Center
      top
      onClick={handleMeshClick}
      scale={5}
      onPointerMissed={handlePointerMissed}
      ref={centerFloorRef}
    >
      <mesh
        castShadow
        rotation={[Math.PI / -2, 0, 0]}
        name="floor"
        ref={floorRef}
      >
        <planeGeometry />
        <meshStandardMaterial />
      </mesh>
    </Center>
  );
};

export default RoomFloor;
