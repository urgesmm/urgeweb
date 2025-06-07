import React, { createContext, useContext, useState, useRef } from 'react';

// Create context
const ModelLoadingContext = createContext({
  registerModel: () => {},
  modelLoaded: () => {},
  isLoading: false,
  resetLoading: () => {},
});

// Provider component
export const ModelLoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const pendingModelsRef = useRef(0);
  const loadedModelsRef = useRef(0);

  // Register a new 3D model that needs to load
  const registerModel = () => {
    pendingModelsRef.current += 1;
    setIsLoading(true);
    console.log(`Model registered. Pending: ${pendingModelsRef.current}`);
  };

  // Mark a model as loaded
  const modelLoaded = () => {
    loadedModelsRef.current += 1;
    console.log(`Model loaded. Loaded: ${loadedModelsRef.current}/${pendingModelsRef.current}`);
    
    // If all registered models are loaded, set loading to false
    if (loadedModelsRef.current >= pendingModelsRef.current && pendingModelsRef.current > 0) {
      setIsLoading(false);
    }
  };

  // Reset loading state (used when navigating away)
  const resetLoading = () => {
    pendingModelsRef.current = 0;
    loadedModelsRef.current = 0;
    setIsLoading(false);
    console.log('Model loading state reset');
  };

  return (
    <ModelLoadingContext.Provider value={{ registerModel, modelLoaded, isLoading, resetLoading }}>
      {children}
    </ModelLoadingContext.Provider>
  );
};

// Custom hook to use the context
export const useModelLoading = () => useContext(ModelLoadingContext);

export default ModelLoadingContext;
