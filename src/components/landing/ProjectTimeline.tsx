"use client";

/**
 * ProjectTimeline — Timeline de projet animée au scroll
 * -------------------------------------------------------
 * Mobile : timeline verticale
 * Desktop : zigzag centré
 * Progression animée via scroll
 *
 * USAGE :
 *   import { ProjectTimeline } from "@/components/landing/ProjectTimeline"
 *   import { FileSearch, Home, Wrench, ThermometerSun, type LucideIcon } from "lucide-react"
 *
 *   const MY_STEPS = [
 *     { number: 1, title: "Étude gratuite", description: "...", icon: FileSearch },
 *     { number: 2, title: "Visite technique", description: "...", icon: Home },
 *     ...
 *   ]
 *
 *   <ProjectTimeline steps={MY_STEPS} accentColor="#00C07F" onStepClick={scrollToForm} />
 */

import { useEffect, useState, useRef } from "react";
import { type LucideIcon } from "lucide-react";

export interface TimelineStep {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

interface ProjectTimelineProps {
  steps: TimelineStep[];
  /** Couleur d'accent pour la ligne et les étapes actives */
  accentColor?: string;
  /** Callback quand on clique sur une étape (ex: scroll vers formulaire) */
  onStepClick?: () => void;
}

export function ProjectTimeline({
  steps,
  accentColor = "#00C07F",
  onStepClick,
}: ProjectTimelineProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const visibleStart = Math.max(0, windowHeight - rect.top);
        const totalVisible = rect.height + windowHeight * 0.5;
        const progress = Math.min(1, Math.max(0, visibleStart / totalVisible));
        setScrollProgress(progress);
        setActiveStep(Math.min(steps.length - 1, Math.floor(progress * steps.length)));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [steps.length]);

  return (
    <div ref={sectionRef} className="relative">
      {/* ── Mobile : timeline verticale ── */}
      <div className="md:hidden">
        <div className="relative pl-8">
          <div className="absolute left-[15px] top-0 bottom-0 w-[2px] bg-border" />
          <div
            className="absolute left-[15px] top-0 w-[2px] transition-all duration-300 ease-out"
            style={{ height: `${scrollProgress * 100}%`, backgroundColor: accentColor }}
          />
          <div className="space-y-8">
            {steps.map((step, index) => {
              const isActive = index <= activeStep;
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className={`relative transition-all duration-500 ${
                    isActive ? "opacity-100 translate-x-0" : "opacity-50 translate-x-2"
                  }`}
                  onClick={onStepClick}
                >
                  <div
                    className="absolute -left-8 top-0 h-8 w-8 rounded-full flex items-center justify-center transition-all duration-300 text-white"
                    style={{ backgroundColor: isActive ? accentColor : "#94a3b8" }}
                  >
                    <span className="text-sm font-bold">{step.number}</span>
                  </div>
                  <div
                    className={`bg-card rounded-xl p-5 border transition-all duration-300 ${
                      onStepClick ? "cursor-pointer" : ""
                    }`}
                    style={{ borderColor: isActive ? `${accentColor}80` : undefined }}
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className="h-12 w-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                        style={{ backgroundColor: isActive ? `${accentColor}1A` : undefined }}
                      >
                        <Icon
                          className="h-6 w-6 transition-colors duration-300"
                          style={{ color: isActive ? accentColor : "#94a3b8" }}
                        />
                      </div>
                      <div>
                        <h3
                          className="font-semibold text-lg mb-1 transition-colors duration-300"
                          style={{ color: isActive ? undefined : "#94a3b8" }}
                        >
                          {step.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Desktop : zigzag centré ── */}
      <div className="hidden md:block max-w-4xl mx-auto">
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] bg-border rounded-full" />
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[3px] rounded-full transition-all duration-300 ease-out"
            style={{ height: `${scrollProgress * 100}%`, backgroundColor: accentColor }}
          />
          <div className="space-y-12">
            {steps.map((step, index) => {
              const isActive = index <= activeStep;
              const isLeft = index % 2 === 0;
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className={`relative flex items-center gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
                  onClick={onStepClick}
                >
                  <div className="flex-1">
                    <div
                      className={`bg-card rounded-2xl p-6 border-2 transition-all duration-500 ${
                        onStepClick ? "cursor-pointer" : ""
                      } ${isLeft ? "mr-8" : "ml-8"} ${
                        isActive ? "shadow-xl opacity-100 translate-y-0" : "opacity-40 translate-y-2"
                      }`}
                      style={{ borderColor: isActive ? `${accentColor}80` : undefined }}
                    >
                      <div className="flex items-start gap-5">
                        <div
                          className="h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300"
                          style={{ backgroundColor: isActive ? `${accentColor}1A` : undefined }}
                        >
                          <Icon
                            className="h-7 w-7 transition-colors duration-300"
                            style={{ color: isActive ? accentColor : "#94a3b8" }}
                          />
                        </div>
                        <div>
                          <span
                            className="text-xs font-bold px-2.5 py-1 rounded-full mb-2 inline-block transition-colors"
                            style={
                              isActive
                                ? { color: accentColor, backgroundColor: `${accentColor}1A` }
                                : { color: "#94a3b8", backgroundColor: "#f1f5f9" }
                            }
                          >
                            Étape {step.number}
                          </span>
                          <h3
                            className="text-lg font-semibold mb-1 transition-colors duration-300"
                            style={{ color: isActive ? undefined : "#94a3b8" }}
                          >
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cercle central */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 h-10 w-10 rounded-full flex items-center justify-center z-10 transition-all duration-300 ring-4 ring-white text-white font-bold text-sm"
                    style={{
                      backgroundColor: isActive ? accentColor : "#cbd5e1",
                      transform: `translateX(-50%) ${isActive ? "scale(1.1)" : "scale(1)"}`,
                    }}
                  >
                    {step.number}
                  </div>

                  <div className="flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
