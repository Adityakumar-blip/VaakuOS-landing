import { useEffect } from "react";

export const SmoothScroll = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    const isNarrowViewport = window.innerWidth < 1024;

    if (prefersReducedMotion || isTouchDevice || isNarrowViewport) {
      return;
    }

    let lenis: { raf: (time: number) => void; destroy: () => void } | null = null;
    let frameId = 0;
    let disposed = false;

    const setupLenis = async () => {
      const { default: Lenis } = await import("lenis");

      if (disposed) return;

      lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
      });

      const raf = (time: number) => {
        lenis?.raf(time);
        frameId = requestAnimationFrame(raf);
      };

      frameId = requestAnimationFrame(raf);
    };

    void setupLenis();

    return () => {
      disposed = true;
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
};
