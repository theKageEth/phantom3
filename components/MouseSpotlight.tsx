"use client";

import { useEffect, useState, useRef } from "react";

export default function MouseSpotlight() {
  const [position, setPosition] = useState({ x: 400, y: 300 }); // Default center position
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Initialize position to actual center on client mount
    setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    // Check if device is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    // Throttle position updates for better performance on mobile
    const updatePosition = (x: number, y: number) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        setPosition({ x, y });
      });
    };

    // Handle mouse movement for desktop
    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    }; // Handle touch movement - optimized for iPhone with clientX/clientY for viewport positioning
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0] || e.changedTouches[0];
      if (touch) {
        // Using clientX/clientY ensures viewport-relative positioning even when scrolling
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    // Handle touch start - when user first touches the screen
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        updatePosition(touch.clientX, touch.clientY);
      }
    };

    // Handle touch end - keep the spotlight at the last position
    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      if (touch) {
        updatePosition(touch.clientX, touch.clientY);
      }
    }; // Add event listeners with proper options for mobile
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    // Use more aggressive passive options for iPhone touch events
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
      capture: false,
    });
    document.addEventListener("touchmove", handleTouchMove, {
      passive: true,
      capture: false,
    });
    document.addEventListener("touchend", handleTouchEnd, {
      passive: true,
      capture: false,
    });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("resize", checkIsMobile);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, []); // Use single optimized layer for mobile to reduce rendering load
  if (isMobile) {
    return (
      <div
        className="pointer-events-none fixed top-0 left-0 w-full h-screen z-50"
        style={{
          background: `radial-gradient(circle 200px at ${position.x}px ${position.y}px, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.08) 40%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0.8) 100%)`,
          willChange: "background",
          // Force hardware acceleration on iPhone
          transform: "translateZ(0)",
          backfaceVisibility: "hidden",
          // Optimize for touch scrolling
          WebkitOverflowScrolling: "touch",
        }}
      />
    );
  }

  // Desktop version with multiple layers
  return (
    <>
      {/* Innermost bright circle */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9999,
          background: `radial-gradient(circle 150px at ${position.x}px ${position.y}px, transparent 0%, transparent 80%, rgba(0, 0, 0, 0.2) 100%)`,
          transition: "background 0.1s ease-out",
        }}
      />

      {/* Middle circle */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9998,
          background: `radial-gradient(circle 300px at ${position.x}px ${position.y}px, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.6) 100%)`,
          transition: "background 0.1s ease-out",
        }}
      />

      {/* Outer circle */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9997,
          background: `radial-gradient(circle 500px at ${position.x}px ${position.y}px, transparent 0%, transparent 30%, rgba(0, 0, 0, 0.85) 100%)`,
          transition: "background 0.1s ease-out",
        }}
      />
    </>
  );
}
