import { Center } from '@react-three/drei';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { proxy } from 'valtio';
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

  const handleRoomClick = (e: ThreeEvent<MouseEvent>) => {
    if (!roomGroupRef.current) return;
    e.stopPropagation();
    state.current = roomGroupRef.current.name;
  };

  const handlePointerMiss = (e: MouseEvent) => {
    e.type === 'click' && (state.current = null);
  };

  return (
    <Canvas camera={{ position: [6, 5, 8], fov: 35 }} dpr={[1, 2]}>
      <Lights />
      <Center
        top
        name="room001"
        ref={roomGroupRef}
        onClick={handleRoomClick}
        onPointerMissed={handlePointerMiss}
        scale={roomScale.current}
        onUpdate={(e) => {
          console.log(e);
        }}
      >
        <RoomFloor />
        <Walls />
      </Center>
      <Mesh state={state} />
      <GridFloor />
      <Controls state={state} modes={modes} roomRef={roomGroupRef} />
    </Canvas>
  );
};

export default R3F;
