"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useTypewriter } from "@/hooks/useTypewriter";
import { getRestaurantStatus } from "@/lib/restaurantStatus";
import {
  Star,
  Truck,
  Send,
  ChevronDown,
  Flame,
  Phone,
  Utensils,
  MapPin,
  Clock,
} from "lucide-react";
import { RESTAURANT_INFO } from "@/data/menu";

const TYPEWRITER_WORDS = [
  "Special Shawarma & Platters.",
  "Crown Crust & Lazania Pizza.",
  "Desi Chicken Karahi & Handi.",
  "Juicy Burgers & BBQ Grills!",
];

export function Hero() {
  const { currentText, isReducedMotion } = useTypewriter({
    words: TYPEWRITER_WORDS,
    typingSpeed: 80,
    deletingSpeed: 40,
    pauseDuration: 1800,
  });

  const [status, setStatus] = useState({
    isOpen: true,
    statusText: "Open Now • Closes 1:00 AM",
    badgeLabel: "Open Now",
  });

  useEffect(() => {
    setStatus(getRestaurantStatus());
    const interval = setInterval(() => setStatus(getRestaurantStatus()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="home"
      className="relative pt-20 sm:pt-24 pb-8 sm:pb-16 overflow-hidden bg-gradient-to-b from-[#FEF3C7]/60 via-[#FCFBF7] to-[#FCFBF7]"
      aria-label="Hero Introduction"
    >
      {/* Decorative Warm Backdrops */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[360px] bg-[#F59E0B]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-36 right-10 w-[320px] h-[320px] bg-[#E11D48]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
          {/* Left Column: Copy, Typing Headline & CTAs */}
          <motion.div
            initial={isReducedMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="lg:col-span-7 space-y-4 sm:space-y-6 text-center lg:text-left pt-1 lg:pt-0"
          >
            {/* Mascot Emblem & Subtitle */}
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div
                className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-full border-2 border-[#F59E0B] shadow-md overflow-hidden bg-[#0F172A] shrink-0 hover:scale-105 transition-transform"
                style={{ position: "relative" }}
              >
                <Image
                  src="/mascot-badge.svg"
                  alt="Top Taste Shawarma & Pizza Kasur Mascot"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-left">
                <span className="block text-[11px] sm:text-xs font-black uppercase tracking-wider text-[#E11D48]">
                  Baldia Chowk, Kasur • Food Street Landmark
                </span>
                <span className="text-xs sm:text-sm font-extrabold text-[#0F172A] italic">
                  &ldquo;Famous Shawarma, Sizzling Pizza, BBQ &amp; Karahi&rdquo;
                </span>
              </div>
            </div>

            {/* Badges Bar: Real 4.0 Google Rating (272 Reviews), Free Delivery, Live Status */}
            <div className="w-full max-w-md sm:max-w-xl lg:max-w-none mx-auto lg:mx-0 pt-0.5">
              <div className="grid grid-cols-2 sm:flex sm:flex-row items-center justify-center lg:justify-start gap-2">
                {/* Live Hours Badge */}
                <div
                  className={`col-span-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-extrabold shadow-sm ${
                    status.isOpen
                      ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                      : "bg-amber-100 text-amber-900 border border-amber-300"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                  <span className="whitespace-nowrap">{status.badgeLabel} • Closes 1 AM</span>
                </div>

                {/* Real 4.0 Google Rating Badge with 272 Reviews */}
                <a
                  href={RESTAURANT_INFO.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="col-span-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#F59E0B] text-[11px] sm:text-xs font-bold text-[#0F172A] shadow-sm hover:bg-[#FEF3C7]/40 transition-colors"
                >
                  <Star className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B] shrink-0" />
                  <span className="font-extrabold text-[#E11D48]">4.0</span>
                  <span className="text-[10px] sm:text-[11px] text-[#64748B] font-semibold whitespace-nowrap">
                    (272 Google Reviews)
                  </span>
                </a>

                {/* Free Delivery Chip */}
                <div className="col-span-2 sm:col-span-auto inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E11D48] text-white text-[11px] sm:text-xs font-bold shadow-sm whitespace-nowrap">
                  <Truck className="w-3.5 h-3.5 text-[#FBBF24] shrink-0" />
                  <span>Free Delivery (Min Rs 600)</span>
                </div>
              </div>
            </div>

            {/* Headline with Typewriter */}
            <div className="space-y-1 sm:space-y-2">
              <span className="block text-[11px] sm:text-sm md:text-base font-black tracking-wider text-[#E11D48] uppercase">
                Kasur&apos;s #1 Taste Sensation 🌯🍕
              </span>
              <h1 className="text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-display text-[#0F172A] leading-[1.12] sm:leading-[1.08] tracking-tight">
                Fresh, Flavorful &amp; Famous{" "}
                <span className="relative inline-block text-[#E11D48]">
                  <span className="text-[#E11D48] drop-shadow-sm">
                    {currentText}
                  </span>
                  {!isReducedMotion && (
                    <span className="inline-block w-1 h-[0.85em] bg-[#F59E0B] ml-1 align-baseline animate-pulse" />
                  )}
                </span>
              </h1>
            </div>

            {/* Subtext */}
            <p className="text-xs sm:text-base md:text-lg text-[#334155] max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              <span className="sm:hidden">
                Top Taste Shawarma &amp; Pizza is Kasur&apos;s celebrated dining destination at Baldia Chowk. Special Shawarma, Crown Crust Pizza, Karahi, Handi, BBQ &amp; Burgers. Open 1 PM – 1 AM!
              </span>
              <span className="hidden sm:inline">
                Kasur&apos;s premier food hub opposite Mori Gate, Baldia Chowk! Craving loaded chicken shawarmas, cheesy Crown Crust pizzas, sizzling karahi &amp; handi claypots, or coal-fired BBQ? Enjoy dine-in, takeout, drive-through or free home delivery across Kasur. Open daily from 1:00 PM till 1:00 AM!
              </span>
            </p>

            {/* Primary Action Buttons */}
            <div className="grid grid-cols-2 sm:flex items-center justify-center lg:justify-start gap-2.5 pt-1 sm:pt-2">
              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white font-extrabold text-xs sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 transition-all active:scale-95 cursor-pointer border border-white/20"
              >
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white shrink-0" />
                <span>WhatsApp Order</span>
              </a>

              <Link
                href="/menu"
                className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-extrabold text-xs sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-[#E11D48]/20 transition-all active:scale-95 cursor-pointer border border-[#F59E0B]/40"
              >
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FBBF24] shrink-0" />
                <span>Explore Full Menu</span>
              </Link>
            </div>

            {/* Hotline & Location Bar */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E11D48]/20 text-[11px] sm:text-xs font-bold text-[#475569] shadow-sm">
                <Phone className="w-3.5 h-3.5 text-[#E11D48] shrink-0" />
                <span>Hotline:</span>
                <a
                  href={`tel:${RESTAURANT_INFO.phonePrimary}`}
                  className="text-[#E11D48] font-black hover:underline font-mono"
                >
                  {RESTAURANT_INFO.phonePrimary}
                </a>
                <span className="text-gray-300">/</span>
                <a
                  href={`tel:${RESTAURANT_INFO.phoneSecondary}`}
                  className="text-[#E11D48] font-black hover:underline font-mono"
                >
                  {RESTAURANT_INFO.phoneSecondary}
                </a>
              </div>

              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/40 text-[11px] sm:text-xs font-extrabold text-[#92400E]">
                <MapPin className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                <span>Opp. Mori Gate Baldia Chowk, Kasur</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Visual Imagery with Floating Badges */}
          <motion.div
            initial={isReducedMotion ? {} : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            {/* Visual Media Card */}
            <div className="relative mx-auto max-w-[480px] lg:max-w-none">
              <div
                className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FEF3C7] bg-white group"
                style={{ position: "relative" }}
              >
                <Image
                  src="/images/hero-food.jpg"
                  alt="Top Taste Shawarma, Crown Crust Pizza, Karahi, BBQ & Loaded Fries Spread"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                {/* Bottom caption overlay */}
                <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-black/70 backdrop-blur-md text-white border border-white/20 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-display text-[#FBBF24]">TOP TASTE SHAWARMA &amp; PIZZA</p>
                    <p className="text-[11px] text-white/90 font-medium">Special Shawarma • Crown Crust Pizza • Karahi</p>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-[#E11D48] text-white text-[11px] font-black">
                    Kasur
                  </span>
                </div>
              </div>

              {/* Floating Badge Top Right */}
              <motion.div
                animate={isReducedMotion ? {} : { y: [0, -6, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-2 sm:-right-4 bg-white px-3.5 py-2 rounded-2xl shadow-xl border-2 border-[#F59E0B] flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-xl bg-[#FEF3C7] text-[#E11D48] flex items-center justify-center font-bold">
                  🌯
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-[#E11D48]">House Favorite</p>
                  <p className="text-xs font-extrabold text-[#0F172A]">Special Shawarma</p>
                </div>
              </motion.div>

              {/* Floating Badge Bottom Left */}
              <motion.div
                animate={isReducedMotion ? {} : { y: [0, 6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-4 -left-2 sm:-left-4 bg-[#0F172A] text-white px-3.5 py-2 rounded-2xl shadow-xl border-2 border-[#F59E0B] flex items-center gap-2"
              >
                <div className="w-8 h-8 rounded-xl bg-[#F59E0B] text-[#0F172A] flex items-center justify-center font-bold">
                  ⭐
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-[#FBBF24]">272 Reviews</p>
                  <p className="text-xs font-extrabold text-white">4.0 Google Rating</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Animated Scroll Down Indicator */}
        <div className="pt-12 text-center hidden md:block">
          <Link
            href="#marquee"
            className="inline-flex flex-col items-center text-xs font-bold text-[#E11D48]/70 hover:text-[#E11D48] transition-colors"
          >
            <span>Explore Menu &amp; Tastes</span>
            <ChevronDown className="w-4 h-4 animate-bounce mt-1 text-[#E11D48]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
