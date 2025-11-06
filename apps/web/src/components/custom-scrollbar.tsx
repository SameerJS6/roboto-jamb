"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useTouchPrimary } from "../hoooks/use-touch-detection";

export default dynamic(() => Promise.resolve(Scrollbar), { ssr: false });

const SCROLLBAR_PADDING = 8;
const MOBILE_BREAKPOINT = 996;
const SCROLLBAR_HIDE_DELAY = 1000;
const PERCENTAGE_MULTIPLIER = 100;  

function Scrollbar() {
  const isTouchPrimary = useTouchPrimary();

  const ref = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startScrollY = useRef(0);

  useEffect(() => {
    if (isTouchPrimary) {
      return;
    }

    const container = ref.current;
    if (!container) {
      return;
    }

    const thumbElement = container.children[0] as HTMLDivElement;
    let thumbHeight = 0;

    const updateBounds = () => {
      const maxScrollY = document.body.scrollHeight - window.innerHeight;
      thumbHeight = window.innerHeight / document.body.scrollHeight;

      const scrollPosition =
        SCROLLBAR_PADDING +
        (window.scrollY / maxScrollY) *
          (window.innerHeight - thumbHeight * window.innerHeight - SCROLLBAR_PADDING * 2);

      Object.assign(thumbElement.style, {
        height: `${thumbHeight * PERCENTAGE_MULTIPLIER}%`,
        transform: `translateY(${scrollPosition}px)`,
      });
    };

    updateBounds();

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) {
        return;
      }

      const deltaY = e.clientY - startY.current;
      const maxScrollY = document.body.scrollHeight - window.innerHeight;
      const scrollRatio =
        deltaY / (window.innerHeight - thumbHeight * window.innerHeight);

      window.scrollTo({
        top: startScrollY.current + scrollRatio * maxScrollY,
        behavior: "instant",
      });

      showScrollbar();
    };

    let scrollbarHideTimeout = 0;

    const showScrollbar = () => {
      if (thumbHeight === 1 || window.innerWidth < MOBILE_BREAKPOINT) {
        return;
      }

      clearTimeout(scrollbarHideTimeout);
      thumbElement.classList.remove("opacity-0");
      scrollbarHideTimeout = window.setTimeout(() => {
        thumbElement.classList.add("opacity-0");
      }, SCROLLBAR_HIDE_DELAY);
    };

    const onMouseUp = () => {
      isDragging.current = false;
      document.body.style.userSelect = "";
      thumbElement.classList.remove("!bg-foreground/40", "!w-5");

      showScrollbar();
    };

    const onMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      startY.current = e.clientY;
      startScrollY.current = window.scrollY;

      document.body.style.userSelect = "none";
      thumbElement.classList.add("!bg-foreground/40", "!w-5" );

      showScrollbar();
    };

    const onScroll = () => {
      updateBounds();
      showScrollbar();
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    window.addEventListener("scroll", onScroll, { passive: true });

    thumbElement.addEventListener("mousedown", onMouseDown);
    container.addEventListener("mouseenter", showScrollbar);

    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mousedown", onMouseDown);
      container.removeEventListener("mouseenter", showScrollbar);
    };
  }, [isTouchPrimary]);

  return (
    <div
      className="fixed top-0 right-0 z-9999999 h-[calc(100dvh-1rem)] w-16"
      ref={ref}
    >
      <div className="absolute top-0 right-1 w-4 rounded-full bg-foreground/10 opacity-0 backdrop-blur-4 transition-[width,right,opacity] duration-[200ms] hover:right-2 hover:w-6 hover:bg-foreground/20" />
    </div>
  );
}
