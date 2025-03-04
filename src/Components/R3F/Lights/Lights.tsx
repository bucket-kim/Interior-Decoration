import { Environment } from '@react-three/drei';
import { Fragment } from 'react';

const Lights = () => {
  return (
    <Fragment>
      <directionalLight
        position={[4, 10, -4]}
        castShadow
        // shadow-normalBias={0.027}
        // shadow-bias={-0.004}
        shadow-mapSize={[1024, 1024]} // Increase shadow map resolution
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <Environment preset="apartment" environmentIntensity={0.75} />
      {/* <Environment files={envMapFile} environmentIntensity={0.75} /> */}
    </Fragment>
  );
};

export default Lights;
