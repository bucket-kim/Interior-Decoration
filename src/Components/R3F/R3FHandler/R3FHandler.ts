import { ThreeEvent } from "@react-three/fiber";
import * as THREE from 'three';

export const handleRoomClick = (e: ThreeEvent<MouseEvent>, refObj: THREE.Group, state: any) => {
    if (!refObj) return;
    e.stopPropagation();
    state.current = refObj.name;
  };