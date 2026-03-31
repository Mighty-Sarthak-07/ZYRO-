"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductBottleScroll from "@/components/ProductBottleScroll";
import ProductTextOverlays from "@/components/ProductTextOverlays";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import CursorGlow from "@/components/CursorGlow";
import FloatingParticles from "@/components/FloatingParticles";
import { useCart } from "@/context/CartContext";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Home() {
  const { addToCart } = useCart();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const product = products[currentIndex];

  const handleFlavorSwitch = (newIndex: number) => {
    if (newIndex === currentIndex || isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 1000);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentIndex]);

  useEffect(() => {
    // Preload first 10 frames instantly
    products.forEach(p => {
      for (let i = 1; i <= 10; i++) {
        const img = new Image();
        img.src = `${p.folderPath}/ezgif-frame-${String(i).padStart(3, "0")}.jpg`;
      }
    });
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return;
      if (e.key === "ArrowRight") {
        handleFlavorSwitch((currentIndex + 1) % products.length);
      } else if (e.key === "ArrowLeft") {
        handleFlavorSwitch((currentIndex - 1 + products.length) % products.length);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, isTransitioning]);

  return (
    <main 
      className="min-h-screen relative w-full transition-colors duration-1000"
      style={{ "--bg-gradient": product.gradient } as React.CSSProperties}
    >
      <div className="fixed inset-0 -z-50 opacity-20 pointer-events-none transition-all duration-1000" style={{ background: "var(--bg-gradient)", filter: "blur(100px)" }} />
      <LoadingOverlay isVisible={isTransitioning} targetIndex={currentIndex} />
      <CursorGlow />
      <Navbar products={products} currentIndex={currentIndex} setCurrentIndex={handleFlavorSwitch} themeColor={product.themeColor} />
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={product.id} 
          className="relative w-full"
          initial={{ opacity: 0, filter: "blur(20px)", y: 20 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          exit={{ opacity: 0, filter: "blur(20px)", y: -20 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* 1. Hero Scroll Section */}
          <section className="relative w-full">
            <ProductBottleScroll folderPath={product.folderPath} themeColor={product.themeColor} />
            <ProductTextOverlays product={product} />
          </section>

          {/* 2. Details Section */}
          <section className="relative z-10 py-32 px-8 bg-[#0A0A0A]/80 backdrop-blur-3xl w-full border-t border-white/5">
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            >
              <div className="relative h-[600px] rounded-3xl overflow-hidden group">
                <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to top right, ${product.themeColor}33, transparent)` }} />
                <img src={`${product.folderPath}/ezgif-frame-020.jpg`} alt={product.name} className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" />
              </div>
              <div className="space-y-8">
                <h2 className="text-5xl font-bold">Crafted for the <span className="drop-shadow-[0_0_10px_currentColor] transition-colors duration-500" style={{ color: product.themeColor }}>Bold</span></h2>
                <p className="text-xl text-gray-400 leading-relaxed">{product.description}. Every sip ignites your senses, delivering a rush of refreshing flavor that breaks all the rules.</p>
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                   <div>
                     <h4 className="text-3xl font-black text-white mb-2">0g</h4>
                     <p className="text-gray-500 font-medium">Sugar</p>
                   </div>
                   <div>
                     <h4 className="text-3xl font-black text-white mb-2">100%</h4>
                     <p className="text-gray-500 font-medium">Authentic Mix</p>
                   </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* 3. Freshness Section */}
          <section className="relative py-40 w-full overflow-hidden">
            <FloatingParticles />
            <div className="absolute inset-0 -z-10 opacity-30 transition-colors duration-1000" style={{ background: `radial-gradient(ellipse at center, ${product.themeColor}80, transparent 70%)` }} />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto text-center"
            >
              <div className="relative z-20">
                 <h2 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter text-white drop-shadow-2xl uppercase transition-colors duration-500">{product.name}</h2>
                 <p className="text-2xl text-gray-300 font-medium">Crack open a cold one. Feel the condensation. Experience the surge.</p>
              </div>
            </motion.div>
          </section>

          {/* 4. Buy Now Section & Final CTA */}
          <section className="py-32 relative z-10 px-8 text-center w-full" style={{ background: `linear-gradient(to bottom, transparent, ${product.themeColor}1a)` }}>
            <motion.div
               initial={{ opacity: 0, y: 50 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="max-w-2xl mx-auto space-y-12"
            >
                <h2 className="text-5xl font-bold">Ready to <span className="text-transparent bg-clip-text transition-all duration-500" style={{ backgroundImage: product.gradient }}>Taste it?</span></h2>
                <div className="flex flex-wrap justify-center gap-4">
                  <span className="px-4 py-2 rounded-full border border-white/20 font-semibold text-sm transition-colors duration-500" style={{ color: product.themeColor, borderColor: `${product.themeColor}55`, backgroundColor: `${product.themeColor}1A` }}>Vegan</span>
                  <span className="px-4 py-2 rounded-full border border-white/20 font-semibold text-sm transition-colors duration-500" style={{ color: product.themeColor, borderColor: `${product.themeColor}55`, backgroundColor: `${product.themeColor}1A` }}>Gluten Free</span>
                  <span className="px-4 py-2 rounded-full border border-white/20 font-semibold text-sm transition-colors duration-500" style={{ color: product.themeColor, borderColor: `${product.themeColor}55`, backgroundColor: `${product.themeColor}1A` }}>Zero Calories</span>
                </div>
                <div className="text-4xl font-black text-white">{product.price} <span className="text-xl text-gray-500 font-normal">/ can</span></div>
                <button 
                  onClick={() => addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: `${product.folderPath}/ezgif-frame-020.jpg`
                  })}
                  className="px-12 py-5 rounded-full text-white font-black text-xl hover:scale-105 transition-all duration-300 shadow-[0_0_30px_currentColor]"
                  style={{ backgroundImage: product.gradient, boxShadow: `0 0 30px ${product.themeColor}80` }}
                >
                   Claim Your Case Now
                </button>
            </motion.div>
          </section>
        </motion.div>
      </AnimatePresence>

      <Footer />

      {/* Home Screen Bottom Selector */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center p-2 rounded-full border border-white/10 bg-black/60 backdrop-blur-2xl shadow-2xl">
         {products.map((p, i) => (
            <button
              key={p.id}
              onClick={() => handleFlavorSwitch(i)}
              className="relative px-6 py-3 rounded-full text-sm font-bold uppercase tracking-widest transition-all overflow-hidden"
              style={{ color: i === currentIndex ? '#fff' : '#666' }}
            >
              {i === currentIndex && (
                <motion.div
                  layoutId="bottom-pill"
                  className="absolute inset-0"
                  style={{ background: p.gradient, opacity: 0.9 }}
                  transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 transition-colors duration-300 hover:text-white">{p.name.split(" ")[0]}</span>
            </button>
         ))}
      </div>
    </main>
  );
}
