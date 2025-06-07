'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, Text3D, Center, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ModelLoader from './ModelLoader';
import { useModelLoading } from '../contexts/ModelLoadingContext';

// Register ScrollTrigger with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Camera controller
const CameraController = () => {
  const { camera } = useThree();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.r3fCamera = camera;
    }
    return () => {
      if (typeof window !== 'undefined') {
        delete window.r3fCamera;
      }
    };
  }, [camera]);

  return null;
};

const AirplaneModel = ({ airplaneRef }) => {
  const { modelLoaded } = useModelLoading();
  const textRef = useRef(null);
  const [fontSize, setFontSize] = useState(0.25);

  // Initial position: [x=0, y=0, z=-5] (centered, behind camera)
  // Initial rotation: [x=0, y=Math.PI/2, z=0] (facing right)
  // Initial scale: 0.5
  const [position, setPosition] = useState([0, 0, -5]);
  const [rotation, setRotation] = useState([0, Math.PI / 2, 0]);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      modelLoaded();
    }, 500);

    if (typeof window !== 'undefined') {
      window.airplaneControls = {
        setPosition: (x, y, z) => setPosition([x, y, z]),
        setRotation: (x, y, z) => setRotation([x, y, z]),
        setScale: (s) => setScale(s)
      };
    }

    return () => {
      clearTimeout(loadingTimeout);
      if (typeof window !== 'undefined') {
        delete window.airplaneControls;
      }
    };
  }, [modelLoaded]);

  useEffect(() => {
    const handleResize = () => {
      setFontSize(window.innerWidth < 768 ? 0.15 : 0.25);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
      <directionalLight position={[-5, 5, 5]} intensity={0.5} />

      {/* 3D Airplane Model */}
      <group ref={airplaneRef} position={position} scale={scale} rotation={rotation}>
        <primitive object={useGLTF('/models/low_poly_spitfire_airplane.glb').scene} />
      </group>

      {/* 3D Text */}
      <group ref={textRef}>
        <Center position={[0, -2, 0]}>
          <Text3D
            font="/fonts/helvetiker_regular.typeface.json"
            size={fontSize}
            height={0.03}
            curveSegments={4}
            bevelEnabled
            bevelThickness={0.01}
            bevelSize={0.01}
          >
            URGE MANAGEMENT
            <meshStandardMaterial
              color="#ffffff"
              metalness={0.8}
              roughness={0.1}
              emissive="#4080ff"
              emissiveIntensity={0.3}
            />
          </Text3D>
        </Center>
      </group>
    </>
  );
};

// Main component
const RotatingBox = () => {
  const containerRef = useRef(null);
  const airplaneRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !containerRef.current || !airplaneRef.current) return;

    ScrollTrigger.getAll().forEach(st => st.kill());

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=100%",
        pin: true,
        markers: true,
        scrub: 1
      }
    });

    // Animation settings:
    // Position: from [0,0,-5] to [0,0,3] (moves forward)
    // Rotation: from [0,Math.PI/2,0] to [0.1,Math.PI/2+0.2,0] (slight pitch up and turn)
    if (airplaneRef.current) {
      tl.to(airplaneRef.current.position, {
        z: 3,
        x: 5,
        y: 0,
        ease: "power1.inOut"
      }, 0);

      tl.to(airplaneRef.current.rotation, {
        y: Math.PI / 2 + 0.2,
        x: 0.1,
        z: 0,
        ease: "power1.inOut"
      }, 0);
    }

    // Force a refresh to ensure proper initialization
    ScrollTrigger.refresh();

    // Return cleanup function
    return () => {
      // Kill the timeline and ScrollTrigger
      if (tl.scrollTrigger) tl.scrollTrigger.kill();
      tl.kill();

      // Clean up global reference
      if (typeof window !== 'undefined') {
        delete window.r3fCamera;
      }
    };
  }, [isClient]); // Re-run when isClient changes

  // Don't render anything on server side
  if (!isClient) {
    return (
      <div className="rotating-box-container w-screen h-screen flex items-center justify-center bg-pri-clr">
        <div className="w-full h-full max-w-4xl mx-auto flex flex-col items-center justify-center">
          <h2 className="text-sec-clr font-pp-neue text-4xl md:text-5xl mb-8 text-center">
            Loading...
          </h2>
        </div>
      </div>
    );
  }

  return (
    <ModelLoader>
      {/* Main container with fixed height */}
      <div
        style={{ height: '200vh', width: '100vw' }} // Double the viewport height to allow scrolling
        className="rotating-box-outer-container bg-pri-clr"
      >
        {/* Inner container that will be pinned */}
        <div
          ref={containerRef}
          className="rotating-box-container w-screen h-screen flex items-center justify-center bg-pri-clr sticky top-0 overflow-hidden"
          id="rotating-box-section"
        >
          <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-10">

            <div className="w-screen h-screen absolute top-0 left-0">
              <Canvas
                shadows
                camera={{ position: [0, 0, 10], fov: 45, near: 0.1, far: 1000 }}
                style={{
                  background: 'transparent',
                  width: '100vw',
                  height: '100vh'
                }}
              >
                <CameraController />
                <AirplaneModel airplaneRef={airplaneRef} />
                <Environment preset="city" />
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </ModelLoader>
  );
};

// Preload the airplane model
useGLTF.preload('/models/low_poly_spitfire_airplane.glb');

export default RotatingBox;
