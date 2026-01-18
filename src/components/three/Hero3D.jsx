import { Suspense, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF, Text, Float } from '@react-three/drei';
import * as THREE from 'three';

// Floating 3D Text Component
const FloatingText = ({ children, position = [0, 0, 0], fontSize = 0.5, color = 'white' }) => {
  const textRef = useRef();
  
  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <Text
      ref={textRef}
      position={position}
      fontSize={fontSize}
      color={color}
      maxWidth={2}
      lineHeight={1}
      letterSpacing={0.02}
      textAlign="center"
      font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
      anchorX="center"
      anchorY="middle"
    >
      {children}
    </Text>
  );
};

// Interactive 3D Product Showcase
const ProductShowcase = ({ modelPath, position = [0, 0, 0], scale = 1 }) => {
  const group = useRef();
  const { scene } = useGLTF(modelPath);
  
  useFrame(({ clock, mouse }) => {
    if (group.current) {
      // Subtle rotation based on time
      group.current.rotation.y = clock.getElapsedTime() * 0.2;
      
      // Slight movement based on mouse position
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        mouse.y * 0.1,
        0.05
      );
      group.current.rotation.z = THREE.MathUtils.lerp(
        group.current.rotation.z,
        mouse.x * 0.1,
        0.05
      );
    }
  });

  return (
    <group position={position} dispose={null}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <primitive 
          object={scene} 
          scale={scale}
          ref={group}
        />
      </Float>
    </group>
  );
};

// Particle Background
const ParticleBackground = ({ count = 2000 }) => {
  const particlesRef = useRef();
  const { viewport } = useThree();
  
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    // Position
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * viewport.width * 2;
    positions[i3 + 1] = (Math.random() - 0.5) * viewport.height * 2;
    positions[i3 + 2] = (Math.random() - 0.5) * 1000;
    
    // Color
    colors[i3] = 0.1 + Math.random() * 0.2;     // R
    colors[i3 + 1] = 0.3 + Math.random() * 0.3; // G
    colors[i3 + 2] = 0.8 + Math.random() * 0.2; // B
  }
  
  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = clock.getElapsedTime() * 0.01;
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.8}
      />
    </points>
  );
};

// Main Hero3D Component
const Hero3D = ({ title, subtitle, ctaText, onCtaClick, modelPath }) => {
  return (
    <div className="relative w-full h-screen">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 10], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        className="absolute top-0 left-0 z-0"
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          <ParticleBackground />
          {modelPath && (
            <ProductShowcase 
              modelPath={modelPath} 
              position={[0, -1, 0]}
              scale={0.8}
            />
          )}
          <FloatingText position={[0, 2, 0]} fontSize={0.8}>
            {title}
          </FloatingText>
          <FloatingText position={[0, 1, 0]} fontSize={0.3}>
            {subtitle}
          </FloatingText>
        </Suspense>
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
      
      <div className="absolute bottom-10 left-0 right-0 z-10 text-center">
        <button
          onClick={onCtaClick}
          className="px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
};

export default Hero3D;
