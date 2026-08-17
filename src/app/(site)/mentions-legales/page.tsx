import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/layout/LegalShell";
import { legalConfig, siteConfig } from "@/lib/constants";

const { editeur, hebergeur, siteDomain, directeurPublication } = legalConfig;

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${siteDomain} : éditeur, objet du site, hébergement, propriété intellectuelle et limitation de responsabilité.`,
  alternates: { canonical: "/mentions-legales" },
};

export default function MentionsLegales() {
  return (
    <LegalShell
      eyebrow="Informations légales"
      title="Mentions légales"
      updatedAt={legalConfig.derniereMiseAJour}
    >
      <h2>1. Éditeur du site</h2>
      <p>
        Le site <strong>{siteDomain}</strong> est édité par la société{" "}
        <strong>{editeur.nom}</strong>, {editeur.forme} au capital de{" "}
        {editeur.capital}, immatriculée au RCS de {editeur.rcsVille} sous le
        numéro {editeur.rcsNumero}, dont le siège social est situé{" "}
        {editeur.siege}.
      </p>
      <p>
        Numéro de TVA intracommunautaire : <strong>{editeur.tva}</strong>.
      </p>
      {directeurPublication && (
        <p>
          Directeur de la publication : <strong>{directeurPublication}</strong>.
        </p>
      )}
      <p>
        Contact : <a href={`mailto:${editeur.email}`}>{editeur.email}</a>
      </p>

      <h2>2. Objet du site</h2>
      <p>
        Le site {siteDomain} a pour objet la présentation de solutions liées à
        la production d&apos;énergie renouvelable et à la rénovation énergétique
        de l&apos;habitat (notamment installations photovoltaïques, stockage,
        bornes de recharge, pompes à chaleur, dispositifs d&apos;aides
        financières) ainsi que la collecte et la transmission de demandes de
        mise en relation entre des particuliers et des professionnels
        partenaires qualifiés.
      </p>
      <p>
        Le site n&apos;exécute aucuns travaux, ne réalise aucune étude technique
        et n&apos;intervient pas dans la conclusion des contrats entre les
        utilisateurs et les professionnels partenaires.
      </p>

      <h2>3. Hébergement</h2>
      <p>
        Le site est hébergé par <strong>{hebergeur.nom}</strong>,{" "}
        {hebergeur.adresse}.
      </p>

      <h2>4. Accès au site et fonctionnement</h2>
      <p>
        Le site est accessible gratuitement à tout utilisateur disposant
        d&apos;un accès à Internet. Les frais liés à l&apos;accès (matériel,
        logiciels, connexion Internet, etc.) sont à la charge de
        l&apos;utilisateur.
      </p>
      <p>
        L&apos;éditeur se réserve le droit de suspendre, limiter ou interrompre
        l&apos;accès au site, notamment pour des opérations de maintenance ou en
        cas de force majeure.
      </p>

      <h2>5. Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble du contenu présent sur le site (textes, graphismes,
        logos, icônes, images, vidéos, structure, etc.) est protégé par le droit
        de la propriété intellectuelle.
      </p>
      <p>
        Toute reproduction, représentation, adaptation ou exploitation, totale
        ou partielle, sans autorisation écrite préalable, est strictement
        interdite.
      </p>

      <h2>6. Limitation de responsabilité</h2>
      <p>
        Les informations diffusées sur le site ont une vocation informative et
        commerciale et ne constituent en aucun cas un engagement contractuel.
      </p>
      <p>
        Les simulations d&apos;aides financières, estimations d&apos;économies
        ou de coûts sont données à titre indicatif et peuvent varier selon la
        situation réelle du logement, la réglementation en vigueur et les
        conditions appliquées par les partenaires.
      </p>
      <p>{editeur.nom} ne saurait être tenue responsable :</p>
      <ul>
        <li>
          des décisions prises par l&apos;utilisateur sur la base des
          informations du site ;
        </li>
        <li>
          de la qualité, des délais, des prix ou de l&apos;exécution des travaux
          réalisés par les partenaires ;
        </li>
        <li>
          d&apos;un refus d&apos;éligibilité aux aides financières ou
          subventions.
        </li>
      </ul>

      <h2>7. Mise en relation avec des partenaires</h2>
      <p>
        En remplissant un formulaire sur le site, l&apos;utilisateur accepte que
        ses données soient transmises à des professionnels partenaires dans le
        but exclusif d&apos;être recontacté pour un projet de rénovation
        énergétique.
      </p>
      <p>
        La relation contractuelle éventuelle est strictement conclue entre
        l&apos;utilisateur et le partenaire, sans intervention ni responsabilité
        de {editeur.nom}.
      </p>
      <p>
        Les modalités de traitement de ces données sont détaillées dans notre{" "}
        <Link href="/politique-de-confidentialite">
          politique de confidentialité
        </Link>
        .
      </p>

      <h2>8. Liens hypertextes</h2>
      <p>
        Le site peut contenir des liens vers des sites tiers. {editeur.nom}{" "}
        n&apos;exerce aucun contrôle sur ces sites et décline toute
        responsabilité quant à leur contenu ou à leur politique de
        confidentialité.
      </p>

      <h2>9. Droit applicable</h2>
      <p>
        Les présentes mentions légales sont régies par le droit français. Tout
        litige relèvera de la compétence exclusive des tribunaux français.
      </p>

      <h2>10. Contact</h2>
      <p>
        Pour toute question ou demande d&apos;information :{" "}
        <a href={`mailto:${editeur.email}`}>{editeur.email}</a>
        {siteConfig.phone && (
          <>
            {" "}
            ou <a href={siteConfig.phoneHref}>{siteConfig.phone}</a>
          </>
        )}
        .
      </p>
    </LegalShell>
  );
}
