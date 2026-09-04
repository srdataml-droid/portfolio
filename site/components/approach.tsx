"use client";

import { approach } from "@/lib/content";
import { Reveal } from "@/components/motion";

/**
 * The break in the rhythm. In dark mode this section is the bright one; in
 * light mode it inverts and becomes the dark one, which is why its colours come
 * from their own --break-* tokens rather than from the page tokens.
 */
export function Approach() {
  return (
    <section
      id="approach"
      className="scroll-mt-20 rounded-t-[32px] px-4 py-20 sm:rounded-t-[44px] sm:px-8 sm:py-24 md:rounded-t-[56px] md:px-14 md:py-28"
      style={{ background: "var(--break-bg)", color: "var(--break-ink)" }}
    >
      <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end md:gap-14">
        <h2 className="m-0 text-[16vw] font-black uppercase leading-[0.9] tracking-[-0.03em] sm:text-[12vw] md:text-[132px]">
          Approach
        </h2>
        <p
          className="m-0 max-w-[430px] text-base font-light leading-relaxed [text-wrap:pretty] md:mb-4 md:text-[17px]"
          style={{ color: "var(--break-muted)" }}
        >
          Five things I do, and the reason each one matters more than it looks.
        </p>
      </Reveal>

      <ul className="mt-14 flex list-none flex-col p-0 md:mt-20">
        {approach.map((item, index) => (
          <Reveal
            as="li"
            key={item.index}
            delay={index * 0.06}
            className="flex flex-col gap-4 py-8 md:flex-row md:items-start md:gap-12 md:py-10"
            // Every row carries a rule above it, and the last one closes the
            // set below as well, so the group reads as bounded rather than
            // trailing off into the section padding.
            style={{
              borderTop: "1px solid var(--break-line)",
              borderBottom:
                index === approach.length - 1 ? "1px solid var(--break-line)" : undefined,
            }}
          >
            <span className="text-5xl font-black leading-[0.82] tracking-[-0.04em] md:w-[168px] md:flex-none md:text-[96px]">
              {item.index}
            </span>
            <div className="flex flex-col gap-3 md:pt-2.5">
              <h3 className="m-0 text-xl font-medium uppercase tracking-[0.01em] md:text-[30px]">
                {item.title}
              </h3>
              <p
                className="m-0 max-w-[700px] text-[15px] font-light leading-relaxed [text-wrap:pretty] md:text-base"
                style={{ color: "var(--break-muted)" }}
              >
                {item.body}
              </p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
