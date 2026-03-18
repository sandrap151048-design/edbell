'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

interface AnalyticsProps {
  title?: string;
}

export default function Analytics({ title }: AnalyticsProps) {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view
    const trackPageView = async () => {
      try {
        // Don't track admin pages or API routes
        if (pathname.startsWith('/admin') || pathname.startsWith('/api')) {
          return;
        }

        const pageData = {
          page: pathname,
          title: title || document.title || pathname,
          userAgent: navigator.userAgent,
          referrer: document.referrer
        };

        await fetch('/api/analytics', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(pageData)
        });

      } catch (error) {
        // Silently fail - don't break the website if analytics fails
        console.debug('Analytics tracking failed:', error);
      }
    };

    // Track after a short delay to ensure the page is fully loaded
    const timer = setTimeout(trackPageView, 1000);

    return () => clearTimeout(timer);
  }, [pathname, title]);

  // This component doesn't render anything
  return null;
}

// Hook for manual page view tracking
export const useAnalytics = () => {
  const trackEvent = async (eventData: {
    page: string;
    title?: string;
    action?: string;
    category?: string;
  }) => {
    try {
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...eventData,
          userAgent: navigator.userAgent,
          referrer: document.referrer
        })
      });
    } catch (error) {
      console.debug('Analytics event tracking failed:', error);
    }
  };

  return { trackEvent };
};
