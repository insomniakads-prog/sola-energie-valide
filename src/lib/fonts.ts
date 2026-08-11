import { Inter, Plus_Jakarta_Sans } from "next/font/google";

// Police principale (corps de texte)
export const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Police titres (plus de caractère)
export const fontHeading = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

// ============================================================
// MODIFIER PAR CLIENT selon la charte graphique.
//
// Pour des polices custom (.woff2) :
// import localFont from "next/font/local";
// export const fontSans = localFont({
//   src: "../../public/fonts/CustomFont.woff2",
//   variable: "--font-sans",
// });
//
// Pour les presets design-rules.md, ajouter ici
// la font "drama" (serif italic) et "mono" du preset choisi.
// ============================================================
