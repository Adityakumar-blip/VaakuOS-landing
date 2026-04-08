import { ReactNode, useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  width?: "fit-content" | "100%";
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
}

export const ScrollReveal = ({
  children,
  width = "100%",
  direction = "up",
  delay = 0.2,
}: ScrollRevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -100px 0px", threshold: 0.1 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ width, position: "relative", overflow: "hidden" }}>
      <div
        ref={ref}
        className={`reveal reveal-${direction} ${isVisible ? "reveal-visible" : ""}`}
        style={{ transitionDelay: `${delay}s` }}
      >
        {children}
      </div>
    </div>
  );
};
