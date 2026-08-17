import { legalConfig, siteConfig } from "@/lib/constants";
import { faq } from "@/lib/content";

/**
 * Données structurées de la page d'accueil.
 *
 * ⚠️ Volontairement SANS aggregateRating ni Review : les notes et volumes
 * d'avis du site sont encore des placeholders. Les publier en JSON-LD
 * reviendrait à déclarer de fausses données à Google — c'est le motif
 * type d'une action manuelle pour « avis frauduleux ». À ajouter le jour
 * où les vrais avis seront connectés.
 */

function Json({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify échappe déjà ce qu'il faut ; on neutralise `<`
      // pour empêcher toute fermeture prématurée de la balise.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/** Identité de l'éditeur et périmètre de service. */
export function OrganisationJsonLd() {
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.name,
        legalName: legalConfig.editeur.nom,
        url: siteConfig.url,
        logo: `${siteConfig.url}/logo-sola.png`,
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        description: siteConfig.description,
        email: legalConfig.editeur.email,
        vatID: legalConfig.editeur.tva,
        address: {
          "@type": "PostalAddress",
          streetAddress: "18 rue des Ormes",
          postalCode: "94220",
          addressLocality: "Charenton-le-Pont",
          addressCountry: "FR",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: siteConfig.zone,
        },
      }}
    />
  );
}

/** Les 6 questions de la page d'accueil, éligibles aux résultats enrichis. */
export function FaqJsonLd() {
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.reponseTexte,
          },
        })),
      }}
    />
  );
}
