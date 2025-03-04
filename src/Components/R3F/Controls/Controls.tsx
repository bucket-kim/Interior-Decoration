import { OrbitControls, TransformControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { ElementRef, FC, Fragment, RefObject, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useSnapshot } from 'valtio';
import { shallow } from 'zustand/shallow';
import { useGlobalState } from '../../../State/useGlobalState';

interface ControlsProps {
  state: any;
  modes: any;
  roomRef: RefObject<THREE.Group>;
  wallRefX: RefObject<THREE.Mesh>;
  wallRefZ: RefObject<THREE.Mesh>;
  onRoomScaleChange?: () => void;
}

const Controls: FC<ControlsProps> = ({
  state,
  modes,
  roomRef,
  wallRefX,
  wallRefZ,
  onRoomScaleChange,
}) => {
  const snap = useSnapshot(state);

  const scene = useThree((state) => state.scene);
  const { updateFurniturePosition, updateFurnitureRotation } = useGlobalState(
    (state) => {
      return {
        updateFurniturePosition: state.updateFurniturePosition,
        updateFurnitureRotation: state.updateFurnitureRotation,
      };
    },
    shallow,
  );

  const transformRef = useRef<ElementRef<typeof TransformControls>>(null);

  useEffect(() => {
    if (!transformRef.current || !roomRef.current) return;
    const controls = transformRef.current;

    const handleTransform = () => {
      if (
        !snap.current ||
        !roomRef.current ||
        !wallRefX.current ||
        !wallRefZ.current
      )
        return;
      const object = scene.getObjectByName(snap.current);

      if (!object) return;

      const roomBound = new THREE.Box3().setFromObject(roomRef.current);
      const roomSize = roomBound.getSize(new THREE.Vector3());

      const objectBound = new THREE.Box3().setFromObject(object);
      const objectSize = objectBound.getSize(new THREE.Vector3());
      const actualScale = {
        x: objectSize.x / 2,
        y: objectSize.y / 2,
        z: objectSize.z / 2,
      };

      const worldScale = new THREE.Vector3();
      object.getWorldScale(worldScale);

      const maxX = roomSize.x / 2 - (actualScale.x + 0.1);
      const maxY = roomSize.y - objectSize.y;
      const maxZ = roomSize.z / 2 - (actualScale.z + 0.1);

      const newPosition = object.position.clone();

      newPosition.x = THREE.MathUtils.clamp(
        newPosition.x,
        -maxX + worldScale.x * 0.1,
        maxX,
      );
      newPosition.y = THREE.MathUtils.clamp(newPosition.y, 0, maxY);
      newPosition.z = THREE.MathUtils.clamp(
        newPosition.z,
        -maxZ,
        maxZ + worldScale.z * 0.1,
      );

      if (!object.position.equals(newPosition) && object.name !== 'Room_Geo') {
        object.position.copy(newPosition);
        // updateFurniturePosition(snap.current, newPosition);
      }
    };

    controls.addEventListener('objectChange', handleTransform);

    return () => {
      controls.removeEventListener('objectChange', handleTransform);
    };
  }, [snap.current, roomRef, scene, updateFurniturePosition]);

  const handleTransformEnd = () => {
    if (!snap.current) return;
    const object = scene.getObjectByName(snap.current);

    if (!object) return;

    // Update both position and rotation in state
    if (snap.current === 'Room_Geo' && onRoomScaleChange) {
      onRoomScaleChange();
    } else {
      updateFurniturePosition(snap.current, object.position.clone());
      updateFurnitureRotation(
        snap.current,
        new THREE.Vector3(
          object.rotation.x,
          object.rotation.y,
          object.rotation.z,
        ),
      );
    }
  };

  return (
    <Fragment>
      {snap.current && (
        <TransformControls
          ref={transformRef}
          object={scene.getObjectByName(snap.current)}
          mode={snap.current === 'Room_Geo' ? 'scale' : modes[snap.mode]}
          rotationSnap={Math.PI / 4}
          showY={snap.current === 'Room_Geo' ? false : true}
          onMouseUp={handleTransformEnd}
        />
      )}
      <OrbitControls makeDefault maxPolarAngle={Math.PI / 1.75} />
    </Fragment>
  );
};

export default Controls;
