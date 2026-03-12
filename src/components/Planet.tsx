import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import type { PlanetConfig } from '../types';
import { planetPositions } from '../store';

interface PlanetProps {
  config: PlanetConfig;
  onClick: () => void;
  isFocused: boolean;
}

export default function Planet({ config, onClick, isFocused }: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      const x = config.orbitRadius * Math.cos(config.speed * t + config.offset);
      const z = config.orbitRadius * Math.sin(config.speed * t + config.offset);
      groupRef.current.position.set(x, 0, z);
      planetPositions[config.id] = new THREE.Vector3(x, 0, z);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      >
        <sphereGeometry args={[config.size, 32, 32]} />
        <meshStandardMaterial
          color={config.color}
          emissive={config.emissive}
          emissiveIntensity={hovered ? 2 : 0.5}
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>

      {config.rings && (
        <mesh rotation={[-Math.PI / 2 + 0.15, 0, 0]}>
          <ringGeometry args={[config.rings.innerRadius, config.rings.outerRadius, 64]} />
          <meshBasicMaterial
            color={config.rings.color}
            transparent
            opacity={config.rings.opacity}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {(hovered || isFocused) && (
        <mesh>
          <sphereGeometry args={[config.size * 1.5, 32, 32]} />
          <meshBasicMaterial
            color={config.color}
            transparent
            opacity={hovered ? 0.15 : 0.08}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {hovered && !isFocused && (
        <Html center distanceFactor={12} style={{ pointerEvents: 'none' }}>
          <div className="data-label">{config.label}</div>
        </Html>
      )}
    </group>
  );
}
