import React, { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  ContactShadows, 
  Float,
  MeshDistortMaterial,
  Sparkles,
  Stars,
  Html
} from '@react-three/drei';
import * as THREE from 'three';
import './ThreeDShowcase.css';

// Loading Component
const Loader = () => (
  <Html center>
    <div className="loader-container">
      <div className="loader-spinner"></div>
      <p className="loader-text">Loading 3D Experience...</p>
    </div>
  </Html>
);

// Interactive 3D Product Box with Hover Effects
const ProductBox = ({ position, color, onClick, label }) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.005;
      
      // Pulsing effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.scale.x = hovered ? scale * 1.2 : scale;
      meshRef.current.scale.y = hovered ? scale * 1.2 : scale;
      meshRef.current.scale.z = hovered ? scale * 1.2 : scale;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onClick={(e) => {
          e.stopPropagation();
          setClicked(!clicked);
          onClick && onClick(label);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        castShadow
      >
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <MeshDistortMaterial
          color={hovered ? '#ff6b9d' : color}
          attach="material"
          distort={hovered ? 0.5 : 0.3}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {hovered && (
        <Html position={[0, 2, 0]} center>
          <div className="product-label">{label}</div>
        </Html>
      )}
    </Float>
  );
};

// Animated Torus with standard material
const AnimatedTorus = ({ position, color }) => {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * 0.3;
      meshRef.current.rotation.y = clock.elapsedTime * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow>
      <torusKnotGeometry args={[1, 0.3, 128, 32]} />
      <meshStandardMaterial
        color={color}
        roughness={0.1}
        metalness={0.9}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
};

// Sphere with Distortion
const DistortedSphere = ({ position, color }) => {
  const meshRef = useRef();
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={position} castShadow>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0}
          metalness={1}
        />
      </mesh>
    </Float>
  );
};

// Interactive Particle Ring
const ParticleRing = () => {
  const particlesRef = useRef();
  const count = 500;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const radius = 8 + Math.random() * 2;
    
    positions[i * 3] = Math.cos(angle) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2;
    positions[i * 3 + 2] = Math.sin(angle) * radius;

    // Gradient colors
    colors[i * 3] = Math.random() * 0.5 + 0.5;
    colors[i * 3 + 1] = Math.random() * 0.5 + 0.5;
    colors[i * 3 + 2] = 1;
  }

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = clock.elapsedTime * 0.1;
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
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// 3D Text Logo - Simplified version
const Logo3D = () => {
  return null; // Disabled for now - font loading can cause issues
};

// Main 3D Scene
const Scene3D = ({ onProductClick }) => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b9d" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#4cc9f0" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={1}
        castShadow
        color="#ffffff"
      />

      {/* Environment & Background */}
      <Environment preset="sunset" />
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <Sparkles count={100} scale={10} size={3} speed={0.3} />

      {/* 3D Products */}
      <ProductBox 
        position={[-3, 0, 0]} 
        color="#667eea" 
        label="Electronics"
        onClick={onProductClick}
      />
      <ProductBox 
        position={[0, 0, 0]} 
        color="#f093fb" 
        label="Fashion"
        onClick={onProductClick}
      />
      <ProductBox 
        position={[3, 0, 0]} 
        color="#4facfe" 
        label="Accessories"
        onClick={onProductClick}
      />

      {/* Geometric Shapes */}
      <AnimatedTorus position={[-5, -2, -3]} color="#43e97b" />
      <AnimatedTorus position={[5, 2, -3]} color="#fa709a" />
      <DistortedSphere position={[0, -3, -2]} color="#ffd89b" />
      <DistortedSphere position={[-4, 2, -5]} color="#19d3f3" />

      {/* Particle Effects */}
      <ParticleRing />

      {/* 3D Logo - Optional, uncomment if you have the font file */}
      {/* <Logo3D /> */}

      {/* Ground */}
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.5}
        scale={30}
        blur={2}
        far={10}
      />

      {/* Camera Controls */}
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        maxDistance={20}
        minDistance={5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={0}
        autoRotate={true}
        autoRotateSpeed={0.5}
      />
    </>
  );
};

const ThreeDShowcase = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showInfo, setShowInfo] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading complete
    const timer = setTimeout(() => setIsLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleProductClick = (productName) => {
    setSelectedProduct(productName);
    setTimeout(() => setSelectedProduct(null), 3000);
  };

  return (
    <div className="threejs-showcase">
      {/* Loading Indicator */}
      {!isLoaded && (
        <div className="loading-screen">
          <div className="loader-spinner"></div>
          <p className="loader-text">Loading 3D Experience...</p>
        </div>
      )}

      {/* Info Overlay */}
      {showInfo && isLoaded && (
        <div className="info-overlay" role="dialog" aria-labelledby="showcase-title" aria-describedby="showcase-description">
          <button 
            className="close-btn" 
            onClick={() => setShowInfo(false)}
            aria-label="Close information panel"
            title="Close"
          >
            ✕
          </button>
          <h2 id="showcase-title">🎨 Interactive 3D Showcase</h2>
          <p id="showcase-description">🖱️ <strong>Drag</strong> to rotate • <strong>Scroll</strong> to zoom • <strong>Click</strong> products to interact</p>
          <div className="features">
            <span className="feature-badge">🌟 Dynamic Lighting</span>
            <span className="feature-badge">✨ Particle Effects</span>
            <span className="feature-badge">🎯 Interactive Objects</span>
            <span className="feature-badge">🌈 Material Effects</span>
          </div>
        </div>
      )}

      {/* Product Selection Notification */}
      {selectedProduct && (
        <div className="product-notification">
          <h3>🎉 {selectedProduct} Selected!</h3>
          <p>Explore our premium {selectedProduct.toLowerCase()} collection</p>
        </div>
      )}

      {/* Toggle Info Button */}
      {!showInfo && (
        <button 
          className="info-toggle-btn" 
          onClick={() => setShowInfo(true)}
          aria-label="Show information panel"
          title="Show Info"
        >
          ℹ️ Info
        </button>
      )}

      {/* 3D Canvas */}
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 2, 10], fov: 50 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          powerPreference: 'high-performance'
        }}
        aria-label="Interactive 3D product showcase"
        role="img"
      >
        <Suspense fallback={<Loader />}>
          <Scene3D onProductClick={handleProductClick} />
        </Suspense>
      </Canvas>

      {/* Controls Info */}
      <div className="controls-info" role="status" aria-live="polite" aria-label="3D controls guide">
        <div className="control-item">
          <span className="control-icon" aria-hidden="true">🖱️</span>
          <span>Drag to Rotate</span>
        </div>
        <div className="control-item">
          <span className="control-icon" aria-hidden="true">🔍</span>
          <span>Scroll to Zoom</span>
        </div>
        <div className="control-item">
          <span className="control-icon" aria-hidden="true">👆</span>
          <span>Click Objects</span>
        </div>
      </div>
    </div>
  );
};

export default ThreeDShowcase;