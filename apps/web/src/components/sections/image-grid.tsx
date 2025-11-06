"use client";

import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { motion, type Variants } from "motion/react";
import { stegaClean } from "next-sanity";
import { useState } from "react";
import { SanityImage } from "@/components/elements/sanity-image";
import type { PagebuilderType } from "@/types";
import { convertToSlug } from "@/utils";

type ImageGridProps = PagebuilderType<"imageGrid">;
type DescriptionWithReadMoreProps = {
  description: ImageGridProps["features"][0]["description"];
  maxLength: ImageGridProps["maxDescriptionLength"];
};
type FeatureImageProps = {
  image: ImageGridProps["features"][0]["image"];
  imageFill: ImageGridProps["features"][0]["imageFill"];
};

export default function ImageGrid({
  title,
  backgroundColor = "#DFDAD7",
  customBackgroundColor,
  features,
  maxDescriptionLength,
}: ImageGridProps) {
  const MAX_GRID_COLS = 5;
  const cleanBackgroundColor = stegaClean(backgroundColor);
  const cleanTitle = stegaClean(title);

  const actualBackgroundColor =
    cleanBackgroundColor === "custom" && customBackgroundColor
      ? stegaClean(customBackgroundColor)
      : cleanBackgroundColor;

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
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
        delay: index * 0.2,
      },
    }),
  } satisfies Variants;

  return (
    <section
      className="scroll-my-20 py-9"
      {...(cleanTitle && { id: convertToSlug(cleanTitle) })}
      style={{ backgroundColor: actualBackgroundColor }}
    >
      <motion.div
        className="container mx-auto space-y-12 px-4 sm:space-y-14 sm:px-6 lg:space-y-16 lg:px-8"
        initial="hidden"
        variants={containerVariants}
        whileInView="visible"
      >
        {title && (
          <motion.h3
            className="text-balance text-center font-medium text-2xl capitalize leading-[25px] will-change-animate"
            custom={0}
            variants={itemVariants}
          >
            {title}
          </motion.h3>
        )}

        <div
          className={cn(
            "grid justify-center gap-8 sm:grid-cols-2 md:grid-cols-3 md:gap-10 lg:grid-cols-4",
            features?.length >= MAX_GRID_COLS && "xl:grid-cols-5"
          )}
        >
          {features?.map((feature, index) => (
            <motion.div
              className="flex min-w-0 flex-col items-center justify-start gap-4 text-center will-change-animate"
              custom={index}
              key={`jamb-image-grid-feature-${feature.title}-${index}`}
              variants={itemVariants}
            >
              <div className="aspect-square w-full shrink-0">
                <FeatureImage
                  image={feature.image}
                  imageFill={feature.imageFill}
                />
              </div>
              <div className="flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-1">
                {feature.title && (
                  <h4
                    className={cn(
                      "mt-2.5 w-full min-w-0 break-words font-bold text-base text-h3 leading-[25px]",
                      feature?.truncateTitle && "line-clamp-2"
                    )}
                  >
                    {feature.title}
                  </h4>
                )}
                {feature.description && (
                  <DescriptionWithReadMore
                    description={feature.description}
                    maxLength={maxDescriptionLength}
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function DescriptionWithReadMore({
  description,
  maxLength,
}: DescriptionWithReadMoreProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cleanDescription = stegaClean(description);

  if (cleanDescription && cleanDescription.length <= maxLength) {
    return (
      <p className="flex-1 text-base leading-[25px]">{cleanDescription}</p>
    );
  }

  const truncatedText = cleanDescription?.slice(0, maxLength).trim();
  const displayText = isExpanded ? cleanDescription : `${truncatedText}...`;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-1">
      <p className="flex-1 text-base leading-[25px]">{displayText}</p>
      <Button
        className="underline underline-offset-4"
        onClick={() => setIsExpanded(!isExpanded)}
        size="sm"
        variant="ghost"
      >
        {isExpanded ? "Read less" : "Read more"}
      </Button>
    </div>
  );
}

function FeatureImage({ image, imageFill }: FeatureImageProps) {
  const cleanImageFill = stegaClean(imageFill);

  if (!image?.id) {
    return null;
  }

  return (
    <SanityImage
      alt={image.alt || ""}
      className={cn(
        "aspect-square w-full",
        cleanImageFill === "contain" && "object-contain",
        cleanImageFill === "cover" && "object-cover"
      )}
      height={300}
      image={image}
      width={300}
    />
  );
}
