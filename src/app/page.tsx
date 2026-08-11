import { siteConfig } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { SectionWrapper } from "@/components/ui/SectionWrapper";

export default function Home() {
  return (
    <>
      <SectionWrapper background="dark" className="min-h-[60vh] flex items-center">
        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold md:text-6xl">
            {siteConfig.name}
          </h1>
          <p className="mt-4 text-xl text-gray-300">
            {siteConfig.description}
          </p>
          <div className="mt-8">
            <Button size="lg">{siteConfig.cta.text}</Button>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper id="services">
        <h2 className="font-heading text-3xl font-bold text-center">
          Nos Services
        </h2>
        <p className="mt-4 text-center text-gray-500">
          Ce placeholder sera remplacé par Claude Code lors de la génération V1.
        </p>
      </SectionWrapper>
    </>
  );
}
