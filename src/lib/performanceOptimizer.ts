"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

// Performance monitoring and optimization
class PerformanceOptimizer {
  private static instance: PerformanceOptimizer;
  private prefetchedRoutes: Set<string> = new Set();
  private imageCache: Set<string> = new Set();

  static getInstance(): PerformanceOptimizer {
    if (!PerformanceOptimizer.instance) {
      PerformanceOptimizer.instance = new PerformanceOptimizer();
    }
    return PerformanceOptimizer.instance;
  }

  // Preload critical images for instant display
  preloadImages(imageUrls: string[]): void {
    imageUrls.forEach(url => {
      if (!this.imageCache.has(url)) {
        const img = new Image();
        img.src = url;
        this.imageCache.add(url);
      }
    });
  }

  // Prefetch routes for instant navigation
  prefetchRoute(route: string): void {
    if (typeof window === 'undefined' || this.prefetchedRoutes.has(route)) {
      return;
    }

    try {
      // Create a link element for prefetching
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
      
      this.prefetchedRoutes.add(route);
      
      // Remove after some time to prevent memory issues
      setTimeout(() => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      }, 30000);
    } catch (error) {
      console.warn('Failed to prefetch route:', route, error);
    }
  }

  // Instant navigation with optimistic UI
  instantNavigate(route: string, router: any, optimisticUpdate?: () => void): void {
    try {
      // Apply optimistic update immediately
      if (optimisticUpdate) {
        optimisticUpdate();
      }

      // Use requestAnimationFrame for smooth navigation
      requestAnimationFrame(() => {
        router.push(route);
      });
    } catch (error) {
      console.warn('Navigation failed, using fallback:', error);
      window.location.href = route;
    }
  }

  // Optimize element interactions
  optimizeInteraction(element: HTMLElement, callback: () => void): void {
    // Immediate visual feedback
    element.style.transform = 'scale(0.98)';
    element.style.transition = 'transform 0.1s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Execute callback immediately
    requestAnimationFrame(() => {
      callback();
      
      // Reset transform
      setTimeout(() => {
        element.style.transform = 'scale(1)';
      }, 100);
    });
  }
}

const optimizer = PerformanceOptimizer.getInstance();

// Hook for instant navigation
export function useInstantNavigation() {
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const navigate = useCallback((route: string, optimisticUpdate?: () => void) => {
    setIsNavigating(true);
    
    optimizer.instantNavigate(route, router, () => {
      if (optimisticUpdate) {
        optimisticUpdate();
      }
    });

    // Reset navigation state after a short delay
    setTimeout(() => setIsNavigating(false), 500);
  }, [router]);

  const prefetchRoute = useCallback((route: string) => {
    optimizer.prefetchRoute(route);
  }, []);

  const createOptimizedHandler = useCallback((route: string, optimisticUpdate?: () => void) => {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      const element = e.currentTarget as HTMLElement;
      optimizer.optimizeInteraction(element, () => {
        navigate(route, optimisticUpdate);
      });
    };
  }, [navigate]);

  return {
    navigate,
    prefetchRoute,
    createOptimizedHandler,
    isNavigating
  };
}

// Hook for preloading images
export function useImagePreloader(imageUrls: string[]) {
  useEffect(() => {
    optimizer.preloadImages(imageUrls);
  }, [imageUrls]);
}

// Hook for hover prefetching
export function useHoverPrefetch() {
  return useCallback((route: string) => {
    optimizer.prefetchRoute(route);
  }, []);
}

// Loading state management
export function useLoadingState() {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');

  const setLoading = useCallback((loading: boolean, message = 'Loading...') => {
    setIsLoading(loading);
    setLoadingMessage(message);
  }, []);

  return {
    isLoading,
    loadingMessage,
    setLoading
  };
}

export default optimizer;
