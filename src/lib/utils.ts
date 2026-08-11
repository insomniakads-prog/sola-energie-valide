import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combine les classes Tailwind intelligemment.
 * Résout les conflits (ex: px-4 + px-8 = px-8).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
