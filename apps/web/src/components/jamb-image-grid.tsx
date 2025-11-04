"use client";

import { cn } from "@workspace/ui/lib/utils";
import Image from "next/image";
import { useState } from "react";

type JambImageGridProps = {
  features: {
    icon: string;
    iconAlt: string;
    title: string;
    description: string;
  }[];
  expandSingleOrDouble?: boolean;
  maxDescriptionLength?: number;
};

function DescriptionWithReadMore({
  description,
  maxLength = 150,
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

export default function JambImageGrid({
  features,
  expandSingleOrDouble = false,
  maxDescriptionLength = 150,
}: JambImageGridProps) {
  return (
    <section className="container mx-auto space-y-12 bg-muted sm:space-y-14 lg:space-y-16">
      <h3 className="text-balance text-center font-medium text-2xl capitalize leading-[18px]">
        our latest furniture
      </h3>

      <div className="flex flex-wrap items-start justify-center gap-6 md:gap-10">
        {features?.map((feature, index) => (
          <div
            className={cn(
              "flex h-full flex-col items-center justify-start gap-4 text-center max-sm:basis-full sm:basis-[calc(50%-0.75rem)] md:basis-[calc(33.333%-1.67rem)] lg:basis-[calc(25%-1.875rem)] xl:max-w-[calc((100%-10rem)/5)] xl:flex-[0_1_auto]",
              expandSingleOrDouble &&
                features.length === 1 &&
                "!basis-full !max-w-full",
              expandSingleOrDouble &&
                features.length === 2 &&
                "xl:max-w-[45%] xl:basis-[45%]"
            )}
            key={`jamb-image-grid-feature-${feature.title}-${index}`}
          >
            <Image
              alt={feature.iconAlt ?? ""}
              className="aspect-square size-full flex-shrink-0 rounded-full object-contain"
              height={300}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                // target.style.display = "none";
                target.src = "https://placehold.co/300x300/png"
              }}
              src={feature.icon ?? ""}
              width={300}
            />
            <div className="flex flex-1 flex-col items-center justify-center gap-1">
              <h3 className="mt-2.5 font-bold text-base text-h3 leading-[25px]">
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
    </section>
  );
}
