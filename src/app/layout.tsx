import type { Metadata } from "next";
import { fontSans, fontHeading } from "@/lib/fonts";
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
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${fontSans.variable} ${fontHeading.variable}`}
    >
      <body className="min-h-screen font-sans antialiased">
        {/* Header sera ajouté par Claude Code lors de la génération */}
        <main>{children}</main>
        {/* Footer sera ajouté par Claude Code lors de la génération */}
      </body>
    </html>
  );
}
