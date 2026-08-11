/**
 * serverValidation.ts — Validation côté serveur pour les routes API
 * ------------------------------------------------------------------
 * Copier dans : src/lib/serverValidation.ts
 *
 * Inclut : validation des champs, sanitisation XSS, rate limiting en mémoire
 * Pour la prod : remplacer checkRateLimit par une solution Redis (Upstash)
 */

export const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) && email.length <= 255;
};

export const validatePhone = (phone: string): boolean => {
  if (!phone || typeof phone !== "string") return false;
  const clean = phone.replace(/[\s\-.]/g, "");
  return /^(\+33[67]\d{8}|0[67]\d{8})$/.test(clean);
};

export const validateName = (name: string): boolean => {
  if (!name || typeof name !== "string") return false;
  const trimmed = name.trim();
  return trimmed.length >= 2 && trimmed.length <= 100;
};

export const validateCodePostal = (code: string): boolean => {
  if (!code || typeof code !== "string") return false;
  return /^\d{5}$/.test(code.trim());
};

export const cleanPhoneNumber = (phone: string): string =>
  phone.replace(/[\s\-.]/g, "");

export const sanitizeString = (str: string): string => {
  if (!str || typeof str !== "string") return "";
  return str
    .trim()
    .replace(/<[^>]*>/g, "") // Supprime les balises HTML
    .replace(/[<>]/g, "")
    .substring(0, 500);
};

// ── Rate limiting en mémoire ──────────────────────────────────────────────
// ⚠️ En production avec plusieurs instances, utiliser Upstash Redis
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS = 5;

export const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.timestamp > WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  if (record.count >= MAX_REQUESTS) return false;
  record.count++;
  return true;
};

// Nettoyage périodique
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of rateLimitMap.entries()) {
    if (now - record.timestamp > WINDOW_MS) rateLimitMap.delete(ip);
  }
}, 60_000);
