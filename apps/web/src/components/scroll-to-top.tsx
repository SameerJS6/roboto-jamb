"use client";

import { Button } from "@workspace/ui/components/button";
import { ArrowUpIcon } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 200;

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY >= SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const SCALE_FACTOR = 0.95;

  return (
    <motion.div
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : SCALE_FACTOR,
        y: isVisible ? 0 : 10,
      }}
      className="fixed right-4 bottom-4 z-999999999"
      initial={{ opacity: 0, scale: SCALE_FACTOR, y: 10 }}
      style={{
        pointerEvents: isVisible ? "auto" : "none",
      }}
      transition={{ duration: 1, type: 'spring' }}
    >
      <Button
        aria-label="Scroll to top"
        className="size-10 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 sm:size-12"
        onClick={scrollToTop}
        size="icon"
        variant="default"
      >
        <ArrowUpIcon className="size-4 sm:size-5" />
      </Button>
    </motion.div>
  );
}
