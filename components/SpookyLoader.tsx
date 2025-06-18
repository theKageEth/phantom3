"use client";

import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";

// Mouse-following Ghost Component
const LoaderGhost = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const ghostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useGSAP(() => {
    if (!ghostRef.current) return;

    // Smooth movement towards mouse position
    gsap.to(ghostRef.current, {
      x: (mousePosition.x - 50) * 0.3, // Reduced movement range
      y: (mousePosition.y - 50) * 0.3,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [mousePosition]);

  return (
    <div
      ref={ghostRef}
      className="fixed pointer-events-none z-40"
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        width: "40px",
        height: "40px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "rgba(255, 255, 255, 0.9)",
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          boxShadow:
            "0 0 20px rgba(255, 255, 255, 0.6), inset 0 0 15px rgba(139, 92, 246, 0.3)",
          transform: "rotate(-5deg)",
          animation: "ghostFloat 3s ease-in-out infinite",
        }}
      />
      {/* Ghost eyes */}
      <div
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          width: "6px",
          height: "6px",
          background: "#000",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          width: "6px",
          height: "6px",
          background: "#000",
          borderRadius: "50%",
        }}
      />
    </div>
  );
};

// Loading Orb Component
function LoadingOrb() {
  const orbRef = useRef<THREE.Mesh>(null);

  useGSAP(() => {
    if (!orbRef.current) return;

    // Continuous rotation
    gsap.to(orbRef.current.rotation, {
      x: Math.PI * 2,
      y: Math.PI * 2,
      z: Math.PI * 2,
      duration: 4,
      repeat: -1,
      ease: "none",
    });

    // Pulsing scale
    gsap.to(orbRef.current.scale, {
      x: 1.5,
      y: 1.5,
      z: 1.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });
  });

  return (
    <Float rotationIntensity={0.5} floatIntensity={0.5} speed={2}>
      <mesh ref={orbRef}>
        <icosahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial
          color="#8B5CF6"
          transparent
          opacity={0.8}
          distort={0.5}
          speed={5}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Inner orb */}
      <mesh scale={0.5}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshDistortMaterial
          color="#06B6D4"
          transparent
          opacity={0.6}
          distort={0.3}
          speed={3}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      <Sparkles
        count={50}
        scale={4}
        size={3}
        speed={1}
        opacity={0.8}
        color="#FFFFFF"
      />
    </Float>
  );
}

// Loading Progress Ring
function ProgressRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useGSAP(() => {
    if (!ringRef.current) return;

    gsap.to(ringRef.current.rotation, {
      z: Math.PI * 2,
      duration: 3,
      repeat: -1,
      ease: "none",
    });
  });

  return (
    <mesh ref={ringRef} position={[0, 0, 0]}>
      <ringGeometry args={[2.5, 2.8, 32]} />
      <meshStandardMaterial color="#8B5CF6" transparent opacity={0.6} />
    </mesh>
  );
}

// Loading Scene
function LoadingScene() {
  return (
    <group>
      {/* Lighting */}
      <ambientLight intensity={0.3} color="#8B5CF6" />
      <pointLight position={[5, 5, 5]} intensity={1} color="#06B6D4" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#8B5CF6" />
      {/* Main loading orb */}
      <LoadingOrb /> {/* Progress ring */}
      <ProgressRing />
      {/* Background sparkles */}
      <Sparkles
        count={200}
        scale={15}
        size={1}
        speed={0.5}
        opacity={0.4}
        color="#FFFFFF"
      />
    </group>
  );
}

// Main Spooky Loader Component
export default function SpookyLoader({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    // Simulate loading progress
    const tl = gsap.timeline();

    tl.to(
      { progress: 0 },
      {
        progress: 100,
        duration: 3,
        ease: "power2.out",
        onUpdate: function () {
          setProgress(this.targets()[0].progress);
        },
        onComplete: () => {
          // Fade out animation
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
            onComplete: () => {
              setIsVisible(false);
              onComplete();
            },
          });
        },
      }
    );
  });

  // Add CSS animation for ghost floating
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes ghostFloat {
        0%, 100% { 
          transform: rotate(-5deg) translateY(0px) scale(1); 
        }
        50% { 
          transform: rotate(5deg) translateY(-10px) scale(1.05); 
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);
  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ backgroundColor: "#000000" }} // Ensure solid black background
    >
      {/* Mouse-following Ghost */}
      <LoaderGhost />

      {/* 3D Loading Scene */}
      <div className="w-full h-screen">
        {" "}
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, alpha: false }} // Disable alpha to prevent transparency issues
          dpr={[1, 2]}
          style={{ background: "#000000" }} // Ensure Canvas background is black
        >
          <LoadingScene />
        </Canvas>
      </div>

      {/* Loading UI */}
      <div className="absolute bottom-20 text-center">
        <div className="mb-6">
          <div className="text-2xl font-bold text-purple-400 mb-2 font-[family-name:var(--font-nosifer)]">
            PHANTOM3
          </div>
          <div className="text-lg text-gray-300">
            Materializing the ethereal...
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-cyan-600 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress percentage */}
        <div className="text-sm text-gray-400">
          {Math.round(progress)}% Complete
        </div>

        {/* Spooky loading messages */}
        <div className="mt-4 text-sm text-purple-300 opacity-70">
          {progress < 30 && "Awakening the spirits..."}
          {progress >= 30 && progress < 60 && "Conjuring dark magic..."}
          {progress >= 60 && progress < 90 && "Weaving ethereal experiences..."}
          {progress >= 90 && "Almost ready to haunt..."}
        </div>
      </div>
    </div>
  );
}
