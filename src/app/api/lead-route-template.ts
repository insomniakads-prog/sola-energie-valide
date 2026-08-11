/**
 * TEMPLATE — Route API lead gen avec Supabase
 * --------------------------------------------
 * Copier dans : src/app/api/leads/[secteur]/route.ts
 * Adapter : nom de la table Supabase, champs requis, champ "source"
 *
 * DÉPENDANCES :
 *   @/integrations/supabase/server
 *   @/lib/serverValidation
 */

import { NextRequest, NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/integrations/supabase/server";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateCodePostal,
  cleanPhoneNumber,
  sanitizeString,
  checkRateLimit,
} from "@/lib/serverValidation";

// ── À ADAPTER PAR PROJET ─────────────────────────────────────────────────
const TABLE_NAME = "leads_solaire"; // Nom de la table Supabase
const SOURCE_NAME = "panneaux-solaires"; // Source pour tracking
const REQUIRED_FIELDS = [
  "type_habitation",
  "proprietaire",
  "facture_mensuelle",
  "code_postal",
  "prenom",
  "nom",
  "telephone",
  "email",
] as const;
// ─────────────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    // Rate limiting par IP
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Trop de requêtes. Veuillez patienter avant de réessayer." },
        { status: 429 }
      );
    }

    // Lecture du cookie de tracking (GCLID, UTM)
    let tracking = {
      gclid: null as string | null,
      utm_source: null as string | null,
      utm_medium: null as string | null,
      utm_campaign: null as string | null,
    };
    try {
      const raw = request.cookies.get("_tracking")?.value;
      if (raw) tracking = { ...tracking, ...JSON.parse(raw) };
    } catch {
      /* cookie malformé — lead sauvegardé quand même */
    }

    const conversionTime = new Date()
      .toLocaleString("sv-SE", { timeZone: "Europe/Paris" })
      .substring(0, 19);

    const body = await request.json();

    // Vérification des champs obligatoires
    for (const field of REQUIRED_FIELDS) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Le champ "${field}" est obligatoire.` },
          { status: 400 }
        );
      }
    }

    const { code_postal, prenom, nom, telephone, email } = body;

    // Validation des champs sensibles
    if (!validateCodePostal(code_postal))
      return NextResponse.json({ error: "Code postal invalide." }, { status: 400 });
    if (!validateName(prenom))
      return NextResponse.json({ error: "Prénom invalide." }, { status: 400 });
    if (!validateName(nom))
      return NextResponse.json({ error: "Nom invalide." }, { status: 400 });
    if (!validatePhone(telephone))
      return NextResponse.json({ error: "Numéro de téléphone invalide." }, { status: 400 });
    if (!validateEmail(email))
      return NextResponse.json({ error: "Adresse email invalide." }, { status: 400 });

    const cleanPhone = cleanPhoneNumber(telephone);
    const cleanEmail = email.trim().toLowerCase();

    const supabase = createServerSupabaseClient();

    // Détection des doublons (email ou téléphone)
    const { data: existing } = await supabase
      .from(TABLE_NAME)
      .select("id")
      .or(`email.eq.${cleanEmail},telephone.eq.${cleanPhone}`)
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json(
        { error: "Une demande avec ces informations a déjà été envoyée." },
        { status: 409 }
      );
    }

    // Construction du payload — adapte les champs selon ta table
    const payload: Record<string, unknown> = {
      // Champs de qualification (adapter selon le secteur)
      ...Object.fromEntries(
        REQUIRED_FIELDS.filter(
          (f) => !["code_postal", "prenom", "nom", "telephone", "email"].includes(f)
        ).map((f) => [f, sanitizeString(String(body[f]))])
      ),
      // Champs identité
      departement: code_postal.substring(0, 2),
      code_postal: code_postal.trim(),
      prenom: sanitizeString(prenom),
      nom: sanitizeString(nom),
      telephone: cleanPhone,
      email: cleanEmail,
      // Tracking
      source: SOURCE_NAME,
      utm_source: tracking.utm_source,
      utm_medium: tracking.utm_medium,
      utm_campaign: tracking.utm_campaign,
      google_click_id: tracking.gclid ?? null,
      conversion_name: tracking.gclid ? "Lead GCLID" : null,
      conversion_time: tracking.gclid ? conversionTime : null,
    };

    const { data, error } = await supabase.from(TABLE_NAME).insert(payload).select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        { error: "Une erreur est survenue lors de l'enregistrement." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data }, { status: 201 });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 }
    );
  }
}
