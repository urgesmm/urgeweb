import { Canvas, useFrame, extend } from '@react-three/fiber';
import { shaderMaterial, useTexture } from '@react-three/drei';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';

// Custom Shader for a Silk-like Fabric with Smooth Waves
const SilkMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: null,
    uShine: 1.2,
    uWaveAmplitude: 0.3,
    uWaveFrequency: 2.8,
    uWindDirection: new THREE.Vector2(1.0, 0.5),
  },
  `
  uniform float uTime;
  uniform float uWaveAmplitude;
  uniform float uWaveFrequency;
  uniform vec2 uWindDirection;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vWave;

  void main() {
    vUv = uv;
    vNormal = normal;

    vec3 transformed = position;

    float waveX = sin(dot(position.xy, uWindDirection) * uWaveFrequency + uTime * 2.0) * uWaveAmplitude;
    float waveY = cos(dot(position.xy, uWindDirection * 0.5) * uWaveFrequency * 0.7 + uTime * 1.8) * uWaveAmplitude * 0.7;

    transformed.z += waveX + waveY;

    vWave = transformed.z;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
  `,
  `
  uniform sampler2D uTexture;
  uniform float uShine;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying float vWave;

  void main() {
    vec4 textureColor = texture2D(uTexture, vUv);
    vec3 baseColor = textureColor.rgb * (0.7 + 0.3 * sin(vWave));

    vec3 lightDir = normalize(vec3(0.5, 1.0, 0.8));
    float specular = pow(max(dot(normalize(vNormal), lightDir), 0.0), 16.0);

    vec3 finalColor = baseColor + vec3(specular * uShine);

    gl_FragColor = vec4(finalColor, textureColor.a);
  }
`
);

extend({ SilkMaterial });

function Wave() {
  const meshRef = useRef();
  const texture = useTexture('/textures/UAE.png');

  // Animation logic
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} rotation={[0, 0, 0]} receiveShadow castShadow>
      <planeGeometry args={[8, 5, 100, 100]} />
      <silkMaterial uTexture={texture} uShine={4.5} uWaveAmplitude={0.2} uWaveFrequency={2.5} />
    </mesh>
  );
}

export default function WaveScene() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: '0px 0px -50% 0px' });

  return (
    <motion.div ref={ref} initial={{ opacity: 0 }} animate={{ opacity: isInView ? 1 : 0 }}>
      <div style={{ height: '100vh', width: '100vw', background: '#101010' }}>
        <Canvas shadows camera={{ position: [0, 0, 9], fov: 40 }}>
          {isInView && (
            <>
              <ambientLight intensity={0.4} />
              <directionalLight
                position={[2, 2, 5]}
                intensity={1.0}
                castShadow
                shadow-mapSize-width={512}
                shadow-mapSize-height={512}
              />
              <Wave />
            </>
          )}
        </Canvas>
      </div>
    </motion.div>
  );
}
