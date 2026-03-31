"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Tag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function CartDrawer() {
  const { isCartOpen, toggleCart, items, updateQuantity, removeFromCart, discount, setDiscount, couponCode, setCouponCode } = useCart();
  const [couponMessage, setCouponMessage] = useState({ text: "", type: "" });

  const total = items.reduce((sum, item) => {
    const priceStr = item.price.replace(/[^0-9.]/g, "");
    const price = parseFloat(priceStr) || 0;
    return sum + price * item.quantity;
  }, 0);

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === "ZYRO20") {
      setDiscount(0.20);
      setCouponMessage({ text: "Coupon applied! 20% off.", type: "success" });
    } else {
      setDiscount(0);
      setCouponMessage({ text: "Invalid coupon code.", type: "error" });
    }
  };

  const removeCoupon = () => {
    setCouponCode("");
    setDiscount(0);
    setCouponMessage({ text: "", type: "" });
  };

  const discountedTotal = total - (total * discount);
  const deliveryFee = discountedTotal > 0 && discountedTotal < 300 ? 40 : 0;
  const finalTotal = discountedTotal + deliveryFee;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-[#0A0A0A] border-l border-white/10 shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <ShoppingBag /> Your Cart
              </h2>
              <button 
                onClick={toggleCart}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <ShoppingBag size={48} className="mb-4 opacity-50" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center bg-white/5 p-4 rounded-xl border border-white/5">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-gray-400">{item.price}</p>
                      
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center bg-black rounded-lg border border-white/10 overflow-hidden">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-white/10 transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-white/10 transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-xs text-[#B71C1C] hover:underline ml-auto"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-[#050505] space-y-6">
                
                {/* Coupon Section */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                      <Tag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
                      <input 
                        type="text" 
                        placeholder="Coupon Code" 
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        disabled={discount > 0}
                        className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 outline-none focus:border-white/30 transition-colors uppercase text-sm font-semibold tracking-wider placeholder:normal-case placeholder:font-normal placeholder:tracking-normal disabled:opacity-50"
                      />
                    </div>
                    {discount > 0 ? (
                      <button onClick={removeCoupon} className="px-5 py-3 bg-red-500/10 text-red-500 rounded-xl text-sm font-bold hover:bg-red-500/20 transition-colors border border-red-500/20">
                        Remove
                      </button>
                    ) : (
                      <button onClick={handleApplyCoupon} className="px-5 py-3 bg-white/10 text-white rounded-xl text-sm font-bold hover:bg-white/20 transition-colors border border-white/20">
                        Apply
                      </button>
                    )}
                  </div>
                  {couponMessage.text && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className={`text-xs font-bold pl-2 ${couponMessage.type === "success" ? "text-green-400" : "text-red-400"}`}
                    >
                      {couponMessage.text}
                    </motion.p>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-medium text-white">₹{total.toFixed(2)}</span>
                  </div>
                  {discount > 0 && (
                     <div className="flex items-center justify-between text-green-400">
                       <span className="font-medium">Discount (20%)</span>
                       <span className="font-bold">-₹{(total * discount).toFixed(2)}</span>
                     </div>
                  )}
                  {discountedTotal > 0 && (
                    <div className="flex items-center justify-between text-gray-400">
                      <span>Delivery Fee</span>
                      <span className="font-medium text-white">{deliveryFee === 0 ? "Free" : `₹${deliveryFee.toFixed(2)}`}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-lg font-bold text-gray-300">Total</span>
                    <span className="text-3xl font-black text-white">₹{finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Link 
                  href="/checkout/address"
                  onClick={toggleCart}
                  className="w-full py-4 mt-2 rounded-xl bg-white text-black font-black text-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                >
                  Checkout Now
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
