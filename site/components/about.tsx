"use client";

import { about, site } from "@/lib/content";
import { Reveal } from "@/components/motion";

export function About() {
  return (
    <section
      id="about"
      className="scroll-mt-20 rounded-t-[32px] bg-bg px-4 py-24 sm:rounded-t-[44px] sm:px-8 md:rounded-t-[56px] md:px-14 md:py-32"
    >
      <div className="mx-auto flex max-w-[720px] flex-col items-center gap-10 text-center md:gap-12">
        <Reveal>
          <h2 className="head-gradient m-0 text-[16vw] font-black uppercase leading-[0.9] tracking-[-0.03em] sm:text-[12vw] md:text-[132px]">
            About me
          </h2>
        </Reveal>

        <Reveal delay={0.08} className="flex flex-col gap-6">
          <p className="m-0 text-lg font-light leading-relaxed text-ink [text-wrap:pretty] md:text-xl">
            {about.lead}
          </p>
          <p className="m-0 text-base font-light leading-relaxed text-muted [text-wrap:pretty] md:text-[17px]">
            {about.second}
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] font-light uppercase tracking-[0.16em] text-faint sm:gap-8 sm:text-[13px]">
            <span>{site.location}</span>
            <span className="hidden h-1 w-1 rounded-full bg-line sm:block" />
            <span>{site.education}</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
