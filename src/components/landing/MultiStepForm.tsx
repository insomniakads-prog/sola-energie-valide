"use client";

/**
 * MultiStepForm — Composant générique de formulaire multi-étapes
 * ---------------------------------------------------------------
 * DÉPENDANCES :
 *   npm install sonner lucide-react
 *   shadcn: button, input (ou équivalents)
 *
 * FICHIERS REQUIS dans le projet :
 *   @/lib/formValidation  (voir formValidation.ts dans ce repo)
 *   @/components/ui/button
 *   @/components/ui/input
 *   @/components/ui/form-disclaimer (optionnel — peut être retiré)
 *
 * USAGE :
 *   import { MultiStepForm } from "@/components/sections/MultiStepForm"
 *   import { SOLAR_STEPS } from "@/config/forms/solar"
 *
 *   <MultiStepForm
 *     steps={SOLAR_STEPS}
 *     apiEndpoint="/api/leads/solaire"
 *     redirectUrl="/merci-solaire"
 *     accentColor="#F59F0A"
 *     ctaLabel="Vérifier mon éligibilité"
 *   />
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Check, MapPin, User, Phone, Mail, ChevronLeft, LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  validateEmail,
  validatePhone,
  validateName,
  validateCodePostal,
  ERROR_MESSAGES,
} from "@/lib/formValidation";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

export interface CardOption {
  value: string;
  emoji: string;
  label: string;
  sublabel?: string;
  /** Si true, affiche un message d'inéligibilité et bloque la progression */
  ineligible?: boolean;
  ineligibleMessage?: string;
}

export type StepType =
  | "cards"           // Grille de cartes cliquables (avance auto après sélection)
  | "cards-manual"    // Grille de cartes + bouton Continuer (pas d'avance auto)
  | "inputs-address"  // Code postal + prénom + nom
  | "inputs-contact"  // Téléphone + email (étape finale → submit)
  | "input-single";   // Un seul champ texte + bouton Continuer

export interface StepConfig {
  type: StepType;
  /** Clé du champ dans formData (pour "cards", "cards-manual", "input-single") */
  field?: string;
  question: string;
  subtitle?: string;
  /** Options pour les types "cards" et "cards-manual" */
  options?: CardOption[];
  /** Nombre de colonnes pour la grille de cartes (défaut: 2) */
  columns?: 2 | 3;
  /** Pour "input-single" : type HTML de l'input */
  inputType?: string;
  /** Pour "input-single" : placeholder */
  placeholder?: string;
  /** Pour "input-single" : inputMode */
  inputMode?: "text" | "numeric" | "tel" | "email";
  /** Pour "input-single" : longueur max */
  maxLength?: number;
  /** Pour "input-single" : fonction de validation custom */
  validate?: (value: string) => boolean;
  /** Pour "input-single" : message d'erreur custom */
  errorMessage?: string;
}

interface MultiStepFormProps {
  steps: StepConfig[];
  /** Route API POST qui reçoit le formData en JSON */
  apiEndpoint: string;
  /** URL de redirection après succès */
  redirectUrl: string;
  /** Couleur d'accent principale (progress bar, boutons, sélection) */
  accentColor?: string;
  /** Texte du bouton de soumission finale */
  ctaLabel?: string;
  /** Texte du bouton "Continuer" dans les étapes intermédiaires */
  continueLabel?: string;
  /** Callback appelé à chaque changement d'étape (utile pour la barre de progression externe) */
  onStepChange?: (step: number, total: number) => void;
  /** Afficher le disclaimer RGPD en bas du formulaire */
  showDisclaimer?: boolean;
  /** Texte du disclaimer (défaut: texte RGPD standard) */
  disclaimerText?: string;
  /** Classes CSS supplémentaires sur le wrapper */
  className?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// SOUS-COMPOSANTS INTERNES
// ─────────────────────────────────────────────────────────────────────────────

function SelectionCard({
  option,
  selected,
  onClick,
  accentColor,
}: {
  option: CardOption;
  selected: boolean;
  onClick: () => void;
  accentColor: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative p-6 rounded-xl border-2 transition-all duration-200 flex flex-col items-center justify-center gap-3 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 ${
        selected
          ? "shadow-lg"
          : "border-gray-300 bg-card hover:bg-muted/50 shadow-md"
      }`}
      style={
        selected
          ? {
              borderColor: accentColor,
              backgroundColor: `${accentColor}0D`,
            }
          : {}
      }
    >
      {selected && (
        <div
          className="absolute top-2 right-2 h-6 w-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: accentColor }}
        >
          <Check className="h-4 w-4 text-white" />
        </div>
      )}
      <span className="text-4xl">{option.emoji}</span>
      <div className="text-center">
        <p
          className="font-semibold text-lg"
          style={{ color: selected ? accentColor : undefined }}
        >
          {option.label}
        </p>
        {option.sublabel && (
          <p className="text-sm text-muted-foreground">{option.sublabel}</p>
        )}
      </div>
    </button>
  );
}

function InputField({
  name,
  type = "text",
  placeholder,
  value,
  icon: Icon,
  error,
  inputMode,
  maxLength,
  onChange,
  onBlur,
}: {
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  icon: LucideIcon;
  error?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
  maxLength?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  accentColor: string;
}) {
  return (
    <div className="space-y-1">
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          inputMode={inputMode}
          maxLength={maxLength}
          className={`h-14 pl-12 text-base ${
            error ? "border-destructive focus-visible:ring-destructive" : ""
          }`}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}

function IneligibleBanner({ message }: { message: string }) {
  return (
    <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4">
      <h4 className="text-destructive font-semibold text-lg">Non éligible</h4>
      <p className="text-destructive/80 text-sm mt-1">{message}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL
// ─────────────────────────────────────────────────────────────────────────────

export function MultiStepForm({
  steps,
  apiEndpoint,
  redirectUrl,
  accentColor = "#F59F0A",
  ctaLabel = "Vérifier mon éligibilité",
  continueLabel = "Continuer",
  onStepChange,
  showDisclaimer = true,
  disclaimerText,
  className = "",
}: MultiStepFormProps) {
  const router = useRouter();

  // État du formulaire — clés dynamiques selon les steps fournis
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pageLoadTime, setPageLoadTime] = useState(0);
  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [ineligibleMsg, setIneligibleMsg] = useState<string | null>(null);

  const totalSteps = steps.length;
  const currentStep = steps[step];
  const progress = Math.round(((step + 1) / totalSteps) * 100);

  useEffect(() => {
    setPageLoadTime(Date.now());
  }, []);

  useEffect(() => {
    onStepChange?.(step + 1, totalSteps);
  }, [step, totalSteps, onStepChange]);

  // ── Navigation ────────────────────────────────────────────────────────────

  const goNext = useCallback(() => {
    if (step < totalSteps - 1) {
      setDirection(1);
      setIneligibleMsg(null);
      setStep((s) => s + 1);
    }
  }, [step, totalSteps]);

  const goPrev = useCallback(() => {
    if (step > 0) {
      setDirection(-1);
      setIneligibleMsg(null);
      setStep((s) => s - 1);
    }
  }, [step]);

  // ── Gestion des cartes ────────────────────────────────────────────────────

  const handleCardSelect = useCallback(
    (field: string, option: CardOption) => {
      setFormData((prev) => ({ ...prev, [field]: option.value }));

      if (option.ineligible) {
        setIneligibleMsg(option.ineligibleMessage ?? "Non éligible");
        return;
      }
      setIneligibleMsg(null);

      if (currentStep.type === "cards") {
        setTimeout(goNext, 280);
      }
    },
    [currentStep, goNext]
  );

  // ── Gestion des inputs ────────────────────────────────────────────────────

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      if (errors[name]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    },
    [errors]
  );

  const handleInputBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const newErrors = { ...errors };

      switch (name) {
        case "code_postal":
          if (value && !validateCodePostal(value))
            newErrors.code_postal = ERROR_MESSAGES.code_postal;
          else delete newErrors.code_postal;
          break;
        case "prenom":
          if (value && !validateName(value))
            newErrors.prenom = ERROR_MESSAGES.prenom;
          else delete newErrors.prenom;
          break;
        case "nom":
          if (value && !validateName(value))
            newErrors.nom = ERROR_MESSAGES.nom;
          else delete newErrors.nom;
          break;
        case "telephone":
          if (value && !validatePhone(value))
            newErrors.telephone = ERROR_MESSAGES.telephone;
          else delete newErrors.telephone;
          break;
        case "email":
          if (value && !validateEmail(value))
            newErrors.email = ERROR_MESSAGES.email;
          else delete newErrors.email;
          break;
        default:
          // Validation custom pour input-single
          if (currentStep.validate && value && !currentStep.validate(value)) {
            newErrors[name] =
              currentStep.errorMessage ?? "Valeur invalide";
          } else {
            delete newErrors[name];
          }
      }

      setErrors(newErrors);
    },
    [errors, currentStep]
  );

  // ── Validation par type d'étape ──────────────────────────────────────────

  const canProceed = useCallback((): boolean => {
    if (!currentStep) return false;

    switch (currentStep.type) {
      case "cards":
      case "cards-manual": {
        const value = formData[currentStep.field ?? ""] ?? "";
        if (!value) return false;
        const selectedOption = currentStep.options?.find(
          (o) => o.value === value
        );
        return !selectedOption?.ineligible;
      }
      case "inputs-address":
        return (
          validateCodePostal(formData.code_postal ?? "") &&
          validateName(formData.prenom ?? "") &&
          validateName(formData.nom ?? "")
        );
      case "inputs-contact":
        return (
          validatePhone(formData.telephone ?? "") &&
          validateEmail(formData.email ?? "")
        );
      case "input-single": {
        const value = formData[currentStep.field ?? ""] ?? "";
        if (!value) return false;
        if (currentStep.validate) return currentStep.validate(value);
        return true;
      }
      default:
        return false;
    }
  }, [currentStep, formData]);

  // ── Soumission ────────────────────────────────────────────────────────────

  const handleSubmit = async () => {
    if (!validatePhone(formData.telephone ?? "")) {
      setErrors((prev) => ({ ...prev, telephone: ERROR_MESSAGES.telephone }));
      return;
    }
    if (!validateEmail(formData.email ?? "")) {
      setErrors((prev) => ({ ...prev, email: ERROR_MESSAGES.email }));
      return;
    }

    const timeSinceLoad = Date.now() - pageLoadTime;
    if (timeSinceLoad < 2000) {
      toast.error(ERROR_MESSAGES.wait_load);
      return;
    }
    if (lastSubmitTime > 0 && Date.now() - lastSubmitTime < 3000) {
      toast.error(ERROR_MESSAGES.wait_submit);
      return;
    }

    setIsSubmitting(true);
    setLastSubmitTime(Date.now());

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) toast.error(ERROR_MESSAGES.duplicate);
        else if (response.status === 429)
          toast.error("Trop de requêtes. Veuillez patienter.");
        else toast.error(data.error || ERROR_MESSAGES.server_error);
        return;
      }

      toast.success("Votre demande a été envoyée avec succès !");
      router.push(redirectUrl);
    } catch {
      toast.error(ERROR_MESSAGES.server_error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Framer Motion ─────────────────────────────────────────────────────────

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 48 : -48, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -48 : 48, opacity: 0 }),
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      className={`bg-card rounded-2xl shadow-xl border border-border/50 overflow-hidden ${className}`}
    >
      <div className="p-6 md:p-8">
        {/* ── Progress bar ── */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">
              Étape {step + 1} sur {totalSteps}
            </span>
            <span
              className="text-sm font-semibold"
              style={{ color: accentColor }}
            >
              {progress}% complété
            </span>
          </div>

          <div className="relative h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, backgroundColor: accentColor }}
            />
            <div
              className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full border-2 border-background shadow-md transition-all duration-500"
              style={{
                left: `calc(${Math.min(progress, 97)}% - 8px)`,
                backgroundColor: accentColor,
              }}
            />
          </div>
        </div>

        {/* ── Étape animée ── */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            {/* Bouton retour */}
            {step > 0 && (
              <button
                type="button"
                onClick={goPrev}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                Retour
              </button>
            )}

            {/* Titre + sous-titre */}
            <div className="mb-6">
              <h3 className="text-xl font-bold text-foreground">
                {currentStep.question}
              </h3>
              {currentStep.subtitle && (
                <p className="text-sm text-muted-foreground mt-1">
                  {currentStep.subtitle}
                </p>
              )}
            </div>

            {/* Message d'inéligibilité */}
            {ineligibleMsg && <IneligibleBanner message={ineligibleMsg} />}

            {/* ── TYPE : cards / cards-manual ── */}
            {(currentStep.type === "cards" ||
              currentStep.type === "cards-manual") &&
              currentStep.options && (
                <div className="space-y-4">
                  <div
                    className={`grid gap-4 ${
                      (currentStep.columns ?? 2) >= 3
                        ? "grid-cols-2 sm:grid-cols-3"
                        : "grid-cols-2"
                    }`}
                  >
                    {currentStep.options.map((option) => (
                      <SelectionCard
                        key={option.value}
                        option={option}
                        selected={
                          formData[currentStep.field ?? ""] === option.value
                        }
                        onClick={() =>
                          handleCardSelect(currentStep.field ?? "", option)
                        }
                        accentColor={accentColor}
                      />
                    ))}
                  </div>

                  {/* Bouton Continuer pour cards-manual uniquement */}
                  {currentStep.type === "cards-manual" && (
                    <Button
                      onClick={goNext}
                      disabled={!canProceed()}
                      className="w-full h-14 text-lg text-white disabled:opacity-50"
                      style={{ backgroundColor: accentColor }}
                    >
                      {continueLabel}
                    </Button>
                  )}
                </div>
              )}

            {/* ── TYPE : inputs-address ── */}
            {currentStep.type === "inputs-address" && (
              <div className="space-y-4">
                <InputField
                  name="code_postal"
                  placeholder="Code postal (ex: 75001)"
                  value={formData.code_postal ?? ""}
                  icon={MapPin}
                  error={errors.code_postal}
                  inputMode="numeric"
                  maxLength={5}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  accentColor={accentColor}
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    name="prenom"
                    placeholder="Prénom"
                    value={formData.prenom ?? ""}
                    icon={User}
                    error={errors.prenom}
                    maxLength={100}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    accentColor={accentColor}
                  />
                  <InputField
                    name="nom"
                    placeholder="Nom"
                    value={formData.nom ?? ""}
                    icon={User}
                    error={errors.nom}
                    maxLength={100}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    accentColor={accentColor}
                  />
                </div>
                <Button
                  onClick={goNext}
                  disabled={!canProceed()}
                  className="w-full h-14 text-lg text-white disabled:opacity-50"
                  style={{ backgroundColor: accentColor }}
                >
                  {continueLabel}
                </Button>
              </div>
            )}

            {/* ── TYPE : inputs-contact (étape finale) ── */}
            {currentStep.type === "inputs-contact" && (
              <div className="space-y-4">
                <InputField
                  name="telephone"
                  type="tel"
                  placeholder="Téléphone (ex: 06 12 34 56 78)"
                  value={formData.telephone ?? ""}
                  icon={Phone}
                  error={errors.telephone}
                  inputMode="tel"
                  maxLength={14}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  accentColor={accentColor}
                />
                <InputField
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={formData.email ?? ""}
                  icon={Mail}
                  error={errors.email}
                  inputMode="email"
                  maxLength={255}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  accentColor={accentColor}
                />
                <Button
                  onClick={handleSubmit}
                  disabled={!canProceed() || isSubmitting}
                  className="w-full h-14 text-lg text-white disabled:opacity-50"
                  style={{ backgroundColor: accentColor }}
                >
                  {isSubmitting ? "Envoi en cours..." : ctaLabel}
                </Button>
              </div>
            )}

            {/* ── TYPE : input-single ── */}
            {currentStep.type === "input-single" && currentStep.field && (
              <div className="space-y-4">
                <InputField
                  name={currentStep.field}
                  type={currentStep.inputType ?? "text"}
                  placeholder={currentStep.placeholder ?? ""}
                  value={formData[currentStep.field] ?? ""}
                  icon={MapPin}
                  error={errors[currentStep.field]}
                  inputMode={currentStep.inputMode}
                  maxLength={currentStep.maxLength}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  accentColor={accentColor}
                />
                <Button
                  onClick={goNext}
                  disabled={!canProceed()}
                  className="w-full h-14 text-lg text-white disabled:opacity-50"
                  style={{ backgroundColor: accentColor }}
                >
                  {continueLabel}
                </Button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* ── Disclaimer RGPD ── */}
        {showDisclaimer && (
          <p className="text-xs text-muted-foreground text-center mt-6 leading-relaxed">
            {disclaimerText ??
              "En soumettant ce formulaire, vous acceptez d'être contacté par un conseiller. Vos données sont traitées conformément à notre politique de confidentialité. Vous pouvez vous désinscrire à tout moment."}
          </p>
        )}
      </div>
    </div>
  );
}
