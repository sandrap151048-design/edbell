/**
 * Animation Configuration
 * Centralized animation settings for the entire application
 */

export const animationConfig = {
  // Entrance Animations
  entrance: {
    fadeUp: {
      duration: 0.8,
      delay: 0,
      easing: 'ease-out',
    },
    fadeDown: {
      duration: 0.8,
      delay: 0,
      easing: 'ease-out',
    },
    fadeLeft: {
      duration: 0.8,
      delay: 0,
      easing: 'ease-out',
    },
    fadeRight: {
      duration: 0.8,
      delay: 0,
      easing: 'ease-out',
    },
  },

  // Slide Animations
  slide: {
    slideUp: {
      duration: 0.8,
      delay: 0,
      easing: 'ease-out',
    },
    slideDown: {
      duration: 0.8,
      delay: 0,
      easing: 'ease-out',
    },
    slideLeft: {
      duration: 0.8,
      delay: 0,
      easing: 'ease-out',
    },
    slideRight: {
      duration: 0.8,
      delay: 0,
      easing: 'ease-out',
    },
  },

  // Zoom Animations
  zoom: {
    zoomIn: {
      duration: 0.8,
      delay: 0,
      easing: 'ease-out',
    },
    zoomOut: {
      duration: 0.8,
      delay: 0,
      easing: 'ease-out',
    },
    zoomInUp: {
      duration: 0.8,
      delay: 0,
      easing: 'ease-out',
    },
    zoomInDown: {
      duration: 0.8,
      delay: 0,
      easing: 'ease-out',
    },
  },

  // Floating Animations
  floating: {
    floating: {
      duration: 3,
      delay: 0,
      easing: 'ease-in-out',
      infinite: true,
    },
    floatUpDown: {
      duration: 2.5,
      delay: 0,
      easing: 'ease-in-out',
      infinite: true,
    },
    pulse: {
      duration: 2,
      delay: 0,
      easing: 'ease-in-out',
      infinite: true,
    },
    bounce: {
      duration: 2,
      delay: 0,
      easing: 'ease-in-out',
      infinite: true,
    },
  },

  // Hover Animations
  hover: {
    grow: {
      duration: 0.3,
      easing: 'ease',
    },
    lift: {
      duration: 0.3,
      easing: 'ease',
    },
    glow: {
      duration: 0.3,
      easing: 'ease',
    },
    scale: {
      duration: 0.3,
      easing: 'ease',
    },
    rotate: {
      duration: 0.3,
      easing: 'ease',
    },
  },

  // Text Animations
  text: {
    typewriter: {
      duration: 3,
      delay: 0,
      easing: 'steps(40, end)',
    },
    textReveal: {
      duration: 0.8,
      delay: 0,
      easing: 'ease-out',
    },
    gradientShift: {
      duration: 3,
      delay: 0,
      easing: 'ease',
      infinite: true,
    },
    textSlideUp: {
      duration: 0.8,
      delay: 0,
      easing: 'ease-out',
    },
  },

  // Stagger Delays
  stagger: {
    small: 0.1,
    medium: 0.15,
    large: 0.2,
  },

  // Scroll Animation Thresholds
  scroll: {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: true,
  },
};

export type AnimationType = 
  | 'fade-up' 
  | 'fade-down' 
  | 'fade-left' 
  | 'fade-right'
  | 'slide-up' 
  | 'slide-down' 
  | 'slide-left' 
  | 'slide-right'
  | 'zoom-in' 
  | 'zoom-out' 
  | 'zoom-in-up' 
  | 'zoom-in-down'
  | 'floating' 
  | 'float-up-down' 
  | 'pulse' 
  | 'bounce'
  | 'typewriter' 
  | 'text-reveal' 
  | 'gradient-shift' 
  | 'text-slide-up';
