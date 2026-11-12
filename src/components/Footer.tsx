"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Clock, Send, Heart, Sparkles, ExternalLink } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/menu";

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-[#FCFBF7] pt-16 pb-24 md:pb-12 border-t-4 border-[#F59E0B] relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#F59E0B]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-56 h-14" style={{ position: "relative" }}>
                <Image
                  src="/logo-white.svg"
                  alt="Top Taste Shawarma & Pizza Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-sm font-medium">
              Kasur&apos;s famous Shawarma, Pizza, Karahi &amp; BBQ destination opposite Mori Gate, Baldia Chowk. Savor authentic recipes, crispy zinger bites, and free home delivery across Kasur.
            </p>
            <div className="space-y-1.5 text-xs text-gray-400">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                <span>Opp. Mori Gate Baldia Chowk, Kasur</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                <span>{RESTAURANT_INFO.phonePrimary} / {RESTAURANT_INFO.phoneSecondary}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#F59E0B] shrink-0" />
                <span>1:00 PM – 1:00 AM Daily</span>
              </p>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-display text-[#FBBF24] uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs font-medium text-gray-300">
              <li>
                <Link href="/#home" className="hover:text-[#FBBF24] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#FBBF24] transition-colors">
                  Full Interactive Menu
                </Link>
              </li>
              <li>
                <Link href="/#deals" className="hover:text-[#FBBF24] transition-colors">
                  Value Combo Deals
                </Link>
              </li>
              <li>
                <Link href="/#gallery" className="hover:text-[#FBBF24] transition-colors">
                  Photo &amp; Menu Gallery
                </Link>
              </li>
              <li>
                <Link href="/#reviews" className="hover:text-[#FBBF24] transition-colors">
                  Customer Reviews (272)
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-[#FBBF24] transition-colors">
                  Location &amp; Delivery
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Signatures */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-display text-[#FBBF24] uppercase tracking-wider">
              Famous Signatures
            </h4>
            <ul className="space-y-2 text-xs text-gray-300 font-medium">
              <li>Top Taste Special Shawarma (Rs 420)</li>
              <li>Crown Crust Royal Pizza (Rs 720+)</li>
              <li>Special Chicken Karahi (Rs 950)</li>
              <li>Chicken Handi Special Claypot</li>
              <li>Crispy Filly &amp; Pizza Burger</li>
              <li>Special Charcoal Grill Fish</li>
            </ul>
          </div>

          {/* Column 4: Delivery & Map Action */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-display text-[#FBBF24] uppercase tracking-wider">
              Free Home Delivery
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed font-medium">
              Enjoy hot, fresh food delivered anywhere in Kasur. Free delivery on orders of Rs 600/- and above!
            </p>
            <div className="space-y-2">
              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20BD5A] text-white text-xs font-bold flex items-center justify-center gap-2 shadow transition-all cursor-pointer"
              >
                <Send className="w-4 h-4 fill-white" />
                <span>WhatsApp Order</span>
              </a>

              <a
                href={RESTAURANT_INFO.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5 text-[#FBBF24]" />
                <span>Directions on Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© 2026 Top Taste Shawarma &amp; Pizza, Kasur. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-gray-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#E11D48] fill-[#E11D48]" />
            <span>for Kasur Food Street Lovers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
