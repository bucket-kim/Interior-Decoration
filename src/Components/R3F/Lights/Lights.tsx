import { Environment, SoftShadows } from '@react-three/drei';
import { Color, Depth, LayerMaterial } from 'lamina';
import { FC, Fragment, RefObject, useEffect, useState } from 'react';
import * as THREE from 'three';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../../State/useGlobalState';

interface LightsProps {
  areaLightRef: RefObject<THREE.Group>;
}

const Lights: FC<LightsProps> = ({ areaLightRef }) => {
  const { areaLightPosition } = useGlobalState((state) => {
    return {
      areaLightPosition: state.areaLightPosition,
    };
  }, shallow);

  useEffect(() => {
    if (!areaLightRef.current) return;

    areaLightRef.current.position.x = areaLightPosition.x;
  }, [areaLightPosition]);

  const [colorA, setColorA] = useState('#11b6f2');
  const [colorB, setColorB] = useState('#fffefa');
  // const [mainColor, setMainColor] = useState('#e2f6ff');
  const [mainColor, setMainColor] = useState('#c1efff');

  return (
    <Fragment>
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
        color={'#c5e1f6'}
      />
      <Environment preset="apartment" environmentIntensity={0.65} />
      <group
        rotation={[0, Math.PI / -2, 0]}
        position={[-5, 4, -2]}
        ref={areaLightRef}
        scale={[1, 1, 4]}
      >
        <rectAreaLight
          rotation={[-0.4, 0, 0]}
          intensity={0.75}
          color={'#c5e1f6'}
        />
      </group>
      <SoftShadows samples={30} size={60} />
      <mesh scale={30} visible={true}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial side={THREE.BackSide} toneMapped={false}>
          <Color color={mainColor} alpha={1} mode="normal" />
          <Depth
            colorA={colorA}
            colorB={colorB}
            alpha={0.5}
            mode="normal"
            near={0}
            far={300}
            origin={[100, 100, 100]}
          />
        </LayerMaterial>
      </mesh>
    </Fragment>
  );
};

export default Lights;
