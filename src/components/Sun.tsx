import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface SunProps {
  onClick: () => void;
  isFocused: boolean;
}

export default function Sun({ onClick, isFocused }: SunProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const outerGlowRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.08;
    }
    if (glowRef.current) {
      glowRef.current.scale.setScalar(1.6 + Math.sin(t * 1.5) * 0.08);
    }
    if (outerGlowRef.current) {
      outerGlowRef.current.scale.setScalar(2.2 + Math.sin(t * 0.8) * 0.12);
    }
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      >
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial
          color="#ff8c00"
          emissive="#ff6b00"
          emissiveIntensity={hovered ? 3 : 2}
          toneMapped={false}
        />
      </mesh>

      <mesh ref={glowRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#ff8c00"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh ref={outerGlowRef}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial
          color="#ff6b00"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>

      <pointLight color="#ff8c00" intensity={60} distance={70} decay={2} />
      <pointLight color="#ffffff" intensity={8} distance={50} decay={2} />

      {hovered && !isFocused && (
        <Html center distanceFactor={12} style={{ pointerEvents: 'none' }}>
          <div className="data-label">SUN // IDENTITY</div>
        </Html>
      )}
    </group>
  );
}
