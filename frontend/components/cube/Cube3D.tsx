"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Cube() {
  const groupRef = useRef<THREE.Group>(null);

  // Create 27 small cubes
  const cubes = [];

  const size = 1;
  const gap = 0.05;

  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        cubes.push(
          <mesh
            key={`${x}-${y}-${z}`}
            position={[
              x * (size + gap),
              y * (size + gap),
              z * (size + gap),
            ]}
          >
            <boxGeometry args={[size, size, size]} />
            <meshStandardMaterial color="black" />
          </mesh>
        );
      }
    }
  }

  return <group ref={groupRef}>{cubes}</group>;
}

export default function Cube3D() {
  return (
    <div className="w-full h-[400px]">
      <Canvas camera={{ position: [5, 5, 5] }}>
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} />

        {/* Cube */}
        <Cube />

        {/* Controls */}
        <OrbitControls enableZoom enableRotate />
      </Canvas>
    </div>
  );
}