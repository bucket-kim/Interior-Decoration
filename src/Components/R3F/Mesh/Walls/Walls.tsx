import { FC, Fragment, RefObject } from 'react';
import * as THREE from 'three';

interface WallProps {
  wallRefX: RefObject<THREE.Mesh>;
  wallRefZ: RefObject<THREE.Mesh>;
}

const Walls: FC<WallProps> = ({ wallRefX, wallRefZ }) => {
  return (
    <Fragment>
      <mesh
        ref={wallRefX}
        receiveShadow
        castShadow
        name="wall"
        scale={[1, 0.5, 0.01]}
        rotation={[0, Math.PI / 2, 0]}
        position={[-0.5, 0.25, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial color={'#f1f1f1'} toneMapped={false} />
      </mesh>

      <mesh
        ref={wallRefZ}
        receiveShadow
        castShadow
        name="wall"
        scale={[1, 0.5, 0.01]}
        rotation={[0, 0, 0]}
        position={[0, 0.25, -0.5]}
      >
        <boxGeometry />
        <meshStandardMaterial color={'#f1f1f1'} toneMapped={false} />
      </mesh>
    </Fragment>
  );
};

export default Walls;
