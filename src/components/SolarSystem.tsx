import Sun from './Sun';
import SunGlow from './SunGlow';
import Planet from './Planet';
import OrbitRing from './OrbitRing';
import Starfield from './Starfield';
import CameraController from './CameraController';
import BlackHole from './BlackHole';
import Nebula from './Nebula';
import CosmicDust from './CosmicDust';
import ShootingStars from './ShootingStars';
import DistantGalaxies from './DistantGalaxies';
import AsteroidBelt from './AsteroidBelt';
import { planets } from '../data';
import type { CelestialId } from '../types';

interface SolarSystemProps {
  focusTarget: CelestialId | null;
  onFocus: (id: CelestialId | null) => void;
}

export default function SolarSystem({ focusTarget, onFocus }: SolarSystemProps) {
  return (
    <>
      <CameraController focusTarget={focusTarget} />
      <Starfield />
      <Nebula />
      <CosmicDust />
      <ShootingStars />
      <DistantGalaxies />
      <ambientLight intensity={0.08} />

      <Sun
        onClick={() => onFocus(focusTarget === 'sun' ? null : 'sun')}
        isFocused={focusTarget === 'sun'}
      />
      <SunGlow />

      {planets.map((planet) => (
        <group key={planet.id}>
          <OrbitRing radius={planet.orbitRadius} color={planet.color} />
          <Planet
            config={planet}
            onClick={() => onFocus(focusTarget === planet.id ? null : planet.id)}
            isFocused={focusTarget === planet.id}
          />
        </group>
      ))}

      <AsteroidBelt innerRadius={15} outerRadius={17} count={500} />

      <BlackHole
        onClick={() => onFocus(focusTarget === 'blackhole' ? null : 'blackhole')}
        isFocused={focusTarget === 'blackhole'}
      />
    </>
  );
}
