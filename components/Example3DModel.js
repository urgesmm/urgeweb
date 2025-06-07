import React, { useEffect, useRef } from 'react';
import ModelLoader from './ModelLoader';
import { useModelLoading } from '../contexts/ModelLoadingContext';

// Example 3D model component
const Example3DModel = () => {
  const containerRef = useRef(null);
  const { modelLoaded } = useModelLoading();
  
  useEffect(() => {
    // This is where you would initialize your 3D model
    // For example, with Three.js or any other 3D library
    
    // Simulate model loading with a timeout
    const loadingTimeout = setTimeout(() => {
      console.log('3D model finished loading');
      
      // Signal that the model is loaded
      if (window.handleModelLoaded) {
        window.handleModelLoaded();
      } else {
        modelLoaded(); // Fallback
      }
    }, 2000); // Simulate 2 second loading time
    
    return () => {
      clearTimeout(loadingTimeout);
    };
  }, [modelLoaded]);
  
  return (
    <ModelLoader>
      <div ref={containerRef} style={{ width: '100%', height: '500px' }}>
        {/* This is where your 3D model would render */}
        <div style={{ padding: '20px', background: '#f0f0f0' }}>
          3D Model Placeholder
        </div>
      </div>
    </ModelLoader>
  );
};

export default Example3DModel;
