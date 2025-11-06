import { buttonVariants } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "motion/react";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import { useEffect } from "react";
import { SanityImage } from "@/components/elements/sanity-image";
import type { PageBuilderBlock } from "@/components/page-builder";
import { staggerContainer, staggerItem } from "@/lib/motion-variants";
import type { PagebuilderType } from "@/types";
import { generateNavigationLinks } from "@/utils/navigation";

type HeroProps = PagebuilderType<"hero"> & {
  allBlocks: PageBuilderBlock[];
};

export default function Hero({ image, imageFill, allBlocks }: HeroProps) {
  const cleanImage = stegaClean(image);
  const cleanImageFill = stegaClean(imageFill);
  const navigationLinks = generateNavigationLinks(allBlocks);

  const maskPosition = useMotionValue("150% 0%");
  const mask = useMotionTemplate`linear-gradient(90deg, #000 25%, #000000e6 50%, #00000000) ${maskPosition} / 400% no-repeat`;

  useEffect(() => {
    const animation = animate(maskPosition, "0% 0%", {
      duration: 0.75,
      ease: "easeInOut",
    });

    return animation.stop;
  }, [maskPosition]);

  return (
    <section className="container mx-auto px-4 sm:px-6">
      {cleanImage?.id && (
        <>
          <motion.div
            animate={{
              opacity: 1,
            }}
            className="h-full max-h-[800px]"
            initial={{
              opacity: 0.2,
            }}
            style={{
              mask,
            }}
            transition={{ duration: 0.75, ease: "easeInOut" }}
          >
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
          </motion.div>
          {navigationLinks.length > 0 && (
            <motion.div
              className="mt-3 flex w-full flex-wrap items-center justify-center gap-4"
              initial="hidden"
              variants={staggerContainer}
              viewport={{ once: true, amount: 0.3 }}
              whileInView="visible"
            >
              {navigationLinks.map((link, index) => (
                <motion.div
                  className="flex items-center gap-4 will-change-animate"
                  custom={index}
                  key={`navigation-link-${link.href}-${index}`}
                  variants={staggerItem}
                >
                  <Link
                    className={buttonVariants({
                      variant: "link",
                      className:
                        "!text-[#9C9C9D] group link-effect hover:!no-underline !px-0 relative w-fit font-medium text-base capitalize leading-[25px] hover:after:origin-left hover:after:scale-x-100",
                    })}
                    href={link.href}
                  >
                    {link.label.toLowerCase()}
                  </Link>
                  {index < navigationLinks.length - 1 && (
                    <span className="text-[#9C9C9D]">|</span>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </>
      )}
    </section>
  );
}
