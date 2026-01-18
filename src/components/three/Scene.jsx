import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three';
import * as THREE from 'three';

// Abstract Geometry Component
const AbstractGeometry = ({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = 'hotpink' }) => {
  const mesh = useRef();
  const [hovered, setHover] = useState(false);
  
  // Animate on hover
  const { scale: hoverScale } = useSpring({
    scale: hovered ? 1.2 : 1,
    config: { mass: 2, tension: 1000, friction: 10 }
  });

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.005;
      mesh.current.rotation.y += 0.01;
    }
  });

  return (
    <a.mesh
      ref={mesh}
      position={position}
      rotation={rotation}
      scale={hoverScale}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      castShadow
      receiveShadow
    >
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.2} 
        metalness={0.8}
        envMapIntensity={2}
      />
    </a.mesh>
  );
};

// 3D Product Model Component
const ProductModel = ({ modelPath, position = [0, 0, 0], scale = 1 }) => {
  const group = useRef();
  const { scene } = useGLTF(modelPath);
  
  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.005;
    }
  });

  return (
    <group position={position} dispose={null}>
      <primitive 
        object={scene} 
        scale={scale}
        ref={group}
      />
    </group>
  );
};

// Interactive Background
const BackgroundParticles = ({ count = 1000 }) => {
  const { viewport } = useThree();
  const particles = useRef();
  
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * viewport.width * 2;
    positions[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;
    sizes[i] = Math.random() * 2 + 0.5;
  }

  useFrame(({ mouse }) => {
    if (particles.current) {
      particles.current.rotation.x = mouse.y * 0.1;
      particles.current.rotation.y = mouse.x * 0.1;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#4cc9f0"
        sizeAttenuation
        transparent
        opacity={0.8}
      />
    </points>
  );
};

// Main Scene Component
const Scene = ({ children, cameraPosition = [0, 0, 5] }) => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: cameraPosition, fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <Environment preset="city" />
      
      <Suspense fallback={null}>
        {children}
      </Suspense>
      
      <OrbitControls
        enableZoom={true}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 6}
        maxDistance={15}
        minDistance={3}
      />
    </Canvas>
  );
};

export { Scene, AbstractGeometry, ProductModel, BackgroundParticles };
