import { Grid } from '@react-three/drei';
import { Fragment } from 'react';

const GridFloor = () => {
  return (
    <Fragment>
      <Grid
        receiveShadow
        position={[0, -0.0255, 0]}
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
    </Fragment>
  );
};

export default GridFloor;
