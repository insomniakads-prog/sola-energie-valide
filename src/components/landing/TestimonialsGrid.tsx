"use client";

/**
 * TestimonialsGrid — Grille d'avis clients générique
 * ---------------------------------------------------
 * Grille responsive 1/2/3 colonnes avec étoiles, citation, auteur
 *
 * USAGE :
 *   import { TestimonialsGrid } from "@/components/landing/TestimonialsGrid"
 *
 *   <TestimonialsGrid
 *     testimonials={[
 *       { rating: 5, quote: "Super service !", name: "Marc D.", location: "Lyon" },
 *       ...
 *     ]}
 *     onCardClick={scrollToForm}
 *     accentColor="#F59F0A"
 *   />
 */

import { Star } from "lucide-react";

export interface Testimonial {
  rating: number;
  quote: string;
  name: string;
  location?: string;
  /** Info contextuelle (ex: "maison individuelle", "6 kWc") */
  meta?: string;
}

interface TestimonialsGridProps {
  testimonials: Testimonial[];
  /** Couleur des étoiles */
  accentColor?: string;
  /** Si fourni, rend les cartes cliquables */
  onCardClick?: () => void;
  /** Nombre de colonnes max (défaut: 3) */
  maxCols?: 2 | 3;
}

export function TestimonialsGrid({
  testimonials,
  accentColor = "#F59F0A",
  onCardClick,
  maxCols = 3,
}: TestimonialsGridProps) {
  return (
    <div
      className={`grid gap-6 ${
        maxCols === 2
          ? "md:grid-cols-2"
          : "md:grid-cols-2 lg:grid-cols-3"
      }`}
    >
      {testimonials.map((t, index) => (
        <div
          key={index}
          className={`bg-card rounded-2xl p-6 shadow-lg border border-border/50 ${
            onCardClick ? "cursor-pointer hover:shadow-xl transition-shadow" : ""
          }`}
          onClick={onCardClick}
        >
          {/* Étoiles */}
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-5 w-5"
                style={{
                  fill: i < t.rating ? accentColor : "#e2e8f0",
                  color: i < t.rating ? accentColor : "#e2e8f0",
                }}
              />
            ))}
          </div>

          {/* Citation */}
          <p className="text-muted-foreground mb-6 leading-relaxed">
            &ldquo;{t.quote}&rdquo;
          </p>

          {/* Auteur */}
          <div className="border-t border-border pt-4">
            <div className="font-semibold text-foreground">{t.name}</div>
            {(t.location || t.meta) && (
              <div className="text-sm text-muted-foreground mt-0.5">
                {[t.location, t.meta].filter(Boolean).join(" — ")}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
