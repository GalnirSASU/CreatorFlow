import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { type ContentBlock, getAllPosts, getPostBySlug } from "@/content/blog/posts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creascope.app";

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(isoDate));
}

function slugifyHeading(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function ArticleContent({ content }: { content: ContentBlock[] }) {
  return (
    <div className="space-y-6 text-gray-200">
      {content.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={`${block.type}-${index}`}
                id={slugifyHeading(block.text)}
                className="scroll-mt-24 text-2xl font-semibold text-white"
              >
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p key={`${block.type}-${index}`} className="leading-relaxed text-gray-200">
                {block.text}
              </p>
            );
          case "list":
            if (block.ordered) {
              return (
                <Fragment key={`${block.type}-${index}`}>
                  {block.title ? (
                    <h3
                      id={slugifyHeading(block.title)}
                      className="mt-8 text-xl font-semibold text-white"
                    >
                      {block.title}
                    </h3>
                  ) : null}
                  <ol className="ml-6 list-decimal space-y-2">
                    {block.items.map((item, itemIndex) => (
                      <li key={`${block.type}-${index}-${itemIndex}`}>{item}</li>
                    ))}
                  </ol>
                </Fragment>
              );
            }
            return (
              <Fragment key={`${block.type}-${index}`}>
                {block.title ? (
                  <h3
                    id={slugifyHeading(block.title)}
                    className="mt-8 text-xl font-semibold text-white"
                  >
                    {block.title}
                  </h3>
                ) : null}
                <ul className="ml-6 list-disc space-y-2">
                  {block.items.map((item, itemIndex) => (
                    <li key={`${block.type}-${index}-${itemIndex}`}>{item}</li>
                  ))}
                </ul>
              </Fragment>
            );
          case "quote":
            return (
              <blockquote
                key={`${block.type}-${index}`}
                className="border-l-4 border-emerald-400/60 pl-4 text-lg italic text-emerald-100"
              >
                {block.text}
                {block.author ? (
                  <footer className="mt-2 text-sm font-medium text-emerald-200">{block.author}</footer>
                ) : null}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "Article introuvable",
    };
  }

  const url = new URL(`/blog/${post.slug}`, siteUrl).toString();
  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  const keywords = post.focusKeywords ?? post.tags;

  return {
    title,
    description,
    alternates: { canonical: url },
    keywords,
    openGraph: {
      type: "article",
      url,
      title,
      description,
      tags: post.tags,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getAllPosts()
    .filter((item) => item.slug !== post.slug)
    .slice(0, 3);

  const title = post.seoTitle ?? post.title;
  const description = post.seoDescription ?? post.excerpt;
  const keywords = post.focusKeywords ?? post.tags;

  return (
    <div className="relative min-h-screen bg-[#050505] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 opacity-80 bg-[radial-gradient(820px_340px_at_12%_-8%,rgba(168,85,247,0.12),transparent_68%),radial-gradient(780px_320px_at_84%_-4%,rgba(14,165,233,0.1),transparent_70%),radial-gradient(900px_360px_at_50%_110%,rgba(14,165,233,0.08),transparent_70%)]"
      />

      <article className="relative z-10 mx-auto max-w-3xl px-4 pb-24 pt-20">
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-300 transition hover:text-white"
        >
          <span aria-hidden>←</span>
          Retour au blog
        </Link>

        <header className="mb-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-300/80">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden>•</span>
            <span>{post.readingMinutes} min de lecture</span>
          </div>
          <h1 className="text-3xl font-semibold sm:text-4xl">{title}</h1>
          <p className="text-base text-gray-300 sm:text-lg">{description}</p>
          <div className="flex flex-wrap gap-2 text-xs text-gray-400">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 uppercase tracking-wide">
                {tag}
              </span>
            ))}
          </div>
        </header>

        <ArticleContent content={post.content} />

        <div className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-semibold text-white">Besoin d&apos;aller plus loin ?</h2>
          <p className="mt-2 text-sm text-gray-300">
            CréaScope centralise tes stats TikTok, Instagram et YouTube et t&apos;aide à planifier un calendrier éditorial qui convertit. Inscris-toi pour rejoindre la bêta.
          </p>
          <Link
            href="/#hero"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-300"
          >
            Rejoindre la liste d&apos;attente
          </Link>
        </div>

        {relatedPosts.length ? (
          <div className="mt-20 border-t border-white/10 pt-10">
            <h2 className="text-xl font-semibold text-white">A lire ensuite</h2>
            <ul className="mt-6 space-y-4">
              {relatedPosts.map((item) => (
                <li key={item.slug} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <Link
                    href={`/blog/${item.slug}`}
                    className="text-lg font-semibold text-white transition hover:text-emerald-200"
                  >
                    {item.title}
                  </Link>
                  <p className="mt-2 text-sm text-gray-300">{item.excerpt}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-400">
                    <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
                    <span aria-hidden>•</span>
                    <span>{item.readingMinutes} min de lecture</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <Script id={`ld-json-article-${post.slug}`} type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            description,
            keywords,
            author: {
              "@type": "Organization",
              name: "CréaScope",
            },
            publisher: {
              "@type": "Organization",
              name: "CréaScope",
              url: siteUrl,
            },
            mainEntityOfPage: new URL(`/blog/${post.slug}`, siteUrl).toString(),
            datePublished: post.publishedAt,
            dateModified: post.updatedAt ?? post.publishedAt,
            inLanguage: "fr-FR",
          })}
        </Script>
        <Script id={`ld-json-breadcrumb-${post.slug}`} type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Accueil",
                item: siteUrl,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: new URL("/blog", siteUrl).toString(),
              },
              {
                "@type": "ListItem",
                position: 3,
                name: title,
                item: new URL(`/blog/${post.slug}`, siteUrl).toString(),
              },
            ],
          })}
        </Script>
      </article>
    </div>
  );
}
