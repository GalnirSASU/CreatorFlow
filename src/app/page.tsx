"use client";

import Link from "next/link";
import Script from "next/script";
import { useMemo, useState } from "react";
import { getAllPosts } from "@/content/blog/posts";

const blogHighlights = getAllPosts().slice(0, 3);

function formatPostDate(isoDate: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(isoDate));
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [hp, setHp] = useState(""); // honeypot
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string>("");

  const emailValid = useMemo(() => /.+@.+\..+/.test(email), [email]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!emailValid || status === "loading") return;
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, hp }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Erreur");
      setStatus("ok");
      setMessage("Merci ! Inscription confirmée, tu recevras une invitation par email 🎉");
      setEmail("");
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : undefined;
      setMessage(msg || "Une erreur est survenue. Réessayez.");
    }
  }

  // Chart components supprimés (section aperçu retirée)

  // Simple brand icons (SVG) with brand-like colors
  const TikTokIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 5.5c1.1 1.4 2.7 2.3 4.5 2.4v3.1c-1.8-.1-3.5-.7-4.9-1.7v5.8c0 4-3.2 6.9-7.1 6.9C6.2 22 3 19.1 3 15.2c0-3.6 2.7-6.7 6.5-6.9v3.4c-1.8.2-3.1 1.5-3.1 3.4 0 2.1 1.6 3.5 3.6 3.5s3.6-1.4 3.6-3.5V2h3.4V5.5z"
        fill="url(#tiktok)"
      />
      <defs>
        <linearGradient id="tiktok" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#ef4444" />
        </linearGradient>
      </defs>
    </svg>
  );

  const InstagramIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="ig" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="url(#ig)" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="url(#ig)" />
      <circle cx="17" cy="7" r="1" fill="url(#ig)" />
    </svg>
  );

  const YouTubeIcon = ({ className = "h-4 w-4" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path
        d="M23 8.6v6.8c0 1.6-1.3 2.9-2.9 2.9H3.9C2.3 18.3 1 17 1 15.4V8.6C1 7 2.3 5.7 3.9 5.7h16.2C21.7 5.7 23 7 23 8.6z"
        fill="#ef4444"
      />
      <path d="M10 9v6l6-3-6-3z" fill="#ffffff" />
    </svg>
  );

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background gradient overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-90 bg-[radial-gradient(820px_340px_at_12%_-8%,rgba(168,85,247,0.14),transparent_68%),radial-gradient(780px_320px_at_84%_-4%,rgba(14,165,233,0.12),transparent_70%),radial-gradient(900px_360px_at_50%_110%,rgba(14,165,233,0.08),transparent_70%)]"
      />
      {/* FAQ JSON-LD */}
      <Script id="ld-json-faq" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Est-ce gratuit ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, pendant la bêta. Ensuite un plan simple et abordable (9€/mois).",
              },
            },
            {
              "@type": "Question",
              name: "Quelles plateformes sont supportées ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "TikTok, Instagram et YouTube en priorité. D’autres viendront selon vos besoins.",
              },
            },
            {
              "@type": "Question",
              name: "Puis-je annuler quand je veux ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Bien sûr. Aucun engagement, tu peux te désinscrire en un clic.",
              },
            },
            {
              "@type": "Question",
              name: "Y aura-t-il une app mobile ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Pas au début. La web‑app est responsive et fonctionne parfaitement sur mobile.",
              },
            },
            {
              "@type": "Question",
              name: "Puis-je proposer des idées ?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Oui, les bêta‑testeurs ont un accès direct à la roadmap et peuvent voter pour les features prioritaires.",
              },
            },
          ],
        })}
      </Script>

      <header className="sticky top-0 z-10 border-b border-white/10 bg-black/40 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-semibold">CréaScope</span>
            <span className="ml-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-xs font-medium text-emerald-300">
              Bêta
            </span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-300">
            <a href="#solution" className="hover:text-white">Solution</a>
            <a href="#fonctionnalites" className="hover:text-white">Fonctionnalités</a>
            <Link href="/blog" className="hover:text-white">
              Blog
            </Link>
            <a href="#tarifs" className="hover:text-white">Tarifs</a>
            <a href="#faq" className="hover:text-white">FAQ</a>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        {/* Hero */}
        <section id="hero" className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-gray-200">
              <span>🎯</span>
              <span>Bêta privée • micro‑créateurs (1k–50k abonnés)</span>
            </div>
            <h1 className="mt-4 text-6xl sm:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-white max-w-none">
              Centralise tes stats &amp; planifie tes vidéos en toute simplicité
            </h1>
            <p className="mt-6 text-xl text-gray-300">
              CréaScope est l’outil pensé pour les petits créateurs. Un seul dashboard
              pour suivre ton audience TikTok, Insta et YouTube, planifier ton contenu
              et générer des rapports sponsors propres. Fini les usines à gaz à 99€/mois.
            </p>
            <form onSubmit={onSubmit} className="mt-10 flex flex-col sm:flex-row gap-3">
              <label htmlFor="email" className="sr-only">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre email"
                className="w-full sm:w-[480px] md:w-[560px] rounded-md border border-white/20 bg-[#111213] text-white placeholder:text-gray-400 px-5 py-4 text-base sm:text-lg shadow-sm focus:border-white focus:outline-none"
              />
              {/* Honeypot */}
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={hp}
                onChange={(e) => setHp(e.target.value)}
                className="hidden"
              />
              <button
                type="submit"
                disabled={!emailValid || status === "loading"}
                className="inline-flex h-[56px] items-center justify-center rounded-md bg-gradient-to-r from-indigo-300 via-sky-300 to-emerald-300 px-6 py-4 text-black font-semibold shadow-[0_0_30px_#60a5fa55] hover:shadow-[0_0_40px_#60a5fa77] disabled:opacity-60 text-base sm:text-lg"
              >
                {status === "loading" ? "Envoi…" : "Rejoindre la bêta gratuite"}
              </button>
            </form>
            <p className="mt-3 text-sm text-gray-400">
              En laissant ton email, tu acceptes de recevoir des infos sur la bêta.
              Pas de spam, jamais.
            </p>
            {message && (
              <p
                className={`mt-3 text-sm ${
                  status === "ok" ? "text-emerald-400" : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}
            <div className="mt-8 flex flex-wrap items-center gap-3 text-sm text-gray-300">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                <TikTokIcon className="h-4 w-4" /> TikTok
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                <InstagramIcon className="h-4 w-4" /> Instagram
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1">
                <YouTubeIcon className="h-4 w-4" /> YouTube
              </span>
            </div>
          </div>
        </section>

        {/* Problème / Solution */}
        <section id="solution" className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-2xl font-bold">Trop d’outils compliqués. Une seule solution simple.</h2>
            <p className="mt-4 text-gray-300">
              Aujourd’hui, tu dois jongler entre YouTube Studio, TikTok Analytics, Insta Insights,
              Google Calendar, Excel… Résultat : perte de temps, confusion et zéro motivation.
              CréaScope réunit tout au même endroit : tes stats, ton planning et tes rapports sponsors.
            </p>
          </div>
        </section>

        {/* Aperçu retiré sur demande */}

        {/* Fonctionnalités */}
        <section id="fonctionnalites" className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-16 grid gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-white/10 p-5">
              <h3 className="text-lg font-semibold">Analytics multi‑plateformes</h3>
              <ul className="mt-3 list-disc pl-5 text-gray-300 space-y-2">
                <li>Abonnés, vues, engagement en un seul tableau.</li>
                <li>Alertes de tendances pour savoir quand poster.</li>
                <li>Exports CSV/PDF bientôt disponibles.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 p-5">
              <h3 className="text-lg font-semibold">Planification ultra simple</h3>
              <ul className="mt-3 list-disc pl-5 text-gray-300 space-y-2">
                <li>Shorts, Reels, Posts… tous regroupés.</li>
                <li>Suggestions automatiques d’horaires (bientôt).</li>
                <li>Synchronisation Google Calendar prévue.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 p-5">
              <h3 className="text-lg font-semibold">Rapports sponsor prêts à l’emploi</h3>
              <ul className="mt-3 list-disc pl-5 text-gray-300 space-y-2">
                <li>Branding personnalisé (logo, pseudo).</li>
                <li>KPI clés et benchmarks pour convaincre.</li>
                <li>Lien partageable ou PDF en un clic.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Blog highlights */}
        {blogHighlights.length ? (
          <section className="border-t border-white/10">
            <div className="mx-auto max-w-6xl px-4 py-16">
              <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <span className="text-sm uppercase tracking-[0.3em] text-gray-400">Blog</span>
                  <h2 className="mt-2 text-2xl font-bold">Conseils pour faire grandir ton influence</h2>
                  <p className="mt-2 max-w-2xl text-sm text-gray-300 sm:text-base">
                    Les derniers articles partagent des plans d&apos;action, workflows et astuces SEO pour rester constant et visible.
                  </p>
                </div>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
                >
                  Voir tous les articles
                  <span aria-hidden>→</span>
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-3">
                {blogHighlights.map((post) => (
                  <article key={post.slug} className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/5 p-6">
                    <div className="flex items-center gap-3 text-xs text-emerald-300/80">
                      <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
                      <span aria-hidden>•</span>
                      <span>{post.readingMinutes} min</span>
                    </div>
                    <h3 className="mt-4 text-xl font-semibold text-white">
                      <Link className="transition hover:text-emerald-200" href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-sm text-gray-300 sm:text-base">{post.excerpt}</p>
                    <div className="mt-6 flex flex-wrap gap-2 text-xs text-gray-400">
                      {(post.focusKeywords ?? post.tags).slice(0, 3).map((tag) => (
                        <span key={tag} className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 uppercase tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {/* Tarifs */}
        <section id="tarifs" className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-2xl font-bold">Un prix pensé pour les créateurs, pas pour les agences</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm text-emerald-300">Bêta</p>
                <p className="mt-2 text-3xl font-bold">0 €</p>
                <ul className="mt-4 list-disc pl-5 text-gray-300 space-y-2">
                  <li>Toutes les fonctionnalités pendant la bêta.</li>
                  <li>Accès anticipé, feedback direct, remise à vie au lancement.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm text-sky-300">Starter</p>
                <p className="mt-2 text-3xl font-bold">9 €/mois</p>
                <ul className="mt-4 list-disc pl-5 text-gray-300 space-y-2">
                  <li>Pensé pour les créateurs solos.</li>
                  <li>Jusqu’à 3 plateformes connectées, exports PDF, support email.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA final retiré (deuxième formulaire) */}

        {/* How it works */}
        <section id="how" className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold">Comment ça marche</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-white/10 p-5">
              <p className="text-sm text-gray-400">Étape 1</p>
              <p className="mt-1 font-medium">Rejoignez la liste d&apos;attente</p>
              <p className="mt-2 text-gray-300">Nous vous prévenons dès qu&apos;une place se libère.</p>
            </div>
            <div className="rounded-lg border border-white/10 p-5">
              <p className="text-sm text-gray-400">Étape 2</p>
              <p className="mt-1 font-medium">Connectez vos plateformes</p>
              <p className="mt-2 text-gray-300">Importez vos stats essentielles en quelques clics.</p>
            </div>
            <div className="rounded-lg border border-white/10 p-5">
              <p className="text-sm text-gray-400">Étape 3</p>
              <p className="mt-1 font-medium">Planifiez et publiez</p>
              <p className="mt-2 text-gray-300">Votre calendrier éditorial devient votre pilote.</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-4 py-16">
            <h2 className="text-2xl font-bold">Questions fréquentes</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border border-white/10 p-5">
                <p className="font-medium">Est‑ce gratuit ?</p>
                <p className="mt-2 text-gray-300">Oui, pendant la bêta. Ensuite un plan simple et abordable (9€/mois).</p>
              </div>
              <div className="rounded-lg border border-white/10 p-5">
                <p className="font-medium">Quelles plateformes sont supportées ?</p>
                <p className="mt-2 text-gray-300">TikTok, Instagram et YouTube en priorité. D’autres viendront selon vos besoins.</p>
              </div>
              <div className="rounded-lg border border-white/10 p-5">
                <p className="font-medium">Puis‑je annuler quand je veux ?</p>
                <p className="mt-2 text-gray-300">Bien sûr. Aucun engagement, tu peux te désinscrire en un clic.</p>
              </div>
              <div className="rounded-lg border border-white/10 p-5">
                <p className="font-medium">Y aura‑t‑il une app mobile ?</p>
                <p className="mt-2 text-gray-300">Pas au début. La web‑app est responsive et fonctionne parfaitement sur mobile.</p>
              </div>
              <div className="rounded-lg border border-white/10 p-5">
                <p className="font-medium">Puis‑je proposer des idées ?</p>
                <p className="mt-2 text-gray-300">Oui, les bêta‑testeurs ont un accès direct à la roadmap et peuvent voter pour les features prioritaires.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
          <p>© {new Date().getFullYear()} CréaScope</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-white" href="#">Politique de confidentialité</a>
            <a className="hover:text-white" href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
