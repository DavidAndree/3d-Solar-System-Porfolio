export type CelestialId =
  | 'sun'
  | 'mercury'
  | 'venus'
  | 'earth'
  | 'mars'
  | 'jupiter'
  | 'saturn'
  | 'uranus'
  | 'neptune'
  | 'blackhole';

export interface PlanetConfig {
  id: CelestialId;
  name: string;
  label: string;
  orbitRadius: number;
  size: number;
  color: string;
  emissive: string;
  speed: number;
  offset: number;
  rings?: {
    innerRadius: number;
    outerRadius: number;
    color: string;
    opacity: number;
  };
}
