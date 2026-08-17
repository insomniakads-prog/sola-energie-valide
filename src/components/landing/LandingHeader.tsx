"use client";

/**
 * LandingHeader — Header générique pour landing pages lead gen
 * -------------------------------------------------------------
 * Logo à gauche + logos de confiance à droite (certifications, aides d'état)
 * Clic sur les logos → scroll vers le formulaire (via CustomEvent)
 *
 * USAGE :
 *   <LandingHeader
 *     logoSrc="/images/mon-logo.png"
 *     logoAlt="Mon Entreprise"
 *     trustLogos={[
 *       { src: "/images/logo-rge.png", alt: "RGE Qualibat" },
 *       { src: "/images/logo-cee.png", alt: "CEE" },
 *     ]}
 *     clickableLogos
 *   />
 */

import Link from "next/link";
import Image from "next/image";

export interface TrustLogo {
  src: string;
  alt: string;
  /** Afficher uniquement sur desktop (ex: logos supplémentaires) */
  desktopOnly?: boolean;
  /** Afficher uniquement sur mobile */
  mobileOnly?: boolean;
}

interface LandingHeaderProps {
  /** Chemin du logo principal (depuis /public) */
  logoSrc: string;
  logoAlt?: string;
  /** Rend le logo cliquable (lien vers /) */
  logoLinked?: boolean;
  /** Logos de confiance affichés à droite */
  trustLogos?: TrustLogo[];
  /** Si true : cliquer sur les trust logos scroll vers le formulaire */
  clickableLogos?: boolean;
  /** ID du formulaire vers lequel scroller (défaut: "eligibility-form") */
  formId?: string;
}

export function LandingHeader({
  logoSrc,
  logoAlt = "Logo",
  logoLinked = true,
  trustLogos = [],
  clickableLogos = false,
  formId = "eligibility-form",
}: LandingHeaderProps) {
  const handleTrustLogoClick = () => {
    if (clickableLogos) {
      window.dispatchEvent(new CustomEvent("scrollToForm", { detail: { formId } }));
    }
  };

  const LogoWrapper = logoLinked ? Link : "div";
  const logoProps = logoLinked ? { href: "/" } : {};

  return (
    <header className="border-b border-border bg-card">
      <div className="container mx-auto flex h-16 md:h-28 lg:h-32 items-center justify-between px-4">
        {/* Logo principal */}
        <LogoWrapper
          {...(logoProps as { href: string })}
          className="flex items-center gap-2 cursor-pointer"
          onClick={!logoLinked ? handleTrustLogoClick : undefined}
        >
          <Image
            src={logoSrc}
            alt={logoAlt}
            width={480}
            height={240}
            className="h-16 md:h-24 lg:h-28 xl:h-32 w-auto object-contain"
            priority
          />
        </LogoWrapper>

        {/* Trust logos — mobile (max 3) */}
        {trustLogos.length > 0 && (
          <div className="flex md:hidden items-center gap-2">
            {trustLogos
              .filter((l) => !l.desktopOnly)
              .slice(0, 3)
              .map((logo, i) => (
                <Image
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  width={80}
                  height={80}
                  className={`h-10 w-auto object-contain ${clickableLogos ? "cursor-pointer" : ""}`}
                  loading="lazy"
                  onClick={handleTrustLogoClick}
                />
              ))}
          </div>
        )}

        {/* Trust logos — desktop */}
        {trustLogos.length > 0 && (
          <div className="hidden md:flex items-center gap-4 lg:gap-5">
            {trustLogos
              .filter((l) => !l.mobileOnly)
              .map((logo, i) => (
                <Image
                  key={i}
                  src={logo.src}
                  alt={logo.alt}
                  width={120}
                  height={120}
                  className={`h-12 lg:h-14 xl:h-16 w-auto object-contain ${clickableLogos ? "cursor-pointer" : ""}`}
                  loading="lazy"
                  onClick={handleTrustLogoClick}
                />
              ))}
          </div>
        )}
      </div>
    </header>
  );
}
