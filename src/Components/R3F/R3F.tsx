import { Center, useGLTF } from '@react-three/drei';
import { Canvas, ThreeEvent } from '@react-three/fiber';
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

const modes = ['scale', 'translate', 'rotate'];
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

  const { scaleRoomButtonClick, setScaleRoomButtonClick } = useGlobalState(
    (state) => {
      return {
        scaleRoomButtonClick: state.scaleRoomButtonClick,
        setScaleRoomButtonClick: state.setScaleRoomButtonClick,
      };
    },
    shallow,
  );

  const handleRoomClick = (e: ThreeEvent<MouseEvent>) => {
    if (!roomGroupRef.current) return;
    e.stopPropagation();
    setScaleRoomButtonClick(true);
    if (scaleRoomButtonClick) {
      state.current = roomGroupRef.current.name;
    } else {
      state.current = null;
    }
  };

  const handlePointerMiss = (e: MouseEvent) => {
    e.type === 'click' && (state.current = null);
  };

  return (
    <Canvas camera={{ position: [6, 5, 8], fov: 35 }} dpr={[1, 2]} shadows>
      <Lights />
      <Center
        top
        name="room001"
        ref={roomGroupRef}
        onClick={handleRoomClick}
        onPointerMissed={handlePointerMiss}
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
