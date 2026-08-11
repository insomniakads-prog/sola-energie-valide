import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Optimisation des images
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      // Unsplash pour les images de preset design-rules.md
      { protocol: "https", hostname: "images.unsplash.com" },
      // Ajouter d'autres domaines si besoin par client
    ],
  },

  // Headers de sécurité et cache
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
      {
        // Cache long pour les assets statiques (fonts, images)
        source: "/(fonts|images)/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirections (ajouter par client si refonte d'un ancien site)
  // async redirects() { return []; },
};

export default nextConfig;
