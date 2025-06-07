'use client';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, useGLTF, useAnimations } from '@react-three/drei';
import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, MotionConfig, useMotionValue, useSpring } from 'framer-motion';
import * as THREE from 'three';
import { LoopRepeat } from 'three';
// Import ModelLoadingContext
import { useModelLoading } from '../contexts/ModelLoadingContext';

// Airplane Component
const Airplane = ({ airplaneRef, position }) => {
  const { modelLoaded } = useModelLoading();
  const { scene, animations } = useGLTF('/models/low_poly_spitfire_airplane.glb');
  const { actions } = useAnimations(animations, airplaneRef);
  const clockRef = useRef(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Setup airplane and animations
  useEffect(() => {
    if (airplaneRef.current && !isLoaded) {
      // Set initial position
      airplaneRef.current.position.set(position[0], position[1], position[2]);

      // Change airplane color to red
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach(material => {
              if (material.color) {
                material.color.set('#cc3333');
                material.needsUpdate = true;
              }
            });
          } else if (child.material.color) {
            child.material.color.set('#cc3333');
            child.material.needsUpdate = true;
          }
        }
      });

      // Start propeller animation
      console.log('Available animations:', Object.keys(actions));

      // Try all possible propeller animation names
      if (actions.Propeller) {
        console.log('Playing Propeller animation');
        actions.Propeller.reset().play();
        actions.Propeller.setLoop(LoopRepeat);
        actions.Propeller.setEffectiveTimeScale(2.0);
      } else if (actions.PropellerAction) {
        console.log('Playing PropellerAction animation');
        actions.PropellerAction.reset().play();
        actions.PropellerAction.setLoop(LoopRepeat);
        actions.PropellerAction.setEffectiveTimeScale(2.0);
      } else {
        // Try to find any animation that might be the propeller
        const propellerAnimation = Object.keys(actions).find(name =>
          name.toLowerCase().includes('propeller') ||
          name.toLowerCase().includes('rotor') ||
          name.toLowerCase().includes('spin')
        );

        if (propellerAnimation) {
          console.log(`Playing found animation: ${propellerAnimation}`);
          actions[propellerAnimation].reset().play();
          actions[propellerAnimation].setLoop(LoopRepeat);
          actions[propellerAnimation].setEffectiveTimeScale(2.0);
        } else {
          console.warn('No propeller animation found in the model');
          // If no specific propeller animation found, try playing all animations
          Object.keys(actions).forEach(name => {
            console.log(`Trying to play animation: ${name}`);
            actions[name].reset().play();
            actions[name].setLoop(LoopRepeat);
          });
        }
      }

      // Mark model as loaded
      setIsLoaded(true);
      modelLoaded();
    }
  }, [position, actions, scene, isLoaded, modelLoaded]);

  // Floating effect is now handled in the CameraAnimation component for better synchronization

  // Create motion values for animations
  const motionX = useMotionValue(position[0]);
  const motionY = useMotionValue(position[1]);
  const motionRotX = useMotionValue(0);

  // Apply spring physics for smoother animations
  const springX = useSpring(motionX, { stiffness: 100, damping: 30 });
  const springY = useSpring(motionY, { stiffness: 100, damping: 30 });
  const springRotX = useSpring(motionRotX, { stiffness: 100, damping: 30 });

  // Update position based on motion values
  useEffect(() => {
    const unsubscribeX = springX.onChange(value => {
      if (airplaneRef.current) {
        airplaneRef.current.position.x = value;
      }
    });

    const unsubscribeY = springY.onChange(value => {
      if (airplaneRef.current) {
        airplaneRef.current.position.y = value;
      }
    });

    const unsubscribeRotX = springRotX.onChange(value => {
      if (airplaneRef.current) {
        airplaneRef.current.rotation.x = value;
      }
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
      unsubscribeRotX();
    };
  }, [springX, springY, springRotX]);

  return (
    <group
      ref={airplaneRef}
      position={position}
      scale={0.5}
      rotation={[0, Math.PI / 1, 0]}
    >
      <primitive object={scene} />
    </group>
  );
};

// Camera and Scroll Animation using Framer Motion
const CameraAnimation = ({ setControlsEnabled, airplaneRef, position }) => {
  const { camera } = useThree();
  const clockRef = useRef(0);
  const animationRef = useRef({ progress: 0 });

  // Create motion value for scroll progress
  const scrollProgress = useMotionValue(0);

  // Initialize camera
  useEffect(() => {
    if (!airplaneRef.current) return;

    // Set initial positions
    camera.position.set(0, 0, 10);
    camera.rotation.set(0, 0, 0);
    setControlsEnabled(false);

    // Track last scroll position to detect direction
    let lastScrollY = window.scrollY;
    let scrollDirection = 'down';

    // Create an Intersection Observer to detect when the container is in view
    const containerElement = document.getElementById('canvas-container');
    if (!containerElement) {
      console.error('Canvas container element not found');
      return;
    }

    // Setup scroll listener with throttling for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // We'll use the window height to calculate the spacer height
          // The spacer is set to 400% of window height

          // Get container's position relative to viewport
          const containerRect = containerElement.getBoundingClientRect();

          // Check if container is in view
          const isContainerInView = (
            containerRect.top < window.innerHeight &&
            containerRect.bottom > 0
          );

          // Only process scroll if container is in view
          if (isContainerInView) {
            const scrollPosition = window.scrollY;

            // Calculate progress based on container position
            let progress = 0;

            // Get the container height
            const containerHeight = containerElement.offsetHeight;

            // Calculate the maximum scroll distance (container height * 4)
            const maxScrollDistance = containerHeight * 4;

            // Check if the container is pinned or about to be pinned
            // Use a larger threshold to start animation even before fully pinned
            const isPinned = containerRect.top <= 20; // Increased threshold for earlier start

            // Check if we've scrolled past the container (detect earlier)
            // Using 20% of container height as threshold to stop animation earlier
            const earlyStopThreshold = containerHeight * 0.2;
            const isAfterContainer = containerRect.bottom <= earlyStopThreshold;

            if (isPinned && !isAfterContainer) {
              // Container is pinned but not scrolled past
              // Calculate progress based on how much of the spacer we've scrolled through
              const spacerElement = document.getElementById('canvas-spacer');
              if (spacerElement) {
                const spacerRect = spacerElement.getBoundingClientRect();
                // Calculate how much of the spacer is above the viewport
                const spacerScrolled = -spacerRect.top;

                // Start animation immediately when pinned
                // Add a larger offset to ensure animation starts right away
                const startOffset = 200; // pixels - increased for immediate start
                const adjustedScrolled = spacerScrolled + startOffset;

                // Calculate progress as portion of spacer scrolled
                // Adjust the divisor to make progress reach 1 earlier (80% of max distance)
                const adjustedMaxDistance = maxScrollDistance * 0.8;
                progress = Math.min(Math.max(adjustedScrolled / adjustedMaxDistance, 0), 1);
              }
            } else if (!isPinned && containerRect.top > 0) {
              // Container is above the pinning point
              progress = 0;
            } else {
              // Container is scrolled past (no longer visible)
              progress = 1;
            }

            // Log for debugging
            console.log(`Container top: ${containerRect.top.toFixed(0)}, bottom: ${containerRect.bottom.toFixed(0)}, isPinned: ${isPinned}, isAfter: ${isAfterContainer}, Progress: ${progress.toFixed(2)}`);

            // Force progress to exactly 1 if we've scrolled past the container
            // or if we're close to the end of the animation
            if (isAfterContainer || progress > 0.9) {
              progress = 1;
            }

            // Detect scroll direction
            scrollDirection = scrollPosition > lastScrollY ? 'down' : 'up';
            lastScrollY = scrollPosition;

            // Store progress and direction for synchronization
            animationRef.current.progress = progress;
            animationRef.current.direction = scrollDirection;
            scrollProgress.set(progress);

            // Only enable controls at the very end when scrolling down
            // or at the very beginning when scrolling up
            if (scrollDirection === 'down') {
              setControlsEnabled(progress >= 0.99);
            } else {
              setControlsEnabled(progress <= 0.01);
            }

            // Reset camera position when scrolling back to top
            if (progress <= 0.01 && scrollDirection === 'up') {
              camera.position.set(0, 0, 10);
              camera.rotation.set(0, 0, 0);
            }
          } else {
            // Container not in view, reset to initial state
            if (scrollProgress.get() !== 0) {
              scrollProgress.set(0);
              animationRef.current.progress = 0;
              camera.position.set(0, 0, 10);
              camera.rotation.set(0, 0, 0);
              setControlsEnabled(false);
            }
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial call to set positions
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [camera, setControlsEnabled, airplaneRef, scrollProgress]);

  // We're now handling all animations directly in the useFrame function
  // This ensures better synchronization with the scroll position
  useEffect(() => {
    // Using the newer API to avoid deprecation warning
    const unsubscribe = scrollProgress.on('change', (progress) => {
      // Store the progress for use in the useFrame function
      // We'll apply the animations directly in useFrame for better control
      animationRef.current.progress = progress;
    });

    return () => unsubscribe();
  }, [scrollProgress]);

  // Apply all motion values to objects in a single frame update for perfect sync
  useFrame(() => {
    if (camera && airplaneRef.current) {
      const progress = animationRef.current.progress || 0;
      const direction = animationRef.current.direction || 'down';

      // Check if container is still in the document
      const containerElement = document.getElementById('canvas-container');
      if (!containerElement) return;

      // Get container's position relative to viewport
      const containerRect = containerElement.getBoundingClientRect();

      // Get container height for early detection
      const containerHeight = containerElement.offsetHeight;

      // Check if we've scrolled past the container (detect earlier)
      // Using 20% of container height as threshold to stop animation earlier
      const earlyStopThreshold = containerHeight * 0.2;
      const isAfterContainer = containerRect.bottom <= earlyStopThreshold;

      // Clamp progress to ensure animations stop at the end
      const clampedProgress = Math.min(Math.max(progress, 0), 1);

      // Check if the container is pinned or about to be pinned
      // Use a larger threshold to start animation even before fully pinned
      const isPinned = containerRect.top <= 20; // Increased threshold for earlier start

      // If we've scrolled past the container, fix at final state
      if (isAfterContainer) {
        // Fix camera at final position
        camera.position.z = 0;
        camera.position.y = 0;

        // Fix airplane at final position and rotation
        airplaneRef.current.rotation.x = 0.6;
        airplaneRef.current.position.x = 5;
        airplaneRef.current.position.y = position[1];
        return;
      }

      // If container is pinned, ensure animation has started
      if (isPinned && clampedProgress < 0.2) {
        // Boost progress to at least 20% when pinned to ensure animation starts immediately
        animationRef.current.progress = Math.max(clampedProgress, 0.2);
      }

      // Apply camera position from motion value, but respect the progress limits
      // At progress 0: camera.z = 10
      // At progress 1: camera.z = 0
      camera.position.z = 10 - (clampedProgress * 10);

      // Apply airplane position and rotation from motion values
      // At progress 0: rotation.x = 0
      // At progress 1: rotation.x = 0.6
      airplaneRef.current.rotation.x = clampedProgress * 0.6;

      // At progress 0: position.x = initial position
      // At progress 1: position.x = 5
      airplaneRef.current.position.x = position[0] + (clampedProgress * (5 - position[0]));

      // Only apply floating effect if not at the end
      if (clampedProgress < 1) {
        // Synchronized floating effect for both camera and airplane
        clockRef.current += 0.03;

        // Reduce floating effect when near the beginning or end of the scroll
        // This creates a smoother transition at the endpoints
        const floatAmplitude = 0.2 * (1 - Math.pow(Math.abs(clampedProgress - 0.5) * 2, 2));
        const floatValue = Math.sin(clockRef.current) * floatAmplitude;

        // Apply the same floating rhythm to both objects
        camera.position.y = floatValue;

        // Make sure airplane's Y position maintains its base position plus the float
        airplaneRef.current.position.y = position[1] + floatValue * 1.5;
      } else {
        // At the end, fix positions
        camera.position.y = 0;
        airplaneRef.current.position.y = position[1];
      }

      // Ensure camera rotation is reset when scrolling back to top
      if (progress <= 0.01 && direction === 'up') {
        camera.rotation.set(0, 0, 0);
        airplaneRef.current.rotation.set(0, Math.PI / 1, 0);
      }
    }
  });

  return null;
};

// HDRI Skybox removed

// Heading
const Heading = ({ headingRef }) => {
  const fontSize = window.innerWidth > 768 ? 1.5 : 1.2;

  return (
    <Text
      ref={headingRef}
      position={[0, 0, 2]}
      fontSize={fontSize}
      font="/fonts/GeneralSans-Medium.ttf"
      color="#101010"
      anchorX="center"
      anchorY="middle"
    >
      URGE MANAGEMENT
    </Text>
  );
};

// Main Component
export default function Model() {
  const { registerModel } = useModelLoading();
  const [controlsEnabled, setControlsEnabled] = useState(true);
  const airplaneRef = useRef();
  const headingRef = useRef();
  const containerRef = useRef();
  const [initialPosition] = useState([20, -3, -1]);

  // Initialize and handle pinning without creating a new Lenis instance
  useEffect(() => {
    // Register the 3D model for loading tracking
    registerModel();

    // Create a spacer element to maintain scroll height
    const spacerHeight = window.innerHeight * 4; // 400% of viewport height
    const spacer = document.createElement('div');
    spacer.style.height = `${spacerHeight}px`;
    spacer.style.position = 'relative';
    spacer.style.zIndex = '-1';
    spacer.id = 'canvas-spacer';

    // Add the spacer after the container
    if (containerRef.current && !document.getElementById('canvas-spacer')) {
      containerRef.current.parentNode.insertBefore(spacer, containerRef.current.nextSibling);
    }

    // Set up pinning
    if (containerRef.current) {
      containerRef.current.style.position = 'sticky';
      containerRef.current.style.top = '0';
      containerRef.current.style.zIndex = '10';
    }

    return () => {
      // Remove spacer on cleanup
      const spacerElement = document.getElementById('canvas-spacer');
      if (spacerElement) {
        spacerElement.parentNode.removeChild(spacerElement);
      }
    };
  }, [registerModel]);

  return (
    <div
      id="canvas-container"
      ref={containerRef}
      style={{
        height: '100vh',
        backgroundColor: '#BBBBBB',
        position: 'relative',
        zIndex: '1' // Lower z-index to prevent conflicts
      }}
    >
      <Canvas>
        <CameraAnimation
          setControlsEnabled={setControlsEnabled}
          airplaneRef={airplaneRef}
          position={initialPosition}
        />
        {controlsEnabled && <OrbitControls enableZoom={false} />}
        <directionalLight position={[16, 2, 0]} intensity={8} />
        <Airplane airplaneRef={airplaneRef} position={initialPosition} />
        <Heading headingRef={headingRef} />
      </Canvas>
    </div>
  );
}

// Preload model
useGLTF.preload('/models/low_poly_spitfire_airplane.glb');
