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
        className="pointer-events-none fixed top-0 z-50 h-16 w-full bg-gradient-to-b from-background"
        initial={{
          opacity: 0,
          y: -MASK_TRANSLATE,
        }}
        style={{
          pointerEvents: "none",
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
        className="pointer-events-none fixed bottom-0 z-50 h-16 w-full bg-gradient-to-t from-background"
        initial={{
          opacity: 0,
          y: MASK_TRANSLATE,
        }}
        style={{
          pointerEvents: "none",
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut",
        }}
      />
    </>
  );
}
