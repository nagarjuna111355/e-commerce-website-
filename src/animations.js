import { motion } from 'framer-motion';

// Page transition variants
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut'
    }
  },
  out: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn'
    }
  }
};

// Fade in up animation
export const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.48, 0.15, 0.25, 0.96]
    }
  }
};

// Stagger children animation
export const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Button hover animation
export const buttonHover = {
  scale: 1.05,
  boxShadow: '0 5px 15px rgba(0, 0, 0, 0.2)',
  transition: {
    type: 'spring',
    stiffness: 400,
    damping: 10
  }
};

// Button tap animation
export const buttonTap = {
  scale: 0.98,
  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)'
};

// Card hover animation
export const cardHover = {
  y: -5,
  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
  transition: {
    type: 'spring',
    stiffness: 300,
    damping: 15
  }
};

// Scale in animation
export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.48, 0.15, 0.25, 0.96]
    }
  }
};

// Rotate animation
export const rotate = {
  hidden: { rotate: -10, opacity: 0 },
  visible: {
    rotate: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut'
    }
  }
};

// Export motion component with default variants
export const MotionDiv = motion.div;
export const MotionH1 = motion.h1;
export const MotionP = motion.p;
export const MotionButton = motion.button;
export const MotionImg = motion.img;
