import Image from "next/image";
import { trustLogos } from "@/lib/content";

export function TrustBand() {
  return (
    <section className="border-b border-ink/8 bg-paper py-[clamp(28px,3.5vw,48px)]">
      <div className="container-site text-center">
        <p className="mb-7 text-[13px] font-semibold tracking-[0.02em] text-ink/70">
          Un installateur local et certifié.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-[clamp(28px,5vw,56px)] gap-y-6">
          {trustLogos.map((logo) => (
            <div
              key={logo.src}
              className="relative h-[34px] w-[75px] shrink-0 opacity-75 transition-opacity duration-300 hover:opacity-100 md:h-10 md:w-[90px]"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                fill
                sizes="90px"
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
