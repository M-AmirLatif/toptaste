"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Plus, Star, Flame, Sparkles, Check, Share2 } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { MENU_ITEMS, MenuItem } from "@/data/menu";
import { SITE_URL } from "@/lib/siteUrl";

// 6 featured signature dishes of Top Taste Shawarma & Pizza
const SIGNATURE_IDS = [
  "top-taste-special-shawarma",
  "crown-crust-pizza",
  "special-chicken-karahi",
  "pizza-burger",
  "chicken-platter-shawarma",
  "beef-burger",
];

const ITEM_HIGHLIGHTS: Record<string, string[]> = {
  "top-taste-special-shawarma": ["Melted Cheese", "Spiced Loaded Chicken", "Signature Garlic Dip"],
  "crown-crust-pizza": ["Crown Shaped Crust", "Stuffed Kabab Bites", "Double Mozzarella"],
  "special-chicken-karahi": ["Fresh Desi Tomatoes", "Ginger Juliennes", "Desi Wok Butter"],
  "pizza-burger": ["Pizza Marinara Sauce", "Melted Mozzarella", "Olives & Herbs"],
  "chicken-platter-shawarma": ["Huge Chicken Mountain", "2 Pita Breads", "Fries & Garlic Dips"],
  "beef-burger": ["100% Prime Grilled Beef", "Melted Cheddar", "Secret Sauce"],
};

export function BestSellers() {
  const { addItem, showToast } = useCartStore();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedItemAnim, setAddedItemAnim] = useState<string | null>(null);

  const handleShareItem = async (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = typeof window !== "undefined" ? window.location.origin : SITE_URL;
    const text = `Check out ${item.name} at Top Taste Shawarma & Pizza Kasur! 🌯🍕 ${item.description} — Only Rs ${item.price}:`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: `${item.name} | Top Taste Kasur`, text, url });
        return;
      } catch {
        // Fallback
      }
    }
    
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`${text} ${url}`);
        showToast(`Copied ${item.name} link! Share it in any chat 🌯🍕`);
        return;
      } catch {
        // Fallback
      }
    }

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`, "_blank");
  };

  const signatureItems = MENU_ITEMS.filter((item) =>
    SIGNATURE_IDS.includes(item.id)
  );

  const handleAddToCart = (item: MenuItem) => {
    const chosenSizeName = selectedSizes[item.id] || (item.sizes ? item.sizes[0].name : undefined);
    const chosenPrice = item.sizes
      ? item.sizes.find((s) => s.name === chosenSizeName)?.price || item.price
      : item.price;

    addItem({
      id: item.id,
      name: item.name,
      price: chosenPrice,
      sizeName: chosenSizeName,
      flavour: item.flavours ? item.flavours[0] : undefined,
      image: item.image,
    });

    setAddedItemAnim(item.id);
    setTimeout(() => setAddedItemAnim(null), 900);
  };

  return (
    <section id="signatures" className="py-8 sm:py-16 md:py-20 bg-[#FCFBF7] relative overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#F59E0B]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/40 text-xs font-black text-[#E11D48] uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-[#E11D48] fill-[#E11D48]" />
            <span>Kasur&apos;s Most Demanded Tastes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#0F172A] leading-tight">
            Top Taste Signatures &amp; Best Sellers
          </h2>
          <p className="text-sm sm:text-base text-[#64748B]">
            From our iconic Special Shawarma and Crown Crust Pizza to sizzling desi Karahi and juicy beef burgers, these are the all-time favorites celebrated across Kasur.
          </p>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {signatureItems.map((item) => {
            const isAdded = addedItemAnim === item.id;
            const currentSize =
              selectedSizes[item.id] || (item.sizes ? item.sizes[0].name : undefined);
            const displayPrice = item.sizes
              ? item.sizes.find((s) => s.name === currentSize)?.price || item.price
              : item.price;
            const highlights = ITEM_HIGHLIGHTS[item.id] || [];

            return (
              <motion.div
                key={item.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl overflow-hidden border border-[#E11D48]/15 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Image Container with Badges */}
                  <div
                    className="relative aspect-[16/10] overflow-hidden bg-[#FEF3C7]/40"
                    style={{ position: "relative" }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                    {/* Badge Pill */}
                    {item.badge && (
                      <div className="absolute top-3 left-3 bg-[#E11D48] text-white px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider shadow flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#FBBF24]" />
                        <span>{item.badge}</span>
                      </div>
                    )}

                    {/* Share Button */}
                    <button
                      onClick={(e) => handleShareItem(item, e)}
                      aria-label={`Share ${item.name}`}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-[#E11D48] transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Price Tag in Image */}
                    <div className="absolute bottom-3 right-3 px-3 py-1 rounded-xl bg-[#0F172A]/90 backdrop-blur-md text-[#FBBF24] font-display text-base font-black shadow border border-[#F59E0B]/30">
                      Rs {displayPrice.toLocaleString()}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-display text-[#0F172A] leading-tight group-hover:text-[#E11D48] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* 3 Highlights chips */}
                    {highlights.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {highlights.map((h, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-[#FEF3C7] text-[#92400E] text-[10px] font-bold border border-[#F59E0B]/30"
                          >
                            ✓ {h}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Sizes Selection if applicable */}
                    {item.sizes && (
                      <div className="pt-2">
                        <span className="block text-[10px] font-black uppercase text-[#64748B] mb-1.5">
                          Select Size:
                        </span>
                        <div className="grid grid-cols-3 gap-1.5">
                          {item.sizes.map((sz) => (
                            <button
                              key={sz.name}
                              type="button"
                              onClick={() =>
                                setSelectedSizes((prev) => ({
                                  ...prev,
                                  [item.id]: sz.name,
                                }))
                              }
                              className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all border ${
                                currentSize === sz.name
                                  ? "bg-[#E11D48] text-white border-[#E11D48] shadow-sm"
                                  : "bg-[#FCFBF7] text-[#334155] border-gray-200 hover:border-[#E11D48]/40"
                              }`}
                            >
                              <div className="text-[11px] leading-tight">{sz.name}</div>
                              <div className="text-[10px] opacity-80">Rs {sz.price}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Add to Cart CTA */}
                <div className="p-5 pt-0">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className={`w-full py-3 px-4 rounded-2xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                      isAdded
                        ? "bg-emerald-600 text-white"
                        : "bg-[#0F172A] hover:bg-[#E11D48] text-[#FCFBF7]"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 text-[#FBBF24]" />
                        <span>Add To Order • Rs {displayPrice.toLocaleString()}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
