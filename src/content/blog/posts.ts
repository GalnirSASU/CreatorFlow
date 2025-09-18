export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; title?: string; ordered?: boolean; items: string[] }
  | { type: "quote"; text: string; author?: string };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string; // ISO 8601
  updatedAt?: string;
  tags: string[];
  readingMinutes: number;
  seoTitle?: string;
  seoDescription?: string;
  focusKeywords?: string[];
  content: ContentBlock[];
};

const posts: BlogPost[] = [
  {
    slug: "plan-contenu-90-jours-influenceur",
    title: "Plan de contenu 90 jours pour influenceurs ambitieux",
    excerpt:
      "Un calendrier en trois sprints pour poser une ligne editoriale claire, nourrir ton audience et multiplier les opportunites de collaboration.",
    publishedAt: "2024-07-22",
    tags: ["Calendrier", "Strategie", "Influence"],
    readingMinutes: 9,
    seoTitle: "Plan de contenu influenceur sur 90 jours",
    seoDescription:
      "Plan d'action 90 jours pour influenceurs: grille editoriale, routine hebdomadaire et analyse pour garder un rythme solide.",
    focusKeywords: [
      "plan contenu influenceur",
      "calendrier editorial influenceur",
      "strategie contenu 90 jours",
    ],
    content: [
      {
        type: "paragraph",
        text: "Quand on cree du contenu au feeling, on finit par reposter les memes idees et perdre l'attention des marques. Ce plan 90 jours te donne un cadre evolutif pour produire du contenu original tout en laissant de la place a la spontaneite.",
      },
      {
        type: "heading",
        text: "Sprint 1: Clarifier ton positionnement",
      },
      {
        type: "paragraph",
        text: "Liste les trois themes sur lesquels tu veux devenir incontournable. Pour chacun, note les problemes de ton audience, le vocabulaire qu'elle utilise et les formats qui marchent le mieux (reel, long form, live). Cela sert de base a ton calendrier.",
      },
      {
        type: "list",
        title: "Besoins a couvrir",
        items: [
          "Inspirer: montrer a quoi ressemble ton style de vie ou ton processus.",
          "Former: livrer une astuce actionable qu'ils peuvent tester tout de suite.",
          "Convertir: proposer une ressource ou une offre limitee lorsqu'ils sont chauds.",
        ],
      },
      {
        type: "heading",
        text: "Sprint 2: Construire un hub de contenus piliers",
      },
      {
        type: "paragraph",
        text: "Chaque semaine, produis un contenu \"pilier\" (article de blog, video YouTube, guide PDF). Deduis ensuite tes formats courts a partir de cette piece maitresse. Pense en cascade: un pilier donne 3 reels, 2 tweets, 1 email.",
      },
      {
        type: "list",
        title: "Routine hebdomadaire",
        ordered: true,
        items: [
          "Jour 1: recherche d'angles, mots cles et questions recues.",
          "Jour 2: script + plan de tournage.",
          "Jour 3: production et montage.",
          "Jour 4: recyclage en formats courts.",
          "Jour 5: publication et reponses aux commentaires.",
        ],
      },
      {
        type: "heading",
        text: "Sprint 3: Tester et ajuster",
      },
      {
        type: "paragraph",
        text: "Le troisieme mois sert a analyser. Observe les variations de croissance, l'engagement par format et les messages recurrents de ton audience. Supprime ce qui ne sert plus, double sur les series qui prennent.",
      },
      {
        type: "quote",
        text: "Un plan efficace est un cadre, pas une prison. Tu peux improviser, mais toujours sur une base solide.",
        author: "Mentor Influence Lifestyle",
      },
      {
        type: "paragraph",
        text: "En 90 jours, tu passes d'une creation instinctive a une creation intentionnelle. Ce rythme te permet de rester creatif tout en construisant une reputation durable.",
      },
    ],
  },
  {
    slug: "workflow-production-contenu-influenceur",
    title: "Optimiser ton workflow de production sans perdre ton style",
    excerpt:
      "Des conseils pragmatiques pour industrialiser la creation d'idee, le tournage et la publication, tout en gardant ta signature.",
    publishedAt: "2024-07-29",
    tags: ["Productivite", "Workflow", "Influence"],
    readingMinutes: 8,
    seoTitle: "Workflow creation contenu influenceur",
    seoDescription:
      "Conseils pratiques pour optimiser ton workflow de production en tant qu'influenceur sans perdre ta singularite.",
    focusKeywords: [
      "workflow influenceur",
      "production contenu influenceur",
      "organisation createur contenu",
    ],
    content: [
      {
        type: "paragraph",
        text: "La constance est souvent plus rentable que la brillante inspiration. Pour rester visible, il faut separer creation et execution, et mettre en place un process qui limite la charge mentale.",
      },
      {
        type: "heading",
        text: "Collecter les idees sans se disperser",
      },
      {
        type: "paragraph",
        text: "Installe un bac a idees unique (tableur, notion, carnet). Chaque idee comporte une phrase d'accroche, le format cible et la preuve sociale potentielle. Classe-les par intention: sensibilisation, pedagogue, conversion.",
      },
      {
        type: "heading",
        text: "Batcher la pre-production",
      },
      {
        type: "paragraph",
        text: "Reserver des blocs de temps distincts: 90 minutes recherche, 120 minutes script et tournage en serie. Le batching permet de produire 4 a 5 contenus en une apres-midi, ce qui libere du temps pour la promesse et la relation.",
      },
      {
        type: "list",
        title: "Checklist avant mise en ligne",
        items: [
          "Verifier la coherence du hook et du titre.",
          "Ajouter sous-titres et mots cles pertinents.",
          "Planifier la publication au bon fuseau horaire.",
          "Programmer un rappel pour repondre aux premiers commentaires.",
        ],
      },
      {
        type: "heading",
        text: "Automatiser les petites taches",
      },
      {
        type: "paragraph",
        text: "Utilise les templates pour tes scripts, packs graphiques et descriptions. Les outils d'automatisation (tableurs automatises, raccourcis clavier, apps de planification) permettent de gagner du temps sans sacrifier ton ton.",
      },
      {
        type: "heading",
        text: "Analyser, ranger, reutiliser",
      },
      {
        type: "paragraph",
        text: "Archive chaque contenu avec ses KPI: vues a 24h, sauvegardes, messages recus. Ce carnet de bord devient une mine d'or pour reposter, recycler, ou pitcher des collaborations avec des resultats concrets.",
      },
      {
        type: "quote",
        text: "Ton style est dans l'idee et la narration. Tout le reste peut suivre un process repete.",
        author: "Directrice Editoriale",
      },
    ],
  },
  {
    slug: "seo-pour-influenceurs-conseils-pratiques",
    title: "SEO pour influenceurs: transformer tes contenus en trafic durable",
    excerpt:
      "Guide complet pour optimiser tes articles, videos et reseaux afin d'apparaitre sur Google et d'attirer des audiences nouvelles.",
    publishedAt: "2024-08-05",
    tags: ["SEO", "Visibilite", "Influence"],
    readingMinutes: 10,
    seoTitle: "Guide SEO pour influenceurs",
    seoDescription:
      "Guide SEO influenceur: choisir des mots cles, structurer articles et videos, renforcer la confiance et le maillage.",
    focusKeywords: [
      "seo influenceur",
      "optimisation contenu influenceur",
      "referencement createur",
    ],
    content: [
      {
        type: "paragraph",
        text: "Les influenceurs se concentrent souvent sur TikTok ou Instagram, mais un socle SEO consolide ton autorite et ramene un trafic constant. Ce guide resume les bonnes pratiques pour chaque etape.",
      },
      {
        type: "heading",
        text: "Chercher les bons mots cles",
      },
      {
        type: "paragraph",
        text: "Repere les questions que ton audience tape dans Google: tapes un mot cle dans la barre et observe les suggestions, inspire-toi des sections People Also Ask, fouille les forums et les commentaires. Note les expressions exactes pour les reutiliser.",
      },
      {
        type: "list",
        title: "Outils gratuits utiles",
        items: [
          "Google Trends pour tester la saisonnalite.",
          "AnswerThePublic ou AlsoAsked pour les questions liees.",
          "La recherche TikTok ou Pinterest pour voir quels formats se classent.",
        ],
      },
      {
        type: "heading",
        text: "Structurer l'article ou la video",
      },
      {
        type: "paragraph",
        text: "Utilise un H1 clair (ou un titre video explicite), des sous-titres qui repondent a une question precise et des paragraphes courts. Integre des listes, chiffres, exemples pour augmenter la valeur percue.",
      },
      {
        type: "paragraph",
        text: "Pour la video, place le mot cle dans les premieres secondes, dans la description et les hashtags. Pour l'article, ajoute une meta description engageante et des images avec texte alternatif descriptif.",
      },
      {
        type: "heading",
        text: "Creer un maillage interne",
      },
      {
        type: "paragraph",
        text: "Relie tes contenus entre eux: un article peut renvoyer vers une video complementaire, une checklist telechargeable ou un guide precedent. Cela aide l'utilisateur et montre a Google que tu possedes une expertise approfondie.",
      },
      {
        type: "heading",
        text: "Booster les signaux de confiance",
      },
      {
        type: "paragraph",
        text: "Collecte des temoignages, affiche tes resultats (audience, collaborations), donne des exemples concretes. Plus un contenu est credible, plus il est partage, sauvegarde, cite dans d'autres articles.",
      },
      {
        type: "quote",
        text: "Le SEO n'est pas un canal a part. C'est le prolongement naturel de ton storytelling sur le long terme.",
        author: "Consultant Contenu",
      },
      {
        type: "paragraph",
        text: "En combinant optimisation technique, structure claire et regularite, tu crees un systeme de contenus qui travaille pour toi meme quand tu n'es pas en ligne.",
      },
    ],
  },
];

export function getAllPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}
