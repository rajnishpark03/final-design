"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useRef, Suspense } from "react";
import * as THREE from "three";

/* ---------------- Floating trophy ---------------- */
function Trophy() {
  return (
    <Float speed={2} rotationIntensity={1.2} floatIntensity={1.6}>
      <group position={[2.7, 1.4, -0.5]} scale={0.5}>
        {/* cup */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.55, 0.32, 0.9, 24]} />
          <meshStandardMaterial
            color="#FF7A1A"
            metalness={1}
            roughness={0.18}
            emissive="#FF7A1A"
            emissiveIntensity={0.25}
          />
        </mesh>
        {/* handles */}
        {[-1, 1].map((s) => (
          <mesh key={s} position={[s * 0.62, 0.6, 0]} rotation={[0, 0, s * 0.4]}>
            <torusGeometry args={[0.22, 0.06, 12, 24, Math.PI]} />
            <meshStandardMaterial color="#FF8F33" metalness={1} roughness={0.2} />
          </mesh>
        ))}
        {/* stem + base */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.4, 16]} />
          <meshStandardMaterial color="#FFAB66" metalness={1} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.42, 0]}>
          <cylinderGeometry args={[0.32, 0.36, 0.18, 24]} />
          <meshStandardMaterial color="#FF7A1A" metalness={1} roughness={0.25} />
        </mesh>
      </group>
    </Float>
  );
}

function Rig() {
  const light = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (!light.current) return;
    light.current.position.x = Math.sin(state.clock.elapsedTime * 0.6) * 4;
    light.current.position.y = Math.cos(state.clock.elapsedTime * 0.4) * 3 + 1;
  });
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 5]} intensity={1.4} color="#b7a4ff" />
      <pointLight ref={light} intensity={60} distance={18} color="#FF7A1A" />
      <pointLight position={[-4, -2, 3]} intensity={30} color="#6D4DF2" />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 8], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: "none" }}
    >
      <Suspense fallback={null}>
        <Rig />
        <Trophy />
        <Sparkles
          count={70}
          scale={[12, 8, 4]}
          size={2.4}
          speed={0.4}
          color="#b7a4ff"
          opacity={0.6}
        />
      </Suspense>
    </Canvas>
  );
}
