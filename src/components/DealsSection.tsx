"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Tag, Check, Users, ShoppingBag, Sparkles, Share2 } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { DEALS, DealItem } from "@/data/menu";
import { SITE_URL } from "@/lib/siteUrl";

export function DealsSection() {
  const { addItem, showToast } = useCartStore();
  const [addedDealId, setAddedDealId] = useState<string | null>(null);

  const handleShareDeal = async (deal: DealItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = typeof window !== "undefined" ? `${window.location.origin}/#deals` : `${SITE_URL}/#deals`;
    const text = `Check out ${deal.title} at Top Taste Shawarma & Pizza Kasur! 🌯🍕 ${deal.description} — Only Rs ${deal.price}:`;

    if (navigator.share) {
      try {
        await navigator.share({ title: `${deal.title} | Top Taste Kasur`, text, url });
        return;
      } catch {
        // Fallback
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`${text} ${url}`);
        showToast(`Copied ${deal.title} link! Share it in any chat 🌯🍕`);
        return;
      } catch {
        // Fallback
      }
    }

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`, "_blank");
  };

  const handleAddDeal = (deal: DealItem) => {
    addItem({
      id: deal.id,
      name: deal.title,
      price: deal.price,
      image: deal.image,
      isDeal: true,
    });

    setAddedDealId(deal.id);
    setTimeout(() => setAddedDealId(null), 1000);
  };

  return (
    <section id="deals" className="py-8 sm:py-16 md:py-20 bg-[#FEF3C7]/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E11D48] text-white text-xs font-black uppercase tracking-wider shadow">
            <Tag className="w-3.5 h-3.5 text-[#FBBF24]" />
            <span>Mega Savings • Top Taste Value Deals</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#0F172A] leading-tight">
            Exclusive Value Combo Deals
          </h2>
          <p className="text-sm sm:text-base text-[#64748B]">
            Carefully curated party deals and solo combos designed for maximum flavor and huge savings. Prepared fresh to order at Baldia Chowk, Kasur!
          </p>
        </div>

        {/* 4 Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEALS.map((deal, index) => {
            const isAdded = addedDealId === deal.id;
            const isFeatured = index === 2 || index === 3;

            return (
              <motion.div
                key={deal.id}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.25 }}
                className={`rounded-3xl p-5 flex flex-col justify-between transition-all relative group ${
                  isFeatured
                    ? "bg-[#FCFBF7] border-2 border-[#E11D48] shadow-xl"
                    : "bg-white border border-[#E11D48]/15 shadow-md hover:shadow-xl"
                }`}
              >
                {/* Popular Pill */}
                {deal.badge && (
                  <div className="absolute -top-3 left-6 bg-[#F59E0B] text-[#0F172A] px-3 py-0.5 rounded-full text-[11px] font-black uppercase tracking-wider shadow-md flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#E11D48]" />
                    <span>{deal.badge}</span>
                  </div>
                )}

                <div>
                  {/* Deal Image */}
                  <div
                    className="relative aspect-[16/11] rounded-2xl overflow-hidden mb-4 bg-gray-100"
                    style={{ position: "relative" }}
                  >
                    <Image
                      src={deal.image}
                      alt={deal.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Share Button */}
                    <button
                      onClick={(e) => handleShareDeal(deal, e)}
                      aria-label={`Share ${deal.title}`}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-[#E11D48] transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <Share2 className="w-3 h-3" />
                    </button>

                    {/* Serves Pill */}
                    <div className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold">
                      <Users className="w-3 h-3 text-[#FBBF24]" />
                      <span>{deal.serves}</span>
                    </div>
                  </div>

                  {/* Title & Price */}
                  <div className="space-y-1 mb-3">
                    <h3 className="text-base font-display text-[#0F172A] leading-tight">
                      {deal.title}
                    </h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-display text-[#E11D48]">
                        Rs {deal.price.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {deal.description}
                    </p>
                  </div>

                  {/* Itemized List */}
                  <div className="space-y-1.5 py-3 border-t border-gray-100 mb-4">
                    <span className="text-[10px] font-black uppercase text-[#64748B] tracking-wider block mb-1">
                      Included in this feast:
                    </span>
                    {deal.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2 text-xs text-[#334155] font-medium"
                      >
                        <Check className="w-3.5 h-3.5 text-[#E11D48] shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Add Deal Button */}
                <button
                  onClick={() => handleAddDeal(deal)}
                  className={`w-full py-3 px-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow ${
                    isAdded
                      ? "bg-emerald-600 text-white"
                      : isFeatured
                      ? "bg-[#E11D48] hover:bg-[#BE123C] text-white shadow-lg shadow-[#E11D48]/20"
                      : "bg-[#0F172A] hover:bg-[#E11D48] text-white"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Deal Added!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#FBBF24]" />
                      <span>Order This Deal</span>
                    </>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
