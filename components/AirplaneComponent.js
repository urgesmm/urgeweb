'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, Text3D, Center, useGLTF } from '@react-three/drei';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ModelLoader from './ModelLoader';
import { useModelLoading } from '../contexts/ModelLoadingContext';

// Register ScrollTrigger with GSAP
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);

  // Make sure ScrollTrigger is initialized
  document.addEventListener('DOMContentLoaded', () => {
    // Force a refresh after the DOM is fully loaded
    setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 500);
  });
}

// Airplane Model Component
const AirplaneModel = ({ boxRef }) => {
  const { modelLoaded } = useModelLoading();
  const textRef = useRef(null);
  const [fontSize, setFontSize] = useState(0.25);

  // ===== AIRPLANE POSITION SETTINGS =====
  // Initial position: [x=0, y=0, z=-5] (centered, far back)
  // Initial rotation: [x=0, y=Math.PI/2, z=0] (facing right)
  // Initial scale: 0.5 (half size)
  const [position, setPosition] = useState([0, 0, -5]);
  const [rotation, setRotation] = useState([0, Math.PI / 2, 0]);
  const [scale, setScale] = useState(0.5);

  // Notify when model is loaded
  useEffect(() => {
    const loadingTimeout = setTimeout(() => {
      console.log('3D airplane model loaded');
      modelLoaded();
    }, 500);

    // Add position controls to window
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

  // Set font size based on screen width
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
      <group ref={boxRef} position={position} scale={scale} rotation={rotation}>
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
const AirplaneComponent = () => {
  const containerRef = useRef(null);
  const boxRef = useRef(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Set up scroll animation
  useEffect(() => {
    if (!isClient || !containerRef.current || !boxRef.current) return;

    // Clear any existing animations
    ScrollTrigger.getAll().forEach(st => st.kill());

    // Create animation timeline
    const tl = gsap.timeline();

    // Create ScrollTrigger separately
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "+=100%",
      pin: true,
      markers: true, // Set to true for debugging
      scrub: 1,
      animation: tl, // Connect the timeline to ScrollTrigger
      onEnter: () => console.log("ScrollTrigger entered"),
      onLeave: () => console.log("ScrollTrigger left"),
    });

    // ===== SCROLL ANIMATION SETTINGS =====
    // Animate position: z from -5 to 3 (moves forward)
    // Animate rotation: x from 0 to 0.1 (slight pitch up)
    //                  y from Math.PI/2 to Math.PI/2+0.2 (slight turn)
    //                  z stays at 0
    tl.to(boxRef.current.position, {
      z: 3,  // Move forward
      x: 0,  // Stay centered horizontally
      y: 0,  // Stay centered vertically
      ease: "power1.inOut"
    }, 0);

    tl.to(boxRef.current.rotation, {
      x: 0.1,              // Pitch up slightly
      y: Math.PI / 2 + 0.2, // Turn slightly
      z: 0,                // No roll
      ease: "power1.inOut"
    }, 0);

    // Force a reflow to ensure the DOM is fully rendered
    window.dispatchEvent(new Event('resize'));

    // Refresh ScrollTrigger
    ScrollTrigger.refresh(true);

    return () => {
      // Clean up
      if (st) st.kill();
      tl.kill();
    };
  }, [isClient]);

  // Loading state
  if (!isClient) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-pri-clr">
        <div className="text-sec-clr font-pp-neue text-4xl md:text-5xl text-center">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <ModelLoader>
      {/* Scrollable container */}
      <div style={{ height: '300vh', width: '100vw' }} className="bg-pri-clr">
        {/* Pinned container */}
        <div
          ref={containerRef}
          className="w-screen h-screen flex items-center justify-center bg-pri-clr sticky top-0 overflow-hidden"
        >
          <div className="w-screen h-screen">
            <Canvas
              shadows
              camera={{ position: [0, 0, 10], fov: 45, near: 0.1, far: 1000 }}
              style={{ width: '100vw', height: '100vh' }}
            >
              <AirplaneModel boxRef={boxRef} />
              <Environment preset="city" />
            </Canvas>
          </div>
        </div>
      </div>
    </ModelLoader>
  );
};

// Preload the airplane model
useGLTF.preload('/models/low_poly_spitfire_airplane.glb');

export default AirplaneComponent;
