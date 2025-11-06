"use client";

import { cn } from "@workspace/ui/lib/utils";
import { motion, type Variants } from "motion/react";
import { stegaClean } from "next-sanity";
import { SanityButtons } from "@/components/elements/sanity-buttons";
import { SanityImage } from "@/components/elements/sanity-image";
import type { PagebuilderType } from "@/types";
import { convertToSlug } from "@/utils";

type SplitFeatureSectionProps = PagebuilderType<"splitFeatureSection">;
type SplitFeatureSectionImageProps = {
  image: SplitFeatureSectionProps["image"];
  imageFill: SplitFeatureSectionProps["imageFill"];
};

function getSlugSource(
  navigationSlugField: SplitFeatureSectionProps["navigationSlugField"],
  headline: SplitFeatureSectionProps["headline"],
  title: SplitFeatureSectionProps["title"]
): string {
  const cleanNavigationSlugField = stegaClean(navigationSlugField);
  const cleanHeadline = stegaClean(headline);
  const cleanTitle = stegaClean(title);

  return cleanNavigationSlugField === "headline"
    ? (cleanHeadline ?? "")
    : cleanTitle;
}

export default function SplitFeatureSection({
  headline,
  title,
  description,
  image,
  backgroundColor = "#DFDAD7",
  customBackgroundColor,
  imageFill = "cover",
  desktopLayoutDirection = "row",
  mobileLayoutDirection = "column",
  buttons,
  ctaLayout = "row",
  navigationSlugField,
}: SplitFeatureSectionProps) {
  const cleanBackgroundColor = stegaClean(backgroundColor);
  const cleanDesktopLayoutDirection = stegaClean(desktopLayoutDirection);
  const cleanMobileLayoutDirection = stegaClean(mobileLayoutDirection);

  const cleanCTALayout = stegaClean(ctaLayout);
  const cleanImageFill = stegaClean(imageFill);

  const actualBackgroundColor =
    cleanBackgroundColor === "custom" && customBackgroundColor
      ? stegaClean(customBackgroundColor)
      : cleanBackgroundColor;

  const slugSource = getSlugSource(
    navigationSlugField ?? "title",
    headline,
    title
  );

  const containerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  } satisfies Variants;

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  } satisfies Variants;

  const imageVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  } satisfies Variants;

  return (
    <section
      className="scroll-my-20 py-9"
      {...(slugSource && { id: convertToSlug(slugSource) })}
      style={{ backgroundColor: actualBackgroundColor }}
    >
      <div
        className={cn(
          "container mx-auto grid gap-10 px-4 sm:gap-12 md:grid-cols-2 md:gap-14 lg:gap-16"
        )}
        style={{ "--max-w": "1336px" } as React.CSSProperties}
      >
        <motion.div
          className="order-(--order-mobile) flex min-w-0 flex-col justify-center gap-4 will-change-animate sm:gap-5 md:order-(--order-desktop)"
          initial="hidden"
          style={
            {
              "--order-mobile": cleanMobileLayoutDirection === "column" ? 1 : 2,
              "--order-desktop": cleanDesktopLayoutDirection === "row" ? 1 : 2,
            } as React.CSSProperties
          }
          variants={containerVariants}
          viewport={{ once: true, amount: 0.3 }}
          whileInView="visible"
        >
          {headline && (
            <motion.p
              className="min-w-0 break-words text-center font-medium text-sm uppercase leading-[25px] will-change-animate lg:text-base"
              variants={itemVariants}
            >
              {headline}
            </motion.p>
          )}
          <motion.h2
            className="min-w-0 text-balance break-words text-center font-medium text-3xl leading-[48px] will-change-animate sm:text-2xl lg:text-4xl"
            variants={itemVariants}
          >
            {title}
          </motion.h2>
          <motion.p
            className="mx-auto min-w-0 max-w-[47ch] break-words font-medium text-sm leading-[25px] will-change-animate lg:text-base"
            variants={itemVariants}
          >
            {description}
          </motion.p>
          {buttons && buttons.length > 0 && (
            <motion.div
              className="mx-auto mt-3 flex w-fit gap-2 will-change-animate"
              variants={itemVariants}
            >
              <SanityButtons
                buttonClassName="border-[#737373] text-[#737373] w-fit hover:bg-muted/50"
                buttons={buttons}
                className={cn(
                  cleanCTALayout === "column" &&
                    "flex flex-col items-center justify-center gap-2 sm:flex-col",
                  cleanCTALayout === "row" && "flex flex-row gap-2 sm:flex-row"
                )}
              />
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className="order-(--order-mobile) h-full will-change-animate md:order-(--order-desktop)"
          initial="hidden"
          style={
            {
              "--order-mobile": cleanMobileLayoutDirection === "column" ? 2 : 1,
              "--order-desktop": cleanDesktopLayoutDirection === "row" ? 2 : 1,
            } as React.CSSProperties
          }
          variants={imageVariants}
          viewport={{ once: true, amount: 0.3 }}
          whileInView="visible"
        >
          <SplitFeatureSectionImage image={image} imageFill={cleanImageFill} />
        </motion.div>
      </div>
    </section>
  );
}

function SplitFeatureSectionImage({
  image,
  imageFill = "cover",
}: SplitFeatureSectionImageProps) {
  if (!image?.id) {
    return null;
  }

  const className = cn(
    "h-auto max-h-[731px] w-full",
    imageFill === "contain" && "object-contain",
    imageFill === "cover" && "object-cover"
  );

  return (
    <SanityImage
      alt={image.alt || ""}
      className={className}
      height={731}
      image={image}
      width={583}
    />
  );
}
