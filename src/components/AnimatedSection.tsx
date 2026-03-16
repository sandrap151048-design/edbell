'use client';

import { ReactNode } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom-in' | 'zoom-in-up' | 'zoom-in-down';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export default function AnimatedSection({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 0.8,
  className = '',
  threshold = 0.1,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  const animationMap: Record<string, string> = {
    'fade-up': 'animate-fade-up',
    'fade-down': 'animate-fade-down',
    'fade-left': 'animate-fade-left',
    'fade-right': 'animate-fade-right',
    'slide-up': 'animate-slide-up',
    'slide-down': 'animate-slide-down',
    'slide-left': 'animate-slide-left',
    'slide-right': 'animate-slide-right',
    'zoom-in': 'animate-zoom-in',
    'zoom-in-up': 'animate-zoom-in-up',
    'zoom-in-down': 'animate-zoom-in-down',
  };

  const delayClass = delay > 0 ? `animation-delay-${Math.round(delay * 1000)}` : '';
  const durationClass = `animation-duration-${Math.round(duration * 1000)}`;

  return (
    <div
      ref={ref}
      className={`${isVisible ? animationMap[animation] : 'opacity-0'} ${durationClass} ${delayClass} ${className}`}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      {children}
    </div>
  );
}
