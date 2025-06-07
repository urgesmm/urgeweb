import React, { useEffect } from 'react';
import { useModelLoading } from '../contexts/ModelLoadingContext';

// Component to wrap 3D models and handle loading state
const ModelLoader = ({ children, onLoad }) => {
  const { registerModel, modelLoaded } = useModelLoading();

  useEffect(() => {
    // Register this model when component mounts
    registerModel();
    
    // Function to call when model is loaded
    const handleModelLoaded = () => {
      console.log('3D model loaded');
      modelLoaded();
      if (onLoad) onLoad();
    };

    // Store the handler for child components to use
    window.handleModelLoaded = handleModelLoaded;

    return () => {
      // Clean up
      delete window.handleModelLoaded;
    };
  }, [registerModel, modelLoaded, onLoad]);

  return <>{children}</>;
};

export default ModelLoader;
