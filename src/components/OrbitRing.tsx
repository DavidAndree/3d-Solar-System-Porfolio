import * as THREE from 'three';

interface OrbitRingProps {
  radius: number;
  color?: string;
}

export default function OrbitRing({ radius, color = '#1a3a5c' }: OrbitRingProps) {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[radius - 0.012, radius + 0.012, 200]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.18}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
