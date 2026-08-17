import { legalConfig, siteConfig } from "@/lib/constants";
import { faq, type FaqItem } from "@/lib/content";

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
export function OrganisationJsonLd({
  zone = siteConfig.zone,
}: { zone?: string } = {}) {
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
          name: zone,
        },
      }}
    />
  );
}

/** Les 6 questions de la page (accueil ou région), éligibles aux résultats enrichis. */
export function FaqJsonLd({ items = faq }: { items?: FaqItem[] } = {}) {
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
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

/**
 * Établissement local et zone couverte.
 * ⚠️ Volontairement SANS aggregateRating ni Review, même contrainte
 * qu'OrganisationJsonLd (cf. commentaire ci-dessus).
 */
export function LocalBusinessJsonLd({
  zone = siteConfig.zone,
}: { zone?: string } = {}) {
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: siteConfig.name,
        url: siteConfig.url,
        image: `${siteConfig.url}${siteConfig.ogImage}`,
        telephone: siteConfig.phone,
        email: legalConfig.editeur.email,
        address: {
          "@type": "PostalAddress",
          streetAddress: "18 rue des Ormes",
          postalCode: "94220",
          addressLocality: "Charenton-le-Pont",
          addressCountry: "FR",
        },
        areaServed: {
          "@type": "AdministrativeArea",
          name: zone,
        },
      }}
    />
  );
}

/** Fil d'Ariane Accueil > {zone}, pour la page d'accueil et chaque page région. */
export function BreadcrumbListJsonLd({
  zone = siteConfig.zone,
  slug = "",
}: { zone?: string; slug?: string } = {}) {
  return (
    <Json
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: siteConfig.url,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: zone,
            item: `${siteConfig.url}${slug ? `/${slug}` : ""}`,
          },
        ],
      }}
    />
  );
}
