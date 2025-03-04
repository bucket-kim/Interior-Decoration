import { Center, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
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
    setRoomScale(worldScale.x);
  };

  useEffect(() => {
    if (!roomGroupRef.current) return;

    scaleRoomButtonClick
      ? (state.current = roomGroupRef.current.name)
      : (state.current = null);
  }, [scaleRoomButtonClick]);

  return (
    <Canvas
      camera={{ position: [6, 5, 8], fov: 35 }}
      dpr={[1, 2]}
      shadows
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1,
        antialias: true,
      }}
    >
      <Lights />
      <FurnitureLoader />
      <Center
        top
        name="Room_Geo"
        ref={roomGroupRef}
        scale={roomScale}
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
        wallRefX={wallRefX}
        wallRefZ={wallRefZ}
        onRoomScaleChange={handleRoomScaleChange}
      />
    </Canvas>
  );
};

export default R3F;
