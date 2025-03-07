import { Grid } from '@react-three/drei';
import { Fragment } from 'react/jsx-runtime';

const GridFloor = () => {
  return (
    <Fragment>
      <Grid
        receiveShadow
        position={[0, -0.25, 0]}
        args={[10, 10]}
        cellSize={0.5}
        cellThickness={1}
        cellColor={'#bcbcbc'}
        sectionSize={4}
        sectionThickness={1}
        sectionColor={'#969696'}
        fadeDistance={18}
        fadeStrength={1}
        followCamera={false}
        infiniteGrid={true}
      />
      {/* <ContactShadows
        position={[0, -0.25, 0]}
        opacity={0.25}
        scale={10}
        blur={1.5}
        far={0.8}
      /> */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.251, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <shadowMaterial transparent opacity={0.2} />
      </mesh>
    </Fragment>
  );
};

export default GridFloor;
