"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const GlobalPerformanceOptimizer: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    // Optimize all existing links for instant navigation
    const optimizeLinks = () => {
      // Only optimize regular links, not navigation buttons
      const links = document.querySelectorAll('a[href^="/"]:not(.nav-item):not(.mobile-nav-item)');

      links.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || link.hasAttribute('data-optimized')) return;

        link.setAttribute('data-optimized', 'true');

        // Add hover prefetching
        link.addEventListener('mouseenter', () => {
          if (href && !href.startsWith('#')) {
            const prefetchLink = document.createElement('link');
            prefetchLink.rel = 'prefetch';
            prefetchLink.href = href;
            document.head.appendChild(prefetchLink);

            // Remove after 30 seconds to prevent memory issues
            setTimeout(() => {
              if (document.head.contains(prefetchLink)) {
                document.head.removeChild(prefetchLink);
              }
            }, 30000);
          }
        }, { once: true });

        // Add click optimization only for non-navigation links
        link.addEventListener('click', (e) => {
          const target = e.target as HTMLElement;
          target.style.transform = 'scale(0.98)';
          target.style.transition = 'transform 0.1s ease';

          setTimeout(() => {
            target.style.transform = 'scale(1)';
          }, 100);
        });
      });
    };

    // Optimize on initial load and route changes
    const timer = setTimeout(optimizeLinks, 100);
    
    // Also optimize when new content is added
    const observer = new MutationObserver(() => {
      clearTimeout(timer);
      setTimeout(optimizeLinks, 100);
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    // Prefetch critical routes on app load
    const criticalRoutes = [
      '/categories',
      '/cart',
      '/wishlist',
      '/categories/vegetables-fruits',
      '/categories/dairy-bread-eggs',
      '/categories/snacks-beverages'
    ];

    criticalRoutes.forEach(route => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = route;
      document.head.appendChild(link);
    });
  }, []);

  useEffect(() => {
    // Performance monitoring and optimization
    if (typeof window !== 'undefined') {
      // Optimize images loading
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        if (!img.loading) {
          img.loading = 'lazy';
        }
      });

      // Add performance hints
      const meta = document.createElement('meta');
      meta.httpEquiv = 'x-dns-prefetch-control';
      meta.content = 'on';
      document.head.appendChild(meta);

      // DNS prefetch for external domains
      const domains = ['images.unsplash.com'];
      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'dns-prefetch';
        link.href = `//${domain}`;
        document.head.appendChild(link);
      });
    }
  }, []);

  return null;
};

export default GlobalPerformanceOptimizer;
