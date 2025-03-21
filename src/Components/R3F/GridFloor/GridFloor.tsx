import { Fragment } from 'react/jsx-runtime';
import * as THREE from 'three';

const GridFloor = () => {
  return (
    <Fragment>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.255, 0]}
        frustumCulled={false}
      >
        <planeGeometry args={[50, 50]} />
        <shaderMaterial
          uniforms={{
            uColor: {
              value: new THREE.Color('#fcfcf7'),
            },
            uRadius: {
              value: 0.45,
            },
          }}
          vertexShader="
        varying vec2 vUv;

        void main() {

         gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

          vUv = uv;
        }
        "
          fragmentShader="
            varying vec2 vUv;
            uniform vec3 uColor;
            uniform float uRadius;
            
            void main() {
              float circle = 1.0 - smoothstep(0.25 - (0.5 * 0.25), 0.25 + (0.5 * 0.25), dot(vUv - vec2(0.5), vUv - vec2(0.5)) * 16.0);

              vec2 center = vec2(0.5 - 0.08, 0.5 - 0.05);

              float distance = length(vUv - center);

              float edgeWidth = 0.5;

              float alpha = 1.0 - smoothstep(uRadius - edgeWidth, uRadius, distance);

              gl_FragColor = vec4(uColor, alpha) ;
            }
          "
          // toneMapped={false}
          transparent={true}
        />
      </mesh>
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.251, 0]}
        receiveShadow
        visible={true}
        frustumCulled={false}
      >
        <planeGeometry args={[100, 100]} />
        <shadowMaterial
          transparent
          opacity={0.4}
          toneMapped={false}
          color={'#17345b'}
        />
      </mesh>
    </Fragment>
  );
};

export default GridFloor;
