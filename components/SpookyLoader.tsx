"use client";

import { useEffect, useState } from "react";

export default function SpookyLoader() {
  const [loading, setLoading] = useState(true);
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4 ghost-float">👻</div>
        <div className="phantom-title text-4xl text-purple-400 mb-4">
          PHANTOM3
        </div>
        <div className="text-xl text-gray-400">Summoning the spirits{dots}</div>
      </div>
    </div>
  );
}
