import { processSteps } from "@/lib/content";

export function Process() {
  return (
    <section id="process" className="section-y bg-paper">
      <div className="container-wide">
        <div className="mb-[clamp(40px,4.5vw,64px)] text-center">
          <span className="caps mb-3.5">Comment ça marche ?</span>
          <h2 className="t-display mx-auto mb-4 max-w-[820px] text-ink">
            Un parcours <span className="accent">cadré et transparent</span>
          </h2>
          <p className="mx-auto max-w-[640px] text-[15px] leading-[1.6] text-ink/70">
            De l&apos;étude à la mise en service, on s&apos;occupe de tout. Un
            seul interlocuteur, et nos équipes salariées réalisent
            l&apos;ensemble de votre projet.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {processSteps.map((step) => (
            <article
              key={step.num}
              className="rounded-[20px] border border-ice bg-white p-[22px_22px_24px]"
            >
              <div className="mb-2.5 font-display text-[13px] font-extrabold tracking-[0.04em] text-gold">
                {step.num}
              </div>
              <h3 className="mb-2 font-display text-[15px] leading-[1.25] font-bold text-ink">
                {step.title}
              </h3>
              <p className="text-[13px] leading-[1.55] text-ink/70">
                {step.text}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
