import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { MarqueeStrip } from "@/components/MarqueeStrip";
import { BestSellers } from "@/components/BestSellers";
import { MenuSection } from "@/components/MenuSection";
import { DealsSection } from "@/components/DealsSection";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { GallerySection } from "@/components/GallerySection";
import { ReviewsSection } from "@/components/ReviewsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-[#FCFBF7]">
      <Navbar />
      <Hero />
      <MarqueeStrip />
      <BestSellers />
      <MenuSection />
      <DealsSection />
      <WhyChooseUs />
      <GallerySection />
      <ReviewsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
