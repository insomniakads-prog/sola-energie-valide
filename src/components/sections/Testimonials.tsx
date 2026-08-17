import { ratings, testimonials } from "@/lib/content";
import { Carousel } from "@/components/ui/Carousel";

// Pastilles d'initiales : le jaune porte du texte ardoise,
// les fonds foncés portent du blanc.
const avatarStyle = {
  warm: "bg-[image:var(--gradient-sun)] text-ink",
  navy: "bg-ink text-white",
  blue: "bg-gold text-white",
} as const;

export function Testimonials() {
  return (
    <section id="avis" className="section-y">
      <div className="container-wide">
        <div className="mb-[clamp(40px,4.5vw,64px)] text-center">
          <span className="caps mb-3.5">Avis clients</span>
          <h2 className="t-display mx-auto mb-4 max-w-[820px] text-ink">
            Nos clients{" "}
            <span className="accent">en parlent mieux que nous</span>
          </h2>
          <p className="mx-auto max-w-[640px] text-[15px] leading-[1.6] text-ink/70">
            Quelques recommandations laissées par nos clients.
            <br />
            {/* ⚠️ À VALIDER : notes et volumes d'avis réels */}
            Nous avons {ratings[0].label.replace("sur ", "")} ({ratings[0].score}
            ) et {ratings[1].label.replace("sur ", "")} ({ratings[1].score}).
          </p>
          <span className="mt-3 inline-block text-[12.5px] font-semibold tracking-[0.04em] text-gold md:hidden">
            Glissez pour voir plus d&apos;avis →
          </span>
        </div>

        <Carousel
          ariaLabel="Avis clients"
          className="-mx-[var(--gutter)] snap-x px-[var(--gutter)] pt-1 pb-5"
        >
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="flex min-w-0 shrink-0 basis-[85%] snap-start flex-col gap-4 rounded-[20px] border border-ice bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-lg sm:basis-[55%] lg:basis-[calc((100%-48px)/3.2)]"
            >
              <div className="flex items-center justify-between">
                <span aria-hidden className="tracking-[2px] text-sm text-sun">
                  ★★★★★
                </span>
                <span className="text-[10px] font-semibold tracking-[0.08em] text-ink/50 uppercase">
                  Google
                </span>
              </div>

              <p className="flex-1 text-sm leading-[1.55] text-ink/80">
                {testimonial.quote}
              </p>

              <div className="flex items-center gap-3 border-t border-ink/8 pt-3.5">
                <span
                  aria-hidden
                  className={`inline-flex size-9 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold ${avatarStyle[testimonial.avatar]}`}
                >
                  {testimonial.initials}
                </span>
                <div className="leading-[1.3]">
                  <span className="block text-[13.5px] font-semibold text-ink">
                    {testimonial.name}
                  </span>
                  <span className="text-xs text-ink/60">
                    {testimonial.meta}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
