"use client";

import { useEffect, useState } from "react";

export default function MouseSpotlight() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseOnPage, setIsMouseOnPage] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMouseOnPage(true);
    };

    const handleMouseLeave = () => {
      setIsMouseOnPage(false);
    };

    // Add event listeners to the document
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* When mouse is off page, show complete darkness */}
      {!isMouseOnPage && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            pointerEvents: "none",
            zIndex: 9999,
            background: "rgba(0, 0, 0, 0.95)",
          }}
        />
      )}

      {/* When mouse is on page, show spotlight effect */}
      {isMouseOnPage && (
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
              background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, transparent 80%, rgba(0, 0, 0, 0.3) 100%)`,
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
              background: `radial-gradient(circle 300px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, transparent 50%, rgba(0, 0, 0, 0.7) 100%)`,
              transition: "background 0.1s ease-out",
            }}
          />

          {/* Outer circle - darkest */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              pointerEvents: "none",
              zIndex: 9997,
              background: `radial-gradient(circle 500px at ${mousePosition.x}px ${mousePosition.y}px, transparent 0%, transparent 30%, rgba(0, 0, 0, 0.95) 100%)`,
              transition: "background 0.1s ease-out",
            }}
          />
        </>
      )}
    </>
  );
}
