"use client";

import { useEffect, useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export default function ParticleSystem() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const createParticle = (): Particle => ({
      id: Math.random(),
      x: Math.random() * window.innerWidth,
      y: window.innerHeight + 10,
      vx: (Math.random() - 0.5) * 2,
      vy: -Math.random() * 3 - 1,
      life: 0,
      maxLife: Math.random() * 100 + 100,
    });

    const updateParticles = (prevParticles: Particle[]): Particle[] => {
      return prevParticles
        .map((particle) => ({
          ...particle,
          x: particle.x + particle.vx,
          y: particle.y + particle.vy,
          life: particle.life + 1,
        }))
        .filter(
          (particle) => particle.life < particle.maxLife && particle.y > -10
        );
    };

    const interval = setInterval(() => {
      setParticles((prev) => {
        const updated = updateParticles(prev);
        // Add new particles occasionally
        if (Math.random() < 0.1 && updated.length < 20) {
          updated.push(createParticle());
        }
        return updated;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-30"
          style={{
            left: particle.x,
            top: particle.y,
            opacity: 1 - particle.life / particle.maxLife,
            transform: `scale(${1 - particle.life / particle.maxLife})`,
          }}
        />
      ))}
    </div>
  );
}
