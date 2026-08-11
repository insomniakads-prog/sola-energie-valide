"use client";

/**
 * StatsRow — Ligne de chiffres clés animés au scroll
 * ---------------------------------------------------
 * USAGE :
 *   <StatsRow
 *     stats={[
 *       { value: 500, suffix: "+", label: "chantiers réalisés" },
 *       { value: 4.9, decimals: 1, suffix: "/5", label: "note clients" },
 *       { value: 15, suffix: " ans", label: "d'expérience" },
 *     ]}
 *     accentColor="#00C07F"
 *   />
 */

import { useEffect, useRef, useState } from "react";

export interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}

interface StatsRowProps {
  stats: Stat[];
  accentColor?: string;
  /** Durée de l'animation en ms */
  duration?: number;
}

function useCounter(target: number, duration: number, decimals: number, active: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    const steps = duration / 16;
    const step = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      setCount(current);
      if (current >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, active]);

  return decimals > 0 ? count.toFixed(decimals) : Math.floor(count);
}

function StatItem({
  stat,
  accentColor,
  duration,
  active,
}: {
  stat: Stat;
  accentColor: string;
  duration: number;
  active: boolean;
}) {
  const count = useCounter(stat.value, duration, stat.decimals ?? 0, active);
  return (
    <div className="text-center">
      <div className="text-3xl md:text-4xl font-bold" style={{ color: accentColor }}>
        {stat.prefix ?? ""}{count}{stat.suffix ?? ""}
      </div>
      <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
    </div>
  );
}

export function StatsRow({ stats, accentColor = "#00C07F", duration = 1200 }: StatsRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`grid gap-8 ${
        stats.length === 2 ? "grid-cols-2" :
        stats.length === 3 ? "grid-cols-3" :
        "grid-cols-2 md:grid-cols-4"
      }`}
    >
      {stats.map((stat, i) => (
        <StatItem key={i} stat={stat} accentColor={accentColor} duration={duration} active={active} />
      ))}
    </div>
  );
}
