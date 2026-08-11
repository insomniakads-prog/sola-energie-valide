"use client";

/**
 * StickyCTA — Bandeau CTA sticky générique (mobile + desktop)
 * ------------------------------------------------------------
 * Apparaît quand le formulaire sort du viewport, se cache sinon.
 * Fonctionne en autonomie via IntersectionObserver.
 *
 * USAGE simple (bandeau vert plein écran) :
 *   <StickyCTA formId="eligibility-form" />
 *
 * USAGE avancé (personnalisé) :
 *   <StickyCTA
 *     formId="eligibility-form"
 *     mobileLabel="Tester mon éligibilité"
 *     desktopTitle="Testez votre éligibilité en 30 secondes"
 *     desktopBadges={["100% gratuit", "Sans engagement", "Réponse 24h"]}
 *     desktopCTA="Commencer"
 *     color="#00C07F"
 *     floatingBadge="Certifié RGE"
 *   />
 */

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Gift, CheckCircle, Clock, Shield } from "lucide-react";

interface StickyCTAProps {
  /** ID du formulaire à surveiller */
  formId?: string;
  /** Texte du bouton mobile */
  mobileLabel?: string;
  /** Titre affiché dans la version desktop */
  desktopTitle?: string;
  /** Badges/éléments de réassurance desktop (max 3) */
  desktopBadges?: string[];
  /** Texte du bouton desktop */
  desktopCTA?: string;
  /** Couleur principale du bandeau (hex) */
  color?: string;
  /** Couleur du texte sur le bandeau */
  textColor?: string;
  /** Texte du badge flottant desktop (ex: "Certifié RGE") — null pour désactiver */
  floatingBadge?: string | null;
}

export function StickyCTA({
  formId = "eligibility-form",
  mobileLabel = "Tester mon éligibilité",
  desktopTitle = "Testez votre éligibilité en 30 secondes",
  desktopBadges = ["100% gratuit", "Sans engagement", "Réponse sous 24h"],
  desktopCTA = "Commencer",
  color = "#00C07F",
  textColor = "#ffffff",
  floatingBadge = null,
}: StickyCTAProps) {
  const [visible, setVisible] = useState(false);

  const scrollToForm = () => {
    const form = document.getElementById(formId);
    if (form) {
      const y = form.getBoundingClientRect().top + window.pageYOffset - 150;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const target = document.getElementById(formId);
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [formId]);

  // Écoute aussi les events custom des headers cliquables
  useEffect(() => {
    const handler = () => scrollToForm();
    window.addEventListener("scrollToForm", handler);
    return () => window.removeEventListener("scrollToForm", handler);
  }, []);

  const badgeIcons = [Gift, CheckCircle, Clock];

  return (
    <>
      {/* Bandeau bas — Mobile & Desktop */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.15)] transition-transform duration-300 ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ backgroundColor: color }}
      >
        {/* Mobile */}
        <div className="md:hidden px-4 py-3">
          <Button
            onClick={scrollToForm}
            className="w-full font-bold py-4 text-base rounded-xl shadow-lg transition-all duration-150 active:scale-[0.98]"
            style={{ backgroundColor: "white", color }}
          >
            {mobileLabel}
          </Button>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center justify-between px-6 py-3">
          <div>
            <p className="font-bold text-base" style={{ color: textColor }}>
              {desktopTitle}
            </p>
            {desktopBadges.length > 0 && (
              <div className="flex items-center gap-4 mt-1">
                {desktopBadges.slice(0, 3).map((badge, i) => {
                  const Icon = badgeIcons[i] ?? CheckCircle;
                  return (
                    <span
                      key={i}
                      className="flex items-center gap-1.5 text-sm"
                      style={{ color: `${textColor}dd` }}
                    >
                      <Icon className="h-4 w-4" />
                      {badge}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
          <Button
            onClick={scrollToForm}
            className="font-bold px-8 py-3 text-sm rounded-lg shadow-md"
            style={{ backgroundColor: "white", color }}
          >
            {desktopCTA}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Badge flottant desktop (optionnel) */}
      {floatingBadge && (
        <div
          className={`fixed bottom-24 left-4 z-40 hidden md:block transition-all duration-300 ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8 pointer-events-none"
          }`}
        >
          <Button
            onClick={scrollToForm}
            className="font-bold shadow-2xl px-5 py-5 text-sm rounded-full flex items-center gap-2"
            style={{ backgroundColor: color, color: textColor }}
          >
            <Shield className="h-5 w-5" />
            {floatingBadge}
          </Button>
        </div>
      )}
    </>
  );
}
