import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { planetPositions } from '../store';

const BH_POS = new THREE.Vector3(0, 0, -55);

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
  const lensRef = useRef<THREE.Mesh>(null);
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
        float t = clamp((dist - 2.8) / 6.2, 0.0, 1.0);
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

  const innerPts = useMemo(() => createDiskParticles(600, 2.8, 5), []);
  const midPts = useMemo(() => createDiskParticles(500, 5, 7), []);
  const outerPts = useMemo(() => createDiskParticles(400, 7, 9), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    planetPositions['blackhole'] = BH_POS;
    diskMaterial.uniforms.time.value = t;

    if (diskGroupRef.current) diskGroupRef.current.rotation.z = t * 0.08;
    if (innerParticlesRef.current) innerParticlesRef.current.rotation.y = t * 0.25;
    if (midParticlesRef.current) midParticlesRef.current.rotation.y = t * 0.12;
    if (outerParticlesRef.current) outerParticlesRef.current.rotation.y = t * 0.06;
    if (lensRef.current) lensRef.current.scale.setScalar(1 + Math.sin(t * 0.6) * 0.015);
  });

  return (
    <group position={BH_POS.toArray()}>
      <mesh
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      >
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial color="#000000" />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.25, 64, 64]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.97} />
      </mesh>

      <mesh rotation={[Math.PI * 0.42, 0, Math.PI * 0.08]} ref={lensRef}>
        <torusGeometry args={[2.45, 0.045, 16, 256]} />
        <meshBasicMaterial color="#ffd699" transparent opacity={0.92} toneMapped={false} />
      </mesh>

      <group rotation={[Math.PI * 0.42, 0, Math.PI * 0.08]}>
        <group ref={diskGroupRef}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} material={diskMaterial}>
            <ringGeometry args={[2.8, 9, 256, 1]} />
          </mesh>
        </group>

        <points ref={innerParticlesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={600} array={innerPts} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial color="#ffcc66" size={0.06} transparent opacity={0.7} sizeAttenuation depthWrite={false} />
        </points>

        <points ref={midParticlesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={500} array={midPts} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial color="#ff8833" size={0.05} transparent opacity={0.5} sizeAttenuation depthWrite={false} />
        </points>

        <points ref={outerParticlesRef}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" count={400} array={outerPts} itemSize={3} />
          </bufferGeometry>
          <pointsMaterial color="#993311" size={0.04} transparent opacity={0.35} sizeAttenuation depthWrite={false} />
        </points>
      </group>

      <mesh rotation={[-Math.PI * 0.08, 0, Math.PI * 0.04]}>
        <torusGeometry args={[2.35, 0.2, 4, 256]} />
        <meshBasicMaterial color="#ff7722" transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>

      <mesh>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
      <mesh>
        <sphereGeometry args={[6, 32, 32]} />
        <meshBasicMaterial color="#ff3300" transparent opacity={0.025} side={THREE.BackSide} />
      </mesh>

      <pointLight color="#ff6600" intensity={18} distance={30} decay={2} />

      {hovered && !isFocused && (
        <Html center distanceFactor={18} style={{ pointerEvents: 'none' }}>
          <div className="data-label">SINGULARITY // 4TH DIMENSION</div>
        </Html>
      )}
    </group>
  );
}
