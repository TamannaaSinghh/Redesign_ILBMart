"use client";

import { useRouter } from 'next/navigation';

/**
 * Simple navigation hook that avoids fetch errors
 */
export function useSimpleNavigation() {
  const router = useRouter();

  const navigate = (href: string) => {
    try {
      router.push(href);
    } catch (error) {
      console.warn('Router navigation failed, using window.location:', error);
      window.location.href = href;
    }
  };

  const navigateWithFeedback = (href: string, element?: HTMLElement) => {
    // Add visual feedback if element is provided
    if (element) {
      element.style.transform = 'scale(0.98)';
      element.style.transition = 'transform 0.1s ease';
      
      setTimeout(() => {
        element.style.transform = 'scale(1)';
      }, 100);
    }

    // Navigate after a brief delay to allow visual feedback
    setTimeout(() => {
      navigate(href);
    }, 50);
  };

  return {
    navigate,
    navigateWithFeedback
  };
}

/**
 * Create optimized click handler with visual feedback
 */
export function createOptimizedClickHandler(
  href: string,
  router: ReturnType<typeof useRouter>
) {
  return (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add instant visual feedback
    const target = e.currentTarget as HTMLElement;
    target.style.transform = 'scale(0.98)';
    target.style.transition = 'transform 0.1s ease';
    
    setTimeout(() => {
      target.style.transform = 'scale(1)';
    }, 100);

    // Navigate
    try {
      router.push(href);
    } catch (error) {
      console.warn('Router navigation failed, using window.location:', error);
      window.location.href = href;
    }
  };
}
