"use client";

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import LoadingOverlay from './LoadingOverlay';

const PerformanceMonitor: React.FC = () => {
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Show loading on route change
    setIsNavigating(true);
    
    // Hide loading after a short delay to allow for instant navigation feel
    const timer = setTimeout(() => {
      setIsNavigating(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname]);

  // Also listen for browser back/forward navigation
  useEffect(() => {
    const handlePopState = () => {
      setIsNavigating(true);
      setTimeout(() => setIsNavigating(false), 200);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <LoadingOverlay 
      isVisible={isNavigating} 
      message="Loading..."
      type="minimal"
    />
  );
};

export default PerformanceMonitor;
