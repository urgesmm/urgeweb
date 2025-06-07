"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function SmoothScroll({ children }) {
  useEffect(() => {
    let lenis;
    let animationFrame;

    if (window.innerWidth > 768) { // Enable Lenis only for larger screens
      lenis = new Lenis({
        lerp: 0.1, // Adjust smoothness factor as needed
        smooth: true,
        direction: "vertical",
        gestureDirection: "vertical",
        smoothTouch: true,
        touchMultiplier: 2,
      });

      function raf(time) {
        lenis.raf(time);
        animationFrame = requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    }

    return () => {
      // Cleanup on unmount to prevent memory leaks
      if (lenis) lenis.destroy();
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <div>{children}</div>;
}
