"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useCursor } from "@react-three/drei";
import * as THREE from "three";

export default function MouseSpotlight3D() {
  const [colorIndex, setColorIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  const spotLightRef = useRef<THREE.SpotLight>(null);
  const pointLightRef = useRef<THREE.PointLight>(null);
  const targetRef = useRef<THREE.Object3D>(null);
  const indicatorRef = useRef<THREE.Mesh>(null);
  const { scene } = useThree();

  // Bright color palette
  const colors = [
    "#FFFFFF", // Bright white
    "#FF0000", // Red
    "#00FF00", // Green
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#FF00FF", // Magenta
    "#00FFFF", // Cyan
    "#FFA500", // Orange
  ];

  const currentColor = colors[colorIndex];
  useCursor(hovered);
  // Initialize target and add to scene
  useEffect(() => {
    const target = targetRef.current;

    if (target && spotLightRef.current) {
      scene.add(target);
      spotLightRef.current.target = target;
      target.position.set(0, 0, 0);
    }

    return () => {
      if (target) {
        scene.remove(target);
      }
    };
  }, [scene]);

  // Handle click to cycle colors
  const handleClick = () => {
    setColorIndex((prev) => (prev + 1) % colors.length);
    console.log("Color changed to:", colors[(colorIndex + 1) % colors.length]);
  };

  // Mouse tracking
  useFrame((state) => {
    if (!spotLightRef.current || !targetRef.current || !pointLightRef.current)
      return;

    const { mouse, viewport } = state; // Convert normalized mouse coordinates to world position
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;

    // Position lights
    spotLightRef.current.position.set(x, y + 5, 10);
    pointLightRef.current.position.set(x, y, 3);
    targetRef.current.position.set(x, y, 0);

    // Update indicator position
    if (indicatorRef.current) {
      indicatorRef.current.position.set(x, y, 1);
    }
  });
  return (
    <>
      {/* Invisible mesh to capture mouse events */}
      <mesh
        onClick={handleClick}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        visible={false}
        position={[0, 0, -1]}
      >
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Target object for spotlight */}
      <object3D ref={targetRef} />

      {/* Visual indicator */}
      <mesh ref={indicatorRef} visible={hovered}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial color={currentColor} transparent opacity={0.8} />
      </mesh>

      {/* Very bright point light */}
      <pointLight
        ref={pointLightRef}
        color={currentColor}
        intensity={50}
        distance={30}
        decay={1}
      />

      {/* Spotlight */}
      <spotLight
        ref={spotLightRef}
        color={currentColor}
        intensity={100}
        distance={50}
        angle={0.6}
        penumbra={0.5}
        decay={1}
        castShadow
      />
    </>
  );
}
