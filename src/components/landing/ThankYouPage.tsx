"use client";

/**
 * ThankYouPage — Page de remerciement post-formulaire
 * ----------------------------------------------------
 * USAGE :
 *   // Dans src/app/merci-solaire/page.tsx
 *   import { ThankYouPage } from "@/components/landing/ThankYouPage"
 *
 *   export default function MerciSolaire() {
 *     return (
 *       <ThankYouPage
 *         logoSrc="/images/mon-logo.png"
 *         title="Votre demande a bien été reçue !"
 *         subtitle="Un conseiller vous contactera dans les 24h pour étudier votre projet."
 *         steps={[
 *           { label: "Votre demande est enregistrée", done: true },
 *           { label: "Un conseiller vous appelle sous 24h", done: false },
 *           { label: "Étude personnalisée gratuite", done: false },
 *         ]}
 *         accentColor="#00C07F"
 *       />
 *     )
 *   }
 */

import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Phone, Clock, ArrowRight } from "lucide-react";

export interface ThankYouStep {
  label: string;
  done?: boolean;
}

interface ThankYouPageProps {
  logoSrc: string;
  logoAlt?: string;
  title?: string;
  subtitle?: string;
  steps?: ThankYouStep[];
  accentColor?: string;
  /** Numéro à afficher pour rappel direct */
  phoneNumber?: string;
  /** CTA secondaire */
  ctaLabel?: string;
  ctaHref?: string;
  /** Texte sous le logo (ex: "Étude gratuite · Sans engagement") */
  tagline?: string;
}

export function ThankYouPage({
  logoSrc,
  logoAlt = "Logo",
  title = "Votre demande a bien été reçue !",
  subtitle = "Un conseiller vous contactera dans les 24 heures pour étudier votre projet.",
  steps = [],
  accentColor = "#00C07F",
  phoneNumber,
  ctaLabel,
  ctaHref = "/",
  tagline = "Gratuit · Sans engagement · Réponse en 24h",
}: ThankYouPageProps) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header minimal */}
      <header className="border-b border-border bg-card py-4">
        <div className="container mx-auto px-4 flex justify-center">
          <Image src={logoSrc} alt={logoAlt} width={200} height={80} className="h-14 w-auto" />
        </div>
      </header>

      {/* Contenu */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-lg w-full text-center space-y-8">
          {/* Icône succès */}
          <div
            className="h-20 w-20 rounded-full flex items-center justify-center mx-auto"
            style={{ backgroundColor: `${accentColor}1A` }}
          >
            <CheckCircle className="h-10 w-10" style={{ color: accentColor }} />
          </div>

          {/* Titre */}
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{title}</h1>
            <p className="text-muted-foreground leading-relaxed">{subtitle}</p>
          </div>

          {/* Étapes suivantes */}
          {steps.length > 0 && (
            <div className="bg-card border border-border rounded-2xl p-6 text-left space-y-4">
              <h2 className="font-semibold text-foreground text-sm uppercase tracking-wide">
                La suite de votre parcours
              </h2>
              {steps.map((step, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="h-7 w-7 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                    style={
                      step.done
                        ? { backgroundColor: accentColor, color: "white" }
                        : { backgroundColor: "#f1f5f9", color: "#94a3b8" }
                    }
                  >
                    {step.done ? "✓" : i + 1}
                  </div>
                  <span
                    className="text-sm"
                    style={{ color: step.done ? "#1e293b" : "#94a3b8" }}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Tagline réassurance */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
            <Clock className="h-4 w-4" />
            <span>{tagline}</span>
          </div>

          {/* Numéro de téléphone */}
          {phoneNumber && (
            <a
              href={`tel:${phoneNumber.replace(/\s/g, "")}`}
              className="flex items-center justify-center gap-3 py-4 px-6 rounded-xl border-2 font-semibold text-lg transition-all hover:shadow-md"
              style={{ borderColor: accentColor, color: accentColor }}
            >
              <Phone className="h-5 w-5" />
              {phoneNumber}
            </a>
          )}

          {/* CTA retour */}
          {ctaLabel && (
            <Link
              href={ctaHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowRight className="h-4 w-4" />
              {ctaLabel}
            </Link>
          )}
        </div>
      </main>
    </div>
  );
}
