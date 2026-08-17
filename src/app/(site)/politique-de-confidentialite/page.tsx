import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/layout/LegalShell";
import { legalConfig } from "@/lib/constants";

const { editeur, siteDomain, contactRgpd } = legalConfig;

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Données collectées sur ${siteDomain} : finalités, transmission aux partenaires, durées de conservation, droits RGPD et cookies.`,
  alternates: { canonical: "/politique-de-confidentialite" },
};

const cookiesNecessaires = [
  {
    nom: "CookieConsent",
    fournisseur: "Cookiebot",
    finalite: "Mémorise vos choix en matière de cookies pour ce domaine",
    conservation: "1 an",
    type: "Cookie HTTP",
  },
  {
    nom: "test_cookie",
    fournisseur: "Google",
    finalite: "Vérifie que votre navigateur accepte les cookies",
    conservation: "1 jour",
    type: "Cookie HTTP",
  },
];

const cookiesMarketing = [
  {
    nom: "_fbp",
    fournisseur: "Meta Platforms",
    finalite: "Diffusion et mesure des publicités Meta",
    conservation: "3 mois",
    type: "Cookie HTTP",
  },
  {
    nom: "_gcl_au",
    fournisseur: "Google",
    finalite: "Mesure du taux de conversion des campagnes publicitaires",
    conservation: "3 mois",
    type: "Cookie HTTP",
  },
  {
    nom: "_gcl_ls",
    fournisseur: "Google",
    finalite: "Suivi des conversions liées aux bannières publicitaires",
    conservation: "Persistant",
    type: "Stockage local",
  },
  {
    nom: "lastExternalReferrer",
    fournisseur: "Meta Platforms",
    finalite: "Enregistre la dernière adresse par laquelle vous êtes arrivé",
    conservation: "Persistant",
    type: "Stockage local",
  },
  {
    nom: "lastExternalReferrerTime",
    fournisseur: "Meta Platforms",
    finalite: "Horodate la dernière adresse par laquelle vous êtes arrivé",
    conservation: "Persistant",
    type: "Stockage local",
  },
  {
    nom: "pagead/1p-user-list",
    fournisseur: "Google",
    finalite: "Mesure de l'intérêt porté aux produits et des conversions",
    conservation: "Session",
    type: "Pixel de suivi",
  },
];

function CookieTable({
  rows,
}: {
  rows: {
    nom: string;
    fournisseur: string;
    finalite: string;
    conservation: string;
    type: string;
  }[];
}) {
  return (
    <div className="legal-table">
      <table>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Fournisseur</th>
            <th>Finalité</th>
            <th>Conservation</th>
            <th>Type</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.nom}>
              <td>{row.nom}</td>
              <td>{row.fournisseur}</td>
              <td>{row.finalite}</td>
              <td>{row.conservation}</td>
              <td>{row.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PolitiqueDeConfidentialite() {
  return (
    <LegalShell
      eyebrow="Vos données"
      title="Politique de confidentialité"
      updatedAt={legalConfig.derniereMiseAJour}
    >
      <h2>Préambule</h2>
      <p>
        La présente politique informe les utilisateurs du site {siteDomain} des
        conditions dans lesquelles leurs données personnelles sont collectées,
        transmises et traitées, conformément :
      </p>
      <ul>
        <li>
          au Règlement général sur la protection des données (RGPD – UE
          2016/679) ;
        </li>
        <li>à la loi Informatique et Libertés modifiée ;</li>
        <li>aux recommandations de la CNIL ;</li>
        <li>
          aux exigences des plateformes publicitaires, notamment Google Ads,
          Google Analytics et Google Consent Mode.
        </li>
      </ul>

      <h2>1. Responsable de la collecte des données</h2>
      <p>Les données personnelles sont collectées via le site par :</p>
      <ul>
        <li>
          <strong>{editeur.nom}</strong>
        </li>
        <li>SAS au capital de {editeur.capital}</li>
        <li>
          RCS {editeur.rcsVille} {editeur.rcsNumero}
        </li>
        <li>Siège social : {editeur.siege}</li>
        <li>
          Contact : <a href={`mailto:${contactRgpd}`}>{contactRgpd}</a>
        </li>
      </ul>
      <p>
        {editeur.nom} intervient exclusivement en qualité d&apos;opérateur de
        collecte et de mise en relation.
      </p>

      <h2>2. Nature des données collectées</h2>
      <p>
        Les données susceptibles d&apos;être collectées via les formulaires sont
        :
      </p>
      <ul>
        <li>nom et prénom ;</li>
        <li>adresse électronique ;</li>
        <li>numéro de téléphone ;</li>
        <li>code postal et ville ;</li>
        <li>
          informations relatives au projet de rénovation énergétique : type de
          travaux, logement, critères d&apos;éligibilité aux aides.
        </li>
      </ul>
      <p>Ces données sont fournies volontairement par l&apos;utilisateur.</p>

      <h2>3. Finalité de la collecte</h2>
      <p>Les données sont collectées uniquement afin de :</p>
      <ul>
        <li>traiter la demande de l&apos;utilisateur ;</li>
        <li>
          transmettre la demande à un ou plusieurs professionnels partenaires ;
        </li>
        <li>permettre la prise de contact par ces partenaires ;</li>
        <li>mesurer la performance des campagnes publicitaires ;</li>
        <li>améliorer les parcours utilisateurs.</li>
      </ul>
      <p>
        Aucune donnée n&apos;est collectée à des fins de décision automatisée ou
        de profilage juridique.
      </p>

      <h2>4. Répartition des responsabilités</h2>
      <h3>Rôle de {editeur.nom}</h3>
      <p>Cette société agit en qualité de :</p>
      <ul>
        <li>responsable de la collecte initiale des données ;</li>
        <li>intermédiaire de transmission vers les partenaires.</li>
      </ul>
      <p>
        Elle n&apos;exploite pas les données à des fins propres, n&apos;exécute
        aucuns travaux et ne contracte pas avec les utilisateurs finaux.
      </p>

      <h3>Rôle des partenaires</h3>
      <p>Les professionnels partenaires :</p>
      <ul>
        <li>
          deviennent responsables de traitement indépendants dès réception des
          données ;
        </li>
        <li>utilisent les données sous leur seule responsabilité ;</li>
        <li>
          sont tenus de respecter le RGPD et la réglementation applicable ;
        </li>
        <li>disposent de leurs propres politiques de confidentialité.</li>
      </ul>
      <p>
        Toute utilisation ultérieure — devis, relances, contrats, travaux —
        relève exclusivement du partenaire.
      </p>

      <h2>5. Transmission des données</h2>
      <p>
        En validant un formulaire, l&apos;utilisateur consent expressément à ce
        que ses données soient transmises à un ou plusieurs partenaires
        professionnels et utilisées pour le recontact lié à son projet.
      </p>
      <p>Ces données :</p>
      <ul>
        <li>ne sont jamais vendues ;</li>
        <li>ne sont transmises qu&apos;à des partenaires sélectionnés ;</li>
        <li>sont limitées aux informations strictement nécessaires.</li>
      </ul>

      <h2>6. Base légale du traitement</h2>
      <p>Les traitements reposent sur :</p>
      <ul>
        <li>le consentement explicite de l&apos;utilisateur ;</li>
        <li>l&apos;intérêt légitime de mise en relation ;</li>
        <li>le respect des obligations légales.</li>
      </ul>
      <p>Le consentement peut être retiré à tout moment.</p>

      <h2>7. Durée de conservation</h2>
      <p>
        {editeur.nom} conserve les données collectées pendant une durée maximale
        de <strong>24 mois</strong> à compter de la dernière interaction.
      </p>
      <p>
        Les partenaires appliquent leur propre durée de conservation, sous leur
        responsabilité exclusive.
      </p>

      <h2>8. Droits des utilisateurs</h2>
      <p>
        Conformément au RGPD, l&apos;utilisateur dispose des droits suivants :
      </p>
      <ul>
        <li>droit d&apos;accès ;</li>
        <li>droit de rectification ;</li>
        <li>droit de suppression ;</li>
        <li>droit à la limitation ;</li>
        <li>droit d&apos;opposition ;</li>
        <li>droit à la portabilité.</li>
      </ul>
      <p>
        Pour les données détenues par {editeur.nom} :{" "}
        <a href={`mailto:${contactRgpd}`}>{contactRgpd}</a>
      </p>
      <p>
        Pour les traitements effectués par les partenaires, l&apos;utilisateur
        doit exercer ses droits directement auprès du partenaire concerné.
      </p>
      <p>
        En cas de réponse insatisfaisante, une réclamation peut être adressée à
        la CNIL —{" "}
        <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
          cnil.fr
        </a>
        .
      </p>

      <h2>9. Cookies et technologies publicitaires</h2>

      <h3>9.1 Utilisation des cookies</h3>
      <p>
        Le site utilise des cookies et technologies de suivi afin de mesurer
        l&apos;audience, analyser la navigation, optimiser les campagnes
        publicitaires et attribuer les conversions. Ces technologies peuvent
        inclure Google Analytics, Google Ads, Google Tag Manager et Google
        Consent Mode.
      </p>

      <h3>9.2 Consentement aux cookies</h3>
      <p>Conformément aux exigences de la CNIL :</p>
      <ul>
        <li>
          aucun cookie non strictement nécessaire n&apos;est déposé sans
          consentement préalable ;
        </li>
        <li>l&apos;utilisateur peut accepter, refuser ou paramétrer ses choix ;</li>
        <li>le refus est aussi simple que l&apos;acceptation ;</li>
        <li>
          le consentement est conservé pour une durée maximale de 6 mois.
        </li>
      </ul>
      <p>
        Un bandeau de gestion des cookies permet de modifier ses préférences à
        tout moment.
      </p>

      <h3>9.3 Cookies strictement nécessaires</h3>
      <p>
        Certains cookies sont indispensables au fonctionnement du site —
        sécurité, gestion du consentement, formulaires. Ils ne nécessitent pas
        de consentement.
      </p>

      <h3>9.4 Données publicitaires et Google</h3>
      <p>
        Aucune donnée personnelle n&apos;est transmise aux plateformes
        publicitaires sans consentement explicite. Le site utilise le Google
        Consent Mode, qui permet une mesure respectueuse de la vie privée et
        l&apos;optimisation des campagnes sans dépôt de cookies non consentis.
      </p>
      <p>
        Des transferts de données hors Union européenne peuvent avoir lieu,
        notamment vers les États-Unis, encadrés par les clauses contractuelles
        types de la Commission européenne.
      </p>

      <h3>9.5 Déclaration des cookies</h3>
      <p>Votre consentement s&apos;applique au domaine {siteDomain}.</p>

      <h4>Nécessaires ({cookiesNecessaires.length})</h4>
      <p>
        Ces cookies rendent le site utilisable en activant des fonctions de
        base. Le site ne peut pas fonctionner correctement sans eux.
      </p>
      <CookieTable rows={cookiesNecessaires} />

      <h4>Marketing ({cookiesMarketing.length})</h4>
      <p>
        Ces cookies suivent les visiteurs au fil des sites afin d&apos;afficher
        des publicités pertinentes.
      </p>
      <CookieTable rows={cookiesMarketing} />

      <h2>10. Sécurité</h2>
      <p>
        {editeur.nom} met en œuvre des mesures de sécurité raisonnables pour la
        phase de collecte et de transmission des données.
      </p>
      <p>
        Elle ne saurait en revanche être tenue responsable des traitements
        ultérieurs effectués par les partenaires.
      </p>

      <h2>11. Mise à jour</h2>
      <p>
        La présente politique peut être modifiée à tout moment afin de refléter
        les évolutions légales, réglementaires ou techniques. Les{" "}
        <Link href="/mentions-legales">mentions légales</Link> complètent le
        présent document.
      </p>
    </LegalShell>
  );
}
