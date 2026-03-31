"use client";

import { motion } from "framer-motion";
import { products } from "@/data/products";

interface LoadingOverlayProps {
  isVisible: boolean;
  targetIndex: number | null;
}

export default function LoadingOverlay({ isVisible, targetIndex }: LoadingOverlayProps) {
  const targetProduct = targetIndex !== null ? products[targetIndex] : products[0];

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505]/95 backdrop-blur-3xl transition-all duration-500 ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {isVisible && (
        <>
          {/* Background Pulse */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.2 }}
            exit={{ opacity: 0 }}
            transition={{ repeat: Infinity, duration: 2, repeatType: "reverse", ease: "easeInOut" }}
            className="absolute w-96 h-96 rounded-full blur-[100px]"
            style={{ backgroundColor: targetProduct.themeColor }}
          />

          <div className="relative z-10 flex flex-col items-center gap-8">
            {/* Spinning ring loader */}
            <div className="relative flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                className="w-24 h-24 rounded-full border-4 border-white/5 border-t-transparent"
                style={{ borderTopColor: targetProduct.themeColor }}
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="absolute w-16 h-16 rounded-full border-4 border-white/5 border-b-transparent"
                style={{ borderBottomColor: targetProduct.themeColor }}
              />
               <motion.div 
                 initial={{ scale: 0.5, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 transition={{ delay: 0.2 }}
                 className="absolute w-4 h-4 rounded-full"
                 style={{ backgroundColor: targetProduct.themeColor, boxShadow: `0 0 20px ${targetProduct.themeColor}` }}
               />
            </div>

            {/* Loading text */}
            <div className="flex flex-col items-center gap-2">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-white drop-shadow-2xl"
              >
                Switching to
              </motion.div>
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl font-black tracking-widest uppercase"
                style={{ color: targetProduct.themeColor, textShadow: `0 0 30px ${targetProduct.themeColor}80` }}
              >
                {targetProduct.name}
              </motion.div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
