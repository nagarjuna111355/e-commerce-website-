import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * Custom hook for GSAP scroll-based animations
 * @param {Function} animation - Animation callback function
 * @param {Array} dependencies - Dependency array for useEffect
 */
export const useGSAPScroll = (animation, dependencies = []) => {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      animation(element);
    }, element);

    return () => ctx.revert();
  }, dependencies);

  return ref;
};

/**
 * Hook for text reveal animation with scroll trigger
 * @param {Object} options - Animation options
 */
export const useTextReveal = (options = {}) => {
  const {
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
    markers = false,
    stagger = 0.05,
    duration = 0.8,
    ease = 'power3.out',
  } = options;

  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      // Split text into words and characters
      const words = element.querySelectorAll('.word');
      const chars = element.querySelectorAll('.char');

      if (chars.length > 0) {
        // Character-by-character reveal
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 50,
            rotateX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration,
            ease,
            stagger,
            scrollTrigger: {
              trigger: element,
              start,
              end,
              scrub,
              markers,
            },
          }
        );
      } else if (words.length > 0) {
        // Word-by-word reveal
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 30,
          },
          {
            opacity: 1,
            y: 0,
            duration,
            ease,
            stagger,
            scrollTrigger: {
              trigger: element,
              start,
              end,
              scrub,
              markers,
            },
          }
        );
      } else {
        // Simple element reveal
        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration,
            ease,
            scrollTrigger: {
              trigger: element,
              start,
              end,
              scrub,
              markers,
            },
          }
        );
      }
    }, element);

    return () => ctx.revert();
  }, [start, end, scrub, markers, stagger, duration, ease]);

  return ref;
};

/**
 * Hook for fade and slide reveal animation
 */
export const useFadeSlide = (options = {}) => {
  const {
    start = 'top 80%',
    direction = 'up',
    distance = 100,
    duration = 1,
    ease = 'power3.out',
    stagger = 0.2,
  } = options;

  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const directions = {
      up: { y: distance },
      down: { y: -distance },
      left: { x: distance },
      right: { x: -distance },
    };

    const ctx = gsap.context(() => {
      const children = element.children;
      
      if (children.length > 0) {
        gsap.fromTo(
          children,
          {
            opacity: 0,
            ...directions[direction],
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration,
            ease,
            stagger,
            scrollTrigger: {
              trigger: element,
              start,
            },
          }
        );
      } else {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            ...directions[direction],
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration,
            ease,
            scrollTrigger: {
              trigger: element,
              start,
            },
          }
        );
      }
    }, element);

    return () => ctx.revert();
  }, [start, direction, distance, duration, ease, stagger]);

  return ref;
};

/**
 * Hook for scale reveal animation
 */
export const useScaleReveal = (options = {}) => {
  const {
    start = 'top 80%',
    scale = 0.5,
    duration = 1,
    ease = 'back.out(1.7)',
    stagger = 0.15,
  } = options;

  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const children = element.children;
      
      if (children.length > 0) {
        gsap.fromTo(
          children,
          {
            opacity: 0,
            scale,
          },
          {
            opacity: 1,
            scale: 1,
            duration,
            ease,
            stagger,
            scrollTrigger: {
              trigger: element,
              start,
            },
          }
        );
      } else {
        gsap.fromTo(
          element,
          {
            opacity: 0,
            scale,
          },
          {
            opacity: 1,
            scale: 1,
            duration,
            ease,
            scrollTrigger: {
              trigger: element,
              start,
            },
          }
        );
      }
    }, element);

    return () => ctx.revert();
  }, [start, scale, duration, ease, stagger]);

  return ref;
};

/**
 * Hook for clip path reveal animation
 */
export const useClipReveal = (options = {}) => {
  const {
    start = 'top 80%',
    direction = 'left',
    duration = 1.2,
    ease = 'power4.inOut',
  } = options;

  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const clipPaths = {
      left: {
        from: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      },
      right: {
        from: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
        to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      },
      top: {
        from: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      },
      bottom: {
        from: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        to: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      },
    };

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        {
          clipPath: clipPaths[direction].from,
        },
        {
          clipPath: clipPaths[direction].to,
          duration,
          ease,
          scrollTrigger: {
            trigger: element,
            start,
          },
        }
      );
    }, element);

    return () => ctx.revert();
  }, [start, direction, duration, ease]);

  return ref;
};

export default useGSAPScroll;
