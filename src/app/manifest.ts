import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Top Taste Shawarma & Pizza - Kasur",
    short_name: "Top Taste",
    description: "Kasur's Famous Shawarma, Crown Crust Pizza, Karahi, BBQ & Fast Food Landmark.",
    start_url: "/",
    display: "standalone",
    background_color: "#0F172A",
    theme_color: "#E11D48",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
