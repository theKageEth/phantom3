"use client";

import { useEffect, useState } from "react";

export default function MouseSpotlight() {
  const [position, setPosition] = useState(() => {
    // Safe initialization for SSR
    if (typeof window !== "undefined") {
      return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    }
    return { x: 400, y: 300 }; // fallback for SSR
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    // Handle mouse movement for desktop
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    }; // Handle touch movement - optimized for iPhone/mobile without preventing scroll
    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0] || e.changedTouches[0];
      if (touch) {
        setPosition({ x: touch.clientX, y: touch.clientY });
      }
    };

    // Handle touch start - when user first touches the screen
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        setPosition({ x: touch.clientX, y: touch.clientY });
      }
    };

    // Handle touch end - keep the spotlight at the last position
    const handleTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      if (touch) {
        setPosition({ x: touch.clientX, y: touch.clientY });
      }
    }; // Add event listeners with proper options for mobile
    document.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: true }); // Passive to allow scrolling
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Also listen on window for better coverage on mobile
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    return () => {
      window.removeEventListener("resize", checkIsMobile);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, []);
  return (
    <>
      {" "}
      {/* Innermost bright circle - smaller on mobile */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9999,
          background: `radial-gradient(circle ${
            isMobile ? "100px" : "150px"
          } at ${position.x}px ${
            position.y
          }px, transparent 0%, transparent 80%, rgba(0, 0, 0, ${
            isMobile ? "0.15" : "0.2"
          }) 100%)`,
          transition: "background 0.05s ease-out", // Faster transition for mobile
        }}
      />
      {/* Middle circle - adjusted for mobile */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9998,
          background: `radial-gradient(circle ${
            isMobile ? "200px" : "300px"
          } at ${position.x}px ${
            position.y
          }px, transparent 0%, transparent 50%, rgba(0, 0, 0, ${
            isMobile ? "0.4" : "0.6"
          }) 100%)`,
          transition: "background 0.05s ease-out",
        }}
      />
      {/* Outer circle - adjusted for mobile */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 9997,
          background: `radial-gradient(circle ${
            isMobile ? "350px" : "500px"
          } at ${position.x}px ${
            position.y
          }px, transparent 0%, transparent 30%, rgba(0, 0, 0, ${
            isMobile ? "0.7" : "0.85"
          }) 100%)`,
          transition: "background 0.05s ease-out",
        }}
      />
    </>
  );
}
