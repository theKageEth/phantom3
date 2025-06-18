"use client";

import { useEffect } from "react";

// Individual sparkle component
const FloatingSparkle = ({
  x,
  y,
  size,
  color,
  duration,
  delay,
}: {
  x: number;
  y: number;
  size: number;
  color: string;
  duration: number;
  delay: number;
}) => {
  return (
    <div
      className="floating-sparkle"
      style={{
        position: "fixed",
        left: `${x}%`,
        top: `${y}%`,
        transform: "translate(-50%, -50%)",
        width: `${size}px`,
        height: `${size}px`,
        background: color,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 1000,
        animation: `sparkle ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        boxShadow: `0 0 ${size * 2}px ${color}, 0 0 ${size * 4}px ${color}`,
      }}
    />
  );
};

// Spinning fire effect
const SpinningFire = ({
  x,
  y,
  delay,
}: {
  x: number;
  y: number;
  delay: number;
}) => {
  return (
    <div
      className="spinning-fire"
      style={{
        position: "fixed",
        left: `${x}%`,
        top: `${y}%`,
        width: "12px",
        height: "12px",
        pointerEvents: "none",
        zIndex: 1000,
        animation: `spinFire 3s linear infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle, #ff6b35 0%, #f7931e 30%, #ffd23f 70%, transparent 100%)",
          borderRadius: "50%",
          filter: "blur(1px)",
          boxShadow: "0 0 12px #ff6b35, 0 0 24px #f7931e",
        }}
      />
    </div>
  );
};

// Spinning ghost effect
const SpinningGhost = ({
  x,
  y,
  delay,
  color,
}: {
  x: number;
  y: number;
  delay: number;
  color: string;
}) => {
  return (
    <div
      className="spinning-ghost"
      style={{
        position: "fixed",
        left: `${x}%`,
        top: `${y}%`,
        width: "25px",
        height: "25px",
        pointerEvents: "none",
        zIndex: 1,
        animation: `spinGhost 4s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: color,
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          boxShadow: `0 0 15px ${color}, inset 0 0 10px rgba(139, 92, 246, 0.3)`,
          transform: "rotate(-10deg)",
        }}
      />
      {/* Ghost eyes */}
      <div
        style={{
          position: "absolute",
          top: "6px",
          left: "6px",
          width: "4px",
          height: "4px",
          background: "#000",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "6px",
          right: "6px",
          width: "4px",
          height: "4px",
          background: "#000",
          borderRadius: "50%",
        }}
      />
    </div>
  );
};

// Floating orb effect
const FloatingOrb = ({
  x,
  y,
  color,
  delay,
}: {
  x: number;
  y: number;
  color: string;
  delay: number;
}) => {
  return (
    <div
      className="floating-orb"
      style={{
        position: "fixed",
        left: `${x}%`,
        top: `${y}%`,
        width: "8px",
        height: "8px",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        borderRadius: "50%",
        pointerEvents: "none",
        zIndex: 1000,
        animation: `floatOrb 6s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        boxShadow: `0 0 10px ${color}`,
      }}
    />
  );
};

export default function SparkleEffects() {
  const sparkles = [];
  const fires = [];
  const ghosts = [];
  const orbs = [];
  // Generate random sparkles - reduced size
  for (let i = 0; i < 25; i++) {
    sparkles.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      color: [
        "#FFD700",
        "#FF69B4",
        "#00FFFF",
        "#90EE90",
        "#FF6347",
        "#DDA0DD",
        "#F0E68C",
        "#87CEEB",
      ][Math.floor(Math.random() * 8)],
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
    });
  }

  // Generate spinning fires
  for (let i = 0; i < 8; i++) {
    fires.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
    });
  } // Generate spinning ghosts with unique colors - reduced to 6
  const ghostColors = [
    "rgba(255, 255, 255, 0.8)", // Classic white
    "rgba(139, 92, 246, 0.8)", // Purple
    "rgba(236, 72, 153, 0.8)", // Pink
    "rgba(59, 130, 246, 0.8)", // Blue
    "rgba(16, 185, 129, 0.8)", // Green
    "rgba(245, 158, 11, 0.8)", // Orange
  ];

  for (let i = 0; i < 6; i++) {
    ghosts.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      color: ghostColors[i], // Each ghost gets a unique color
    });
  }

  // Generate floating orbs
  for (let i = 0; i < 12; i++) {
    orbs.push({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      color: [
        "#8B5CF6",
        "#EC4899",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#3B82F6",
        "#06B6D4",
        "#84CC16",
      ][Math.floor(Math.random() * 8)],
      delay: Math.random() * 6,
    });
  }

  useEffect(() => {
    // Add CSS animations
    const style = document.createElement("style");
    style.textContent = `
      @keyframes sparkle {
        0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
        50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
      }
      
      @keyframes spinFire {
        0% { transform: rotate(0deg) scale(1); opacity: 0.8; }
        25% { transform: rotate(90deg) scale(1.2); opacity: 1; }
        50% { transform: rotate(180deg) scale(0.9); opacity: 0.6; }
        75% { transform: rotate(270deg) scale(1.1); opacity: 1; }
        100% { transform: rotate(360deg) scale(1); opacity: 0.8; }
      }
      
      @keyframes spinGhost {
        0% { transform: rotate(0deg) translateY(0px); opacity: 0.7; }
        25% { transform: rotate(90deg) translateY(-10px); opacity: 1; }
        50% { transform: rotate(180deg) translateY(0px); opacity: 0.8; }
        75% { transform: rotate(270deg) translateY(-5px); opacity: 0.9; }
        100% { transform: rotate(360deg) translateY(0px); opacity: 0.7; }
      }
      
      @keyframes floatOrb {
        0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
        33% { transform: translateY(-20px) scale(1.1); opacity: 1; }
        66% { transform: translateY(-10px) scale(0.9); opacity: 0.8; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <>
      {/* Render all sparkles */}
      {sparkles.map((sparkle) => (
        <FloatingSparkle
          key={`sparkle-${sparkle.id}`}
          x={sparkle.x}
          y={sparkle.y}
          size={sparkle.size}
          color={sparkle.color}
          duration={sparkle.duration}
          delay={sparkle.delay}
        />
      ))}{" "}
      {/* Render spinning fires */}
      {fires.map((fire) => (
        <SpinningFire
          key={`fire-${fire.id}`}
          x={fire.x}
          y={fire.y}
          delay={fire.delay}
        />
      ))}
      {/* Render spinning ghosts */}
      {ghosts.map((ghost) => (
        <SpinningGhost
          key={`ghost-${ghost.id}`}
          x={ghost.x}
          y={ghost.y}
          delay={ghost.delay}
          color={ghost.color}
        />
      ))}
      {/* Render floating orbs */}
      {orbs.map((orb) => (
        <FloatingOrb
          key={`orb-${orb.id}`}
          x={orb.x}
          y={orb.y}
          color={orb.color}
          delay={orb.delay}
        />
      ))}
    </>
  );
}
