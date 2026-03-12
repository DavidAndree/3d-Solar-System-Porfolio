import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AsteroidBeltProps {
  innerRadius?: number;
  outerRadius?: number;
  count?: number;
}

export default function AsteroidBelt({ innerRadius = 15, outerRadius = 17, count = 500 }: AsteroidBeltProps) {
  const ref = useRef<THREE.InstancedMesh>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const speeds = useMemo(() => {
    return Array.from({ length: count }, () => 0.005 + Math.random() * 0.015);
  }, [count]);

  const offsets = useMemo(() => {
    return Array.from({ length: count }, () => Math.random() * Math.PI * 2);
  }, [count]);

  const radii = useMemo(() => {
    return Array.from({ length: count }, () => innerRadius + Math.random() * (outerRadius - innerRadius));
  }, [count, innerRadius, outerRadius]);

  const heights = useMemo(() => {
    return Array.from({ length: count }, () => (Math.random() - 0.5) * 1.2);
  }, [count]);

  const scales = useMemo(() => {
    return Array.from({ length: count }, () => {
      const s = 0.03 + Math.random() * 0.12;
      return new THREE.Vector3(
        s * (0.6 + Math.random() * 0.8),
        s * (0.4 + Math.random() * 0.6),
        s * (0.6 + Math.random() * 0.8)
      );
    });
  }, [count]);

  const rotSpeeds = useMemo(() => {
    return Array.from({ length: count }, () => new THREE.Vector3(
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2,
      (Math.random() - 0.5) * 2
    ));
  }, [count]);

  useMemo(() => {
    if (!ref.current) return;
    const color = new THREE.Color();
    for (let i = 0; i < count; i++) {
      const brightness = 0.15 + Math.random() * 0.25;
      const warmth = Math.random();
      if (warmth > 0.7) {
        color.setRGB(brightness * 1.2, brightness, brightness * 0.8);
      } else {
        color.setRGB(brightness, brightness, brightness);
      }
      ref.current.setColorAt(i, color);
    }
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
  }, [count, ref.current]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      const angle = offsets[i] + t * speeds[i];
      dummy.position.set(
        Math.cos(angle) * radii[i],
        heights[i] + Math.sin(t * 0.5 + offsets[i]) * 0.1,
        Math.sin(angle) * radii[i]
      );
      dummy.rotation.set(
        t * rotSpeeds[i].x,
        t * rotSpeeds[i].y,
        t * rotSpeeds[i].z
      );
      dummy.scale.copy(scales[i]);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        roughness={0.9}
        metalness={0.1}
        color="#8a8480"
      />
    </instancedMesh>
  );
}
