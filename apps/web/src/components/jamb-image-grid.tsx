"use client";

import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

type JambImageGridProps = {
  features: {
    icon: string;
    iconAlt: string;
    truncateTitle?: boolean;
    title: string;
    description: string;
  }[];
  maxDescriptionLength?: number;
};

const PLACEHOLDER_IMAGE = "https://placehold.co/300x300/png";

function DescriptionWithReadMore({
  description,
  maxLength = 50,
}: {
  description: string;
  maxLength?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (description.length <= maxLength) {
    return <p className="flex-1 text-base leading-[25px]">{description}</p>;
  }

  const truncatedText = description.slice(0, maxLength).trim();
  const displayText = isExpanded ? description : `${truncatedText}...`;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-1">
      <p className="flex-1 text-base leading-[25px]">{displayText}</p>
      <button
        className="mt-1 font-medium text-primary text-sm underline underline-offset-4 transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => setIsExpanded(!isExpanded)}
        type="button"
      >
        {isExpanded ? "Read less" : "Read more"}
      </button>
    </div>
  );
}

function FeatureImage({ src, alt }: { src: string; alt: string }) {
  const [imageSrc, setImageSrc] = useState(src || PLACEHOLDER_IMAGE);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (src) {
      setImageSrc(src);
      setHasError(false);
    } else {
      setImageSrc(PLACEHOLDER_IMAGE);
      setHasError(false);
    }
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImageSrc(PLACEHOLDER_IMAGE);
    }
  };

  return (
    <Image
      alt={alt}
      className="aspect-square w-full object-contain"
      height={300}
      onError={handleError}
      src={imageSrc}
      width={300}
    />
  );
}

export default function JambImageGrid({
  features,
  maxDescriptionLength = 55,
}: JambImageGridProps) {
  return (
    <section className="bg-muted py-9">
      <div className="container mx-auto space-y-12 px-4 sm:space-y-14 sm:px-6 lg:space-y-16 lg:px-8">
        <h3 className="text-balance text-center font-medium text-2xl capitalize leading-[18px]">
          our latest furniture
        </h3>

        <div className="grid grid-cols-1 justify-center gap-6 sm:grid-cols-2 md:grid-cols-3 md:gap-10 lg:grid-cols-4 xl:grid-cols-5">
          {features?.map((feature, index) => (
            <div
              className="flex min-w-0 flex-col items-center justify-start gap-4 text-center"
              key={`jamb-image-grid-feature-${feature.title}-${index}`}
            >
              <div className="aspect-square w-full shrink-0">
                <FeatureImage
                  alt={feature.iconAlt ?? ""}
                  src={feature.icon ?? ""}
                />
              </div>
              <div className="flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-1">
                <h3
                  className={cn(
                    "mt-2.5 w-full min-w-0 break-words font-bold text-base text-h3 leading-[25px]",
                    feature?.truncateTitle && "line-clamp-2"
                  )}
                >
                  {feature.title}
                </h3>
                <DescriptionWithReadMore
                  description={feature.description}
                  maxLength={maxDescriptionLength}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
