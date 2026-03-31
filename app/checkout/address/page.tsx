"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AddressPage() {
  const { items, discount } = useCart();
  const router = useRouter();

  const total = items.reduce((sum, item) => {
    const priceStr = item.price.replace(/[^0-9.]/g, "");
    return sum + (parseFloat(priceStr) || 0) * item.quantity;
  }, 0);

  const discountedTotal = total - (total * discount);
  const deliveryFee = discountedTotal > 0 && discountedTotal < 300 ? 40 : 0;
  const finalTotal = discountedTotal + deliveryFee;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/checkout/payment");
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Store
          </Link>
        </div>

        <div className="flex items-center gap-3 mb-10">
          <MapPin className="text-[#C2185B] w-8 h-8" />
          <h1 className="text-4xl font-black uppercase tracking-wider">Shipping Address</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">First Name</label>
                  <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#C2185B] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Last Name</label>
                  <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#C2185B] transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Email Address</label>
                <input required type="email" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#C2185B] transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-400 mb-2">Street Address</label>
                <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#C2185B] transition-colors mb-3" placeholder="Street layout, company name, c/o" />
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#C2185B] transition-colors" placeholder="Apartment, suite, unit, building, floor, etc." />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">City</label>
                  <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#C2185B] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">State / Province</label>
                  <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#C2185B] transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">ZIP / Postal Code</label>
                  <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#C2185B] transition-colors" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-400 mb-2">Phone</label>
                  <input required type="tel" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-[#C2185B] transition-colors" />
                </div>
              </div>

              <button type="submit" className="w-full mt-8 py-4 rounded-xl bg-white text-black font-black text-xl tracking-wide hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                Proceed to Payment
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-[#0A0A0A] p-8 rounded-3xl border border-white/10 sticky top-12">
              <h2 className="text-2xl font-bold mb-6 pb-6 border-b border-white/10">Order Summary</h2>
              
              <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-4">
                {items.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty.</p>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4">
                      <div className="relative">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-white/5" />
                        <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-black border border-white/20 flex items-center justify-center text-xs font-bold">{item.quantity}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold">{item.name}</p>
                        <p className="text-gray-400 text-sm">{item.price}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-4 pt-6 border-t border-white/10">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
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
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-3xl font-black text-[#C2185B]">₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
