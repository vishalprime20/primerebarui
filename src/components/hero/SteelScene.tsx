"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type SteelSceneProps = {
  mouse?: { x: number; y: number };
  scrollProgress?: number;
};

function DeformedBar({
  position,
  rotation,
  length,
  radius,
  accent,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  length: number;
  radius: number;
  accent?: boolean;
}) {
  const ridges = useMemo(() => {
    const items: number[] = [];
    const count = Math.floor(length / 0.22);
    for (let i = 0; i < count; i++) {
      items.push(-length / 2 + 0.14 + i * 0.22);
    }
    return items;
  }, [length]);

  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow>
        <cylinderGeometry args={[radius, radius, length, 18]} />
        <meshStandardMaterial
          color={accent ? "#c8d0d8" : "#8e98a3"}
          metalness={0.88}
          roughness={accent ? 0.22 : 0.36}
        />
      </mesh>
      {ridges.map((y, i) => (
        <mesh key={i} position={[0, y, 0]} castShadow>
          <torusGeometry args={[radius * 1.08, radius * 0.16, 6, 16]} />
          <meshStandardMaterial color="#6f7882" metalness={0.85} roughness={0.42} />
        </mesh>
      ))}
      <mesh position={[0, length / 2, 0]}>
        <cylinderGeometry args={[radius * 0.98, radius * 0.98, 0.04, 14]} />
        <meshStandardMaterial
          color="#e85d04"
          metalness={0.55}
          roughness={0.4}
          emissive="#e85d04"
          emissiveIntensity={0.4}
        />
      </mesh>
    </group>
  );
}

function RebarBundle({
  mouse = { x: 0, y: 0 },
  scrollProgress = 0,
}: SteelSceneProps) {
  const group = useRef<THREE.Group>(null);
  const bars = useMemo(() => {
    const items: {
      position: [number, number, number];
      rotation: [number, number, number];
      length: number;
      radius: number;
      accent?: boolean;
    }[] = [];

    for (let i = 0; i < 14; i++) {
      const angle = (i / 14) * Math.PI * 2;
      const radius = 0.28 + (i % 4) * 0.1;
      items.push({
        position: [
          Math.cos(angle) * radius,
          (i % 5) * 0.07 - 0.18,
          Math.sin(angle) * radius * 0.85,
        ],
        rotation: [0, angle + Math.PI / 2, Math.PI / 2.35],
        length: 2.9 + (i % 3) * 0.15,
        radius: 0.04 + (i % 3) * 0.006,
        accent: i === 0,
      });
    }

    items.push({
      position: [0.05, -0.05, 0.05],
      rotation: [0.08, 0.2, Math.PI / 2.3],
      length: 3.35,
      radius: 0.055,
      accent: true,
    });

    return items;
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    const targetY = t * 0.22 + mouse.x * 0.45 + scrollProgress * 0.8;
    const targetX = Math.sin(t * 0.3) * 0.1 + mouse.y * 0.25;
    group.current.rotation.y += (targetY - group.current.rotation.y) * 0.05;
    group.current.rotation.x += (targetX - group.current.rotation.x) * 0.05;
    group.current.position.y = Math.sin(t * 0.55) * 0.1 - scrollProgress * 0.4;
    group.current.position.x = 0.2 + mouse.x * 0.12;
    group.current.scale.setScalar(1.05 - scrollProgress * 0.12);
  });

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.3}>
      <group ref={group}>
        {bars.map((bar, i) => (
          <DeformedBar key={i} {...bar} />
        ))}
      </group>
    </Float>
  );
}

function SceneContents(props: SteelSceneProps) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4.5, 6, 3]} intensity={1.6} color="#f5f6f7" />
      <directionalLight position={[-4, 2, -2]} intensity={0.85} color="#e85d04" />
      <spotLight
        position={[0, 5, 2]}
        angle={0.5}
        penumbra={0.7}
        intensity={1}
        color="#d0d6dc"
      />
      <RebarBundle {...props} />
      <ContactShadows
        position={[0, -1.35, 0]}
        opacity={0.5}
        scale={12}
        blur={2.6}
        far={4}
        color="#0a0c0e"
      />
    </>
  );
}

export function SteelScene(props: SteelSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.35, 4.2], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        failIfMajorPerformanceCaveat: false,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x141618, 0);
      }}
      style={{ width: "100%", height: "100%", background: "transparent" }}
      aria-hidden
    >
      <SceneContents {...props} />
    </Canvas>
  );
}
