"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useScroll, motion } from "framer-motion";

const FRAME_COUNT = 40;

interface Props {
  folderPath: string;
  themeColor: string;
}

export default function ProductBottleScroll({ folderPath, themeColor }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCache = useRef<Record<string, HTMLImageElement[]>>({});
  const [currentImages, setCurrentImages] = useState<HTMLImageElement[]>([]);

  // 1. Loading images dynamically with cache
  useEffect(() => {
    let active = true;
    if (!imageCache.current[folderPath]) {
      imageCache.current[folderPath] = [];
    }
    
    const cache = imageCache.current[folderPath];
    const imgs: HTMLImageElement[] = [...cache]; 
    
    for (let i = imgs.length + 1; i <= FRAME_COUNT; i++) {
        const img = new Image();
        img.src = `${folderPath}/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
        imgs.push(img);
        cache.push(img);
        
        // Initial draw trigger if active
        if (i === 1) {
          img.onload = () => {
            if (active) setCurrentImages([...imgs]);
          };
        }
    }
    
    setCurrentImages(imgs);
    return () => { active = false; };
  }, [folderPath]);

  // 2. High-performance draw function 
  const draw = useCallback((frameIdx: number, imgs: HTMLImageElement[] = currentImages) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false }); 
    if (!ctx) return;
    
    if (imgs.length === 0) return;
    const img = imgs[frameIdx - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    if (canvas.width !== img.naturalWidth) canvas.width = img.naturalWidth;
    if (canvas.height !== img.naturalHeight) canvas.height = img.naturalHeight;

    ctx.drawImage(img, 0, 0);
  }, [currentImages]);

  // Force redraw upon images update
  useEffect(() => {
    if (currentImages.length >= 1) {
       draw(1, currentImages);
    }
  }, [currentImages, draw]);

  // 3. Scroll hook binding
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (p) => {
      const idx = Math.max(1, Math.min(FRAME_COUNT, Math.round(p * (FRAME_COUNT - 1)) + 1));
      draw(idx);
    });
    
    // Attempt redraw just on effect setup
    const initialIdx = Math.max(1, Math.min(FRAME_COUNT, Math.round(scrollYProgress.get() * (FRAME_COUNT - 1)) + 1));
    draw(initialIdx);

    return () => unsub();
  }, [scrollYProgress, draw]);

  return (
    <div ref={containerRef} className="h-[500vh] w-full relative -z-10 bg-transparent">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Glow Background Pulse */}
        <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vmin] h-[70vmin] rounded-full blur-[130px] pointer-events-none"
            style={{ backgroundColor: themeColor }}
        />
        <canvas
          ref={canvasRef}
          className="w-full h-full object-contain z-10 transition-opacity duration-300"
        />
      </div>
    </div>
  );
}
