import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Streak {
  origin: THREE.Vector3;
  direction: THREE.Vector3;
  speed: number;
  length: number;
  progress: number;
  delay: number;
  active: boolean;
}

const STREAK_COLORS = ['#ffffff', '#cce5ff', '#ffe4b5', '#b0e0e6', '#ffd6a5'];

export default function ShootingStars() {
  const maxStreaks = 8;
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);
  const scratch = useMemo(() => ({
    headPos: new THREE.Vector3(),
    tailPos: new THREE.Vector3(),
    center: new THREE.Vector3(),
    dir: new THREE.Vector3(),
    right: new THREE.Vector3(),
    up: new THREE.Vector3(),
    camDir: new THREE.Vector3(),
    matrix: new THREE.Matrix4(),
  }), []);

  const streaks = useMemo<Streak[]>(() => {
    return Array.from({ length: maxStreaks }, (_, i) => ({
      origin: new THREE.Vector3(),
      direction: new THREE.Vector3(),
      speed: 0,
      length: 0,
      progress: 0,
      delay: 1 + i * 2.5 + Math.random() * 3,
      active: false,
    }));
  }, []);

  const materials = useMemo(() => {
    return Array.from({ length: maxStreaks }, () => {
      return new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
        uniforms: {
          headAlpha: { value: 0 },
          streakColor: { value: new THREE.Color('#ffffff') },
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform float headAlpha;
          uniform vec3 streakColor;
          varying vec2 vUv;
          void main() {
            float fade = pow(vUv.x, 0.5);
            float edge = smoothstep(0.5, 0.0, abs(vUv.y - 0.5));
            float alpha = fade * edge * headAlpha;
            gl_FragColor = vec4(streakColor, alpha * 0.8);
          }
        `,
      });
    });
  }, []);

  function respawnStreak(s: Streak) {
    const spread = 120;
    const height = 25 + Math.random() * 40;
    const angle = Math.random() * Math.PI * 2;
    const dist = 60 + Math.random() * spread;

    s.origin.set(
      Math.cos(angle) * dist,
      height,
      Math.sin(angle) * dist
    );

    s.direction.set(
      (Math.random() - 0.5) * 1.5,
      -(0.4 + Math.random() * 0.6),
      (Math.random() - 0.5) * 1.5
    ).normalize();

    s.speed = 50 + Math.random() * 70;
    s.length = 4 + Math.random() * 10;
    s.progress = 0;
    s.delay = 2 + Math.random() * 7;
    s.active = false;
  }

  useFrame((state, delta) => {
    const cam = state.camera;

    for (let i = 0; i < maxStreaks; i++) {
      const s = streaks[i];
      const mat = materials[i];
      const mesh = meshRefs.current[i];
      if (!mesh) continue;

      if (!s.active) {
        s.delay -= delta;
        if (s.delay <= 0) {
          respawnStreak(s);
          s.active = true;
          (mat.uniforms.streakColor.value as THREE.Color).set(
            STREAK_COLORS[Math.floor(Math.random() * STREAK_COLORS.length)]
          );
        }
        mat.uniforms.headAlpha.value = 0;
        mesh.visible = false;
        continue;
      }

      mesh.visible = true;
      s.progress += delta * s.speed;
      // Reuse scratch objects instead of allocating new vectors every frame.
      const { headPos, tailPos, center, dir, right, up, camDir, matrix } = scratch;
      headPos.copy(s.origin).addScaledVector(s.direction, s.progress);
      tailPos.copy(s.origin).addScaledVector(s.direction, Math.max(0, s.progress - s.length));
      center.addVectors(headPos, tailPos).multiplyScalar(0.5);
      dir.subVectors(headPos, tailPos);
      const len = dir.length();
      dir.normalize();

      cam.getWorldDirection(camDir);
      right.crossVectors(dir, camDir).normalize();
      up.crossVectors(right, dir).normalize().multiplyScalar(0.08);
      matrix.makeBasis(dir.multiplyScalar(len), up, right);
      matrix.setPosition(center);
      mesh.matrixAutoUpdate = false;
      mesh.matrix.copy(matrix);

      const maxTravel = 90;
      const fadeIn = Math.min(s.progress / 5, 1);
      const fadeOut = Math.max(0, 1 - (s.progress - maxTravel + 15) / 15);
      mat.uniforms.headAlpha.value = Math.min(fadeIn, fadeOut);

      if (s.progress > maxTravel + 15) {
        s.active = false;
        s.delay = 3 + Math.random() * 8;
        mat.uniforms.headAlpha.value = 0;
        mesh.visible = false;
      }
    }
  });

  return (
    <group>
      {materials.map((mat, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          material={mat}
          visible={false}
        >
          <planeGeometry args={[1, 1]} />
        </mesh>
      ))}
    </group>
  );
}
