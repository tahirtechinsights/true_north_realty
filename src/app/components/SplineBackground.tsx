"use client";

import React, { Suspense, useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';

const SplineBackground = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    console.log('✅ Spline scene loaded successfully');
    setIsLoading(false);
  };

  const handleError = (error: any) => {
    console.error('❌ Spline scene failed to load:', error);
    setHasError(true);
    setIsLoading(false);
  };

  // Try multiple scene URLs as fallbacks
  const sceneUrls = [
    "https://prod.spline.design/hmqRXYHDh3bSkoKc/scene.splinecode", // Your custom scene
    "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode", // Original scene
    "https://prod.spline.design/your-scene-url/scene.splinecode", // Placeholder for your scene
  ];

  return (
    <div className="absolute inset-0 z-0">
      <Suspense fallback={
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 animate-pulse flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
            <p>Loading 3D Animation...</p>
          </div>
        </div>
      }>
        {!hasError ? (
          <Spline 
            scene={sceneUrls[0]}
            style={{
              width: '100%',
              height: '100%',
            }}
            onLoad={handleLoad}
            onError={handleError}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 flex items-center justify-center">
            <div className="text-white text-center">
              <p className="text-red-400 mb-2">Failed to load 3D animation</p>
              <p className="text-sm text-gray-400">Using fallback background</p>
              <button 
                onClick={() => window.location.reload()} 
                className="mt-4 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded"
              >
                Retry
              </button>
            </div>
          </div>
        )}
      </Suspense>
      
      {/* Loading indicator */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-white text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
            <p>Loading Spline Animation...</p>
          </div>
        </div>
      )}
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
    </div>
  );
};

export default SplineBackground; 