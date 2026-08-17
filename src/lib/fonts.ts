import { Inter, Poppins } from "next/font/google";

// Police titres — Poppins (display), reprise de la référence Soli
export const fontDisplay = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

// Police corps de texte — Inter
export const fontBody = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
