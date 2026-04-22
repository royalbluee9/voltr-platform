import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

export const GridMapScene: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-void z-0">
      <Canvas camera={{ position: [0, 40, 40], fov: 45 }}>
        <color attach="background" args={['#010409']} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 20, 10]} intensity={1} color="#ffffff" />
        
        {/* Simple mock abstract plane for the Map */}
        <mesh rotation-x={-Math.PI / 2} position={[0, -2, 0]}>
          <planeGeometry args={[100, 100, 50, 50]} />
          <meshBasicMaterial color="#00f5ff" wireframe transparent opacity={0.15} />
        </mesh>

        <OrbitControls makeDefault maxPolarAngle={Math.PI / 2 - 0.1} />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

const GridMapLayout: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      <GridMapScene />
      <div className="absolute top-4 left-4 p-4 text-plasma font-display text-2xl z-10 holo-panel bg-void/80 pointer-events-none">
        ENERGY GRID TOPOLOGY // LIVE
      </div>
    </div>
  );
};

export default GridMapLayout;
