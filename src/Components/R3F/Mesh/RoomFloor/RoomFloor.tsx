import { Fragment, useRef } from 'react';
import * as THREE from 'three';

const RoomFloor = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <Fragment>
      <mesh
        receiveShadow
        castShadow
        rotation={[Math.PI / -2, 0, 0]}
        name="floor"
        ref={meshRef}
      >
        <planeGeometry />
        <meshStandardMaterial color={'#e6b46f'} />
      </mesh>
      <mesh position={[0, -0.0255, 0]} scale={[1.01, 0.05, 1.01]}>
        <boxGeometry />
        <meshStandardMaterial color={'#adb2b5'} />
      </mesh>
    </Fragment>
  );
};

export default RoomFloor;
