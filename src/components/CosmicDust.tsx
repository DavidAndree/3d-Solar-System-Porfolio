import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function CosmicDust() {
  const ref = useRef<THREE.Points>(null);
  const count = 2000;

  const { positions, colors, sizes, velocities } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const vel = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#0096c7'),
      new THREE.Color('#ff9f43'),
      new THREE.Color('#e63946'),
      new THREE.Color('#80ed99'),
      new THREE.Color('#48cae4'),
      new THREE.Color('#ffffff'),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * 200;
      pos[i3 + 1] = (Math.random() - 0.5) * 80;
      pos[i3 + 2] = (Math.random() - 0.5) * 200;

      const c = palette[Math.floor(Math.random() * palette.length)];
      const brightness = 0.5 + Math.random() * 0.5;
      col[i3] = c.r * brightness;
      col[i3 + 1] = c.g * brightness;
      col[i3 + 2] = c.b * brightness;

      sz[i] = 0.1 + Math.random() * 0.4;

      vel[i3] = (Math.random() - 0.5) * 0.02;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.008;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.02;
    }

    return { positions: pos, colors: col, sizes: sz, velocities: vel };
  }, []);

  const material = useMemo(() => new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: { time: { value: 0 } },
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      varying float vAlpha;
      uniform float time;
      void main() {
        vColor = color;
        float pulse = sin(time * 0.5 + position.x * 0.1 + position.z * 0.1) * 0.5 + 0.5;
        vAlpha = 0.15 + pulse * 0.2;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        gl_PointSize = size * (120.0 / -mvPos.z) * (0.8 + pulse * 0.4);
        gl_Position = projectionMatrix * mvPos;
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - vec2(0.5));
        if (d > 0.5) discard;
        float alpha = smoothstep(0.5, 0.1, d) * vAlpha;
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
  }), []);

  useFrame(({ clock }) => {
    material.uniforms.time.value = clock.getElapsedTime();
    if (!ref.current) return;

    const posAttr = ref.current.geometry.getAttribute('position') as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      arr[i3] += velocities[i3];
      arr[i3 + 1] += velocities[i3 + 1];
      arr[i3 + 2] += velocities[i3 + 2];

      if (Math.abs(arr[i3]) > 100) velocities[i3] *= -1;
      if (Math.abs(arr[i3 + 1]) > 40) velocities[i3 + 1] *= -1;
      if (Math.abs(arr[i3 + 2]) > 100) velocities[i3 + 2] *= -1;
    }
    posAttr.needsUpdate = true;
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
