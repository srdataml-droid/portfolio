"use client";

import { site, whatsappHref } from "@/lib/content";
import { Reveal } from "@/components/motion";
import { CurrencyPicker } from "@/components/currency";

const links = [
  { label: "GitHub", href: site.github },
  { label: "LinkedIn", href: site.linkedin },
  { label: "X", href: site.x },
  { label: "CV", href: site.cv },
];

export function Contact() {
  return (
    <footer id="contact" className="scroll-mt-20 px-4 pb-10 pt-24 sm:px-8 md:px-14 md:pb-12 md:pt-28">
      <Reveal className="flex flex-col justify-between gap-10 md:flex-row md:items-start md:gap-14">
        <div className="flex flex-col gap-6">
          <h2 className="head-gradient m-0 text-[15vw] font-black uppercase leading-[0.9] tracking-[-0.03em] sm:text-[11vw] md:text-[118px]">
            Say hello
          </h2>
          <p className="m-0 max-w-[460px] text-base font-light leading-relaxed text-muted [text-wrap:pretty] md:text-[17px]">
            If something here is close to a problem you have, I&rsquo;d be glad to hear about it. A
            short message is enough to start.
          </p>
        </div>

        <div className="flex flex-col gap-4 md:pt-4">
          <a
            href={`mailto:${site.email}`}
            className="accent-pill flex h-14 items-center justify-center whitespace-nowrap rounded-full px-11 text-xs font-medium uppercase tracking-[0.2em] transition-transform hover:scale-[1.02] md:text-sm"
          >
            Send an email
          </a>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-14 items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-line px-11 text-xs font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:bg-surface-2 md:text-sm"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 11.5a8.4 8.4 0 0 1-12.5 7.3L3 20.5l1.8-5.3A8.4 8.4 0 1 1 21 11.5z" />
            </svg>
            WhatsApp
          </a>
        </div>
      </Reveal>

      <div className="mt-20 flex flex-col gap-7 md:mt-28">
        <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
          <a
            href={`mailto:${site.email}`}
            className="flex h-11 items-center text-[15px] font-light text-ink transition-colors hover:text-muted"
          >
            {site.email}
          </a>
          <span className="hidden h-1 w-1 rounded-full bg-line sm:block" />
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center text-[15px] font-light text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="h-px bg-line" />

        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <span className="text-[13px] font-light text-faint">
            {site.name} &mdash; {site.location}
          </span>
          <CurrencyPicker />
        </div>
      </div>
    </footer>
  );
}
