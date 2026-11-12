import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { MenuSection } from "@/components/MenuSection";
import { DealsSection } from "@/components/DealsSection";
import { Footer } from "@/components/Footer";
import { Utensils, Sparkles, Clock, Truck, MapPin } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/menu";
import { SITE_URL } from "@/lib/siteUrl";

export const metadata: Metadata = {
  title: "Full Menu & Deals | Top Taste Shawarma & Pizza Kasur",
  description:
    "Explore the complete Top Taste Shawarma & Pizza menu in Kasur: Special Shawarma, Crown Crust Pizza, Karahi, Handi, BBQ, Beef & Zinger Burgers, Wraps, Pasta, Steaks & Free Delivery (Min Rs 600). Open till 1:00 AM.",
  openGraph: {
    title: "Top Taste Full Menu & Deals | Kasur",
    description:
      "Official menu: Shawarma, Crown Crust Pizza, Karahi, Handi, BBQ, Paratha Rolls & Combo Deals. Opp. Mori Gate Baldia Chowk, Kasur.",
    url: `${SITE_URL}/menu`,
    siteName: "Top Taste Shawarma & Pizza",
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/og-image.jpg`,
        secureUrl: `${SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Top Taste Shawarma & Pizza Kasur Full Menu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Taste Shawarma & Pizza Menu | Kasur",
    description:
      "Kasur's Landmark: Special Shawarma, Crown Crust Pizza, Desi Karahi & Free Home Delivery.",
    images: [`${SITE_URL}/images/og-image.jpg`],
  },
};

export default function MenuPage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FCFBF7]">
      <Navbar />

      {/* Menu Header Banner */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-[#FEF3C7]/60 to-[#FCFBF7] border-b border-[#E11D48]/10 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E11D48] text-white text-xs font-black uppercase tracking-wider shadow">
            <Utensils className="w-3.5 h-3.5 text-[#FBBF24]" />
            <span>Official Dining, Takeout &amp; Delivery Menu</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display text-[#0F172A] leading-tight">
            Top Taste Shawarma &amp; Pizza Menu
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto font-medium">
            Kasur&apos;s celebrated food hub opposite Mori Gate, Baldia Chowk! Explore our full spread of loaded chicken shawarmas, cheesy Crown Crust pizzas, authentic iron wok karahis, claypot handis, and live coal BBQ.
          </p>

          {/* Quick Info Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-bold text-[#0F172A]">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#F59E0B] shadow-xs">
              <Clock className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>1:00 PM – 1:00 AM Daily</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#F59E0B] shadow-xs">
              <Truck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Free Delivery (Min. Order Rs 600)</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#F59E0B] shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-[#E11D48]" />
              <span>Opp. Mori Gate Baldia Chowk, Kasur</span>
            </span>
          </div>
        </div>
      </section>

      {/* Interactive Menu Filtering & Items */}
      <MenuSection />

      {/* Value Combo Deals */}
      <DealsSection />

      <Footer />
    </main>
  );
}
