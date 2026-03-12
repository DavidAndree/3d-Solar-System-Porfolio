import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { planetPositions } from '../store';

const BH_POS = new THREE.Vector3(0, 0, -120);

interface BlackHoleProps {
  onClick: () => void;
  isFocused: boolean;
}

function createDiskParticles(count: number, rMin: number, rMax: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = rMin + Math.random() * (rMax - rMin);
    const h = (Math.random() - 0.5) * 0.15 * (1 - (r - rMin) / (rMax - rMin));
    positions[i * 3] = Math.cos(angle) * r;
    positions[i * 3 + 1] = h;
    positions[i * 3 + 2] = Math.sin(angle) * r;
  }
  return positions;
}

export default function BlackHole({ onClick, isFocused }: BlackHoleProps) {
  const diskGroupRef = useRef<THREE.Group>(null);
  const innerParticlesRef = useRef<THREE.Points>(null);
  const midParticlesRef = useRef<THREE.Points>(null);
  const outerParticlesRef = useRef<THREE.Points>(null);
  const [hovered, setHovered] = useState(false);

  const diskMaterial = useMemo(() => new THREE.ShaderMaterial({
    transparent: true,
    side: THREE.DoubleSide,
    depthWrite: false,
    uniforms: { time: { value: 0 } },
    vertexShader: `
      varying vec3 vPos;
      void main() {
        vPos = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec3 vPos;
      void main() {
        float dist = length(vPos.xy);
        float t = clamp((dist - 5.0) / 9.0, 0.0, 1.0);
        float temp = 1.0 - t;
        float angle = atan(vPos.y, vPos.x);
        float swirl = sin(angle * 14.0 + dist * 3.5 - time * 2.0) * 0.5 + 0.5;
        float swirl2 = sin(angle * 7.0 - dist * 2.0 + time * 1.2) * 0.5 + 0.5;
        vec3 hot = vec3(1.0, 0.95, 0.85);
        vec3 warm = vec3(1.0, 0.5, 0.08);
        vec3 cool = vec3(0.65, 0.12, 0.01);
        vec3 cold = vec3(0.12, 0.02, 0.0);
        vec3 color;
        if (temp > 0.65) color = mix(warm, hot, (temp - 0.65) / 0.35);
        else if (temp > 0.3) color = mix(cool, warm, (temp - 0.3) / 0.35);
        else color = mix(cold, cool, temp / 0.3);
        color += (swirl * 0.1 + swirl2 * 0.06) * temp;
        float alpha = smoothstep(0.0, 0.08, t) * (1.0 - smoothstep(0.88, 1.0, t));
        alpha *= 0.55 + swirl * 0.35 * temp;
        alpha *= 0.35 + temp * 0.65;
        gl_FragColor = vec4(color, alpha);
      }
    `,
  }), []);

  const innerPts = useMemo(() => createDiskParticles(600, 5, 8), []);
  const midPts = useMemo(() => createDiskParticles(500, 8, 11), []);
  const outerPts = useMemo(() => createDiskParticles(400, 11, 14), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    planetPositions['blackhole'] = BH_POS;
    diskMaterial.uniforms.time.value = t;

    if (diskGroupRef.current) diskGroupRef.current.rotation.z = t * 0.08;
    if (innerParticlesRef.current) innerParticlesRef.current.rotation.y = t * 0.25;
    if (midParticlesRef.current) midParticlesRef.current.rotation.y = t * 0.12;
    if (outerParticlesRef.current) outerParticlesRef.current.rotation.y = t * 0.06;
  });

  return (
    <group position={BH_POS.toArray()}>
      <mesh
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      >
        <sphereGeometry args={[4, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      <mesh>
        <sphereGeometry args={[4.5, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      <group rotation={[Math.PI * 0.42, 0, Math.PI * 0.08]}>
        <group ref={diskGroupRef}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} material={diskMaterial}>
            <ringGeometry args={[5, 14, 256, 1]} />
          </mesh>
        </group>

        <points ref={innerParticlesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={600} array={innerPts} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial color="#ffcc66" size={0.08} transparent opacity={0.7} sizeAttenuation depthWrite={false} />
        </points>

        <points ref={midParticlesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={500} array={midPts} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial color="#ff8833" size={0.06} transparent opacity={0.5} sizeAttenuation depthWrite={false} />
        </points>

        <points ref={outerParticlesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={400} array={outerPts} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial color="#993311" size={0.05} transparent opacity={0.35} sizeAttenuation depthWrite={false} />
        </points>
      </group>

      <mesh>
        <sphereGeometry args={[8, 32, 32]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>

      <pointLight color="#ff6600" intensity={30} distance={60} decay={2} />

      {hovered && !isFocused && (
        <Html center distanceFactor={30} style={{ pointerEvents: 'none' }}>
          <div className="data-label">SINGULARITY // 4TH DIMENSION</div>
        </Html>
      )}
    </group>
  );
}
