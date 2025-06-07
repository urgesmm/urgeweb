"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { DistortionShader } from "../shader/DistortionShader";

const Orb = ({
  totalImages = 25,
  totalItems = 100,
  baseWidth = 1,
  baseHeight = 0.6,
  sphereRadius = 5,
  distortionStrength = 0.6,
  rgbShiftAmount = 0.02,
  rgbAngle = Math.PI / 4,
}) => {
  const orbRef = useRef();
  const timeUniform = useRef({ value: 0 });
  const texturesRef = useRef([]);
  const [hasDragged, setHasDragged] = useState(false);

  useEffect(() => {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 6.5;

    const renderer = new THREE.WebGLRenderer({
      alpha: false,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    orbRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.minPolarAngle = controls.maxPolarAngle = Math.PI / 2;

    const container = new THREE.Group();
    scene.add(container);

    const textureLoader = new THREE.TextureLoader();
    let loaded = 0;

    for (let i = 0; i < totalImages; i++) {
      textureLoader.load(`/img/${i + 1}.jpeg`, (texture) => {
        texture.generateMipmaps = true;
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texturesRef.current.push(texture);
        if (++loaded === totalImages) createSphere();
      });
    }

    const createImagePlane = (texture) => {
      const ratio = texture.image.width / texture.image.height;
      const width = ratio > 1 ? baseWidth : baseWidth * ratio;
      const height = ratio > 1 ? baseHeight / ratio : baseHeight;
      return new THREE.PlaneGeometry(width, height);
    };

    const createSphere = () => {
      for (let i = 0; i < totalItems; i++) {
        const phi = Math.acos(-1 + (2 * i) / totalItems);
        const theta = Math.sqrt(totalItems * Math.PI) * phi;
        const texture = texturesRef.current[Math.floor(Math.random() * totalImages)];

        const geometry = createImagePlane(texture);
        const uniforms = THREE.UniformsUtils.clone(DistortionShader.uniforms);
        uniforms.map.value = texture;
        uniforms.time = timeUniform.current;
        uniforms.distortionStrength.value = distortionStrength;
        uniforms.rgbShiftAmount.value = rgbShiftAmount;
        uniforms.rgbAngle.value = rgbAngle;

        const material = new THREE.ShaderMaterial({
          uniforms,
          vertexShader: DistortionShader.vertexShader,
          fragmentShader: DistortionShader.fragmentShader,
          transparent: true,
          side: THREE.DoubleSide,
          depthTest: false,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(
          sphereRadius * Math.cos(theta) * Math.sin(phi),
          sphereRadius * Math.sin(theta) * Math.sin(phi),
          sphereRadius * Math.cos(phi)
        );
        mesh.lookAt(0, 0, 0);
        mesh.rotateY(Math.PI);
        container.add(mesh);
      }

      animate();
    };

    const animate = () => {
      requestAnimationFrame(animate);
      timeUniform.current.value += 0.01;
      controls.update();
      renderer.render(scene, camera);
    };

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onUserDrag = () => {
      if (!hasDragged) setHasDragged(true);
    };

    window.addEventListener("resize", onResize);
    renderer.domElement.addEventListener("pointerdown", onUserDrag);

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("pointerdown", onUserDrag);
      if (orbRef.current?.contains(renderer.domElement)) {
        orbRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="orb" ref={orbRef}>
      {!hasDragged && (
        <div className="drag-indicator">
    <svg className="drag-icon" width="48" height="42" viewBox="0 0 48 42" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M32 3L36 7L32 11" stroke="#dadada" stroke-width="1.5"/>
<path d="M37 3L41 7L37 11" stroke="#dadada" stroke-width="1.5"/>
<path d="M42 3L46 7L42 11" stroke="#dadada" stroke-width="1.5"/>
<path d="M16 11L12 7L16 3" stroke="#dadada" stroke-width="1.5"/>
<path d="M11 11L7 7L11 3" stroke="#dadada" stroke-width="1.5"/>
<path d="M6 11L2 7L6 3" stroke="#dadada" stroke-width="1.5"/>
<path d="M43 17.9999V32.9219C43 33.4319 42.903 33.9319 42.714 34.4069L39.929 41.3709C39.776 41.7509 39.409 41.9999 39 41.9999H21C20.642 41.9999 20.31 41.8079 20.132 41.4959L14.528 31.6879C14.183 31.0829 14 30.3969 14 29.7029V20.8539C14 19.3289 14.848 17.9579 16.211 17.2759L20 15.3819V3.99994C20 1.79394 21.794 -6.10352e-05 24 -6.10352e-05C26.206 -6.10352e-05 28 1.79394 28 3.99994V13.9999H39C41.206 13.9999 43 15.7939 43 17.9999ZM41 17.9999C41 16.8969 40.103 15.9999 39 15.9999H27C26.447 15.9999 26 15.5519 26 14.9999V3.99994C26 2.89694 25.103 1.99994 24 1.99994C22.897 1.99994 22 2.89694 22 3.99994V23.9999C22 24.5519 21.553 24.9999 21 24.9999C20.447 24.9999 20 24.5519 20 23.9999V17.6179L17.105 19.0649C16.424 19.4059 16 20.0919 16 20.8539V29.7029C16 30.0499 16.092 30.3929 16.264 30.6959L21.58 39.9999H38.323L40.856 33.6649C40.952 33.4269 41 33.1769 41 32.9219V17.9999Z" fill="#dadada"/>
</svg>
        </div>
      )}

      <style jsx>{`
        .orb {
          width: 100vw;
          height: 100vh;
          position: relative;
        }

        .drag-indicator {
          position: absolute;
          bottom: 40%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          pointer-events: none;
        }

        .drag-icon {
          animation: wiggle 1.6s ease-in-out infinite;
          opacity: 0.85;
          filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.4));
        }

        @keyframes wiggle {
          0%,
          100% {
            transform: translateX(-6px);
          }
          50% {
            transform: translateX(6px);
          }
        }
      `}</style>
    </div>
  );
};

export default Orb;
