'use client';
import { Canvas } from '@react-three/fiber';
import { useRef, useState, useEffect } from 'react';
import { useMotionValue, useTransform, useScroll } from 'framer-motion';
import { motion } from 'framer-motion-3d';
import { useTexture } from '@react-three/drei';

function MeshComponent({ scrollYProgress, scale }) {
    const [color, normal, aoMap] = useTexture([
        '/assets/color.jpg',
        '/assets/normal.png',
        '/assets/occlusion.jpg'
    ]);

    return (
        <motion.mesh
            scale={scale} // Dynamic scale based on screen size
            rotation-y={scrollYProgress} 
        >
            <sphereGeometry args={[1, 150, 150]} />
            <meshStandardMaterial 
                map={color} 
                normalMap={normal} 
                aoMap={aoMap} 
            />
        </motion.mesh>
    );
}

export default function Earth() {
    const sceneRef = useRef(null);
    const [scale, setScale] = useState([1.6, 1.6, 1.6]); // Default scale for larger screens

    useEffect(() => {
        const handleResize = () => {
            // Adjust scale based on window width
            if (window.innerWidth < 768) {
                setScale([1, 1, 1]); // Smaller scale for small screens
            } else {
                setScale([1.5, 1.5, 1.5]); // Larger scale for bigger screens
            }
        };

        handleResize(); // Set initial scale
        window.addEventListener('resize', handleResize); // Update scale on resize
        return () => window.removeEventListener('resize', handleResize); // Clean up
    }, []);

    const { scrollYProgress } = useScroll({
        target: sceneRef,
        offset: ['start end', 'end start']
    });

    const rotationY = useTransform(scrollYProgress, [0, 1], [0, Math.PI * 2]);

    return (
        <div 
            ref={sceneRef} 
            style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <Canvas 
                style={{ width: '100%', height: '100%' }}
                camera={{ fov: 45, position: [0, 0, 5] }}
            >
                <ambientLight intensity={0.2} />
                <directionalLight intensity={8.5} position={[1, 0, 0.4]} />
                <MeshComponent scrollYProgress={rotationY} scale={scale} />
            </Canvas>
        </div>
    );
}
