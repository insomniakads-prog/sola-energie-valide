"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Building,
  Building2,
  Check,
  Home,
  KeyRound,
  Loader2,
} from "lucide-react";
import {
  buildSteps,
  estimer,
  formatEuros,
  formatFourchette,
  type Choice,
  type Illustration,
  type Profil,
  type Step,
} from "@/lib/estimation";
import { siteConfig } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ILLUSTRATIONS } from "@/components/estimation/Illustrations";

type Contact = {
  prenom: string;
  nom: string;
  telephone: string;
  email: string;
  codePostal: string;
  consentement: boolean;
};

const CONTACT_VIDE: Contact = {
  prenom: "",
  nom: "",
  telephone: "",
  email: "",
  codePostal: "",
  consentement: false,
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const TEL_RE = /^(?:\+33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
const CP_RE = /^\d{5}$/;

/** Icône de chaque type de choix. */
const ICONES = {
  maison: Home,
  appartement: Building2,
  entreprise: Building,
  cle: KeyRound,
} as const;

export function EstimationForm({ profil }: { profil: Profil }) {
  const [index, setIndex] = useState(0);
  const [reponses, setReponses] = useState<Record<string, string>>({});
  const [contact, setContact] = useState<Contact>(CONTACT_VIDE);
  const [erreurs, setErreurs] = useState<Record<string, string>>({});
  const [envoi, setEnvoi] = useState<"idle" | "encours" | "erreur" | "ok">(
    "idle"
  );

  const steps = useMemo(() => buildSteps(profil, reponses), [profil, reponses]);
  const step = steps[Math.min(index, steps.length - 1)];
  const estimation = estimer(reponses);
  const total = steps.length;

  const setReponse = (id: string, value: string) => {
    setReponses((r) => ({ ...r, [id]: value }));
    setErreurs({});
  };

  // Avancement automatique après un choix : court délai pour que la
  // sélection soit visible avant la transition.
  const minuterie = useRef<ReturnType<typeof setTimeout> | null>(null);
  const annulerAvance = () => {
    if (minuterie.current) clearTimeout(minuterie.current);
    minuterie.current = null;
  };
  useEffect(() => annulerAvance, []);

  const choisir = (id: string, value: string, libre?: boolean) => {
    setReponse(id, value);
    // l'option « Autre » ouvre un champ libre : on laisse saisir
    if (libre) return;
    annulerAvance();
    minuterie.current = setTimeout(() => setIndex((i) => i + 1), 260);
  };

  const valider = () => {
    const e: Record<string, string> = {};
    if (step.kind === "choice" && !reponses[step.id]) {
      e[step.id] = "Merci de sélectionner une réponse.";
    }
    if (step.kind === "contact") {
      if (contact.prenom.trim().length < 2)
        e.prenom = "Veuillez renseigner votre prénom";
      if (contact.nom.trim().length < 2)
        e.nom = "Veuillez renseigner votre nom";
      if (!TEL_RE.test(contact.telephone))
        e.telephone = "Veuillez entrer un numéro de téléphone valide";
      if (!EMAIL_RE.test(contact.email))
        e.email = "Veuillez renseigner une adresse e-mail valide";
      if (!CP_RE.test(contact.codePostal))
        e.codePostal = "Veuillez renseigner un code postal valide";
      if (step.extra && !reponses[step.extra.id])
        e[step.extra.id] = "Merci de préciser.";
      if (!contact.consentement)
        e.consentement = "Votre accord est nécessaire pour vous recontacter.";
    }
    setErreurs(e);
    return Object.keys(e).length === 0;
  };

  const suivant = () => {
    annulerAvance();
    if (!valider()) return;
    if (step.kind === "slider" && !reponses[step.id]) {
      setReponse(step.id, String(step.defaut));
    }
    setIndex((i) => i + 1);
  };

  const envoyer = async () => {
    if (!valider()) return;
    setEnvoi("encours");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profil: profil === "demander" ? reponses.role : profil,
          reponses,
          contact,
          estimation,
          page: typeof window !== "undefined" ? window.location.pathname : "",
        }),
      });
      setEnvoi(res.ok ? "ok" : "erreur");
    } catch {
      setEnvoi("erreur");
    }
  };

  const titreEnPremier =
    step.kind === "choice" && step.titreEnPremier === true;

  if (envoi === "ok") {
    return <Confirmation estimation={estimation} prenom={contact.prenom} />;
  }

  return (
    <div className="w-full max-w-[500px] rounded-2xl border border-ice bg-white px-7 pt-8 pb-10 shadow-lg sm:px-10">
      {/* Rythme vertical de la référence : pastilles 20px, titre 30px
          au-dessus et 10px en dessous, contenu 20px.
          L'écran « Vous êtes : » est le seul à ouvrir sur son titre. */}
      {titreEnPremier ? (
        <>
          <h2 className="font-display text-[clamp(18px,1.9vw,21px)] leading-[1.3] font-bold text-ink">
            {step.question}
          </h2>
          <div className="mt-[30px]">
            <StepsDots total={total} courant={index} />
          </div>
        </>
      ) : (
        <>
          <StepsDots total={total} courant={index} />
          <h2 className="mt-[50px] font-display text-[clamp(18px,1.9vw,21px)] leading-[1.3] font-bold text-ink">
            {step.question}
          </h2>
        </>
      )}
      {step.kind === "contact" && step.help && (
        <p className="mt-2 text-[13.5px] leading-[1.5] text-ink/70">
          {step.help}
        </p>
      )}
      {step.kind === "contact" && step.avantages && (
        <ul className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {step.avantages.map((item) => (
            <li
              key={item}
              className="inline-flex items-center gap-1.5 text-[12.5px] text-ink/80"
            >
              <span className="inline-flex size-4 items-center justify-center rounded-full bg-sun/25 text-ink">
                <Check className="size-2.5" strokeWidth={3.5} />
              </span>
              {item}
            </li>
          ))}
        </ul>
      )}

      {"illustration" in step && step.illustration && (
        <Visuel nom={step.illustration} />
      )}

      <div className="mt-[30px]">
        {step.kind === "choice" && (
          <>
            {step.label && (
              <p className="mb-2.5 text-[13.5px] font-semibold text-ink/80">
                {step.label}
              </p>
            )}
            <Options
              name={step.id}
              choices={step.choices}
              valeur={reponses[step.id]}
              onSelect={(v, choice) => choisir(step.id, v, choice.libre)}
              valeurLibre={reponses[`${step.id}_autre`]}
              onValeurLibre={(v) =>
                setReponses((r) => ({ ...r, [`${step.id}_autre`]: v }))
              }
            />
            {erreurs[step.id] && <Erreur texte={erreurs[step.id]} />}
          </>
        )}

        {step.kind === "slider" && (
          <Slider
            step={step}
            valeur={Number(reponses[step.id] ?? step.defaut)}
            onChange={(v) => setReponse(step.id, String(v))}
          />
        )}

        {step.kind === "contact" && (
          <div className="grid gap-3.5">
            <Champ
              label="Prénom"
              erreur={erreurs.prenom}
              inputProps={{
                autoComplete: "given-name",
                value: contact.prenom,
                onChange: (ev) =>
                  setContact((c) => ({ ...c, prenom: ev.target.value })),
              }}
            />
            <Champ
              label="Nom"
              erreur={erreurs.nom}
              inputProps={{
                autoComplete: "family-name",
                value: contact.nom,
                onChange: (ev) =>
                  setContact((c) => ({ ...c, nom: ev.target.value })),
              }}
            />
            <Champ
              label="Numéro de téléphone"
              erreur={erreurs.telephone}
              inputProps={{
                type: "tel",
                autoComplete: "tel",
                placeholder: "0172 12 34 56",
                value: contact.telephone,
                onChange: (ev) =>
                  setContact((c) => ({ ...c, telephone: ev.target.value })),
              }}
            />
            <Champ
              label="Adresse mail"
              erreur={erreurs.email}
              inputProps={{
                type: "email",
                autoComplete: "email",
                value: contact.email,
                onChange: (ev) =>
                  setContact((c) => ({ ...c, email: ev.target.value })),
              }}
            />
            <Champ
              label="Code Postal"
              erreur={erreurs.codePostal}
              inputProps={{
                inputMode: "numeric",
                autoComplete: "postal-code",
                maxLength: 5,
                value: contact.codePostal,
                onChange: (ev) =>
                  setContact((c) => ({
                    ...c,
                    codePostal: ev.target.value.replace(/\D/g, "").slice(0, 5),
                  })),
              }}
            />

            {step.extra && (
              <div className="mt-1">
                <p className="mb-2 text-[13.5px] font-semibold text-ink/80">
                  {step.extra.label}
                </p>
                <Options
                  name={step.extra.id}
                  choices={step.extra.choices}
                  valeur={reponses[step.extra.id]}
                  onSelect={(v) => setReponse(step.extra!.id, v)}
                />
                {erreurs[step.extra.id] && (
                  <Erreur texte={erreurs[step.extra.id]} />
                )}
              </div>
            )}

            <label className="mt-1 flex cursor-pointer items-start gap-3 rounded-[10px] border border-ink/12 bg-paper p-4">
              <input
                type="checkbox"
                checked={contact.consentement}
                onChange={(ev) =>
                  setContact((c) => ({ ...c, consentement: ev.target.checked }))
                }
                className="mt-0.5 size-4 shrink-0 accent-sun"
              />
              <span className="text-[12px] leading-[1.5] text-ink/75">
                J&apos;accepte que mes données soient transmises à un ou
                plusieurs professionnels partenaires afin d&apos;être recontacté
                au sujet de mon projet, conformément à la{" "}
                <Link
                  href="/politique-de-confidentialite"
                  target="_blank"
                  className="font-semibold text-gold underline underline-offset-2"
                >
                  politique de confidentialité
                </Link>
                .
              </span>
            </label>
            {erreurs.consentement && <Erreur texte={erreurs.consentement} />}

            {step.mention && (
              <p className="text-[12px] leading-[1.5] text-ink/60">
                {step.mention}
              </p>
            )}

            {envoi === "erreur" && (
              <p className="rounded-xl bg-sun/15 p-3 text-[13px] text-ink">
                L&apos;envoi a échoué. Réessayez, ou appelez-nous au{" "}
                <a href={siteConfig.phoneHref} className="font-semibold">
                  {siteConfig.phone}
                </a>
                .
              </p>
            )}
          </div>
        )}
      </div>

      {/* Contenu et pied occupent toute la largeur utile : la carte est
          la seule à fixer une largeur, sinon le padding varierait d'un
          écran à l'autre. */}
      <div className="mt-5 flex items-center gap-3">
        {/* Rendu conditionnel, pas masqué : en `invisible` il garderait sa
            place et décalerait le bouton principal à la première étape. */}
        {index > 0 && (
          <button
            type="button"
            onClick={() => {
              setErreurs({});
              setIndex((i) => Math.max(0, i - 1));
            }}
            aria-label="Revenir à l'étape précédente"
            className="inline-flex size-[50px] shrink-0 items-center justify-center rounded-[10px] border border-ink/15 text-ink transition-colors hover:bg-ice"
          >
            <ArrowLeft className="size-4" strokeWidth={2.4} />
          </button>
        )}

        {/* Libellé à gauche, flèche à droite : .generic-button .content
            de la référence est en space-between. */}
        <button
          type="button"
          onClick={step.kind === "contact" ? envoyer : suivant}
          disabled={envoi === "encours"}
          className="btn btn-primary h-[50px] flex-1 justify-between rounded-[10px] px-4 text-[14.5px] disabled:opacity-70"
        >
          <span className="inline-flex items-center gap-2">
            {envoi === "encours" && <Loader2 className="size-4 animate-spin" />}
            {step.kind === "contact" ? step.bouton : "Suivant"}
          </span>
          <ArrowRight className="size-[18px] shrink-0" strokeWidth={2.4} />
        </button>
      </div>
    </div>
  );
}

/**
 * Indicateur d'étapes du bloc « steps » : une pastille par étape, chacune
 * soulignée d'un trait. L'étape courante est pleine et son trait accentué.
 */
function StepsDots({ total, courant }: { total: number; courant: number }) {
  return (
    <div className="flex max-w-[340px] items-start gap-3" aria-hidden>
      {Array.from({ length: total }, (_, i) => {
        const passee = i < courant;
        const active = i === courant;
        return (
          <div key={i} className="flex flex-1 flex-col items-start gap-2.5">
            <span
              className={cn(
                "flex size-[18px] items-center justify-center rounded-full transition-colors duration-300",
                active
                  ? "border-2 border-ink bg-white"
                  : passee
                    ? "bg-ink text-white"
                    : "bg-ice"
              )}
            >
              {active && <span className="size-2 rounded-full bg-ink" />}
              {passee && <Check className="size-2.5" strokeWidth={4} />}
            </span>
            <span
              className={cn(
                "h-0.5 w-full rounded-full transition-colors duration-300",
                active ? "bg-ink" : passee ? "bg-sun" : "bg-ice"
              )}
            />
          </div>
        );
      })}
    </div>
  );
}

function Visuel({ nom }: { nom: Illustration }) {
  const Composant = ILLUSTRATIONS[nom];
  return (
    <div className="mt-6 flex justify-center">
      <Composant />
    </div>
  );
}

function Erreur({ texte }: { texte: string }) {
  return <p className="mt-2 text-[13px] font-medium text-gold">{texte}</p>;
}

/**
 * Groupe d'options. La référence a deux rendus :
 *  — « picture » : cartes côte à côte, icône au-dessus du libellé,
 *    utilisé quand les choix sont courts et illustrés ;
 *  — liste : lignes empilées avec sélecteur rond, pour les libellés longs.
 */
function Options({
  name,
  choices,
  valeur,
  onSelect,
  valeurLibre,
  onValeurLibre,
}: {
  name: string;
  choices: readonly Choice[];
  valeur?: string;
  onSelect: (v: string, choice: Choice) => void;
  valeurLibre?: string;
  onValeurLibre?: (v: string) => void;
}) {
  // Cartes quand tous les choix sont illustrés, liste sinon.
  const cartes = choices.every((c) => c.icone);

  if (cartes) {
    return (
      <div className="flex flex-wrap gap-2.5">
        {choices.map((choice) => (
          <OptionCard
            key={choice.value}
            name={name}
            choice={choice}
            actif={valeur === choice.value}
            onSelect={() => onSelect(choice.value, choice)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-2.5">
      {choices.map((choice) => (
        <OptionRadio
          key={choice.value}
          name={name}
          choice={choice}
          actif={valeur === choice.value}
          onSelect={() => onSelect(choice.value, choice)}
          valeurLibre={valeurLibre}
          onValeurLibre={onValeurLibre}
        />
      ))}
    </div>
  );
}

/**
 * Carte illustrée : bordure 1px, rayon 15px, icône centrée au-dessus
 * du libellé — mise en page du mode « picture » de la référence.
 */
function OptionCard({
  name,
  choice,
  actif,
  onSelect,
}: {
  name: string;
  choice: Choice;
  actif: boolean;
  onSelect: () => void;
}) {
  const Icone = ICONES[choice.icone ?? "maison"];
  return (
    <label
      className={cn(
        "flex min-w-[130px] flex-1 basis-[160px] cursor-pointer flex-col items-center rounded-[15px] border text-center transition-all duration-150",
        actif
          ? "border-sun bg-sun/10"
          : "border-ink/12 bg-white hover:border-sun/60 hover:shadow-sm"
      )}
    >
      <input
        type="radio"
        name={name}
        checked={actif}
        onChange={onSelect}
        className="sr-only"
      />
      <span aria-hidden className="pt-[22px] pb-1 leading-none">
        <Icone
          className={cn("size-8", actif ? "text-ink" : "text-ink/70")}
          strokeWidth={1.6}
        />
      </span>
      <span className="w-full p-[14px] pt-1.5 text-[14px] leading-[1.25] font-semibold break-words text-ink">
        {choice.label}
      </span>
    </label>
  );
}

/**
 * Ligne d'option : fond gris très clair, bordure 1px, rayon 10px,
 * padding 1em, libellé 17,6px, sous-texte 15px, sélecteur rond de 20px.
 */
function OptionRadio({
  name,
  choice,
  actif,
  onSelect,
  valeurLibre,
  onValeurLibre,
}: {
  name: string;
  choice: Choice;
  actif: boolean;
  onSelect: () => void;
  valeurLibre?: string;
  onValeurLibre?: (v: string) => void;
}) {
  const Icone = ICONES[choice.icone ?? "maison"];

  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-[10px] border p-3.5 transition-all duration-150",
        actif
          ? "border-sun bg-sun/10"
          : "border-ink/12 bg-paper hover:border-sun/60 hover:bg-white"
      )}
    >
      <input
        type="radio"
        name={name}
        checked={actif}
        onChange={onSelect}
        className="sr-only"
      />
      <span
        aria-hidden
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          actif ? "border-sun bg-sun" : "border-ink/25 bg-white"
        )}
      >
        {actif && <span className="size-2 rounded-full bg-ink" />}
      </span>

      {choice.icone && (
        <span aria-hidden className="shrink-0 text-ink/70">
          <Icone className="size-5" strokeWidth={1.8} />
        </span>
      )}

      <span className="min-w-0 flex-1">
        <span className="block text-[14.5px] leading-[1.3] text-ink">
          {choice.label}
        </span>
        {choice.hint && (
          <span className="mt-0.5 block text-[12.5px] leading-[1.3] text-ink/60">
            {choice.hint}
          </span>
        )}
        {/* Le champ libre reste visible en permanence, comme sur la
            référence : il tient lieu de libellé pour l'option. */}
        {choice.libre && (
          <input
            type="text"
            value={valeurLibre ?? ""}
            onChange={(ev) => onValeurLibre?.(ev.target.value)}
            onFocus={onSelect}
            placeholder={choice.label}
            className="w-full rounded-lg border border-ink/12 bg-white px-3 py-1.5 text-[14.5px] text-ink outline-none placeholder:text-ink/40 focus:border-sun"
          />
        )}
      </span>
    </label>
  );
}

/** Curseur avec bulle de valeur, sans champ numérique ni bornes affichées. */
function Slider({
  step,
  valeur,
  onChange,
}: {
  step: Extract<Step, { kind: "slider" }>;
  valeur: number;
  onChange: (v: number) => void;
}) {
  const pct = ((valeur - step.min) / (step.max - step.min)) * 100;
  const affichage =
    valeur <= step.min
      ? `≤ ${step.min}`
      : valeur >= step.max
        ? `≥ ${step.max}`
        : String(valeur);

  return (
    <div>
      <p className="mb-6 text-[13.5px] font-semibold text-ink/80">{step.label}</p>
      <div className="relative pt-9">
        <span
          className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-lg bg-ink px-2.5 py-1 font-display text-[13px] font-bold whitespace-nowrap text-white"
          style={{ left: `calc(${pct}% + ${(50 - pct) * 0.2}px)` }}
        >
          {affichage} {step.unite}
        </span>
        <input
          type="range"
          min={step.min}
          max={step.max}
          step={step.step}
          value={valeur}
          onChange={(ev) => onChange(Number(ev.target.value))}
          aria-label={step.label}
          className="h-2 w-full cursor-pointer appearance-none rounded-full outline-none"
          style={{
            background: `linear-gradient(90deg, #F1BD32 0%, #E09A08 ${pct}%, #E8EDF1 ${pct}%, #E8EDF1 100%)`,
          }}
        />
      </div>
    </div>
  );
}

/** Champ à label flottant, comme les inputs `with-floating-label` du flow. */
function Champ({
  label,
  erreur,
  inputProps,
}: {
  label: string;
  erreur?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}) {
  const rempli = String(inputProps.value ?? "").length > 0;
  return (
    <div>
      <label className="relative block">
        <input
          {...inputProps}
          placeholder={inputProps.placeholder ?? " "}
          className={cn(
            "peer w-full rounded-[10px] border bg-white px-3.5 pt-[22px] pb-1.5 text-[14.5px] text-ink outline-none transition-colors",
            "placeholder:text-transparent focus:border-sun focus:placeholder:text-ink/35",
            erreur ? "border-gold" : "border-ink/15"
          )}
        />
        <span
          className={cn(
            "pointer-events-none absolute left-4 transition-all duration-150",
            rempli
              ? "top-1.5 text-[11px] text-ink/55"
              : "top-1/2 -translate-y-1/2 text-[14.5px] text-ink/45 peer-focus:top-1.5 peer-focus:translate-y-0 peer-focus:text-[11px] peer-focus:text-ink/55"
          )}
        >
          {label}
        </span>
      </label>
      {erreur && <Erreur texte={erreur} />}
    </div>
  );
}

function Confirmation({
  estimation,
  prenom,
}: {
  estimation: ReturnType<typeof estimer>;
  prenom: string;
}) {
  return (
    <div className="w-full max-w-[500px] rounded-2xl border border-ice bg-white p-6 text-center shadow-lg sm:p-8">
      <span className="mx-auto mb-5 inline-flex size-14 items-center justify-center rounded-full bg-[image:var(--gradient-sun)] text-ink">
        <Check className="size-7" strokeWidth={3} />
      </span>
      <h2 className="font-display text-[clamp(22px,2.6vw,28px)] leading-[1.15] font-extrabold text-ink">
        Merci {prenom}, c&apos;est enregistré
      </h2>
      <p className="mx-auto mt-3 max-w-[440px] text-[15px] leading-[1.6] text-ink/70">
        Nous vous recontactons dans les plus brefs délais pour affiner cette
        estimation et vérifier votre éligibilité aux aides.
      </p>

      {estimation && (
        <>
          <div className="mt-7 grid gap-3">
            <Kpi
              valeur={formatFourchette(
                estimation.puissanceMin,
                estimation.puissanceMax
              )}
              label="Puissance recommandée"
            />
            <Kpi
              valeur={`≈ ${estimation.productionAnnuelle.toLocaleString("fr-FR")} kWh`}
              label="Production annuelle"
            />
            <Kpi
              valeur={`≈ ${formatEuros(estimation.economieAnnuelle)}`}
              label="Économie annuelle"
            />
          </div>
          {estimation.limiteParToiture && (
            <p className="mt-4 text-[13px] text-ink/60">
              Puissance ajustée à la surface de toiture disponible, à confirmer
              lors de la visite technique.
            </p>
          )}
        </>
      )}

      <p className="mx-auto mt-6 max-w-[520px] text-[12px] leading-[1.5] text-ink/50">
        Estimation indicative calculée à partir de vos réponses. Elle ne
        remplace pas l&apos;étude personnalisée réalisée après visite technique,
        seule opposable.
      </p>

      <Link href="/" className="btn btn-outline mt-7">
        Revenir à l&apos;accueil
      </Link>
    </div>
  );
}

function Kpi({ valeur, label }: { valeur: string; label: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 rounded-[10px] border border-ice bg-paper px-4 py-3 text-left">
      <span className="text-[13px] text-ink/65">{label}</span>
      <span className="font-display text-[16px] font-extrabold whitespace-nowrap text-ink">
        {valeur}
      </span>
    </div>
  );
}
