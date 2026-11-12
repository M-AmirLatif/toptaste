import type { Metadata, Viewport } from "next";
import { Lilita_One, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { CartDrawer } from "@/components/CartDrawer";
import { CartToast } from "@/components/CartToast";
import { MobileActionBar } from "@/components/MobileActionBar";
import { RESTAURANT_INFO } from "@/data/menu";
import { SITE_URL } from "@/lib/siteUrl";

const lilita = Lilita_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lilita",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  themeColor: "#E11D48",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Top Taste Shawarma & Pizza | Kasur's Famous Food Landmark",
  description:
    "Top Taste Shawarma & Pizza (ٹاپ ٹیسٹ شوارما اینڈ پیزا) — Kasur's celebrated dining & takeout destination opposite Mori Gate, Baldia Chowk. Savor Special Chicken Shawarma, Crown Crust Pizza, Karahi, Handi, BBQ, Steaks & Burgers. Free Home Delivery on orders Rs 600+ across Kasur.",
  keywords: [
    "Top Taste Shawarma",
    "Top Taste Pizza Kasur",
    "Best Shawarma in Kasur",
    "Crown Crust Pizza Kasur",
    "Baldia Chowk Kasur restaurant",
    "Mori Gate Kasur food",
    "Chicken Shawarma Kasur",
    "Desi Karahi Handi Kasur",
    "Charcoal BBQ Kasur",
    "Late night food Kasur 1 AM",
    "Free delivery Kasur food",
  ],
  authors: [{ name: "Top Taste Shawarma & Pizza" }],
  creator: "Top Taste Shawarma & Pizza",
  publisher: "Top Taste Shawarma & Pizza",
  formatDetection: {
    telephone: true,
    address: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Top Taste Shawarma & Pizza | Kasur's Famous Food Landmark",
    description:
      "Kasur's premier Shawarma, Pizza, Karahi & BBQ spot at Baldia Chowk. Special Shawarma, Crown Crust Pizza, Burgers, Handi & Free Home Delivery (Min Rs 600). Open daily 1 PM till 1 AM.",
    url: SITE_URL,
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
        alt: "Top Taste Shawarma & Pizza Kasur — Food Street Landmark",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Top Taste Shawarma & Pizza Kasur",
    description: "Special Shawarma, Crown Crust Pizza, Desi Karahi, BBQ & Free Home Delivery across Kasur.",
    images: [`${SITE_URL}/images/og-image.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FastFoodRestaurant",
    name: RESTAURANT_INFO.name,
    alternateName: RESTAURANT_INFO.urduName,
    image: `${SITE_URL}/images/hero-food.jpg`,
    "@id": SITE_URL,
    url: SITE_URL,
    telephone: RESTAURANT_INFO.phonePrimary,
    servesCuisine: [
      "Shawarma",
      "Pizza",
      "Fast Food",
      "Pakistani BBQ",
      "Karahi",
      "Handi",
      "Burgers",
      "Seafood",
    ],
    priceRange: "Rs 1–1,000",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Opp. Mori Gate Baldia Chowk, Noor Masjid Rd, Tariq Colony",
      addressLocality: "Kasur",
      addressRegion: "Punjab",
      addressCountry: "PK",
      postalCode: "55050",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 31.1196941,
      longitude: 74.4533159,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "13:00",
        closes: "01:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.0",
      reviewCount: "272",
      bestRating: "5",
      worstRating: "1",
    },
    menu: `${SITE_URL}/menu`,
    potentialAction: {
      "@type": "OrderAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: RESTAURANT_INFO.whatsappUrl,
        inLanguage: "en-PK",
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
  };

  return (
    <html lang="en" className={`${lilita.variable} ${plusJakarta.variable}`}>
      <head>
        <meta property="og:image" content={`${SITE_URL}/images/og-image.jpg`} />
        <meta property="og:image:secure_url" content={`${SITE_URL}/images/og-image.jpg`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Top Taste Shawarma & Pizza Kasur" />
        <meta name="twitter:image" content={`${SITE_URL}/images/og-image.jpg`} />
        <link rel="image_src" href={`${SITE_URL}/images/og-image.jpg`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col pb-16 md:pb-0 bg-[#FCFBF7] text-[#0F172A] selection:bg-[#F59E0B] selection:text-[#0F172A]">
        {children}
        <CartDrawer />
        <CartToast />
        <MobileActionBar />
      </body>
    </html>
  );
}
