import { ChevronRight } from "lucide-react";
import { faq } from "@/lib/content";

export function Faq() {
  return (
    <section id="faq" className="section-y bg-paper">
      <div className="mx-auto w-full max-w-[1100px] px-[var(--gutter)]">
        <div className="mb-[clamp(40px,4.5vw,64px)] text-center">
          <span className="caps mb-3.5">FAQ</span>
          <h2 className="t-display mx-auto max-w-[820px] text-ink">
            Les réponses <span className="accent">à vos questions</span>
          </h2>
        </div>

        <div className="grid gap-3">
          {faq.map((item) => (
            <details
              key={item.num}
              className="group self-start overflow-hidden rounded-2xl border border-ice bg-white transition-all duration-200 open:border-transparent open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3.5 p-[18px_22px] font-display text-[14.5px] font-semibold text-ink select-none [&::-webkit-details-marker]:hidden">
                <span className="shrink-0 font-display text-[13px] font-bold tracking-[0.04em] text-gold">
                  {item.num}
                </span>
                <span className="flex-1">{item.question}</span>
                <span className="inline-flex size-[30px] shrink-0 items-center justify-center rounded-full bg-ice text-ink transition-colors duration-200 group-open:bg-[image:var(--gradient-sun)] group-open:text-ink">
                  <ChevronRight
                    className="size-3 transition-transform duration-300 group-open:rotate-90"
                    strokeWidth={2.8}
                  />
                </span>
              </summary>
              <div className="px-[22px] pb-5 text-[13.5px] leading-[1.6] text-ink/80">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
