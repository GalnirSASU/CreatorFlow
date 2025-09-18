import type { MetadataRoute } from "next";
import { getAllPosts } from "@/content/blog/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://creascope.app";
  const now = new Date();
  const posts = getAllPosts();

  const postEntries = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: posts[0]
        ? new Date(posts[0].updatedAt ?? posts[0].publishedAt)
        : now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...postEntries,
  ];
}
