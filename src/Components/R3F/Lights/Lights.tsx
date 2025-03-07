import { Environment, SoftShadows } from '@react-three/drei';
import { Fragment } from 'react';

const Lights = () => {
  return (
    <Fragment>
      {/* <directionalLight
        position={[-5, 10, 3]}
        castShadow
        intensity={2}
        shadow-mapSize={1024}
        shadow-bias={-0.001}
      >
        <orthographicCamera
          attach="shadow-camera"
          args={[-8.5, 8.5, 8.5, -8.5, 0.1, 20]}
        />
      </directionalLight> */}
      <directionalLight
        position={[-5, 10, 3]}
        castShadow
        intensity={2}
        shadow-mapSize={1024} // Increase shadow map resolution
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={-10}
        shadow-camera-bottom={10}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
        shadow-normalBias={0.1}
        shadow-bias={-0.0005}
      />
      <SoftShadows samples={30} size={60} />
      <Environment preset="apartment" environmentIntensity={0.5} />
    </Fragment>
  );
};

export default Lights;
