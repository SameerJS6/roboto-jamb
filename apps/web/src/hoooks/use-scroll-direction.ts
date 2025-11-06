import { useEffect, useState } from "react";

export function useScrollDirection(threshold = 100) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < threshold) {
        setIsVisible(true);
        setLastScrollY(currentScrollY);
        return;
      }

      // Hide navbar when scrolling down past threshold
      if (currentScrollY > lastScrollY && currentScrollY > threshold) {
        setIsVisible(false);
      }
      // Show navbar when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { signal, passive: true });
    handleScroll(); 

    return () => controller.abort();
  }, [lastScrollY, threshold]);

  return isVisible;
}
