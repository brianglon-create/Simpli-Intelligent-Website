import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const PAGES: {
  path: string;
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
}[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/horizon", priority: 0.9, changeFrequency: "weekly" },
  { path: "/archive", priority: 0.8, changeFrequency: "weekly" },
  { path: "/check", priority: 0.8, changeFrequency: "weekly" },
  { path: "/operate", priority: 0.6, changeFrequency: "monthly" },
  { path: "/reach", priority: 0.6, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((page) => ({
    url: new URL(page.path, SITE.url).toString(),
    lastModified: new Date("2026-10-22"),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));
}
