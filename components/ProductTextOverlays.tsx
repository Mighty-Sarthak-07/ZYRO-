"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useCart } from "@/context/CartContext";

interface Props {
  product: any;
}

export default function ProductTextOverlays({ product }: Props) {
  const { addToCart } = useCart();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const sec1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 1, 0]);
  const sec1Y = useTransform(scrollYProgress, [0, 0.1, 0.2], [50, 0, -50]);

  const sec2Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [0, 1, 0]);
  const sec2Y = useTransform(scrollYProgress, [0.2, 0.3, 0.4], [50, 0, -50]);

  const sec3Opacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 1, 0]);
  const sec3Y = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [50, 0, -50]);

  const sec4Opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [0, 1, 0]);
  const sec4Y = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [50, 0, -50]);

  return (
    <div ref={containerRef} className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none z-20">
       <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
         {/* Section 1 */}
         <motion.div style={{ opacity: sec1Opacity, y: sec1Y }} className="absolute left-[5%] md:left-[15%] max-w-sm text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent transition-all duration-500" style={{ backgroundImage: product.gradient }}>Feel the Zing</h2>
            <p className="text-lg md:text-xl text-gray-300">{product.description}. Maximum energy, zero compromises.</p>
         </motion.div>
         
         {/* Section 2 */}
         <motion.div style={{ opacity: sec2Opacity, y: sec2Y }} className="absolute right-[5%] md:right-[15%] max-w-sm text-right">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent transition-all duration-500" style={{ backgroundImage: product.gradient }}>Electrifying Taste</h2>
            <p className="text-lg md:text-xl text-gray-300">A revolutionary refreshment that breaks the rules of conventional sodas.</p>
         </motion.div>

         {/* Section 3 */}
         <motion.div style={{ opacity: sec3Opacity, y: sec3Y }} className="absolute left-[5%] md:left-[15%] max-w-sm text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent transition-all duration-500" style={{ backgroundImage: product.gradient }}>Real Ingredients</h2>
            <p className="text-lg md:text-xl text-gray-300">Sourced responsibly and packed with bold flavor profiles like no other.</p>
         </motion.div>

         {/* Section 4 */}
         <motion.div style={{ opacity: sec4Opacity, y: sec4Y }} className="absolute right-[5%] md:right-[15%] max-w-sm text-right flex flex-col items-end">
            <h2 className="text-5xl md:text-6xl font-black mb-6 uppercase tracking-wider drop-shadow-[0_0_15px_currentColor] transition-colors duration-500" style={{ color: product.themeColor }}>Open Energy</h2>
            <button 
              onClick={() => addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: `${product.folderPath}/ezgif-frame-020.jpg`
              })}
              className="px-8 py-3 rounded-full bg-white text-black font-bold text-lg pointer-events-auto hover:scale-105 transition-transform flex items-center gap-2"
            >
               Get {product.name.split(" ")[0]} Now
            </button>
         </motion.div>
       </div>
    </div>
  );
}
