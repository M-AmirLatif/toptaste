"use client";

import { motion } from "framer-motion";
import { Truck, Moon, Users, Award, ShieldCheck, Flame, Utensils, Star } from "lucide-react";

const FEATURES = [
  {
    icon: Flame,
    title: "Kasur's Famous Food Landmark",
    desc: "Situated right in the heart of Kasur at Baldia Chowk / Food Street. Renowned across town for authentic taste and quick service.",
    badge: "Kasuri Landmark",
  },
  {
    icon: Truck,
    title: "Free Home Delivery (Min Rs 600)",
    desc: "Hot, fresh, and piping delicious food delivered straight to your door anywhere in Kasur with free delivery on orders of Rs 600 and above.",
    badge: "Free Delivery",
  },
  {
    icon: Utensils,
    title: "Fast Food, Pizza, BBQ & Karahi",
    desc: "The ultimate dining variety under one roof: from special chicken shawarmas and Crown Crust pizzas to slow-simmered handis and charcoal BBQ.",
    badge: "All-in-One Menu",
  },
  {
    icon: Moon,
    title: "Open Daily 1:00 PM till 1:00 AM",
    desc: "Whether you crave a daytime lunch, evening family dinner, or late-night shawarma craving, Top Taste is ready to serve you 7 days a week.",
    badge: "Late-Night Point",
  },
];

const STATS = [
  {
    value: "4.0 ★",
    label: "Google Rating",
    detail: "Over 272 genuine reviews from Kasur foodies",
  },
  {
    value: "Rs 600",
    label: "Free Delivery",
    detail: "Fast, contactless doorstep delivery in Kasur",
  },
  {
    value: "60+",
    label: "Delicious Items",
    detail: "Shawarma, pizza, burgers, karahi, BBQ & steaks",
  },
  {
    value: "1 PM – 1 AM",
    label: "Daily Hours",
    detail: "Dine-in, takeaway, drive-through & delivery",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-8 sm:py-16 md:py-20 bg-[#FCFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/40 text-xs font-black text-[#E11D48] uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
            <span>The Top Taste Quality Standard</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#0F172A] leading-tight">
            Why Kasur Chooses Top Taste
          </h2>
          <p className="text-sm sm:text-base text-[#64748B]">
            From mouth-watering chicken shawarmas and cheesy crown pizzas to authentic iron wok karahis and sizzling charcoal BBQ, experience unbeatable flavor and hospitaliy.
          </p>
        </div>

        {/* 4 Feature Icon Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {FEATURES.map((feat, index) => {
            const Icon = feat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-3xl p-6 border border-[#E11D48]/15 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FEF3C7] text-[#E11D48] flex items-center justify-center mb-4 border border-[#F59E0B]/40">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-[#FEF3C7] text-[#92400E] inline-block mb-2 font-mono">
                    {feat.badge}
                  </span>
                  <h3 className="text-lg font-bold text-[#0F172A] mb-2 leading-tight">
                    {feat.title}
                  </h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 4 Stats Grid */}
        <div className="rounded-3xl bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white p-6 sm:p-10 shadow-2xl border-2 border-[#F59E0B]">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {STATS.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-3xl sm:text-4xl md:text-5xl font-display text-[#FBBF24]">
                  {stat.value}
                </p>
                <p className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                  {stat.label}
                </p>
                <p className="text-[11px] sm:text-xs text-white/70">
                  {stat.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
