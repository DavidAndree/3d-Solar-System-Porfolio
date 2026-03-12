import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Starfield() {
  const ref = useRef<THREE.Points>(null);
  const count = 8000;

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 60 + Math.random() * 250;
      pos[i3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i3 + 2] = r * Math.cos(phi);

      const brightness = 0.4 + Math.random() * 0.6;
      const tint = Math.random();
      if (tint > 0.92) {
        col[i3] = brightness;
        col[i3 + 1] = brightness * 0.75;
        col[i3 + 2] = brightness * 0.5;
      } else if (tint > 0.84) {
        col[i3] = brightness * 0.6;
        col[i3 + 1] = brightness * 0.8;
        col[i3 + 2] = brightness;
      } else if (tint > 0.78) {
        col[i3] = brightness;
        col[i3 + 1] = brightness * 0.9;
        col[i3 + 2] = brightness * 0.6;
      } else {
        col[i3] = brightness;
        col[i3 + 1] = brightness;
        col[i3 + 2] = brightness;
      }

      sz[i] = Math.random() < 0.03 ? 0.3 + Math.random() * 0.5 : 0.05 + Math.random() * 0.18;
    }
    return { positions: pos, colors: col, sizes: sz };
  }, []);

  const material = useMemo(() => new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { time: { value: 0 } },
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      varying float vTwinkle;
      uniform float time;
      void main() {
        vColor = color;
        float twinkle = sin(time * (1.0 + position.x * 0.01) + position.y * 12.0) * 0.5 + 0.5;
        twinkle = twinkle * sin(time * 0.7 + position.z * 8.0) * 0.5 + 0.5;
        vTwinkle = 0.5 + twinkle * 0.5;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (200.0 / -mvPos.z) * (0.8 + twinkle * 0.4);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vTwinkle;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float core = smoothstep(0.5, 0.0, d);
        float glow = smoothstep(0.5, 0.15, d);
        float alpha = (core * 0.8 + glow * 0.2) * vTwinkle;
        vec3 col = vColor + core * 0.15;
        gl_FragColor = vec4(col, alpha * 0.9);
      }
    `,
  }), []);

  useFrame(({ clock }) => {
    material.uniforms.time.value = clock.getElapsedTime();
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.001;
    }
  });

  return (
    <points ref={ref} material={material}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={count} array={sizes} itemSize={1} />
      </bufferGeometry>
    </points>
  );
}
