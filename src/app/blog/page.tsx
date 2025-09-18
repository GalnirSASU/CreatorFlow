import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { getAllPosts } from "@/content/blog/posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creascope.app";
const postsForMeta = getAllPosts();
const blogKeywords = Array.from(
  new Set(postsForMeta.flatMap((post) => post.focusKeywords ?? post.tags))
);

export const metadata: Metadata = {
  title: "Blog SEO & croissance pour créateurs",
  description:
    "Conseils SEO, stratégies contenu et productivité pour les micro-créateurs qui veulent faire grandir leur audience et leurs revenus.",
  keywords: blogKeywords,
  alternates: { canonical: new URL("/blog", siteUrl).toString() },
  openGraph: {
    title: "Blog CréaScope",
    description:
      "Articles SEO, calendrier éditorial et checklist technique pour les créateurs qui veulent scaler.",
    url: new URL("/blog", siteUrl).toString(),
    type: "website",
  },
};

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(isoDate));
}

export default function BlogPage() {
  const posts = postsForMeta;

  return (
    <div className="relative min-h-screen bg-[#050505] text-white">
      <Script id="ld-json-blog" type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Blog CréaScope",
          description:
            "Articles et ressources pour influenceurs, stratégie éditoriale, workflow et SEO.",
          url: new URL("/blog", siteUrl).toString(),
          inLanguage: "fr-FR",
          blogPost: posts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.seoTitle ?? post.title,
            description: post.seoDescription ?? post.excerpt,
            url: new URL(`/blog/${post.slug}`, siteUrl).toString(),
            datePublished: post.publishedAt,
            dateModified: post.updatedAt ?? post.publishedAt,
            keywords: post.focusKeywords ?? post.tags,
          })),
        })}
      </Script>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-80 bg-[radial-gradient(820px_340px_at_12%_-8%,rgba(168,85,247,0.12),transparent_68%),radial-gradient(780px_320px_at_84%_-4%,rgba(14,165,233,0.1),transparent_70%),radial-gradient(900px_360px_at_50%_110%,rgba(14,165,233,0.08),transparent_70%)]"
      />
      <section className="relative z-10 mx-auto max-w-4xl px-4 pb-16 pt-24">
        <div className="mb-12 flex flex-col gap-6">
          <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.25em] text-gray-300">
            Blog CréaScope
          </span>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            Comprends les leviers SEO qui font grandir un micro-créateur
          </h1>
          <p className="max-w-2xl text-base text-gray-300 sm:text-lg">
            Des playbooks prêts à l&apos;emploi pour optimiser ta visibilité, bâtir un calendrier éditorial efficace et suivre la performance sans te perdre dans les KPIs.
          </p>
        </div>

        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/30 hover:bg-white/10"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-300/80">
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                <span aria-hidden>•</span>
                <span>{post.readingMinutes} min de lecture</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold text-white transition group-hover:text-emerald-200">
                <Link
                  href={`/blog/${post.slug}`}
                  className="outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm text-gray-300 sm:text-base">{post.excerpt}</p>
              <div className="mt-6 flex flex-wrap gap-2 text-xs text-gray-400">
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 uppercase tracking-wide">
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition hover:text-emerald-200"
              >
                Lire l&apos;article
                <span aria-hidden className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
