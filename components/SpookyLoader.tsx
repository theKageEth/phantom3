"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function SpookyLoader({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const ghost = ghostRef.current;
    const title = titleRef.current;

    if (!loader || !ghost || !title) return;

    // GSAP timeline for intro animation
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out and call onComplete
        gsap.to(loader, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => onComplete?.(),
        });
      },
    });

    // Initial states
    gsap.set([ghost, title], { opacity: 0, scale: 0.5 });

    // Animation sequence
    tl.to(ghost, {
      opacity: 1,
      scale: 1,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    })
      .to(
        title,
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        0.3
      )
      .to(
        ghost,
        {
          y: -10,
          duration: 0.6,
          ease: "power1.inOut",
          repeat: 2, // Only repeat 2 times, then complete
          yoyo: true,
        },
        0.8
      )
      .to({}, { duration: 0.5 }); // Short wait before completing

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      <div className="text-center">
        {/* Ghost */}
        <div ref={ghostRef} className="mb-6">
          <div className="w-16 h-16 mx-auto rounded-full bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg relative">
            <div
              className="w-full h-full rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0.1) 70%, transparent 100%)",
                boxShadow: "0 0 20px rgba(255,255,255,0.3)",
              }}
            >
              <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-black rounded-full"></div>
              <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-black rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div ref={titleRef}>
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Phantom3
          </h1>
        </div>
      </div>
    </div>
  );
}
