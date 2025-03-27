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
  areaLightRef: RefObject<THREE.Group>;
  wallRefX: RefObject<THREE.Mesh>;
  wallRefZ: RefObject<THREE.Mesh>;
  onRoomScaleChange?: () => void;
}

const Controls: FC<ControlsProps> = ({
  state,
  modes,
  roomRef,
  areaLightRef,
  wallRefX,
  wallRefZ,
  onRoomScaleChange,
}) => {
  const snap = useSnapshot(state);

  const scene = useThree((state) => state.scene);
  const {
    updateFurniturePosition,
    updateFurnitureRotation,
    updateAreaLightPosition,
  } = useGlobalState((state) => {
    return {
      updateFurniturePosition: state.updateFurniturePosition,
      updateFurnitureRotation: state.updateFurnitureRotation,
      updateAreaLightPosition: state.updateAreaLightPosition,
    };
  }, shallow);

  const transformRef = useRef<ElementRef<typeof TransformControls>>(null);

  const initialRoomSizeRef = useRef<THREE.Vector3 | null>(null);
  const initialLightPosRef = useRef<THREE.Vector3 | null>(null);
  const initialLightScaleRef = useRef<THREE.Vector3 | null>(null);

  // Store initial values on first render
  useEffect(() => {
    if (
      roomRef.current &&
      areaLightRef?.current &&
      !initialRoomSizeRef.current
    ) {
      const roomBound = new THREE.Box3().setFromObject(roomRef.current);
      initialRoomSizeRef.current = roomBound.getSize(new THREE.Vector3());
      initialLightPosRef.current = areaLightRef.current.position.clone();
      initialLightScaleRef.current = areaLightRef.current.scale.clone();
    }
  }, [roomRef, areaLightRef]);

  const AreaLightPosControls = () => {
    if (
      !roomRef.current ||
      !areaLightRef.current ||
      !initialRoomSizeRef.current ||
      !initialLightPosRef.current ||
      !initialLightScaleRef.current
    )
      return;

    const roomBound = new THREE.Box3().setFromObject(roomRef.current);
    const roomSize = roomBound.getSize(new THREE.Vector3());

    const scaleFactorX = roomSize.x / initialRoomSizeRef.current.x;
    const scaleFactorZ = roomSize.z / initialRoomSizeRef.current.z;

    const newPosX = initialLightPosRef.current.x * scaleFactorX;
    const newScaleZ = initialLightScaleRef.current.z * scaleFactorZ;

    areaLightRef.current.position.x = newPosX;
    areaLightRef.current.scale.z = newScaleZ;

    updateAreaLightPosition(areaLightRef.current.position.clone());
  };

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

      if (snap.current === 'Room_Geo' && areaLightRef.current) {
        AreaLightPosControls();
      }

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
    if (snap.current === 'Room_Geo') {
      if (onRoomScaleChange) {
        onRoomScaleChange();
      }

      if (areaLightRef.current) {
        updateAreaLightPosition(areaLightRef.current.position.clone());
      }
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
          mode={
            snap.current === 'Room_Geo' || snap.current === 'wall_001'
              ? 'scale'
              : modes[snap.mode] || 'translate'
          }
          rotationSnap={Math.PI / 4}
          showY={snap.current === 'Room_Geo' ? false : true}
          onMouseUp={handleTransformEnd}
        />
      )}
      <OrbitControls
        makeDefault
        maxPolarAngle={Math.PI / 2}
        maxDistance={20}
        minDistance={5}
      />
    </Fragment>
  );
};

export default Controls;
