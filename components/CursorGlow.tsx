"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [mousePosition, setMousePosition] = useState({ x: -200, y: -200 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => { setIsMounted(true); }, []);

  if (!isMounted) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-64 h-64 bg-zyroRed/20 rounded-full pointer-events-none z-50 blur-[80px] mix-blend-screen"
      animate={{
        x: mousePosition.x - 128,
        y: mousePosition.y - 128,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ type: "tween", ease: "backOut", duration: 0.1 }}
    />
  );
}
