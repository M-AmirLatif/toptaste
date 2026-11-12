"use client";

const MARQUEE_ITEMS = [
  "TOP TASTE SPECIAL SHAWARMA",
  "CROWN CRUST PIZZA",
  "CHICKEN & ZINGER SHAWARMA",
  "PIZZA BURGER & BEEF BURGER",
  "SPECIAL CHICKEN KARAHI",
  "CHICKEN HANDI SPECIAL",
  "LIVE CHARCOAL BBQ",
  "CHEESE LOADED FRIES",
  "FREE HOME DELIVERY (MIN RS 600)",
  "4.0 RATED GOOGLE (272 REVIEWS)",
  "OPP. MORI GATE BALDIA CHOWK KASUR",
  "OPEN DAILY TILL 1:00 AM",
];

export function MarqueeStrip() {
  return (
    <div
      id="marquee"
      className="relative w-full overflow-hidden bg-gradient-to-r from-[#F59E0B] via-[#FBBF24] to-[#F59E0B] text-[#0F172A] py-3.5 border-y-2 border-[#E11D48] shadow-md select-none"
    >
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
        {/* First Loop */}
        {MARQUEE_ITEMS.map((item, index) => (
          <div key={`m1-${index}`} className="flex items-center gap-8 font-display text-sm sm:text-base tracking-wider">
            <span className="font-extrabold text-[#0F172A] hover:text-[#BE123C] transition-colors">{item}</span>
            <span className="text-[#E11D48] text-lg font-black">★</span>
          </div>
        ))}

        {/* Duplicate for Seamless Loop */}
        {MARQUEE_ITEMS.map((item, index) => (
          <div key={`m2-${index}`} className="flex items-center gap-8 font-display text-sm sm:text-base tracking-wider">
            <span className="font-extrabold text-[#0F172A] hover:text-[#BE123C] transition-colors">{item}</span>
            <span className="text-[#E11D48] text-lg font-black">★</span>
          </div>
        ))}
      </div>
    </div>
  );
}
