import {
  AccumulativeShadows,
  Environment,
  RandomizedLight,
} from "@react-three/drei";
import React, { Fragment } from "react";

const Lights = () => {
  return (
    <Fragment>
      <Environment preset='city' />
    </Fragment>
  );
};

export default Lights;
