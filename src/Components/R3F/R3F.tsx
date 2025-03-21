import { Center, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useControls } from 'leva';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { proxy } from 'valtio';
import { shallow } from 'zustand/shallow';
import FurnitureLoader from '../../context/FurnitureLoader';
import { useGlobalState } from '../../State/useGlobalState';
import Controls from './Controls/Controls';
import GridFloor from './GridFloor/GridFloor';
import Lights from './Lights/Lights';
import Mesh from './Mesh/Mesh';
import RoomFloor from './Mesh/RoomFloor/RoomFloor';
import Walls from './Mesh/Walls/Walls';

interface State {
  current: string | null;
  mode: number;
}

const modes = ['translate', 'rotate'];
const state = proxy<State>({ current: null, mode: 0 });

const R3F = () => {
  const roomGroupRef = useRef<THREE.Group>(null);
  const wallRefX = useRef<THREE.Mesh>(null);
  const wallRefZ = useRef<THREE.Mesh>(null);
  const areaLightRef = useRef<THREE.Group>(null);

  const { setInteriorData, roomScale, setRoomScale, scaleRoomButtonClick } =
    useGlobalState((state) => {
      return {
        setInteriorData: state.setInteriorData,
        roomScale: state.roomScale,
        setRoomScale: state.setRoomScale,
        scaleRoomButtonClick: state.scaleRoomButtonClick,
      };
    }, shallow);

  const interiorModels = useGLTF('./Models/deco-interior-asset.glb', true);

  useEffect(() => {
    interiorModels.scene.updateMatrixWorld(true);
    setInteriorData(
      interiorModels.scene.children.map((child) => {
        return child;
      }),
    );
  }, []);

  const handleRoomScaleChange = () => {
    if (!roomGroupRef.current) return;
    const worldScale = new THREE.Vector3();
    roomGroupRef.current.getWorldScale(worldScale);

    setRoomScale(new THREE.Vector2(worldScale.x, worldScale.z));
  };

  useEffect(() => {
    if (!roomGroupRef.current) return;

    scaleRoomButtonClick
      ? (state.current = roomGroupRef.current.name)
      : (state.current = null);
  }, [scaleRoomButtonClick]);

  const fogControl = useControls({
    near: { value: 15, min: 0, max: 200, step: 1 },
    far: { value: 50, min: 0, max: 500, step: 1 },
  });

  return (
    <Canvas
      camera={{ position: [8, 6, 10], fov: 35 }}
      dpr={[1, 2]}
      shadows
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1,
        antialias: true,
      }}
    >
      <color attach={'background'} args={['#b2b9bc']} />
      <Lights areaLightRef={areaLightRef} />
      <FurnitureLoader />
      <Center
        top
        name="Room_Geo"
        ref={roomGroupRef}
        scale={[roomScale.x, 5, roomScale.y]}
        receiveShadow
        castShadow
        position={[0, -0.25, 0]}
      >
        <group>
          <RoomFloor />
          <Walls wallRefX={wallRefX} wallRefZ={wallRefZ} />
        </group>
      </Center>
      <Mesh state={state} interiorModels={interiorModels.scene} />

      <GridFloor />
      <Controls
        state={state}
        modes={modes}
        roomRef={roomGroupRef}
        areaLightRef={areaLightRef}
        wallRefX={wallRefX}
        wallRefZ={wallRefZ}
        onRoomScaleChange={handleRoomScaleChange}
      />
    </Canvas>
  );
};

export default R3F;
