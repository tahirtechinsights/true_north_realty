"use client";

import React, { Suspense, useState } from 'react';
import Spline from '@splinetool/react-spline';
import Link from 'next/link';

export default function TestSplinePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    console.log('✅ Spline scene loaded successfully');
    setIsLoading(false);
  };

  const handleError = (error: unknown) => {
    console.error('❌ Spline scene failed to load:', error);
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Spline Animation Test</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Debug Information:</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Loading State:</strong> {isLoading ? '🔄 Loading...' : '✅ Loaded'}</p>
            <p><strong>Error State:</strong> {hasError ? '❌ Error' : '✅ No Error'}</p>
            <p><strong>Spline Package:</strong> ✅ Installed</p>
            <p><strong>Scene URL:</strong> https://prod.spline.design/hmqRXYHDh3bSkoKc/scene.splinecode</p>
          </div>
        </div>

        <div className="relative h-96 bg-gray-800 rounded-lg overflow-hidden">
          <Suspense fallback={
            <div className="w-full h-full bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-400 mx-auto mb-4"></div>
                <p>Loading Spline Scene...</p>
              </div>
            </div>
          }>
            {!hasError ? (
              <Spline 
                scene="https://prod.spline.design/hmqRXYHDh3bSkoKc/scene.splinecode"
                style={{
                  width: '100%',
                  height: '100%',
                }}
                onLoad={handleLoad}
                onError={handleError}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-900 via-blue-900 to-teal-900 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-red-400 mb-2">❌ Failed to load Spline scene</p>
                  <p className="text-sm text-gray-400">Check console for error details</p>
                </div>
              </div>
            )}
          </Suspense>
        </div>

        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Troubleshooting Steps:</h2>
          <ol className="list-decimal list-inside space-y-2 text-sm">
            <li>Open browser developer tools (F12)</li>
            <li>Check the Console tab for any error messages</li>
            <li>Check the Network tab to see if the Spline scene is loading</li>
            <li>Verify your internet connection</li>
            <li>Try refreshing the page</li>
          </ol>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" legacyBehavior>
            <a className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-6 rounded-full transition-colors">
              Back to Home
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
} 