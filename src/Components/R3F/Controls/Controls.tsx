import { OrbitControls, TransformControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { FC, Fragment } from 'react';
import { useSnapshot } from 'valtio';

interface ControlsProps {
  state: any;
}

const Controls: FC<ControlsProps> = ({ state }) => {
  const snap = useSnapshot(state);

  const scene = useThree((state) => state.scene);

  return (
    <Fragment>
      {snap.current && (
        <TransformControls
          object={scene.getObjectByName(snap.current)}
          mode="scale"
        />
      )}
      <OrbitControls makeDefault maxPolarAngle={Math.PI / 1.75} />
    </Fragment>
  );
};

export default Controls;
