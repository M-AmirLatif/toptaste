"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Search, Plus, Check, Star, Sparkles, X, Share2 } from "lucide-react";
import { useCartStore } from "@/lib/cartStore";
import { MENU_ITEMS, CATEGORIES, MenuItem } from "@/data/menu";
import { SITE_URL } from "@/lib/siteUrl";

export function MenuSection() {
  const { addItem, showToast } = useCartStore();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [addedItemAnim, setAddedItemAnim] = useState<string | null>(null);

  // Filter items based on active category and search query
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === "all"
          ? true
          : item.category === activeCategory;

      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleShareItem = async (item: MenuItem, e: React.MouseEvent) => {
    e.stopPropagation();
    const url = typeof window !== "undefined" ? window.location.origin : SITE_URL;
    const text = `Order ${item.name} at Top Taste Shawarma & Pizza Kasur! 🌯🍕 Only Rs ${item.price}:`;

    if (navigator.share) {
      try {
        await navigator.share({ title: item.name, text, url });
        return;
      } catch {
        // Fallback
      }
    }

    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(`${text} ${url}`);
        showToast(`Copied ${item.name} link!`);
        return;
      } catch {
        // Fallback
      }
    }

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`${text} ${url}`)}`, "_blank");
  };

  const handleAddToCart = (item: MenuItem) => {
    const currentSize =
      selectedSizes[item.id] || (item.sizes ? item.sizes[0].name : undefined);

    const price = item.sizes
      ? item.sizes.find((s) => s.name === currentSize)?.price || item.price
      : item.price;

    addItem({
      id: item.id,
      name: item.name,
      price,
      sizeName: currentSize,
      image: item.image,
    });

    setAddedItemAnim(item.id);
    setTimeout(() => setAddedItemAnim(null), 900);
  };

  return (
    <section id="menu" className="py-8 sm:py-16 md:py-20 bg-[#FCFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/40 text-xs font-black text-[#E11D48] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
            <span>Official Dining, Takeout &amp; Delivery Menu</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#0F172A] leading-tight">
            Explore The Complete Menu
          </h2>
          <p className="text-sm sm:text-base text-[#64748B]">
            From loaded Shawarmas, Crown Crust Pizzas, and Smash Burgers to aromatic Karahis, Handis, Steaks &amp; Charcoal BBQ — all prepared fresh with 100% Halal premium ingredients.
          </p>
        </div>

        {/* Sticky Search & Category Bar */}
        <div className="sticky top-[68px] z-20 bg-[#FCFBF7]/95 backdrop-blur-md py-3.5 px-3 sm:px-5 rounded-2xl border border-[#E11D48]/15 shadow-md mb-8 space-y-3">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search shawarma, pizza, karahi, handi, burger, bbq..."
              className="w-full pl-10 pr-10 py-2.5 rounded-full border border-gray-200 bg-white text-xs sm:text-sm text-[#0F172A] placeholder-gray-400 focus:outline-none focus:border-[#E11D48] focus:ring-2 focus:ring-[#E11D48]/20 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Chips Bar: Scrollable */}
          <div className="w-full overflow-x-auto pb-1 pt-0.5 scrollbar-none scroll-smooth">
            <div className="flex items-center gap-2 whitespace-nowrap min-w-max px-1">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5 shadow-xs ${
                      isActive
                        ? "bg-[#E11D48] text-white shadow-md shadow-[#E11D48]/25 scale-102"
                        : "bg-white text-[#475569] border border-gray-200 hover:border-[#E11D48]/40 hover:bg-[#FEF3C7]/40"
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 px-1">
          <p className="text-xs sm:text-sm text-[#64748B] font-bold">
            Showing <span className="text-[#E11D48] font-black">{filteredItems.length}</span> delicious dishes
          </p>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs font-bold text-[#E11D48] hover:underline cursor-pointer"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => {
            const isAdded = addedItemAnim === item.id;
            const currentSize =
              selectedSizes[item.id] || (item.sizes ? item.sizes[0].name : undefined);
            const displayPrice = item.sizes
              ? item.sizes.find((s) => s.name === currentSize)?.price || item.price
              : item.price;

            return (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl overflow-hidden border border-[#E11D48]/15 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Item Image */}
                  <div
                    className="relative aspect-[16/11] overflow-hidden bg-[#FEF3C7]/30"
                    style={{ position: "relative" }}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Badge Pill */}
                    {item.badge && (
                      <div className="absolute top-2.5 left-2.5 bg-[#E11D48] text-white px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow">
                        {item.badge}
                      </div>
                    )}

                    {/* Share Button */}
                    <button
                      onClick={(e) => handleShareItem(item, e)}
                      aria-label={`Share ${item.name}`}
                      className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-white hover:text-[#E11D48] transition-colors flex items-center justify-center cursor-pointer"
                    >
                      <Share2 className="w-3 h-3" />
                    </button>

                    {/* Price Tag in Image */}
                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-lg bg-[#0F172A]/90 backdrop-blur-md text-[#FBBF24] font-display text-sm font-black shadow border border-[#F59E0B]/30">
                      Rs {displayPrice.toLocaleString()}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2">
                    <h3 className="text-sm sm:text-base font-display text-[#0F172A] leading-tight group-hover:text-[#E11D48] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2">
                      {item.description}
                    </p>

                    {/* Sizes Selection */}
                    {item.sizes && (
                      <div className="pt-2">
                        <span className="block text-[10px] font-black uppercase text-[#64748B] mb-1">
                          Size Options:
                        </span>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
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
                              className={`py-1 px-1.5 rounded-lg text-[10px] font-bold transition-all border text-center ${
                                currentSize === sz.name
                                  ? "bg-[#E11D48] text-white border-[#E11D48] shadow-xs"
                                  : "bg-[#FCFBF7] text-[#475569] border-gray-200 hover:border-[#E11D48]/40"
                              }`}
                            >
                              <div className="truncate">{sz.name}</div>
                              <div className="opacity-90">Rs {sz.price}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Add to Cart CTA */}
                <div className="p-4 pt-0">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className={`w-full py-2.5 px-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-sm ${
                      isAdded
                        ? "bg-emerald-600 text-white"
                        : "bg-[#0F172A] hover:bg-[#E11D48] text-white"
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5 text-[#FBBF24]" />
                        <span>Add • Rs {displayPrice.toLocaleString()}</span>
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
