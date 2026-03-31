"use client";

import { motion } from "framer-motion";
import { Zap, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface NavbarProps {
  products: any[];
  currentIndex: number;
  setCurrentIndex: (i: number) => void;
  themeColor: string;
}

export default function Navbar({ products, currentIndex, setCurrentIndex, themeColor }: NavbarProps) {
  const currentProduct = products[currentIndex];
  const { addToCart, toggleCart, items } = useCart();
  const cartItemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const handleBuyNow = () => {
    addToCart({
      id: currentProduct.id,
      name: currentProduct.name,
      price: currentProduct.price,
      image: `${currentProduct.folderPath}/ezgif-frame-020.jpg`
    });
  };
  
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-xl border-b border-white/10"
    >
      <div className="flex items-center gap-2 cursor-pointer group">
        <motion.div 
          whileHover={{ rotate: 15, scale: 1.1 }}
          style={{ color: themeColor }}
        >
          <Zap size={28} fill="currentColor" />
        </motion.div>
        <span className="text-2xl font-bold bg-clip-text text-transparent transition-all duration-500" style={{ backgroundImage: currentProduct.gradient }}>
          ZYRO
        </span>
      </div>

      {/* Horizontal Drink list selector */}
      <div className="hidden md:flex items-center bg-black/40 rounded-full p-1 border border-white/10">
         {products.map((p, i) => (
           <button 
             key={p.id}
             onClick={() => setCurrentIndex(i)}
             className={`relative px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${i === currentIndex ? "text-white" : "text-gray-400 hover:text-white"}`}
           >
             {i === currentIndex && (
               <motion.div 
                 layoutId="nav-pill"
                 className="absolute inset-0 rounded-full"
                 style={{ background: p.gradient, opacity: 0.8 }}
                 transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
               />
             )}
             <span className="relative z-10">{p.name}</span>
           </button>
         ))}
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={toggleCart} 
          className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
        >
          <ShoppingBag size={24} className="text-white" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-zyroRed text-white text-[10px] font-bold flex items-center justify-center rounded-full pointer-events-none">
              {cartItemCount}
            </span>
          )}
        </button>
        
        <motion.button 
          onClick={handleBuyNow}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="hidden md:block relative px-6 py-2 rounded-full text-white font-semibold transition-all overflow-hidden group"
          style={{ backgroundColor: themeColor, boxShadow: `0 0 20px ${themeColor}80` }}
        >
        <span className="relative z-10">Buy Now</span>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: currentProduct.gradient }} />
        </motion.button>
      </div>
    </motion.nav>
  );
}
