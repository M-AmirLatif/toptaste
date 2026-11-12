"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, CheckCircle2, ExternalLink } from "lucide-react";
import { REVIEWS, RESTAURANT_INFO } from "@/data/menu";

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-8 sm:py-16 md:py-20 bg-[#FEF3C7]/30 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E11D48] text-white text-xs font-black uppercase tracking-wider shadow">
            <Star className="w-3.5 h-3.5 text-[#FBBF24] fill-[#FBBF24]" />
            <span>4.0 Rating on Google (272 Reviews)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#0F172A] leading-tight">
            Loved By Kasur Food Lovers
          </h2>
          <p className="text-sm sm:text-base text-[#64748B]">
            Authentic Google Reviews from Local Guides and loyal customers who celebrate Top Taste Shawarma &amp; Pizza as Kasur&apos;s most famous Food Street landmark.
          </p>
        </div>

        {/* Rating Overview Box */}
        <div className="max-w-md mx-auto mb-10 p-5 rounded-3xl bg-white border border-[#E11D48]/15 shadow-sm text-center">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-4xl font-display text-[#E11D48]">4.0</span>
            <div className="flex text-[#F59E0B]">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-[#F59E0B]" />
              ))}
              <Star className="w-5 h-5 fill-gray-200 text-gray-300" />
            </div>
          </div>
          <p className="text-xs font-bold text-[#0F172A]">
            Based on 272 verified Google reviews • Rs 1–1,000 per person
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 mt-2.5">
            {["Shawarma (7)", "Pizza", "Grill Burger (2)", "Quantity (3)", "Chicken (2)", "Atmosphere (2)"].map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E] text-[10px] font-bold">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Testimonials Display (Grid for Desktop and Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {REVIEWS.map((rev) => (
            <motion.div
              key={rev.id}
              whileHover={{ y: -6 }}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all ${
                rev.isReal
                  ? "bg-white border-2 border-[#E11D48]/20 shadow-lg relative"
                  : "bg-white/90 border border-gray-100 shadow-md"
              }`}
            >
              {rev.isReal && (
                <div className="absolute -top-3 left-6 bg-[#0F172A] text-[#FBBF24] px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#FBBF24]" />
                  <span>Real Google Review</span>
                </div>
              )}

              <div className="space-y-4">
                {/* Star Rating */}
                <div className="flex items-center gap-1 text-[#F59E0B]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F59E0B]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#0F172A] font-medium italic leading-relaxed">
                  &ldquo;{rev.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#FEF3C7] text-[#E11D48] font-extrabold flex items-center justify-center text-sm border border-[#F59E0B]/40">
                  {rev.author.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A] leading-tight">
                    {rev.author}
                  </h4>
                  <p className="text-[11px] text-[#64748B]">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Google Callout & Leave Review Link */}
        <div className="text-center pt-2">
          <a
            href={RESTAURANT_INFO.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#FEF3C7] text-[#E11D48] font-bold text-xs uppercase tracking-wider border border-[#E11D48]/30 shadow-sm hover:shadow transition-all cursor-pointer"
          >
            <span>Rate Us / Leave a Review on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
