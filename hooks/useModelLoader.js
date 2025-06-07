import { useEffect } from 'react';
import { useModelLoading } from '../contexts/ModelLoadingContext';

// Hook to handle 3D model loading
const useModelLoader = () => {
  const { registerModel, modelLoaded } = useModelLoading();

  useEffect(() => {
    // Register this component as having a 3D model to load
    registerModel();

    // Return cleanup function
    return () => {
      // Nothing to clean up here
    };
  }, [registerModel]);

  // Return the function to call when the model is loaded
  return modelLoaded;
};

export default useModelLoader;
