import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface NebulaCloudProps {
  position: [number, number, number];
  color1: string;
  color2: string;
  scale?: number;
  rotationSpeed?: number;
  opacity?: number;
}

function NebulaCloud({ position, color1, color2, scale = 1, rotationSpeed = 0.003, opacity = 0.06 }: NebulaCloudProps) {
  const groupRef = useRef<THREE.Group>(null);
  const count = 120;

  const particles = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 4 + Math.random() * 12;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.4;
      pos[i * 3 + 2] = r * Math.cos(phi);

      const t = Math.random();
      const c = c1.clone().lerp(c2, t);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      sizes[i] = 1.5 + Math.random() * 4;
    }
    return { pos, col, sizes };
  }, [color1, color2]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        time: { value: 0 },
        baseOpacity: { value: opacity },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        varying float vDist;
        uniform float time;
        void main() {
          vColor = color;
          vec3 pos = position;
          pos.x += sin(time * 0.1 + position.z * 0.05) * 0.8;
          pos.y += cos(time * 0.08 + position.x * 0.04) * 0.5;
          vec4 mvPos = modelViewMatrix * vec4(pos, 1.0);
          vDist = -mvPos.z;
          gl_PointSize = size * (180.0 / -mvPos.z);
          gl_Position = projectionMatrix * mvPos;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vDist;
        uniform float baseOpacity;
        void main() {
          float d = length(gl_PointCoord - vec2(0.5));
          if (d > 0.5) discard;
          float alpha = smoothstep(0.5, 0.0, d) * baseOpacity;
          alpha *= smoothstep(300.0, 80.0, vDist);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
    });
  }, [opacity]);

  useFrame(({ clock }) => {
    material.uniforms.time.value = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y += rotationSpeed * 0.016;
    }
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <points material={material}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={count} array={particles.pos} itemSize={3} />
          <bufferAttribute attach="attributes-color" count={count} array={particles.col} itemSize={3} />
          <bufferAttribute attach="attributes-size" count={count} array={particles.sizes} itemSize={1} />
        </bufferGeometry>
      </points>
    </group>
  );
}

export default function Nebula() {
  return (
    <>
      <NebulaCloud
        position={[80, 15, -60]}
        color1="#e63946"
        color2="#ff9f43"
        scale={2.5}
        rotationSpeed={0.002}
        opacity={0.045}
      />
      <NebulaCloud
        position={[-90, -10, -80]}
        color1="#0096c7"
        color2="#48cae4"
        scale={3}
        rotationSpeed={-0.0015}
        opacity={0.04}
      />
      <NebulaCloud
        position={[40, 30, 90]}
        color1="#f77f00"
        color2="#fcbf49"
        scale={2}
        rotationSpeed={0.0025}
        opacity={0.035}
      />
      <NebulaCloud
        position={[-60, 25, 70]}
        color1="#2dc653"
        color2="#80ed99"
        scale={1.8}
        rotationSpeed={-0.002}
        opacity={0.03}
      />
      <NebulaCloud
        position={[10, -20, -110]}
        color1="#e85d75"
        color2="#ff9a76"
        scale={3.5}
        rotationSpeed={0.001}
        opacity={0.05}
      />
    </>
  );
}
