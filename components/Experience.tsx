"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Float, Environment, Sparkles } from "@react-three/drei";
import { useRef, Suspense, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";
import { Group } from "three";
import MouseSpotlight from "./MouseSpotlight";
import SparkleEffects from "./SparkleEffects";

gsap.registerPlugin(ScrollTrigger);

// Camera controller for scroll-based movement
function CameraController() {
  const { camera } = useThree();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    const ctx = gsap.context(() => {
      // Disable heavy camera animations on mobile for performance
      if (!isMobile) {
        // Camera movement on scroll - desktop only
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "body",
              start: "top top",
              end: "bottom bottom",
              scrub: 1,
            },
          })
          .to(camera.position, {
            y: -10,
            z: 8,
            duration: 1,
          })
          .to(camera.position, {
            x: 3,
            y: -15,
            z: 12,
            duration: 1,
          })
          .to(camera.position, {
            x: -2,
            y: -20,
            z: 6,
            duration: 1,
          });
      }
    });
    return () => {
      ctx.revert();
      window.removeEventListener("resize", checkIsMobile);
    };
  }, [camera, isMobile]);

  return null;
}

// Enhanced Ghost component with fixed random colors and sizes
function FloatingGhost({
  position,
  size = 1,
}: {
  position: [number, number, number];
  size?: number;
}) {
  const ghostRef = useRef<Group>(null);
  const sparklesRef = useRef<THREE.Group>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Fixed random colors - generated once per ghost
  const sparkleColor = useRef<string>("");
  const ghostColor = useRef<string>("");

  // Enhanced color palettes
  const sparkleColors = [
    "#FFFFFF",
    "#FFD700",
    "#FF69B4",
    "#00FFFF",
    "#90EE90",
    "#FF6347",
    "#DDA0DD",
    "#F0E68C",
    "#FF1493",
    "#00FA9A",
    "#1E90FF",
    "#FF4500",
    "#9370DB",
    "#32CD32",
    "#FF8C00",
  ];

  const ghostColors = [
    "#FFFFFF",
    "#E6E6FA",
    "#FFB6C1",
    "#B0E0E6",
    "#98FB98",
    "#F0E68C",
    "#DDA0DD",
    "#87CEEB",
    "#FFA07A",
    "#20B2AA",
    "#778899",
    "#F5DEB3",
  ];
  // Initialize fixed random colors once
  if (!sparkleColor.current) {
    // Check if mobile
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
    }

    sparkleColor.current =
      sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
    ghostColor.current =
      ghostColors[Math.floor(Math.random() * ghostColors.length)];
  }

  useGSAP(() => {
    if (!ghostRef.current) return;

    // Enhanced floating animation
    gsap.to(ghostRef.current.position, {
      y: position[1] + 1.5,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group
        ref={ghostRef}
        position={position}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        {" "}
        {/* Main ghost body with size scaling - reduced glow */}
        <mesh castShadow receiveShadow scale={size}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color={ghostColor.current}
            emissive={ghostColor.current}
            emissiveIntensity={0.2}
            transparent
            opacity={0.6}
          />
        </mesh>
        {/* Ghost glow - much more subtle */}
        <mesh scale={1.1 * size} receiveShadow>
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color={sparkleColor.current}
            emissive={sparkleColor.current}
            emissiveIntensity={isHovered ? 0.3 : 0.1}
            transparent
            opacity={isHovered ? 0.2 : 0.08}
          />
        </mesh>
        {/* Eyes */}
        <mesh position={[-0.3 * size, 0.2 * size, 0.8 * size]} castShadow>
          <sphereGeometry args={[0.15 * size, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0.3 * size, 0.2 * size, 0.8 * size]} castShadow>
          <sphereGeometry args={[0.15 * size, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>{" "}
        {/* Eye pupils that glow - reduced intensity */}
        <mesh position={[-0.3 * size, 0.2 * size, 0.85 * size]}>
          <sphereGeometry args={[0.05 * size, 8, 8]} />
          <meshStandardMaterial
            color={sparkleColor.current}
            emissive={sparkleColor.current}
            emissiveIntensity={1.0}
          />
        </mesh>
        <mesh position={[0.3 * size, 0.2 * size, 0.85 * size]}>
          <sphereGeometry args={[0.05 * size, 8, 8]} />
          <meshStandardMaterial
            color={sparkleColor.current}
            emissive={sparkleColor.current}
            emissiveIntensity={1.0}
          />
        </mesh>{" "}
        {/* Enhanced sparkles - multiple layers with reduced radius and mobile optimization */}
        <group ref={sparklesRef}>
          {/* Main sparkles - tighter around ghost */}
          <Sparkles
            count={isMobile ? (isHovered ? 40 : 20) : isHovered ? 120 : 60}
            scale={3 * size}
            size={isHovered ? 4 : 3}
            speed={1.5}
            opacity={0.9}
            color={sparkleColor.current}
          />

          {/* Secondary sparkles - closer to ghost */}
          <Sparkles
            count={isMobile ? (isHovered ? 25 : 15) : isHovered ? 80 : 40}
            scale={2 * size}
            size={isHovered ? 3 : 2}
            speed={2.0}
            opacity={0.7}
            color={ghostColor.current}
          />

          {/* Tiny micro sparkles - very close to ghost */}
          <Sparkles
            count={isMobile ? (isHovered ? 30 : 20) : isHovered ? 150 : 80}
            scale={2.5 * size}
            size={isHovered ? 2 : 1}
            speed={2.5}
            opacity={0.6}
            color="#FFFFFF"
          />
        </group>
      </group>
    </Float>
  );
}

// Main 3D Scene - Reduced ghost count for small screens
function Scene3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <group>
      <CameraController />
      {/* Slightly higher ambient light to see the spotlight effect */}
      <ambientLight intensity={0.1} color="#1a1a2e" />

      {/* Reduced number of ghosts for mobile performance */}
      {isMobile ? (
        // Mobile: Only 4 ghosts for better performance
        <>
          <FloatingGhost position={[3, 1, -8]} size={1.0} />
          <FloatingGhost position={[-5, 0, -5]} size={1.2} />
          <FloatingGhost position={[0, -4, -5]} size={1.2} />
          <FloatingGhost position={[-3, -10, -7]} size={1.0} />
        </>
      ) : (
        // Desktop: Full ghost count
        <>
          <FloatingGhost position={[3, 1, -8]} size={1.0} />
          <FloatingGhost position={[4, -3, -6]} size={1.1} />
          <FloatingGhost position={[-5, 0, -5]} size={1.2} />
          <FloatingGhost position={[0, -4, -5]} size={1.2} />
          <FloatingGhost position={[4, -8, -4]} size={0.9} />
          <FloatingGhost position={[-3, -10, -7]} size={1.0} />
          <FloatingGhost position={[5, -15, -6]} size={1.1} />
          <FloatingGhost position={[-4, -18, -5]} size={0.8} />
          <FloatingGhost position={[2, -20, -8]} size={1.0} />
        </>
      )}
    </group>
  );
}

// Main Experience component
export default function Experience() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <>
      <MouseSpotlight />
      <SparkleEffects />
      <div className="fixed inset-0 z-0">
        {" "}
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 45,
          }}
          shadows={!isMobile} // Disable shadows on mobile for performance
          gl={{
            antialias: !isMobile, // Disable antialiasing on mobile
          }}
          dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)} // Lower pixel ratio on mobile
          style={{
            background: "linear-gradient(to bottom, #000000, #0A0A0A)",
          }}
        >
          <Suspense fallback={null}>
            <Scene3D />
            {/* Only load environment on desktop for performance */}
            {!isMobile && <Environment preset="night" />}
          </Suspense>
        </Canvas>
      </div>
    </>
  );
}
