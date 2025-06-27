"use client";

import { useEffect, useState, useRef } from "react";

export default function MouseSpotlight() {
  const [position, setPosition] = useState({ x: 400, y: 300 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    setPosition({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

    const updatePosition = (x: number, y: number) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => setPosition({ x, y }));
    };

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY);
    };

    document.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Desktop: Mouse-following flashlight over entire page
  return (
    <div
      className="pointer-events-none fixed top-0 left-0 w-full h-full z-50 hidden md:block"
      style={{
        background: `radial-gradient(circle 400px at ${position.x}px ${position.y}px, transparent 0%, transparent 30%, rgba(0,0,0,0.9) 100%)`,
        transition: "background 0.1s ease-out",
      }}
    />
  );
}
