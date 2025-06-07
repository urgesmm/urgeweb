import React, { useState, useEffect } from 'react';

const LazyLoader = ({ isLoading, setIsLoading }) => {
  useEffect(() => {
    // Simulate loading time (you can remove this in production)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return isLoading ? (
    <div className="fixed inset-0 bg-black z-[2147483647] flex items-center justify-center">
      <div className="spinner" style={{ borderLeftColor: 'white' }}></div>
    </div>
  ) : null;
};

export default LazyLoader;
