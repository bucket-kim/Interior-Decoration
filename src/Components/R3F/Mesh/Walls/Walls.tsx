import { Fragment } from 'react';

const Walls = () => {
  return (
    <Fragment>
      <mesh
        receiveShadow
        castShadow
        name="wall"
        scale={[1, 0.5, 0.01]}
        rotation={[0, Math.PI / 2, 0]}
        position={[-0.5, 0.25, 0]}
      >
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>

      <mesh
        receiveShadow
        castShadow
        name="wall"
        scale={[1, 0.5, 0.01]}
        rotation={[0, 0, 0]}
        position={[0, 0.25, -0.5]}
      >
        <boxGeometry />
        <meshStandardMaterial />
      </mesh>
    </Fragment>
  );
};

export default Walls;
