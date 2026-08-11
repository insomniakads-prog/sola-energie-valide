/**
 * formValidation.ts — Lib de validation commune
 * -----------------------------------------------
 * Copier dans : src/lib/formValidation.ts
 */

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function validatePhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s.-]/g, "");
  return /^(?:(?:\+33|0033|0)[1-9])(?:[0-9]{8})$/.test(cleaned);
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2 && /^[a-zA-ZÀ-ÿ\s'-]+$/.test(name.trim());
}

export function validateCodePostal(cp: string): boolean {
  return /^[0-9]{5}$/.test(cp.trim());
}

export const ERROR_MESSAGES = {
  email: "Adresse email invalide",
  telephone: "Numéro de téléphone invalide (ex: 06 12 34 56 78)",
  prenom: "Prénom invalide (minimum 2 caractères)",
  nom: "Nom invalide (minimum 2 caractères)",
  entreprise: "Nom d'entreprise invalide",
  code_postal: "Code postal invalide (5 chiffres)",
  wait_load: "Veuillez patienter avant de soumettre le formulaire",
  wait_submit: "Trop rapide ! Veuillez patienter quelques secondes",
  duplicate: "Cette adresse email a déjà soumis une demande récemment",
  server_error: "Une erreur est survenue. Veuillez réessayer.",
};
