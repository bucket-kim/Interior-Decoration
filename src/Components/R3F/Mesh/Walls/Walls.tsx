import { CSGGeometryRef } from '@react-three/csg';
import { FC, Fragment, RefObject, useRef } from 'react';
import * as THREE from 'three';

interface WallProps {
  wallRefX: RefObject<THREE.Mesh>;
  wallRefZ: RefObject<THREE.Mesh>;
}

const Walls: FC<WallProps> = ({ wallRefX, wallRefZ }) => {
  const box = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  const geoRef = useRef<CSGGeometryRef>();
  const subtractRef = useRef<THREE.BoxGeometry>(null);

  return (
    <Fragment>
      <mesh
        ref={wallRefX}
        receiveShadow
        castShadow
        name="wall_002"
        rotation={[0, Math.PI / 2, 0]}
        position={[-0.5, 0.25, 0]}
      >
        <boxGeometry args={[1, 0.5, 0.01]} />
        <meshStandardMaterial color={'#e1e1e1'} toneMapped={false} />
      </mesh>

      <mesh
        ref={wallRefZ}
        receiveShadow
        castShadow
        name="wall_001"
        // scale={[1, 0.5, 0.01]}
        rotation={[0, 0, 0]}
        position={[0, 0.25, -0.5]}
      >
        <boxGeometry args={[1, 0.5, 0.01]} />
        <meshStandardMaterial color={'#e1e1e1'} toneMapped={false} />
        {/* <Geometry ref={geoRef as RefObject<CSGGeometryRef>}>
          <Base>
            <boxGeometry args={[1, 0.5, 0.01]} />
          </Base>
          <Subtraction name="window" scale={[2.5, 2.5, 1]}>
            <boxGeometry args={[0.1, 0.1, 0.1]} ref={subtractRef} />
          </Subtraction>
        </Geometry> */}
      </mesh>
    </Fragment>
  );
};

export default Walls;
