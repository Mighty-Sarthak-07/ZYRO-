"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { ArrowLeft, CreditCard, Wallet, Banknote, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const { items, discount } = useCart();
  const [selectedMethod, setSelectedMethod] = useState("card");
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const total = items.reduce((sum, item) => {
    const priceStr = item.price.replace(/[^0-9.]/g, "");
    return sum + (parseFloat(priceStr) || 0) * item.quantity;
  }, 0);

  const discountedTotal = total - (total * discount);
  const deliveryFee = discountedTotal > 0 && discountedTotal < 300 ? 40 : 0;
  const finalTotal = discountedTotal + deliveryFee;

  const handlePayment = () => {
    setIsSuccess(true);
    setTimeout(() => {
      router.push("/");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-12 px-6">
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="flex flex-col items-center text-center p-8 bg-white/5 rounded-3xl border border-white/10"
            >
              <CheckCircle2 className="w-24 h-24 text-green-500 mb-6" />
              <h2 className="text-4xl font-black mb-4">Payment Successful!</h2>
              <p className="text-gray-400 text-lg mb-8">Your order is confirmed and will be shipped soon.</p>
              <div className="animate-pulse text-sm text-gray-500 tracking-widest uppercase font-bold">Redirecting to store...</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/checkout/address" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Address
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-10">
          <CreditCard className="text-[#1565C0] w-8 h-8" />
          <h1 className="text-4xl font-black uppercase tracking-wider">Payment Method</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Methods Section */}
          <div className="space-y-6">
            <button 
              onClick={() => setSelectedMethod("card")}
              className={`w-full flex items-center p-6 border rounded-2xl transition-all ${selectedMethod === "card" ? "border-[#1565C0] bg-[#1565C0]/10 shadow-[0_0_20px_rgba(21,101,192,0.2)]" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
            >
              <div className="flex-1 text-left">
                <div className="flex items-center gap-3">
                  <CreditCard className={`w-6 h-6 ${selectedMethod === "card" ? "text-[#1565C0]" : "text-gray-400"}`} />
                  <span className="text-xl font-bold">Credit / Debit Card</span>
                </div>
                <p className="text-sm text-gray-400 mt-2 pl-9">Pay securely with Visa, Mastercard, or Amex</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === "card" ? "border-[#1565C0]" : "border-gray-500"}`}>
                {selectedMethod === "card" && <div className="w-3 h-3 rounded-full bg-[#1565C0]" />}
              </div>
            </button>

            {selectedMethod === "card" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-white/5 border border-white/10 p-6 rounded-2xl space-y-4">
                <div>
                   <label className="block text-sm font-semibold text-gray-400 mb-2">Card Number</label>
                   <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#1565C0] transition-colors font-mono" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-sm font-semibold text-gray-400 mb-2">Expiry Date</label>
                     <input type="text" placeholder="MM/YY" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#1565C0] transition-colors font-mono" />
                   </div>
                   <div>
                     <label className="block text-sm font-semibold text-gray-400 mb-2">CVV</label>
                     <input type="password" placeholder="XXX" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#1565C0] transition-colors font-mono" />
                   </div>
                </div>
              </motion.div>
            )}

            <button 
              onClick={() => setSelectedMethod("upi")}
              className={`w-full flex items-center p-6 border rounded-2xl transition-all ${selectedMethod === "upi" ? "border-[#558B2F] bg-[#558B2F]/10 shadow-[0_0_20px_rgba(85,139,47,0.2)]" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
            >
               <div className="flex-1 text-left">
                <div className="flex items-center gap-3">
                  <Wallet className={`w-6 h-6 ${selectedMethod === "upi" ? "text-[#558B2F]" : "text-gray-400"}`} />
                  <span className="text-xl font-bold">UPI</span>
                </div>
                <p className="text-sm text-gray-400 mt-2 pl-9">Google Pay, PhonePe, Paytm</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === "upi" ? "border-[#558B2F]" : "border-gray-500"}`}>
                {selectedMethod === "upi" && <div className="w-3 h-3 rounded-full bg-[#558B2F]" />}
              </div>
            </button>

            {selectedMethod === "upi" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-white/5 border border-white/10 p-6 rounded-2xl">
                 <label className="block text-sm font-semibold text-gray-400 mb-2">Enter UPI ID</label>
                 <input type="text" placeholder="username@upi" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#558B2F] transition-colors" />
              </motion.div>
            )}

            <button 
              onClick={() => setSelectedMethod("cod")}
              className={`w-full flex items-center p-6 border rounded-2xl transition-all ${selectedMethod === "cod" ? "border-[#FFB300] bg-[#FFB300]/10 shadow-[0_0_20px_rgba(255,179,0,0.2)]" : "border-white/10 bg-white/5 hover:bg-white/10"}`}
            >
               <div className="flex-1 text-left">
                <div className="flex items-center gap-3">
                  <Banknote className={`w-6 h-6 ${selectedMethod === "cod" ? "text-[#FFB300]" : "text-gray-400"}`} />
                  <span className="text-xl font-bold">Cash on Delivery</span>
                </div>
                <p className="text-sm text-gray-400 mt-2 pl-9">Pay at your doorstep</p>
              </div>
              <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedMethod === "cod" ? "border-[#FFB300]" : "border-gray-500"}`}>
                {selectedMethod === "cod" && <div className="w-3 h-3 rounded-full bg-[#FFB300]" />}
              </div>
            </button>
          </div>

          {/* Order Summary & CTA */}
          <div>
             <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 sticky top-12">
               <h2 className="text-2xl font-bold mb-6 pb-6 border-b border-white/10">Order Summary</h2>
              
               <div className="space-y-4 pt-4">
                 <div className="flex justify-between text-gray-400">
                   <span>Items ({items.reduce((s,i) => s + i.quantity, 0)})</span>
                   <span className="text-white font-medium">₹{total.toFixed(2)}</span>
                 </div>
                 {discount > 0 && (
                  <div className="flex justify-between text-green-400">
                    <span>Discount (20%)</span>
                    <span>-₹{(total * discount).toFixed(2)}</span>
                  </div>
                 )}
                 <div className="flex justify-between text-gray-400">
                   <span>Delivery Fee</span>
                   <span className="text-white font-medium">
                     {discountedTotal > 0 && discountedTotal < 300 ? "₹40.00" : "Free"}
                   </span>
                 </div>
                 <div className="flex justify-between pt-6 border-t border-white/10">
                   <span className="text-xl font-bold">Total to Pay</span>
                   <span className="text-3xl font-black text-[#1565C0]">₹{finalTotal.toFixed(2)}</span>
                 </div>
               </div>

               <button 
                 onClick={handlePayment}
                 disabled={items.length === 0}
                 className="w-full mt-8 py-5 rounded-2xl bg-white text-black font-black text-xl tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
               >
                 Confirm Order • ₹{finalTotal.toFixed(2)}
               </button>
               <p className="text-center text-xs text-gray-500 mt-4 opacity-60">End-to-End Encrypted. Mock Application.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
