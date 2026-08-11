"use client";

/**
 * SubventionsNavbar — Navbar avec menu déroulant et CTA
 * ------------------------------------------------------
 * Sticky, responsive, avec hamburger mobile animé (Framer Motion)
 *
 * USAGE :
 *   <SubventionsNavbar
 *     logoSrc="/images/mon-logo.png"
 *     logoAlt="Mon Entreprise"
 *     navItems={[
 *       { label: "Nos services", href: "#services" },
 *       { label: "Les aides", href: "#aides" },
 *     ]}
 *     ctaLabel="Tester mon éligibilité"
 *     onCtaClick={scrollToForm}
 *     accentColor="#00C07F"
 *   />
 */

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface NavItem {
  label: string;
  href: string;
}

interface SubventionsNavbarProps {
  logoSrc: string;
  logoAlt?: string;
  navItems?: NavItem[];
  ctaLabel?: string;
  onCtaClick?: () => void;
  accentColor?: string;
  /** Couleur de texte des liens nav */
  textColor?: string;
}

export function SubventionsNavbar({
  logoSrc,
  logoAlt = "Logo",
  navItems = [],
  ctaLabel = "Tester mon éligibilité",
  onCtaClick,
  accentColor = "#00C07F",
  textColor = "#1A1A2E",
}: SubventionsNavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
        scrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={onCtaClick}>
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={240}
            height={120}
            className="h-12 md:h-16 w-auto object-contain"
            priority
          />
        </div>

        {/* Nav desktop */}
        {navItems.length > 0 && (
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors"
                style={{ color: textColor }}
              >
                {item.label}
                <ChevronDown className="h-3.5 w-3.5 opacity-50" />
              </Link>
            ))}
          </nav>
        )}

        {/* Hamburger mobile */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {mobileOpen ? (
            <X className="h-6 w-6" style={{ color: textColor }} />
          ) : (
            <Menu className="h-6 w-6" style={{ color: textColor }} />
          )}
        </button>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t bg-white"
          >
            <nav className="flex flex-col px-4 py-3 gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="flex items-center justify-between px-3 py-3 text-sm font-medium rounded-lg transition-colors"
                  style={{ color: textColor }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                  <ChevronDown className="h-4 w-4 opacity-40" />
                </Link>
              ))}
              {onCtaClick && (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onCtaClick();
                  }}
                  className="mt-2 w-full font-semibold py-3 rounded-full text-sm transition-colors text-white"
                  style={{ backgroundColor: accentColor }}
                >
                  {ctaLabel}
                </button>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
