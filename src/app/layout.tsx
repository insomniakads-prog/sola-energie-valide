import type { Metadata } from "next";
import { fontBody, fontDisplay } from "@/lib/fonts";
import { siteConfig } from "@/lib/constants";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/**
 * Layout racine : uniquement <html>/<body> et les polices.
 * L'habillage (header, footer) est porté par les groupes de routes :
 *   (site)   → site vitrine, header et footer complets
 *   (funnel) → parcours d'estimation, header allégé sans sortie
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${fontBody.variable} ${fontDisplay.variable}`}>
      <body className="min-h-screen font-body antialiased">{children}</body>
    </html>
  );
}
