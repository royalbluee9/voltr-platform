import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Icosahedron, Html } from '@react-three/drei';
import * as THREE from 'three';
import type { Instrument } from '../../types';

export const EnergyCore: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x += 0.002;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      meshRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <Icosahedron ref={meshRef} args={[2, 4]}>
        <meshPhysicalMaterial 
          color="#00f5ff" 
          emissive="#00f5ff" 
          emissiveIntensity={1.5}
          wireframe={true} 
          transparent={true}
          opacity={0.8}
        />
      </Icosahedron>
      {/* Inner solid core */}
      <Sphere args={[1.6, 32, 32]}>
        <meshStandardMaterial color="#00a0ff" emissive="#0050ff" emissiveIntensity={0.5} roughness={0.1} />
      </Sphere>
    </group>
  );
};

interface PriceOrbProps {
  instrument: Instrument;
  price: number;
  position: [number, number, number];
  onClick: () => void;
  selected: boolean;
}

export const PriceOrb: React.FC<PriceOrbProps> = ({ instrument, price, position, onClick, selected }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
      if (selected) {
         groupRef.current.rotation.y += 0.02;
      }
    }
  });

  return (
    <group ref={groupRef} position={position} onClick={(e) => { e.stopPropagation(); onClick(); }}>
      {/* Glow sphere */}
      <Sphere args={[0.8, 32, 32]}>
        <meshBasicMaterial color={instrument.color} transparent opacity={0.15} depthWrite={false} />
      </Sphere>
      {/* Solid core */}
      <Sphere args={[0.5, 32, 32]}>
        <meshStandardMaterial color={instrument.color} emissive={instrument.color} emissiveIntensity={selected ? 2 : 0.8} roughness={0.2} metalness={0.8} />
      </Sphere>
      
      {/* Selection ring */}
      {selected && (
        <mesh rotation-x={Math.PI / 2}>
          <ringGeometry args={[0.9, 0.95, 32]} />
          <meshBasicMaterial color={instrument.color} side={THREE.DoubleSide} transparent opacity={0.8} />
        </mesh>
      )}

      {/* HTML Label */}
      <Html center position={[0, -1.2, 0]} className="pointer-events-none">
        <div className="flex flex-col items-center">
          <div className="text-[9px] font-display font-bold tracking-widest px-2 py-0.5 rounded-full" style={{ color: '#fff', backgroundColor: instrument.color + '40', border: `1px solid ${instrument.color}80` }}>
            {instrument.symbol.split('_')[0]}
          </div>
          <div className="text-xs font-mono font-bold mt-1 shadow-black drop-shadow-md" style={{ color: instrument.color }}>
            £{price.toFixed(2)}
          </div>
        </div>
      </Html>
    </group>
  );
};
