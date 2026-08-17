/**
 * FormDisclaimer — Texte RGPD standard en bas de formulaire
 * ----------------------------------------------------------
 * Copier dans : src/components/ui/form-disclaimer.tsx
 *
 * USAGE :
 *   <FormDisclaimer />
 *   ou personnalisé :
 *   <FormDisclaimer siteName="MonSite.fr" />
 */

import Link from "next/link";

interface FormDisclaimerProps {
  /** Nom du site pour personnaliser le texte si besoin */
  siteName?: string;
}

export function FormDisclaimer({ siteName }: FormDisclaimerProps) {
  const parPartenaires = siteName
    ? `de la part de ${siteName} et de ses partenaires`
    : "de la part de nos différents partenaires";

  return (
    <p className="text-[10px] leading-relaxed text-muted-foreground mt-4 text-center">
      En validant cette demande vous donnez votre accord pour être contacté par e-mail et/ou
      téléphone et recevoir des détails sur votre éligibilité {parPartenaires} pour le suivi
      de votre demande et la relation commerciale qui peut en découler.
      Vous disposez du droit de vous inscrire sur la liste d&apos;opposition au démarchage
      téléphonique{" "}
      <Link
        href="https://www.bloctel.gouv.fr"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        bloctel.gouv.fr
      </Link>
      . Pour en savoir plus sur la gestion de vos données personnelles et exercer vos droits,
      consultez :{" "}
      <Link href="/politique-confidentialite" className="text-primary hover:underline">
        Politique de confidentialité
      </Link>
    </p>
  );
}
