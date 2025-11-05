import { buttonVariants } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { SanityImage } from "@/components/elements/sanity-image";
import type { PageBuilderBlock } from "@/components/page-builder";
import type { PagebuilderType } from "@/types";
import { generateNavigationLinks } from "@/utils/navigation";

type HeroProps = PagebuilderType<"hero"> & {
  allBlocks: PageBuilderBlock[];
};

export default function Hero({ image, imageFill, allBlocks }: HeroProps) {
  const cleanImage = stegaClean(image);
  const cleanImageFill = stegaClean(imageFill);
  const navigationLinks = generateNavigationLinks(allBlocks);

  return (
    <section className="container mx-auto px-4 sm:px-6">
      {cleanImage?.id && (
        <div className="h-full max-h-[800px]">
          <SanityImage
            className={cn(
              "size-full max-h-[800px]",
              cleanImageFill === "contain" && "object-contain",
              cleanImageFill === "cover" && "object-cover"
            )}
            fetchPriority="high"
            height={1500}
            image={cleanImage}
            loading="eager"
            width={768}
          />
          {navigationLinks.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
              {navigationLinks.map((link, index) => (
                <>
                  <Link
                    className={buttonVariants({
                      variant: "link",
                      className:
                        "!text-[#9C9C9D] group link-effect hover:!no-underline !px-0 relative w-fit font-medium text-base capitalize leading-[25px] hover:after:origin-left hover:after:scale-x-100",
                    })}
                    href={link.href}
                    key={link.href}
                  >
                    {link.label.toLowerCase()}
                  </Link>
                  {index < navigationLinks.length - 1 && (
                    <li
                      className="list-none text-[#9C9C9D]"
                      key={`separator-${index}-${link.href}`}
                    >
                      |
                    </li>
                  )}
                </>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
