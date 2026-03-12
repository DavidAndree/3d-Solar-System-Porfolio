import { Canvas } from '@react-three/fiber';
import SolarSystem from './SolarSystem';
import type { CelestialId } from '../types';

interface SceneCanvasProps {
  focusTarget: CelestialId | null;
  onFocus: (id: CelestialId | null) => void;
}

export default function SceneCanvas({ focusTarget, onFocus }: SceneCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 35, 40], fov: 50, near: 0.1, far: 1200 }}
      style={{ background: '#06080f' }}
      onPointerMissed={() => {
        if (focusTarget) onFocus(null);
      }}
    >
      <SolarSystem focusTarget={focusTarget} onFocus={onFocus} />
    </Canvas>
  );
}
