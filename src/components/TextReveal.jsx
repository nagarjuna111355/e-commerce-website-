import React from 'react';
import { useTextReveal, useFadeSlide, useScaleReveal, useClipReveal } from '../hooks/useGSAP';
import './TextReveal.css';

/**
 * Split text into words for animation
 */
const splitTextIntoWords = (text) => {
  return text.split(' ').map((word, i) => (
    <span key={i} className="word">
      {word}{' '}
    </span>
  ));
};

/**
 * Split text into characters for animation
 */
const splitTextIntoChars = (text) => {
  return text.split('').map((char, i) => (
    <span key={i} className="char">
      {char}
    </span>
  ));
};

/**
 * Character-by-character reveal animation component
 */
export const CharReveal = ({ children, className = '', ...options }) => {
  const ref = useTextReveal(options);
  
  return (
    <div ref={ref} className={`text-reveal ${className}`}>
      {typeof children === 'string' ? splitTextIntoChars(children) : children}
    </div>
  );
};

/**
 * Word-by-word reveal animation component
 */
export const WordReveal = ({ children, className = '', ...options }) => {
  const ref = useTextReveal(options);
  
  return (
    <div ref={ref} className={`text-reveal ${className}`}>
      {typeof children === 'string' ? splitTextIntoWords(children) : children}
    </div>
  );
};

/**
 * Fade and slide reveal animation component
 */
export const FadeSlide = ({ children, className = '', ...options }) => {
  const ref = useFadeSlide(options);
  
  return (
    <div ref={ref} className={`fade-slide ${className}`}>
      {children}
    </div>
  );
};

/**
 * Scale reveal animation component
 */
export const ScaleReveal = ({ children, className = '', ...options }) => {
  const ref = useScaleReveal(options);
  
  return (
    <div ref={ref} className={`scale-reveal ${className}`}>
      {children}
    </div>
  );
};

/**
 * Clip path reveal animation component
 */
export const ClipReveal = ({ children, className = '', ...options }) => {
  const ref = useClipReveal(options);
  
  return (
    <div ref={ref} className={`clip-reveal ${className}`}>
      {children}
    </div>
  );
};

/**
 * Advanced text reveal with multiple effects
 */
export const AdvancedTextReveal = ({ 
  children, 
  type = 'word', 
  className = '',
  ...options 
}) => {
  const ref = useTextReveal(options);
  
  const renderContent = () => {
    if (typeof children !== 'string') return children;
    
    switch (type) {
      case 'char':
        return splitTextIntoChars(children);
      case 'word':
        return splitTextIntoWords(children);
      default:
        return children;
    }
  };
  
  return (
    <div ref={ref} className={`advanced-text-reveal ${className}`}>
      {renderContent()}
    </div>
  );
};

export default {
  CharReveal,
  WordReveal,
  FadeSlide,
  ScaleReveal,
  ClipReveal,
  AdvancedTextReveal,
};
