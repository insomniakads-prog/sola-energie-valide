"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Piste défilante horizontale.
 *
 * Le défilement natif ne suffit pas sur desktop : à la souris, sans
 * molette horizontale, rien ne bouge. On ajoute donc deux flèches et le
 * glisser-déposer, tout en gardant le défilement tactile natif.
 */
export function Carousel({
  children,
  className,
  ariaLabel,
}: {
  children: React.ReactNode;
  className?: string;
  ariaLabel: string;
}) {
  const piste = useRef<HTMLDivElement>(null);
  const [versGauche, setVersGauche] = useState(false);
  const [versDroite, setVersDroite] = useState(false);

  const majFleches = useCallback(() => {
    const el = piste.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setVersGauche(el.scrollLeft > 4);
    setVersDroite(el.scrollLeft < max - 4);
  }, []);

  useEffect(() => {
    majFleches();
    const el = piste.current;
    if (!el) return;
    const observer = new ResizeObserver(majFleches);
    observer.observe(el);
    return () => observer.disconnect();
  }, [majFleches]);

  /** Fait défiler d'une carte, mesurée sur le premier enfant. */
  const defiler = (sens: -1 | 1) => {
    const el = piste.current;
    if (!el) return;
    const premier = el.firstElementChild as HTMLElement | null;
    const pas = premier ? premier.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: sens * pas, behavior: "smooth" });
  };

  /* ---------- glisser-déposer à la souris ---------- */
  const drag = useRef({ actif: false, departX: 0, departScroll: 0, bouge: false });

  const onPointerDown = (ev: React.PointerEvent<HTMLDivElement>) => {
    // le tactile a déjà son défilement natif, plus fluide
    if (ev.pointerType === "touch") return;
    const el = piste.current;
    if (!el) return;
    drag.current = {
      actif: true,
      departX: ev.clientX,
      departScroll: el.scrollLeft,
      bouge: false,
    };
  };

  const onPointerMove = (ev: React.PointerEvent<HTMLDivElement>) => {
    const el = piste.current;
    if (!drag.current.actif || !el) return;
    const delta = ev.clientX - drag.current.departX;
    if (Math.abs(delta) > 3) drag.current.bouge = true;
    el.scrollLeft = drag.current.departScroll - delta;
  };

  const finDrag = () => {
    drag.current.actif = false;
  };

  // après un glissement, on neutralise le clic pour ne pas activer une carte
  const onClickCapture = (ev: React.MouseEvent) => {
    if (drag.current.bouge) {
      ev.preventDefault();
      ev.stopPropagation();
      drag.current.bouge = false;
    }
  };

  return (
    <div className="relative">
      <div
        ref={piste}
        role="group"
        aria-label={ariaLabel}
        onScroll={majFleches}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={finDrag}
        onPointerLeave={finDrag}
        onClickCapture={onClickCapture}
        className={cn(
          "scroll-row flex gap-4 overflow-x-auto",
          "cursor-grab active:cursor-grabbing select-none",
          className
        )}
      >
        {children}
      </div>

      <Fleche
        sens="gauche"
        onClick={() => defiler(-1)}
        visible={versGauche}
      />
      <Fleche sens="droite" onClick={() => defiler(1)} visible={versDroite} />
    </div>
  );
}

function Fleche({
  sens,
  onClick,
  visible,
}: {
  sens: "gauche" | "droite";
  onClick: () => void;
  visible: boolean;
}) {
  const Icone = sens === "gauche" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={sens === "gauche" ? "Avis précédents" : "Avis suivants"}
      // masquée au tactile : le doigt suffit
      className={cn(
        "absolute top-1/2 z-10 hidden size-11 -translate-y-1/2 items-center justify-center",
        "rounded-full border border-ink/10 bg-white text-ink shadow-lg",
        "transition-all duration-200 hover:border-sun hover:bg-sun/10",
        "md:flex",
        sens === "gauche" ? "-left-2 lg:-left-5" : "-right-2 lg:-right-5",
        visible
          ? "opacity-100"
          : "pointer-events-none opacity-0"
      )}
    >
      <Icone className="size-5" strokeWidth={2.2} />
    </button>
  );
}
