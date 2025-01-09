import { OrbitControls, TransformControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { ElementRef, FC, Fragment, RefObject, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useSnapshot } from 'valtio';

interface ControlsProps {
  state: any;
  modes: any;
  roomRef: RefObject<THREE.Group>;
}

const Controls: FC<ControlsProps> = ({ state, modes, roomRef }) => {
  const snap = useSnapshot(state);
  const scene = useThree((state) => state.scene);

  const transformRef = useRef<ElementRef<typeof TransformControls>>(null);

  useEffect(() => {
    if (!transformRef.current || !roomRef.current) return;
    const controls = transformRef.current;

    const handleTransform = () => {
      if (!snap.current || !roomRef.current) return;
      const object = scene.getObjectByName(snap.current);

      if (!object) return;

      const roomBound = new THREE.Box3().setFromObject(roomRef.current);
      const roomSize = roomBound.getSize(new THREE.Vector3());

      const maxX = roomSize.x / 2 - object.scale.x / 2;
      const maxZ = roomSize.z / 2 - object.scale.z / 2;

      const newPosition = object.position.clone();
      newPosition.x = THREE.MathUtils.clamp(newPosition.x, -maxX, maxX);
      newPosition.z = THREE.MathUtils.clamp(newPosition.z, -maxZ, maxZ);

      if (!object.position.equals(newPosition)) {
        object.position.copy(newPosition);
      }
    };

    controls.addEventListener('objectChange', handleTransform);

    return () => {
      controls.removeEventListener('objectChange', handleTransform);
    };
  }, [snap.current, roomRef, scene]);

  return (
    <Fragment>
      {snap.current && (
        <TransformControls
          ref={transformRef}
          object={scene.getObjectByName(snap.current)}
          mode={snap.current === 'floor' ? 'scale' : modes[snap.mode]}
          rotationSnap={Math.PI / 4}
          showY={snap.current === 'room001' ? false : true}
        />
      )}
      <OrbitControls makeDefault maxPolarAngle={Math.PI / 1.75} />
    </Fragment>
  );
};

export default Controls;
