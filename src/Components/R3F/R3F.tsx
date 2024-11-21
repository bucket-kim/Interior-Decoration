import { Canvas } from '@react-three/fiber';
import { proxy } from 'valtio';
import Controls from './Controls/Controls';
import GridFloor from './GridFloor/GridFloor';
import Lights from './Lights/Lights';
import RoomFloor from './RoomFloor/RoomFloor';

const state = proxy({ current: null, mode: 0 });

const R3F = () => {
  return (
    <Canvas camera={{ position: [4, 3, 5], fov: 35 }} dpr={[1, 2]}>
      <Lights />
      <RoomFloor state={state} />
      <GridFloor />
      <Controls state={state} />
    </Canvas>
  );
};

export default R3F;
