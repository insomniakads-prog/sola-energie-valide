"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone, X } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import { Wordmark } from "@/components/ui/Wordmark";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/8 bg-white/95 backdrop-blur-sm">
      {/* Hauteur calée sur le logo vertical : il lui faut de la place */}
      <div className="container-site flex h-20 items-center justify-between gap-4 md:h-[104px]">
        <Link href="/" className="shrink-0">
          <Wordmark />
        </Link>

        {/* Nav desktop */}
        <nav className="hidden items-center gap-7 lg:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[13.5px] font-medium text-ink/70 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <a href={siteConfig.phoneHref} className="btn btn-outline btn-sm">
            <Phone className="size-3.5" strokeWidth={2.4} />
            {siteConfig.phone}
          </a>
          <Link href={siteConfig.cta.href} className="btn btn-primary btn-sm">
            {siteConfig.cta.text}
          </Link>
        </div>

        {/* Burger mobile */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          className="flex size-10 items-center justify-center rounded-full border border-ink/10 text-ink md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Drawer mobile */}
      {open && (
        <div className="border-t border-ink/8 bg-white md:hidden">
          <div className="container-site flex flex-col gap-1 py-4">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-ice"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2.5">
              <a
                href={siteConfig.phoneHref}
                className="btn btn-outline w-full"
                onClick={() => setOpen(false)}
              >
                <Phone className="size-3.5" strokeWidth={2.4} />
                {siteConfig.phone}
              </a>
              <Link
                href={siteConfig.cta.href}
                className="btn btn-primary w-full"
                onClick={() => setOpen(false)}
              >
                {siteConfig.cta.text}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
