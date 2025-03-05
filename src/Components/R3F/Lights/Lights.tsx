import { Environment, SoftShadows } from '@react-three/drei';
import { Fragment } from 'react';

const Lights = () => {
  return (
    <Fragment>
      <directionalLight
        position={[-5, 5, 3]}
        castShadow
        intensity={2.5}
        shadow-mapSize={2048}
        shadow-bias={-0.001}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]}
        />
      </directionalLight>
      <SoftShadows samples={32} />
      <Environment preset="apartment" environmentIntensity={0.5} />
    </Fragment>
  );
};

export default Lights;
