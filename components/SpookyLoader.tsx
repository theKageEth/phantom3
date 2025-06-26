"use client";

import { useState, useEffect } from "react";

// Mouse-following Ghost Component
const LoaderGhost = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  useEffect(() => {
    let rafId: number;

    const updatePosition = (clientX: number, clientY: number) => {
      // Cancel previous animation frame
      if (rafId) {
        cancelAnimationFrame(rafId);
      }

      // Use requestAnimationFrame for smooth updates
      rafId = requestAnimationFrame(() => {
        const x = (clientX / window.innerWidth) * 100;
        const y = (clientY / window.innerHeight) * 100;
        setMousePosition({ x, y });
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    // Add touch support for iPhone - using clientX/clientY for viewport positioning
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0] || e.changedTouches[0];
      if (touch) {
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        updatePosition(touch.clientX, touch.clientY);
      }
    };    // Add both mouse and touch listeners with passive for better iPhone performance
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { 
      passive: true, 
      capture: false 
    });
    window.addEventListener("touchstart", handleTouchStart, { 
      passive: true, 
      capture: false 
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, []);
  return (
    <div
      className="fixed pointer-events-none z-40"
      style={{
        left: `${mousePosition.x}%`,
        top: `${mousePosition.y}%`,
        transform: "translate(-50%, -50%)",
        width: "40px",
        height: "40px",
        // Force hardware acceleration for smooth iPhone performance
        willChange: "transform",
        backfaceVisibility: "hidden",
        WebkitTransform: "translate3d(0,0,0)",
      }}
    >
      <div
        className="w-full h-full rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg animate-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 70%, transparent 100%)",
          boxShadow:
            "0 0 20px rgba(255,255,255,0.3), inset 0 0 20px rgba(255,255,255,0.1)",
        }}
      >
        {/* Ghost eyes */}
        <div className="absolute top-1/3 left-1/4 w-1.5 h-1.5 bg-black rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-black rounded-full"></div>
      </div>
    </div>
  );
};

// Loader component
export default function SpookyLoader({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [sparkles, setSparkles] = useState<
    Array<{
      left: number;
      top: number;
      delay: number;
      duration: number;
    }>
  >([]);

  // Generate sparkle positions on client side only
  useEffect(() => {
    const sparkleData = Array.from({ length: 20 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 2 + Math.random() * 2,
    }));
    setSparkles(sparkleData);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20"></div>
      {/* Floating sparkles */}
      <div className="absolute inset-0 overflow-hidden">
        {sparkles.map((sparkle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-ping"
            style={{
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              animationDelay: `${sparkle.delay}s`,
              animationDuration: `${sparkle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Mouse-following ghost */}
      <LoaderGhost />

      {/* Center content */}
      <div className="relative z-10 text-center text-white">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Phantom Portfolio
          </h1>
          <p className="text-lg text-gray-300">Conjuring the experience...</p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-4 text-sm text-gray-400">{progress}% complete</div>
      </div>

      {/* Pulsing orb in center */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 pointer-events-none">
        <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-r from-purple-400/40 to-cyan-400/40 animate-ping"></div>
      </div>
    </div>
  );
}
