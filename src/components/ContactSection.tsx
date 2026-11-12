"use client";

import { MapPin, Phone, Send, Clock, Navigation, CheckCircle } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/menu";

export function ContactSection() {
  return (
    <section id="contact" className="py-8 sm:py-16 md:py-20 bg-[#FCFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEF3C7] border border-[#F59E0B]/40 text-xs font-black text-[#E11D48] uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#F59E0B] fill-[#F59E0B]" />
            <span>Visit Us In Kasur</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display text-[#0F172A] leading-tight">
            Location, Hours &amp; Delivery
          </h2>
          <p className="text-sm sm:text-base text-[#64748B]">
            Visit Top Taste Shawarma &amp; Pizza opposite Mori Gate, Baldia Chowk, Kasur or call for free home delivery across Kasur!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Details, Phone Numbers & Hours */}
          <div className="lg:col-span-5 space-y-6">
            {/* Address Card */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E11D48]/15 shadow-md space-y-3">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-[#FEF3C7] text-[#E11D48] flex items-center justify-center shrink-0 border border-[#F59E0B]/40">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">Restaurant Address</h3>
                  <p className="text-xs sm:text-sm text-[#475569] mt-1 leading-relaxed">
                    {RESTAURANT_INFO.address}
                  </p>
                  <p className="text-xs font-mono font-bold text-[#E11D48] mt-1.5">
                    Plus Code: {RESTAURANT_INFO.plusCode}
                  </p>
                </div>
              </div>
            </div>

            {/* Calling & WhatsApp Action Buttons */}
            <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E11D48]/15 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs sm:text-sm font-extrabold text-[#0F172A] uppercase tracking-wider">
                  Order Hotline &amp; Free Delivery
                </h3>
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Min. Order Rs 600 Free
                </span>
              </div>

              {/* High-Impact WhatsApp Primary Button */}
              <a
                href={RESTAURANT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-4 rounded-2xl bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:from-[#16a34a] hover:to-[#15803d] text-white flex items-center justify-between shadow-lg shadow-emerald-500/25 active:scale-[0.99] transition-all cursor-pointer border border-emerald-400/30 group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Send className="w-5 h-5 fill-white text-white" />
                  </div>
                  <div className="text-left">
                    <p className="text-[11px] uppercase tracking-wider font-extrabold text-emerald-100">WhatsApp Order</p>
                    <p className="text-sm font-black text-white font-mono">{RESTAURANT_INFO.phonePrimary}</p>
                  </div>
                </div>
                <span className="px-3 py-1.5 rounded-xl bg-white text-emerald-800 text-xs font-black uppercase tracking-wider shrink-0 shadow-sm group-hover:bg-emerald-50 transition-colors">
                  Order Now &rarr;
                </span>
              </a>

              {/* Direct Calling Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Phone 1 */}
                <a
                  href={`tel:${RESTAURANT_INFO.phonePrimary}`}
                  className="p-3.5 rounded-2xl bg-[#FCFBF7] hover:bg-[#FEF3C7] text-[#0F172A] flex items-center gap-3 border-2 border-[#E11D48]/20 hover:border-[#E11D48] transition-all cursor-pointer group active:scale-98 shadow-sm"
                >
                  <span className="w-9 h-9 rounded-xl bg-[#E11D48] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4 text-[#FBBF24]" />
                  </span>
                  <div className="text-left">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-[#E11D48]">Hotline 1</span>
                    <span className="text-xs sm:text-sm font-black font-mono text-[#0F172A]">{RESTAURANT_INFO.phonePrimary}</span>
                  </div>
                </a>

                {/* Phone 2 */}
                <a
                  href={`tel:${RESTAURANT_INFO.phoneSecondary}`}
                  className="p-3.5 rounded-2xl bg-[#FCFBF7] hover:bg-[#FEF3C7] text-[#0F172A] flex items-center gap-3 border-2 border-[#E11D48]/20 hover:border-[#E11D48] transition-all cursor-pointer group active:scale-98 shadow-sm"
                >
                  <span className="w-9 h-9 rounded-xl bg-[#0F172A] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <Phone className="w-4 h-4 text-[#FBBF24]" />
                  </span>
                  <div className="text-left">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-[#64748B]">Hotline 2</span>
                    <span className="text-xs sm:text-sm font-black font-mono text-[#0F172A]">{RESTAURANT_INFO.phoneSecondary}</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-[#E11D48]/15 shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-[#FEF3C7] text-[#E11D48] flex items-center justify-center shrink-0 border border-[#F59E0B]/40">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-[#0F172A]">Operating Schedule</h3>
                  <p className="text-xs text-[#64748B]">Open 7 Days a Week • Closes 1:00 AM</p>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FCFBF7] border border-gray-100">
                  <span className="font-semibold text-gray-700">Monday – Sunday</span>
                  <span className="font-extrabold text-[#E11D48]">1:00 PM – 1:00 AM</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FCFBF7] border border-gray-100">
                  <span className="font-semibold text-gray-700">Free Home Delivery</span>
                  <span className="font-extrabold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Min. Order Rs 600
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FCFBF7] border border-gray-100">
                  <span className="font-semibold text-gray-700">Service Options</span>
                  <span className="font-extrabold text-[#0F172A] bg-[#FEF3C7] px-2 py-0.5 rounded-md border border-[#F59E0B]/30">
                    Dine-In • Takeout • Drive-through
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Embedded Google Map & Highlights */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white rounded-3xl p-3 sm:p-4 border border-[#E11D48]/15 shadow-xl overflow-hidden">
              <div className="relative w-full h-[320px] sm:h-[350px] rounded-2xl overflow-hidden bg-gray-100">
                <iframe
                  title="Top Taste Shawarma Baldia Chowk Kasur Google Map"
                  src={RESTAURANT_INFO.googleMapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
              </div>

              {/* Map Footer Bar */}
              <div className="p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-center sm:text-left">
                  <p className="text-xs font-bold text-[#0F172A]">Opp. Mori Gate Baldia Chowk</p>
                  <p className="text-[11px] text-[#64748B]">Noor Masjid Rd, Tariq Colony, Kasur</p>
                </div>

                <a
                  href={RESTAURANT_INFO.directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#E11D48] hover:bg-[#BE123C] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow transition-colors cursor-pointer"
                >
                  <Navigation className="w-4 h-4 text-[#FBBF24]" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            {/* Restaurant Features Grid */}
            <div className="bg-white rounded-3xl p-4 border border-[#E11D48]/15 shadow-md">
              <span className="text-[10px] font-black uppercase tracking-wider text-[#E11D48] block mb-2.5">
                Top Taste Shawarma &amp; Pizza Features
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {RESTAURANT_INFO.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-[#FCFBF7] border border-gray-100 text-[11px] font-bold text-[#0F172A] shadow-xs flex items-center gap-2"
                  >
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
