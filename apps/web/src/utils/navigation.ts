import { stegaClean } from "next-sanity";
import type { PageBuilderBlock } from "@/components/pagebuilder";
import { convertToSlug } from "@/utils";

export type NavigationLink = {
  label: string;
  href: string;
};

function getMainColumnNavigationLink(
  block: PageBuilderBlock
): NavigationLink | null {
  if (block._type !== "mainColumn") {
    return null;
  }

  const navigationSlugField = block?.navigationSlugField
    ? stegaClean(block.navigationSlugField)
    : "title";

  // Get the appropriate field value
  let slugSource: string | null = null;

  if (navigationSlugField === "headline" && "headline" in block) {
    const headlineValue = stegaClean(block.headline);
    slugSource = headlineValue ?? null;
  } else if ("title" in block && block?.title) {
    const titleValue = stegaClean(block.title);
    slugSource = titleValue ?? null;
  }

  if (!slugSource) {
    return null;
  }

  const slug = convertToSlug(slugSource);
  return {
    label: slugSource,
    href: `#${slug}`,
  };
}

function getJambImageGridNavigationLink(
  block: PageBuilderBlock
): NavigationLink | null {
  if (block._type !== "jambImageGrid" || !("title" in block) || !block.title) {
    return null;
  }

  const cleanTitle = stegaClean(block.title);
  if (!cleanTitle) {
    return null;
  }

  const slug = convertToSlug(cleanTitle);
  return {
    label: cleanTitle,
    href: `#${slug}`,
  };
}

export function generateNavigationLinks(
  blocks: PageBuilderBlock[]
): NavigationLink[] {
  const links: NavigationLink[] = [];

  for (const block of blocks) {
    if (
      (block._type === "mainColumn" || block._type === "jambImageGrid") &&
      "allowNavigation" in block &&
      block.allowNavigation === true
    ) {
      let link: NavigationLink | null = null;

      if (block._type === "mainColumn") {
        link = getMainColumnNavigationLink(block);
      } else if (block._type === "jambImageGrid") {
        link = getJambImageGridNavigationLink(block);
      }

      if (link) {
        links.push(link);
      }
    }
  }

  return links;
}
