import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import type { CelestialId } from '../types';
import { planetPositions } from '../store';

interface CameraControllerProps {
  focusTarget: CelestialId | null;
}

const OVERVIEW_POS = new THREE.Vector3(0, 30, 38);
const OVERVIEW_TARGET = new THREE.Vector3(0, 0, 0);

export default function CameraController({ focusTarget }: CameraControllerProps) {
  const controlsRef = useRef<typeof OrbitControls extends React.ForwardRefExoticComponent<infer P> ? (P extends React.RefAttributes<infer T> ? T : never) : never>(null);
  const targetPos = useRef(new THREE.Vector3(0, 35, 40));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const prevFocus = useRef<CelestialId | null>(null);
  const [returning, setReturning] = useState(false);

  useEffect(() => {
    if (prevFocus.current && !focusTarget) {
      setReturning(true);
    } else if (focusTarget) {
      setReturning(false);
    }
    prevFocus.current = focusTarget;
  }, [focusTarget]);

  useFrame(() => {
    const controls = controlsRef.current as any;
    if (!controls) return;

    if (focusTarget) {
      if (focusTarget === 'sun') {
        targetPos.current.set(2, 4, 7);
        targetLookAt.current.set(0, 0, 0);
      } else if (focusTarget === 'blackhole') {
        const bhPos = planetPositions['blackhole'];
        if (bhPos) {
          targetPos.current.set(bhPos.x, bhPos.y + 1.8, bhPos.z + 4.5);
          targetLookAt.current.copy(bhPos);
        }
      } else {
        const planetPos = planetPositions[focusTarget];
        if (planetPos) {
          const dir = planetPos.clone().normalize();
          targetPos.current.set(
            planetPos.x + dir.x * 4,
            3.5,
            planetPos.z + dir.z * 4
          );
          targetLookAt.current.set(planetPos.x, 0, planetPos.z);
        }
      }

      const lerpSpeed = focusTarget === 'blackhole' ? 0.025 : 0.035;
      controls.object.position.lerp(targetPos.current, lerpSpeed);
      controls.target.lerp(targetLookAt.current, lerpSpeed);
      controls.update();
    } else if (returning) {
      controls.object.position.lerp(OVERVIEW_POS, 0.03);
      controls.target.lerp(OVERVIEW_TARGET, 0.03);
      controls.update();

      if (controls.object.position.distanceTo(OVERVIEW_POS) < 0.5) {
        setReturning(false);
      }
    }
  });

  const locked = !!focusTarget || returning;

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enabled={!locked}
      enableDamping
      dampingFactor={0.05}
      autoRotate={!locked}
      autoRotateSpeed={0.3}
      minDistance={3}
      maxDistance={200}
      maxPolarAngle={Math.PI * 0.48}
      minPolarAngle={Math.PI * 0.08}
      enablePan
      panSpeed={0.5}
      rotateSpeed={0.5}
      zoomSpeed={0.8}
    />
  );
}
