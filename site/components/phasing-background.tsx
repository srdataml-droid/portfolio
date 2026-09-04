"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * The ambient layer: two soft radial fields drifting slowly across the page.
 * It should read as depth rather than as motion anyone notices, so the travel
 * is small and the cycle is long. Only transform and opacity animate, so this
 * never triggers layout.
 */
export function PhasingBackground() {
  const one = useRef<HTMLDivElement>(null);
  const two = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(one.current, {
        xPercent: 12,
        yPercent: 8,
        opacity: 0.75,
        duration: 26,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
      gsap.to(two.current, {
        xPercent: -10,
        yPercent: -6,
        opacity: 0.7,
        duration: 34,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
        delay: 2,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        ref={one}
        className="absolute -left-[10%] -top-[15%] h-[80vh] w-[80vw]"
        style={{
          background: "radial-gradient(closest-side, var(--phase-a), transparent 70%)",
        }}
      />
      <div
        ref={two}
        className="absolute -bottom-[20%] -right-[10%] h-[85vh] w-[85vw]"
        style={{
          background: "radial-gradient(closest-side, var(--phase-b), transparent 70%)",
        }}
      />
    </div>
  );
}
