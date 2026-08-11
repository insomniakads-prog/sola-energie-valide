---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces for Next.js. Trigger for ANY website, landing page, SaaS, lead-gen, dashboard, portfolio. ALWAYS run Phase 1 brief BEFORE writing any code.
---

# Frontend Design — Next.js Production UI

## RÈGLE N°1 — AVANT TOUT CODE

**Ne génère pas une seule ligne de code avant d'avoir complété le brief Phase 1 ET validé le Design Decision Summary avec l'utilisateur.**

---

## PHASE 1 — Brief (5 questions essentielles)

Pose ces 5 questions en un seul bloc. Attends les réponses.

```
1. TYPE — Landing page lead gen / SaaS / Site multi-pages / Dashboard / Autre ?
2. SECTEUR & CIBLE — Qui sont les visiteurs ? (ex: propriétaires immo, artisans, PME...)
3. CONVERSION N°1 — Quelle est L'action principale ? (formulaire / appel / inscription...)
4. MARQUE — Nom, logo (fournis le fichier), couleurs si définies, ton souhaité
5. RÉFÉRENCES — 1 à 3 sites que tu aimes visuellement (obligatoire)
```

**Règle : si l'utilisateur skippe les références visuelles, demande-les à nouveau. C'est non négociable.**

---

## PHASE 2 — Design Decision Summary

Avant de coder, valide ce bloc avec l'utilisateur :

```
LAYOUT:     [Pattern choisi + ordre des sections]
AESTHETIC:  [Style en 3 mots + justification sectorielle]
PALETTE:    [Primary #xxx / Surface #xxx / Accent #xxx / Text #xxx]
FONTS:      [Display: Nom — Body: Nom]
MOTION:     [Niveau + 2-3 effets spécifiques]
STACK:      [Next.js 15 App Router + Tailwind v4 + libs additionnelles]
```

**Ne commence pas le code tant que l'utilisateur n'a pas dit "OK" ou "go".**

---

## PHASE 3 — Directives de génération

### Le principe fondamental

**Fais UN choix esthétique fort et assume-le jusqu'au bout.**

Tu n'es pas en train de "faire un site web". Tu construis une identité visuelle spécifique à ce secteur, cette marque, cet utilisateur. Chaque décision — couleur, espacement, typo, animation — doit servir cette identité.

**Ce qui tue un design :**

- Moyenner entre plusieurs styles → résultat générique
- Choisir des defaults sans justification (Inter, fond blanc, gradient bleu-violet)
- Remplir l'espace au lieu de le composer

---

### Règles typographiques

**INTERDIT :** Inter, Roboto, Arial, system-ui comme police display.

Choisis une police avec du caractère. Exemples valides selon le secteur :

- Immobilier premium → `Cormorant Garamond` display + `DM Sans` body
- Énergie / Industrie → `Barlow Condensed` display + `IBM Plex Sans` body
- Finance / Conseil → `Instrument Serif` display + `Geist` body
- Habitat / Artisan → `Fraunces` display + `Nunito` body
- Tech / SaaS → `Cal Sans` ou `Syne` display + `Plus Jakarta Sans` body

Règle de taille : le H1 fait **peur sur mobile** (min 2.8rem). Il doit occuper l'espace.

---

### Règles de palette

**INTERDIT :** gradient violet → indigo → bleu sur fond blanc.

Chaque secteur a une identité chromatique. Respecte-la ou transgresse-la délibérément :

```
Immo        → crème chaud #F5F0E8 + anthracite #1C1C1E + accent cuivre #B87333
Énergie     → noir profond #0A0F1E + vert électrique #00FF87 + blanc
Habitat     → blanc cassé #FAFAF7 + vert forêt #2D4A3E + terracotta #C4622D
Finance     → navy #0F1F3D + gris perle #F4F4F2 + or #C9A84C
SaaS B2B    → #09090B + surface #18181B + accent brand-specific
```

Chaque projet = une palette unique. **Jamais deux projets avec les mêmes couleurs.**

---

### Règles de layout

Structure les pages dans cet ordre de priorité :

1. **Hero** — Promesse + CTA visible sans scroll (toujours)
2. **Proof** — Logos, stats, témoignage court (crédibilité immédiate)
3. **Value** — Bénéfices ou features (pas de liste bullets > 4 items)
4. **Form / CTA** — L'action principale, répétée
5. **FAQ** — Objections levées
6. **Footer** — Léger, liens essentiels uniquement

**Hero obligatoire :** H1 + sous-titre 1 ligne + CTA primaire + élément visuel (pas juste du texte).

**Formulaires :** Toujours en position haute (visible sans scroll sur desktop). Multi-step si > 4 champs.

---

### Règles d'animation

**Niveau par défaut : Standard** (sauf brief qui précise autre chose)

- Reveal au scroll : `fadeUp` 0.5s, délai stagué par élément (+80ms chaque)
- Hover cards : `translateY(-4px)` + `box-shadow` — pas de scale
- CTA principal : subtle pulse ou beam border — pas les deux
- Fond hero : 1 seul effet (aurora OU gradient statique OU noise texture) — pas cumulatifs
- **Interdit :** animations > 600ms, parallax agressif, plus de 3 effets différents par page

---

### Stack — Toujours utiliser

```
Next.js 15       App Router, Server Components par défaut
Tailwind v4      CSS variables natives, pas de config JS
next/font        Jamais CDN externe pour les polices
next/image       Pour toutes les images sans exception
lucide-react     Pour les icônes
```

**Pour les formulaires lead gen :**

```
react-hook-form + zod   Validation
Resend                  Envoi email (par défaut)
```

**Pour les animations premium :**

```
framer-motion   Uniquement si brief demande niveau Premium ou WOW
```

---

### Architecture fichiers

```
src/
├── app/
│   ├── layout.tsx          ← fonts, metadata, globals
│   ├── page.tsx            ← imports sections dans l'ordre
│   └── globals.css         ← CSS variables + Tailwind base
├── components/
│   ├── sections/           ← Hero.tsx, Benefits.tsx, Form.tsx, FAQ.tsx...
│   ├── ui/                 ← Button.tsx, Card.tsx, Badge.tsx
│   └── layout/             ← Navbar.tsx, Footer.tsx
└── lib/
    └── utils.ts            ← cn() + helpers
```

**CSS Variables — toujours définir dans globals.css :**

```css
:root {
  --color-bg: ;
  --color-surface: ;
  --color-primary: ;
  --color-accent: ;
  --color-text: ;
  --color-text-muted: ;
  --color-border: ;
  --radius: 10px;
  --shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
}
```

---

## ANTI-PATTERNS — JAMAIS

```
❌ Inter ou système par défaut comme display font
❌ Gradient violet/indigo/bleu sur fond blanc
❌ Hero sans élément visuel (que du texte)
❌ Formulaire en bas de page ou dans le footer
❌ Plus de 3 animations différentes sur la même page
❌ Cards identiques avec icône + titre + texte × 6 (le pire cliché)
❌ Section "Nos valeurs" avec 3 colonnes icône + texte
❌ Fond #FFFFFF uni sans texture ni profondeur
❌ CTA "En savoir plus" (toujours un verbe d'action concret)
❌ Deux projets qui se ressemblent
```

---

## CHECKLIST AVANT LIVRAISON

```
✅ Police display ≠ Inter/Roboto/Arial
✅ Palette unique à ce projet et ce secteur
✅ H1 visible sans scroll sur mobile (375px)
✅ CTA au-dessus de la fold
✅ Formulaire fonctionnel avec validation zod
✅ next/image sur toutes les images
✅ Metadata complète dans layout.tsx
✅ CSS variables définies pour tous les tokens
✅ Responsive testé 375px → 1440px
✅ Aucun layout shift au chargement
```
