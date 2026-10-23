import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export function pageMetadata(args: {
  title: string;
  description: string;
  path: string;
  index?: boolean;
}): Metadata {
  const url = new URL(args.path, SITE.url).toString();
  const index = args.index !== false;

  return {
    title: args.title,
    description: args.description,
    alternates: { canonical: url },
    robots: { index, follow: index },
    openGraph: {
      type: "website",
      url,
      title: args.title,
      description: args.description,
      siteName: SITE.name,
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: args.title,
      description: args.description,
    },
  };
}
