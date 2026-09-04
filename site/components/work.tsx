"use client";

import { projects, type Project } from "@/lib/content";
import { Reveal } from "@/components/motion";
import { Money } from "@/components/currency";

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-baseline gap-2 rounded-2xl bg-surface-2 px-5 py-3">
      <span className="text-lg font-medium text-ink">{value}</span>
      <span className="text-[13px] font-light text-muted">{label}</span>
    </div>
  );
}

/**
 * Two magnitudes worth comparing, so they are stacked and share one axis —
 * side-by-side columns make the reader estimate the ratio, stacked bars show
 * it. Widths are percentages of the track rather than fixed pixels, which is
 * also what stops the card from overflowing a narrow screen.
 */
function Comparison({ comparison }: { comparison: NonNullable<Project["comparison"]> }) {
  return (
    <div className="flex w-full flex-col gap-3.5 md:max-w-[460px]">
      <span className="text-[11px] font-normal uppercase tracking-[0.2em] text-muted">
        {comparison.caption}
      </span>

      <div className="flex flex-col gap-4">
        {comparison.bars.map((bar) => (
          <div key={bar.label} className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-medium text-ink">{bar.value}</span>
              <span className="text-xs font-light text-muted [text-wrap:pretty]">{bar.label}</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${Math.max(bar.weight * 100, 2)}%`,
                  background: bar.accent
                    ? "linear-gradient(90deg, #7621B0 0%, #B600A8 100%)"
                    : "var(--line)",
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <span className="text-[11px] font-light text-faint [text-wrap:pretty]">
        {comparison.footnote}
      </span>
    </div>
  );
}

function Card({ project }: { project: Project }) {
  return (
    <article className="rounded-[28px] border border-line bg-surface p-6 sm:rounded-[36px] sm:p-9 md:rounded-[44px] md:p-11">
      <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
        <div className="flex items-start gap-5 md:gap-8">
          <span className="text-4xl font-black leading-[0.82] text-line sm:text-5xl md:text-[84px]">
            {project.index}
          </span>
          <div className="flex flex-col gap-2 pt-1">
            <span className="text-[11px] font-normal uppercase tracking-[0.2em] text-muted">
              {project.kicker}
            </span>
            <h3 className="m-0 text-2xl font-medium leading-tight text-ink sm:text-3xl md:text-[38px]">
              {project.name}
            </h3>
          </div>
        </div>

        <a
          href={project.repo}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12 flex-none items-center justify-center self-start rounded-full border border-line px-7 text-[11px] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-surface-2 sm:text-xs"
        >
          View repository
        </a>
      </div>

      <div className="mt-9 grid gap-7 md:grid-cols-3 md:gap-8">
        {(
          [
            ["The problem", project.problem],
            ["What I built", project.built],
            ["What changed", project.changed],
          ] as const
        ).map(([heading, body]) => (
          <div key={heading} className="flex flex-col gap-2.5">
            <span className="text-[11px] font-normal uppercase tracking-[0.2em] text-muted">
              {heading}
            </span>
            <p className="m-0 text-[15px] font-light leading-relaxed text-ink-soft [text-wrap:pretty]">
              {body}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap items-end gap-4 border-t border-line pt-7 md:gap-11">
        {project.comparison ? <Comparison comparison={project.comparison} /> : null}
        {project.stats.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
        {project.priceFromNaira ? (
          <div className="flex items-baseline gap-2 rounded-2xl bg-surface-2 px-5 py-3">
            <span className="text-[13px] font-light text-muted">Catalogue from</span>
            <span className="text-lg font-medium text-ink">
              <Money naira={project.priceFromNaira} />
            </span>
          </div>
        ) : null}
      </div>

      {project.caveat ? (
        <p className="m-0 mt-5 text-[13px] font-light leading-relaxed text-faint [text-wrap:pretty]">
          {project.caveat}
        </p>
      ) : null}
    </article>
  );
}

export function Work() {
  return (
    <section id="work" className="scroll-mt-20 px-4 py-20 sm:px-8 sm:py-24 md:px-14 md:py-28">
      <Reveal className="flex flex-col gap-4">
        <h2 className="head-gradient m-0 text-[16vw] font-black uppercase leading-[0.9] tracking-[-0.03em] sm:text-[12vw] md:text-[132px]">
          Work
        </h2>
        <p className="m-0 max-w-[620px] text-base font-light leading-relaxed text-muted [text-wrap:pretty] md:text-[17px]">
          A few things I&rsquo;ve built, and what changed because of them. Every figure below comes
          from a report committed in the repository it belongs to.
        </p>
      </Reveal>

      <div className="mt-14 flex flex-col gap-6 md:gap-7">
        {projects.map((project, index) => (
          <Reveal key={project.slug} delay={index * 0.05} as="div">
            <Card project={project} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-10 flex items-center gap-5" delay={0.1}>
        <span className="text-sm font-light text-faint [text-wrap:pretty]">
          More on GitHub &mdash; a trip-ETA service, a demand forecaster, a documentation RAG
          service, a job-advert extractor and an AI collections system.
        </span>
        <div className="hidden h-px flex-1 bg-line sm:block" />
      </Reveal>
    </section>
  );
}
