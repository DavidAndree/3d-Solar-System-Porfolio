import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GalaxyConfig {
  position: [number, number, number];
  color1: string;
  color2: string;
  arms: number;
  particleCount: number;
  size: number;
  rotationSpeed: number;
  tilt: [number, number, number];
}

function SpiralGalaxy({ position, color1, color2, arms, particleCount, size, rotationSpeed, tilt }: GalaxyConfig) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const col = new Float32Array(particleCount * 3);
    const sz = new Float32Array(particleCount);
    const c1 = new THREE.Color(color1);
    const c2 = new THREE.Color(color2);
    const core = new THREE.Color('#ffffff');

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const armIndex = i % arms;
      const armAngle = (armIndex / arms) * Math.PI * 2;
      const radius = Math.pow(Math.random(), 0.6) * size;
      const spiralAngle = radius * 0.8;
      const scatter = (1 - radius / size) * 0.3 + 0.1;

      const angle = armAngle + spiralAngle + (Math.random() - 0.5) * scatter * 2;
      pos[i3] = Math.cos(angle) * radius + (Math.random() - 0.5) * scatter * radius * 0.4;
      pos[i3 + 1] = (Math.random() - 0.5) * scatter * radius * 0.15;
      pos[i3 + 2] = Math.sin(angle) * radius + (Math.random() - 0.5) * scatter * radius * 0.4;

      const t = radius / size;
      const c = t < 0.15
        ? core.clone().lerp(c1, t / 0.15)
        : c1.clone().lerp(c2, (t - 0.15) / 0.85);
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;

      sz[i] = t < 0.2 ? 0.6 + Math.random() * 0.8 : 0.2 + Math.random() * 0.5;
    }
    return { positions: pos, colors: col, sizes: sz };
  }, [color1, color2, arms, particleCount, size]);

  const material = useMemo(() => new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      void main() {
        vColor = color;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (100.0 / -mvPos.z);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float alpha = smoothstep(0.5, 0.0, d) * 0.5;
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
  }), []);

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <points ref={ref} position={position} rotation={tilt} material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={particleCount} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={particleCount} array={sizes} itemSize={1} />
      </bufferGeometry>
    </points>
  );
}

export default function DistantGalaxies() {
  return (
    <>
      <SpiralGalaxy
        position={[-120, 40, -140]}
        color1="#ffd166"
        color2="#ef476f"
        arms={4}
        particleCount={800}
        size={18}
        rotationSpeed={0.0003}
        tilt={[0.8, 0.2, 0.3]}
      />
      <SpiralGalaxy
        position={[140, -20, -100]}
        color1="#48cae4"
        color2="#0077b6"
        arms={3}
        particleCount={600}
        size={14}
        rotationSpeed={-0.0004}
        tilt={[1.2, -0.3, 0.5]}
      />
      <SpiralGalaxy
        position={[60, 50, 130]}
        color1="#ff9f43"
        color2="#ee5a24"
        arms={2}
        particleCount={500}
        size={10}
        rotationSpeed={0.0005}
        tilt={[0.5, 0.8, -0.2]}
      />
    </>
  );
}
