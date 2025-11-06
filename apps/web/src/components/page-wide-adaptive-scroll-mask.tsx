"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function PageWideScrollMask() {
  const MASK_TRANSLATE = 16;

  const [showTopMask, setShowTopMask] = useState(false);
  const [showBottomMask, setShowBottomMask] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const isScrollable = documentHeight > windowHeight;

      if (!isScrollable) {
        setShowTopMask(false);
        setShowBottomMask(false);
        return;
      }

      const topThreshold = 50;
      setShowTopMask(scrollTop > topThreshold);

      const bottomThreshold = 50;
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
      setShowBottomMask(distanceFromBottom > bottomThreshold);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <motion.div
        animate={{
          opacity: showTopMask ? 1 : 0,
          y: showTopMask ? 0 : -MASK_TRANSLATE,
        }}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 z-50 h-20 w-full md:h-24"
        initial={{
          opacity: 0,
          y: -MASK_TRANSLATE,
        }}
        style={{
          background:
            "linear-gradient(to bottom, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 15%, hsl(var(--background) / 0.8) 30%, hsl(var(--background) / 0.5) 50%, hsl(var(--background) / 0.2) 70%, transparent 100%)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          maskImage:
            "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, black 40%, transparent 100%)",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      />
      <motion.div
        animate={{
          opacity: showBottomMask ? 1 : 0,
          y: showBottomMask ? 0 : MASK_TRANSLATE,
        }}
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 z-50 h-20 w-full md:h-24"
        initial={{
          opacity: 0,
          y: MASK_TRANSLATE,
        }}
        style={{
          background:
            "linear-gradient(to top, hsl(var(--background)) 0%, hsl(var(--background) / 0.95) 15%, hsl(var(--background) / 0.8) 30%, hsl(var(--background) / 0.5) 50%, hsl(var(--background) / 0.2) 70%, transparent 100%)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          filter: "brightness(0.9)",
          maskImage:
            "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, black 40%, transparent 100%)",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      />
    </>
  );
}
