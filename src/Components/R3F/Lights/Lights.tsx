import { Environment } from '@react-three/drei';
import { Fragment } from 'react';

const Lights = () => {
  return (
    <Fragment>
      <Environment preset="city" />
    </Fragment>
  );
};

export default Lights;
