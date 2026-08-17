import { NextResponse } from "next/server";

/**
 * Réception des demandes d'estimation.
 *
 * Destination : définir LEAD_WEBHOOK_URL (CRM, Make, Zapier, GoHighLevel…).
 * Sans cette variable, le lead est seulement journalisé — utile en
 * développement, mais ⚠️ AUCUN LEAD N'EST TRANSMIS en production.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const TEL_RE = /^(?:\+33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
const CP_RE = /^\d{5}$/;

type Payload = {
  profil?: string;
  reponses?: Record<string, string>;
  contact?: {
    prenom?: string;
    nom?: string;
    email?: string;
    telephone?: string;
    codePostal?: string;
    consentement?: boolean;
  };
  estimation?: unknown;
  page?: string;
};

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Corps invalide" }, { status: 400 });
  }

  const contact = body.contact ?? {};
  const reponses = body.reponses ?? {};

  // On revalide côté serveur : la validation du navigateur est contournable.
  const erreurs: string[] = [];
  if ((contact.prenom ?? "").trim().length < 2) erreurs.push("prenom");
  if ((contact.nom ?? "").trim().length < 2) erreurs.push("nom");
  if (!EMAIL_RE.test(contact.email ?? "")) erreurs.push("email");
  if (!TEL_RE.test(contact.telephone ?? "")) erreurs.push("telephone");
  if (!CP_RE.test(contact.codePostal ?? "")) erreurs.push("codePostal");
  // Sans consentement explicite, la transmission aux partenaires est illicite.
  if (contact.consentement !== true) erreurs.push("consentement");

  if (erreurs.length > 0) {
    return NextResponse.json(
      { error: "Champs invalides", champs: erreurs },
      { status: 422 }
    );
  }

  const lead = {
    recuLe: new Date().toISOString(),
    profil: body.profil,
    contact,
    reponses,
    estimation: body.estimation,
    page: body.page,
  };

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.warn(
      "[lead] LEAD_WEBHOOK_URL absent — le lead n'est transmis nulle part.",
      lead
    );
    return NextResponse.json({ ok: true, transmis: false });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(`webhook ${res.status}`);
  } catch (error) {
    console.error("[lead] transmission échouée", error, lead);
    return NextResponse.json(
      { error: "Transmission impossible" },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, transmis: true });
}
