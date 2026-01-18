import React, { useRef, useState, useCallback, useEffect } from 'react';
import styled, { keyframes, css, ThemeProvider } from 'styled-components';
import { createGlobalStyle } from 'styled-components';

// Global style to ensure proper rendering
const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
`;

// Default theme
const defaultTheme = {
  colors: {
    primary: '#6e8efb',
    secondary: '#a777e3',
    text: '#333',
    background: '#f5f7fa',
    cardBg: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
  },
  shadows: {
    card: '0 10px 30px rgba(0, 0, 0, 0.1)',
    button: '0 4px 15px rgba(110, 142, 251, 0.3)',
  },
};

// Animation keyframes for the shadow
const shadowAnimation = keyframes`
  0% { transform: translateX(0) translateY(0) scale(1); }
  100% { transform: translateX(var(--tx)) translateY(var(--ty)) scale(var(--scale)); }
`;

// Styled components
const TiltCardWrapper = styled.div`
  perspective: 1500px;
  width: 300px;
  height: 400px;
  margin: 2rem;
  cursor: pointer;
`;

const TiltCardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.1s ease-out;
  transform-style: preserve-3d;
  will-change: transform;
  transform: ${({ rotateX, rotateY, translateZ }) => 
    `perspective(1000px) 
     rotateX(${rotateX}deg) 
     rotateY(${rotateY}deg) 
     translateZ(${translateZ}px)`};
`;

const TiltCardFace = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: #333;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 20px;
    padding: 1px;
    background: linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1));
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
`;

const TiltCardShadow = styled.div`
  position: absolute;
  width: 90%;
  height: 40px;
  bottom: -20px;
  left: 5%;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.1);
  filter: blur(10px);
  transform-origin: center;
  animation: ${({ shadowX, shadowY, isHovered }) => 
    isHovered ? 
    css`${shadowAnimation} 0.1s ease-out forwards` : 
    'none'};
  --tx: ${({ shadowX }) => shadowX * 10}px;
  --ty: ${({ shadowY }) => shadowY * 10}px;
  --scale: ${({ isHovered }) => isHovered ? 0.9 : 1};
  opacity: ${({ isHovered }) => isHovered ? 0.2 : 0.1};
  transition: opacity 0.3s ease;
`;

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('TiltCard Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '1rem', 
          background: '#ffebee', 
          color: '#c62828',
          borderRadius: '8px',
          border: '1px solid #ef9a9a',
          margin: '1rem'
        }}>
          <h3>Something went wrong with the TiltCard component.</h3>
          <p>{this.state.error?.message || 'Unknown error'}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main TiltCard Component
const TiltCard = ({ children, style }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [shadowPos, setShadowPos] = useState({ x: 0, y: 0 });
  const [hasError, setHasError] = useState(false);
  
  // Calculate rotation based on mouse position
  const handleMouseMove = useCallback((e) => {
    try {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;
      
      setRotation({ x: rotateX, y: rotateY });
      
      // Calculate shadow position based on tilt
      const shadowX = (x - centerX) / centerX;
      const shadowY = (y - centerY) / centerY;
      setShadowPos({ x: shadowX, y: shadowY });
    } catch (error) {
      console.error('Error in handleMouseMove:', error);
      setHasError(true);
    }
  }, []);

  // Reset rotation on mouse leave
  const handleMouseLeave = useCallback(() => {
    try {
      setRotation({ x: 0, y: 0 });
      setShadowPos({ x: 0, y: 0 });
      setIsHovered(false);
    } catch (error) {
      console.error('Error in handleMouseLeave:', error);
      setHasError(true);
    }
  }, []);

  // Check if device supports hover
  useEffect(() => {
    try {
      const hasHover = window.matchMedia('(hover: hover)').matches;
      if (!hasHover && cardRef.current) {
        cardRef.current.style.perspective = 'none';
      }
    } catch (error) {
      console.error('Error in hover detection:', error);
      setHasError(true);
    }
  }, []);

  if (hasError) {
    return (
      <div style={{ 
        padding: '1rem', 
        background: '#ffebee', 
        color: '#c62828',
        borderRadius: '8px',
        border: '1px solid #ef9a9a',
        margin: '1rem',
        ...style
      }}>
        Error rendering TiltCard
      </div>
    );
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <ErrorBoundary>
        <TiltCardWrapper
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          ref={cardRef}
          style={style}
        >
          <TiltCardInner
            rotateX={rotation.x}
            rotateY={rotation.y}
            translateZ={isHovered ? 20 : 0}
          >
            <TiltCardFace>
              {children}
            </TiltCardFace>
          </TiltCardInner>
          <TiltCardShadow 
            shadowX={shadowPos.x} 
            shadowY={shadowPos.y}
            isHovered={isHovered}
          />
        </TiltCardWrapper>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

// Add display name for better debugging
TiltCard.displayName = 'TiltCard';

export default TiltCard;
