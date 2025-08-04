// Navigation Optimizer for instant responses
"use client";

import React from 'react';

export class NavigationOptimizer {
  private static instance: NavigationOptimizer;
  private preloadedRoutes: Set<string> = new Set();
  private router: any;

  private constructor() {
    this.setupPreloading();
  }

  static getInstance(): NavigationOptimizer {
    if (!NavigationOptimizer.instance) {
      NavigationOptimizer.instance = new NavigationOptimizer();
    }
    return NavigationOptimizer.instance;
  }

  setRouter(router: any) {
    this.router = router;
  }

  // Preload critical routes
  private setupPreloading() {
    // Disable automatic preloading to prevent fetch errors
    // Routes will be preloaded on-demand when hovered or clicked
    if (typeof window !== 'undefined') {
      console.log('Navigation optimizer initialized');
    }
  }

  // Preload a specific route
  preloadRoute(href: string) {
    if (this.preloadedRoutes.has(href)) return;

    // Disable prefetching to prevent fetch errors in the current environment
    // Can be re-enabled later when server configuration is stable
    if (false && this.router && this.router.prefetch) {
      try {
        this.router.prefetch(href);
        this.preloadedRoutes.add(href);
      } catch (error) {
        console.warn('Failed to prefetch route:', href, error);
      }
    }
  }

  // Instant navigation with optimistic updates
  navigateInstant(href: string, optimisticUpdate?: () => void) {
    try {
      // Run optimistic update immediately
      if (optimisticUpdate) {
        optimisticUpdate();
      }

      // Use window.location for more reliable navigation during development
      if (typeof window !== 'undefined') {
        window.location.href = href;
      }
    } catch (error) {
      console.warn('Navigation failed:', href, error);
      // Ultimate fallback
      if (typeof window !== 'undefined') {
        window.location.href = href;
      }
    }
  }

  // Optimize click handlers for instant feedback
  optimizeClickHandler(handler: () => void) {
    return (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Immediate visual feedback
      const target = e.currentTarget as HTMLElement;
      this.addClickFeedback(target);
      
      // Execute handler immediately
      handler();
    };
  }

  // Add instant visual feedback
  private addClickFeedback(element: HTMLElement) {
    element.style.transform = 'scale(0.98)';
    element.style.transition = 'transform 0.1s ease';
    
    setTimeout(() => {
      element.style.transform = 'scale(1)';
    }, 100);
  }

  // Debounce search for better performance
  debounceSearch(callback: (query: string) => void, delay: number = 300) {
    let timeoutId: NodeJS.Timeout;
    
    return (query: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => callback(query), delay);
    };
  }

  // Optimize image loading
  optimizeImages() {
    if (typeof window !== 'undefined') {
      // Use intersection observer for lazy loading
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.remove('lazy');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      // Observe all lazy images
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Cache frequently accessed data
  private cache = new Map<string, { data: any; timestamp: number }>();
  private CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  setCache(key: string, data: any) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  getCache(key: string): any | null {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const isExpired = Date.now() - cached.timestamp > this.CACHE_DURATION;
    if (isExpired) {
      this.cache.delete(key);
      return null;
    }

    return cached.data;
  }

  // Optimize state updates
  batchStateUpdates(updates: (() => void)[]) {
    if ('requestAnimationFrame' in window) {
      requestAnimationFrame(() => {
        updates.forEach(update => update());
      });
    } else {
      updates.forEach(update => update());
    }
  }
}

// Export singleton instance
export const navigationOptimizer = NavigationOptimizer.getInstance();

// Hook for using navigation optimizer
export function useInstantNavigation() {
  const [router, setRouter] = React.useState<any>(null);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      import('next/navigation').then(({ useRouter }) => {
        try {
          const routerInstance = useRouter();
          setRouter(routerInstance);
          navigationOptimizer.setRouter(routerInstance);
        } catch (error) {
          console.warn('Router not available, using fallback navigation');
        }
      }).catch(() => {
        console.warn('Failed to load router, using fallback navigation');
      });
    }
  }, []);

  return {
    navigateInstant: navigationOptimizer.navigateInstant.bind(navigationOptimizer),
    preloadRoute: navigationOptimizer.preloadRoute.bind(navigationOptimizer),
    optimizeClick: navigationOptimizer.optimizeClickHandler.bind(navigationOptimizer)
  };
}

// Export as default
export default navigationOptimizer;
