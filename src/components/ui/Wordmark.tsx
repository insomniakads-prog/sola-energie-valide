import Image from "next/image";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/constants";

/**
 * Logo Sola Énergie — le bloc vertical fourni par le client,
 * détouré (fond transparent) et utilisé tel quel.
 *
 * Le header est dimensionné en conséquence : sous ~48 px de haut,
 * la ligne « SOLA ENERGIE » du logo n'est plus lisible.
 */
export function Wordmark({
  className,
  size = "md",
}: {
  className?: string;
  size?: "md" | "lg";
}) {
  return (
    <Image
      src="/logo-sola.png"
      alt={siteConfig.name}
      width={897}
      height={515}
      priority
      className={cn(
        "w-auto",
        size === "lg" ? "h-16 md:h-20" : "h-12 md:h-16",
        className
      )}
    />
  );
}
