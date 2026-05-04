import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHover;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv;
    
    // Calculate distance from mouse
    float dist = distance(uv, uMouse);
    
    // Create a wave effect based on distance
    float wave = sin(dist * 20.0 - uTime * 5.0) * 0.02 * uHover;
    
    // Add RGB shift / chromatic aberration
    float r = texture2D(uTexture, uv + vec2(wave, wave)).r;
    float g = texture2D(uTexture, uv + vec2(-wave, wave)).g;
    float b = texture2D(uTexture, uv + vec2(0.0, -wave)).b;
    
    gl_FragColor = vec4(r, g, b, 1.0);
  }
`;

function LiquidPlane({ imgUrl, mousePos }) {
  const mesh = useRef();
  const material = useRef();
  const texture = useTexture(imgUrl);
  const { size } = useThree();

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uHover: { value: 1.0 }
    }),
    [texture]
  );

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Calculate normalized mouse position relative to the center of the viewport
      // The canvas is moving, but the mousePos is absolute screen coords.
      // We will approximate it by just constantly shifting a target.
      
      const targetX = (mousePos.x / window.innerWidth);
      // Invert Y for webgl
      const targetY = 1.0 - (mousePos.y / window.innerHeight);

      material.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(targetX, targetY),
        0.05
      );
    }
  });

  // Calculate plane dimensions to cover the space
  // We use aspect ratio of texture
  return (
    <mesh ref={mesh}>
      <planeGeometry args={[10, 10, 32, 32]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function LiquidImage({ src, mousePos }) {
  return (
    <Canvas 
      camera={{ position: [0, 0, 5], fov: 45 }}
      style={{ width: '100%', height: '100%', background: '#000' }}
    >
      <LiquidPlane imgUrl={src} mousePos={mousePos} />
    </Canvas>
  );
}
