import { Center, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { proxy } from 'valtio';
import { shallow } from 'zustand/shallow';
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
  const roomScale = useRef<number>(5);

  const { setInteriorData } = useGlobalState((state) => {
    return {
      setInteriorData: state.setInteriorData,
    };
  }, shallow);

  const interiorModels = useGLTF('./Models/deco-interior-asset.glb', true);

  useEffect(() => {
    setInteriorData(
      interiorModels.scene.children.map((child) => {
        return child;
      }),
    );
  }, []);

  const { scaleRoomButtonClick } = useGlobalState((state) => {
    return {
      scaleRoomButtonClick: state.scaleRoomButtonClick,
    };
  }, shallow);

  useEffect(() => {
    if (!roomGroupRef.current) return;

    scaleRoomButtonClick
      ? (state.current = roomGroupRef.current.name)
      : (state.current = null);
  }, [scaleRoomButtonClick]);

  return (
    <Canvas camera={{ position: [6, 5, 8], fov: 35 }} dpr={[1, 2]} shadows>
      <Lights />
      <Center
        top
        name="Room_Geo"
        ref={roomGroupRef}
        scale={roomScale.current}
        receiveShadow
        castShadow
      >
        <RoomFloor />
        <Walls />
      </Center>
      <Mesh state={state} interiorModels={interiorModels.scene} />
      <GridFloor />
      <Controls state={state} modes={modes} roomRef={roomGroupRef} />
    </Canvas>
  );
};

export default R3F;
