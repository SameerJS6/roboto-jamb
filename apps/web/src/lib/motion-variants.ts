import type { Variants } from "motion/react";

const DELAY_FACTOR = 0.2;

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
      staggerChildren: 0.15,
      delayChildren: DELAY_FACTOR,
    },
  },
};

export const staggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: (index?: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeInOut",
      delay: index !== undefined ? index * DELAY_FACTOR : 0,
    },
  }),
};
