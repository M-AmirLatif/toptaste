"use client";

import { useCartStore } from "@/lib/cartStore";
import { Phone, ShoppingBag, Send } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/menu";

export function MobileActionBar() {
  const { getTotalCount, openCart, getFinalTotal, isOpen } = useCartStore();
  const count = getTotalCount();
  const total = getFinalTotal();

  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F172A] text-white border-t-2 border-[#F59E0B] shadow-2xl px-3 py-2 flex items-center justify-between gap-2 safe-area-bottom transition-all duration-350 ease-out ${
        isOpen ? "translate-y-full opacity-0 pointer-events-none" : "translate-y-0 opacity-100"
      }`}
    >
      {/* Quick Call */}
      <a
        href={`tel:${RESTAURANT_INFO.phonePrimary}`}
        className="flex-1 flex items-center justify-center gap-1.5 bg-white/10 hover:bg-white/20 text-white py-2.5 px-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
      >
        <Phone className="w-3.5 h-3.5 text-[#FBBF24]" />
        <span>Call</span>
      </a>

      {/* Floating Cart Button */}
      <button
        onClick={openCart}
        className="relative flex-1 flex items-center justify-center gap-1.5 bg-[#E11D48] text-white py-2.5 px-2 rounded-xl text-xs font-extrabold shadow-md hover:bg-[#BE123C] transition-colors cursor-pointer"
      >
        <ShoppingBag className="w-4 h-4 text-[#FBBF24]" />
        <span>Cart</span>
        {count > 0 && (
          <span className="bg-[#F59E0B] text-[#0F172A] text-[10px] font-black px-1.5 py-0.5 rounded-full ml-0.5">
            {count}
          </span>
        )}
      </button>

      {/* Direct WhatsApp */}
      <a
        href={RESTAURANT_INFO.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20BD5A] text-white py-2.5 px-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
      >
        <Send className="w-3.5 h-3.5 fill-white" />
        <span>{count > 0 ? `Rs ${total}` : "WhatsApp"}</span>
      </a>
    </div>
  );
}
