"use client";

import { useEffect } from 'react';

const criticalImages = [
  // Category images
  "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1559656914-a30970c1affd?w=300&h=300&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=300&h=300&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=300&h=300&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=300&h=300&fit=crop&crop=center",
  
  // Product images
  "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=300&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=300&h=300&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=300&h=300&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=300&h=300&fit=crop&crop=center",
  "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=300&fit=crop&crop=center"
];

const ImagePreloader: React.FC = () => {
  useEffect(() => {
    // Preload critical images with high priority
    const preloadImages = async () => {
      const imagePromises = criticalImages.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = reject;
          img.src = src;
          // Add to document head for browser caching
          const link = document.createElement('link');
          link.rel = 'preload';
          link.as = 'image';
          link.href = src;
          document.head.appendChild(link);
        });
      });

      try {
        await Promise.all(imagePromises);
        console.log('Critical images preloaded successfully');
      } catch (error) {
        console.warn('Some images failed to preload:', error);
      }
    };

    // Start preloading after a short delay to not block initial render
    const timer = setTimeout(preloadImages, 100);
    return () => clearTimeout(timer);
  }, []);

  return null; // This component doesn't render anything
};

export default ImagePreloader;
