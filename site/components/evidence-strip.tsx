"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { results, tools } from "@/lib/content";

/**
 * Two rows drifting in opposite directions as the page scrolls past. Driven by
 * a passive scroll listener writing into gsap.quickTo rather than by a second
 * scroll-animation engine, so it cannot fight Framer Motion elsewhere on the
 * page. Each row is tripled so there is always content either side of the
 * viewport and the drift never runs out of tiles.
 */
export function EvidenceStrip() {
  const section = useRef<HTMLElement>(null);
  const rowOne = useRef<HTMLDivElement>(null);
  const rowTwo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = section.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const toOne = gsap.quickTo(rowOne.current, "x", { duration: 0.6, ease: "power3.out" });
    const toTwo = gsap.quickTo(rowTwo.current, "x", { duration: 0.6, ease: "power3.out" });

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      // Zero when the section's top first touches the bottom of the viewport,
      // growing as it travels up, so the drift is tied to progress past the
      // strip rather than to absolute page position.
      const progress = window.innerHeight - rect.top;
      const offset = progress * 0.14;
      toOne(offset - 200);
      toTwo(-(offset - 200));
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      gsap.killTweensOf([rowOne.current, rowTwo.current]);
    };
  }, []);

  const toolRow = [...tools, ...tools, ...tools];
  const resultRow = [...results, ...results, ...results];

  return (
    <section ref={section} className="overflow-x-clip py-20 sm:py-24 md:py-28">
      <p className="mb-8 px-4 text-sm font-light text-muted sm:px-8 md:mb-10 md:px-14">
        Tools I work with, and results I&rsquo;ve measured.
      </p>

      <div className="edge-fade flex flex-col gap-4">
        <div ref={rowOne} className="flex w-max gap-3 will-change-transform">
          {toolRow.map((tool, index) => (
            <span
              key={`${tool}-${index}`}
              className="flex-none rounded-full border border-line px-5 py-2.5 text-[11px] font-light uppercase tracking-[0.14em] text-muted"
            >
              {tool}
            </span>
          ))}
        </div>

        <div ref={rowTwo} className="flex w-max gap-10 will-change-transform">
          {resultRow.map((result, index) => (
            <span
              key={`${result.value}-${index}`}
              className="flex flex-none items-baseline gap-2.5 whitespace-nowrap"
            >
              <span className="text-xl font-medium text-ink sm:text-2xl">{result.value}</span>
              <span className="text-[13px] font-light text-muted sm:text-sm">{result.label}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
