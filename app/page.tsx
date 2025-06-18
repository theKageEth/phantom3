"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Custom cursor trail component
const CursorTrail = () => {
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>(
    []
  );

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const newTrail = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now(),
      };

      setTrail((prev) => [...prev.slice(-8), newTrail]);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="cursor-trail"
          style={{
            left: point.x,
            top: point.y,
            opacity: ((index + 1) / trail.length) * 0.5,
            transform: `scale(${(index + 1) / trail.length})`,
          }}
        />
      ))}
    </>
  );
};

// Project card component
const ProjectCard = ({
  title,
  description,
  image,
  url,
  tech,
  delay = 0,
}: {
  title: string;
  description: string;
  image: string;
  url: string;
  tech: string[];
  delay?: number;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className="project-card bg-black/40 backdrop-blur-md rounded-2xl p-10 opacity-0 max-w-lg w-full mx-auto"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative w-full h-64 mb-8 rounded-xl overflow-hidden group">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <h3 className="text-2xl font-bold text-purple-400 mb-6 creepy-shake">
        {title}
      </h3>
      <p className="text-gray-300 mb-8 leading-relaxed">{description}</p>

      <div className="flex flex-wrap gap-3 mb-8">
        {tech.map((item, index) => (
          <span
            key={index}
            className="px-3 py-1 bg-purple-900/30 text-purple-300 rounded-full text-sm border border-purple-700/50"
          >
            {item}
          </span>
        ))}
      </div>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 glow-pulse creepy-shake"
      >
        <span>👻 Visit Haunted Site</span>
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
          />
        </svg>
      </a>
    </div>
  );
};

// Floating ghost decorations
const FloatingGhost = ({ delay = 0 }: { delay?: number }) => (
  <div
    className="absolute text-6xl opacity-20 ghost-float pointer-events-none select-none"
    style={{ animationDelay: `${delay}s` }}
  >
    👻
  </div>
);

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-4xl phantom-title">Loading the spirits... 👻</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      <CursorTrail />

      {/* Floating ghost decorations */}
      <div className="absolute top-20 left-10">
        <FloatingGhost delay={0} />
      </div>
      <div className="absolute top-40 right-20">
        <FloatingGhost delay={2} />
      </div>
      <div className="absolute bottom-40 left-20">
        <FloatingGhost delay={4} />
      </div>

      {/* Background effects */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-cyan-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-green-600/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex flex-col justify-center items-center text-center px-4 w-full">
        <div className="container-center">
          <div
            className="section-header fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <h1 className="phantom-title text-6xl md:text-8xl lg:text-9xl font-bold mb-8 opacity-0 fade-in-up">
              PHANTOM3
            </h1>
            <div
              className="text-2xl md:text-3xl gradient-text font-semibold opacity-0 fade-in-up"
              style={{ animationDelay: "600ms" }}
            >
              Web Development Studio
            </div>
          </div>

          <div className="section-content">
            <p
              className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-16 leading-relaxed opacity-0 fade-in-up"
              style={{ animationDelay: "1000ms" }}
            >
              Crafting <span className="text-purple-400 flicker">ethereal</span>{" "}
              digital experiences with cutting-edge technology. We bring your
              visions to life with{" "}
              <span className="text-cyan-400">ghostly precision</span>.
            </p>

            <div
              className="tech-badges flex flex-wrap justify-center opacity-0 fade-in-up"
              style={{ animationDelay: "1400ms" }}
            >
              <div className="flex items-center gap-3 text-purple-400">
                <span className="text-2xl">⚡</span>
                <span>Next.js</span>
              </div>
              <div className="flex items-center gap-3 text-cyan-400">
                <span className="text-2xl">🎭</span>
                <span>React</span>
              </div>
              <div className="flex items-center gap-3 text-green-400">
                <span className="text-2xl">🌟</span>
                <span>Three.js</span>
              </div>
              <div className="flex items-center gap-3 text-orange-400">
                <span className="text-2xl">🎨</span>
                <span>GSAP</span>
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 fade-in-up"
            style={{ animationDelay: "2000ms" }}
          >
            <div className="flex flex-col items-center text-purple-400">
              <span className="text-sm mb-4">Descend into our work</span>
              <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-bounce" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section relative w-full">
        <div className="container-center">
          <div className="section-header">
            <h2 className="text-5xl md:text-6xl font-bold text-center mb-6 phantom-title opacity-0 fade-in-up">
              HAUNTED PROJECTS
            </h2>
            <p
              className="text-xl text-gray-400 text-center opacity-0 fade-in-up max-w-4xl mx-auto"
              style={{ animationDelay: "400ms" }}
            >
              Witness the spectral beauty of our digital manifestations
            </p>
          </div>

          <div className="projects-grid grid lg:grid-cols-2 items-center justify-center">
            <div className="flex justify-center">
              <ProjectCard
                title="ChefZozo.uk"
                description="A mystical culinary journey through the digital realm. This haunting restaurant experience combines elegant design with interactive elements, creating an otherworldly dining atmosphere that captivates visitors and transforms their perception of online restaurant presence."
                image="/projects/chefzozo.gif"
                url="https://chefzozo.uk"
                tech={[
                  "Next.js",
                  "React",
                  "Tailwind CSS",
                  "Framer Motion",
                  "TypeScript",
                ]}
                delay={600}
              />
            </div>

            <div className="flex justify-center">
              <ProjectCard
                title="3DMenu.app"
                description="An ethereal 3D menu experience that transcends traditional web interfaces. This spectral application leverages cutting-edge Three.js technology to create immersive, floating menu systems that dance through cyberspace, offering users an unprecedented interactive dining experience."
                image="/projects/3dmenu.png"
                url="https://3dmenu.app"
                tech={[
                  "Three.js",
                  "React",
                  "WebGL",
                  "GSAP",
                  "Blender",
                  "TypeScript",
                ]}
                delay={1000}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section relative bg-black/20 backdrop-blur-sm w-full">
        <div className="container-center text-center">
          <div className="section-header">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 phantom-title opacity-0 fade-in-up">
              SUMMON US
            </h2>
            <p
              className="text-xl text-gray-300 opacity-0 fade-in-up max-w-2xl mx-auto"
              style={{ animationDelay: "400ms" }}
            >
              Ready to bring your digital visions to life? Let&apos;s create
              something hauntingly beautiful together.
            </p>
          </div>

          <div
            className="contact-buttons flex flex-wrap justify-center opacity-0 fade-in-up"
            style={{ animationDelay: "800ms" }}
          >
            <a
              href="mailto:contact@phantom3.dev"
              className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-cyan-700 transition-all duration-300 glow-pulse creepy-shake"
            >
              📧 Conjure an Email
            </a>
            <a
              href="https://github.com/phantom3"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-all duration-300 border border-purple-600/50 creepy-shake"
            >
              👻 GitHub Portal
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section relative text-center text-gray-500 border-t border-purple-900/30 w-full">
        <div className="container-center">
          <p className="opacity-0 fade-in-up text-lg">
            © 2025 Phantom3. All rights reserved. Made with 💜 and a touch of
            darkness.
          </p>
        </div>
      </footer>
    </main>
  );
}
