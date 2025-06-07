export const DistortionShader = {
    uniforms: {
      time: { value: 0 },
      map: { value: null },
      distortionStrength: { value: 0.1 },
      rgbShiftAmount: { value: 0.01 },
      rgbAngle: { value: Math.PI / 4 },
    },
    vertexShader: `
      uniform float time;
      uniform float distortionStrength;
  
      varying vec2 vUv;
  
      void main() {
        vUv = uv;
        vec3 pos = position;
  
        // Simulate cloth waving in wind
        float waveX = sin(pos.y * 6.0 + time * 2.0);
        float waveY = cos(pos.x * 4.0 + time * 1.5);
        float combined = (waveX + waveY) * 0.1;
  
        // Add slight flutter via position and time
        pos.z += combined * distortionStrength;
  
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D map;
      uniform float time;
      uniform float rgbShiftAmount;
      uniform float rgbAngle;
  
      varying vec2 vUv;
  
      void main() {
        float angle = rgbAngle;
        vec2 offset = rgbShiftAmount * vec2(cos(angle), sin(angle));
  
        vec4 r = texture2D(map, vUv + offset);
        vec4 g = texture2D(map, vUv);
        vec4 b = texture2D(map, vUv - offset);
  
        gl_FragColor = vec4(r.r, g.g, b.b, 1.0);
      }
    `
  };
  