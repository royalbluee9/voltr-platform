import React, { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';

import { useMarketStore } from '../../store/marketStore';
import { useUIStore } from '../../store/uiStore';
import { EnergyCore, PriceOrb } from '../objects';
import { StarfieldBackground } from './StarfieldBackground';

export const TradingFloorScene: React.FC = () => {
  const instruments = useMarketStore(state => state.instruments);
  const prices = useMarketStore(state => state.prices);
  
  const selectedOrb = useUIStore(state => state.selectedOrb);
  const selectOrb = useUIStore(state => state.selectOrb);

  // Position calculation for 6 orbs in a hexagon around the core
  const orbPositions = useMemo(() => {
    const instArray = Object.values(instruments);
    const radius = 5;
    return instArray.map((inst, index) => {
      const angle = (index / instArray.length) * Math.PI * 2;
      return {
        inst,
        position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius] as [number, number, number]
      };
    });
  }, [instruments]);

  return (
    <div className="absolute inset-0 w-full h-full bg-void z-0">
      <Canvas camera={{ position: [0, 6, 12], fov: 50 }}>
        {/* Environment */}
        <color attach="background" args={['#010409']} />
        <fog attach="fog" args={['#010409', 10, 40]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 10]} intensity={1} color="#ffffff" />
        
        <StarfieldBackground />

        {/* Infinite Grid Floor */}
        <Grid 
          infiniteGrid 
          fadeDistance={30} 
          sectionColor="#00f5ff" 
          cellColor="#00f5ff" 
          sectionThickness={1.5}
          cellThickness={0.5}
          position={[0, -2, 0]} 
          args={[30, 30]} 
        />

        {/* Central Core Element */}
        <EnergyCore />

        {/* Market Orbs */}
        {orbPositions.map(({ inst, position }) => {
          const currentPrice = prices[inst.id]?.last || 100;
          return (
            <PriceOrb 
              key={inst.id}
              instrument={inst}
              price={currentPrice}
              position={position}
              selected={selectedOrb === inst.id}
              onClick={() => selectOrb(inst.id === selectedOrb ? null : inst.id)}
            />
          );
        })}

        {/* Camera Navigation */}
        <OrbitControls 
          makeDefault 
          autoRotate={!selectedOrb} 
          autoRotateSpeed={0.5} 
          maxPolarAngle={Math.PI / 2 - 0.05} // don't go below floor
          minDistance={3}
          maxDistance={30}
        />

        {/* Post-Processing Pipeline */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} opacity={1} />
          <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.002, 0.002)} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};
