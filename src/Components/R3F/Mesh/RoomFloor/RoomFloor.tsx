import { useRef } from 'react';
import * as THREE from 'three';

const RoomFloor = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh
      receiveShadow
      castShadow
      rotation={[Math.PI / -2, 0, 0]}
      name="floor"
      ref={meshRef}
    >
      <planeGeometry />
      <meshStandardMaterial />
    </mesh>
  );
};

export default RoomFloor;
