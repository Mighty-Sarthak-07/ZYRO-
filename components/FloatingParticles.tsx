"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
}

export default function FloatingParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 w-full">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-goldAccent rounded-full opacity-40 shadow-[0_0_10px_#FFB300]"
          style={{
            left: `${p.x}%`,
            bottom: `-10%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -window.innerHeight * 1.5],
            x: [0, (Math.random() - 0.5) * 200],
            opacity: [0, 0.4, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
