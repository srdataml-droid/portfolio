"use client";

import { motion, useReducedMotion } from "framer-motion";
import { nav, site, whatsappHref } from "@/lib/content";
import { ThemeToggle } from "@/components/theme";

const ease = [0.25, 0.1, 0.25, 1] as const;

function Entrance({
  children,
  delay,
  y = 24,
  className = "",
}: {
  children: React.ReactNode;
  delay: number;
  y?: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/**
 * The portrait slot. A placeholder silhouette until the 3D render exists —
 * deliberately a drawn shape rather than a stock photo, so nothing on the page
 * is standing in for the real thing while pretending not to be.
 */
function PortraitPlaceholder() {
  return (
    <div className="relative w-[280px] sm:w-[360px] md:w-[440px] lg:w-[500px]">
      <svg viewBox="0 0 452 566" className="h-auto w-full" fill="none" role="img" aria-label="Portrait placeholder">
        <defs>
          <linearGradient id="portrait-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--line)" />
            <stop offset="100%" stopColor="var(--bg)" />
          </linearGradient>
        </defs>
        <path
          d="M226 96c46 0 78 34 78 82 0 30-9 55-23 72 34 13 60 30 78 52 26 32 39 76 45 130 3 26 4 44 4 62H70c0-18 1-36 4-62 6-54 19-98 45-130 18-22 44-39 78-52-14-17-23-42-23-72 0-48 32-82 52-82z"
          fill="url(#portrait-fill)"
          stroke="var(--line)"
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}

export function Hero() {
  return (
    <header className="relative flex min-h-svh flex-col justify-between overflow-x-clip px-4 pb-8 pt-6 sm:px-8 md:px-14 md:pb-10 md:pt-8">
      <Entrance delay={0} y={-16}>
        <nav className="flex items-center justify-between gap-4">
          <ul className="flex items-center gap-2.5 sm:gap-7 md:gap-11">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="flex h-11 items-center px-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink sm:text-xs sm:tracking-[0.16em] md:text-sm"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </nav>
      </Entrance>

      <div className="pointer-events-none absolute inset-x-4 top-[22%] sm:inset-x-8 md:inset-x-14 md:top-[18%]">
        <Entrance delay={0.15} y={36}>
          <h1 className="head-gradient m-0 whitespace-nowrap text-[14vw] font-black uppercase leading-[0.86] tracking-[-0.035em] sm:text-[15vw] md:text-[16vw] lg:text-[17vw]">
            Hi, I&rsquo;m {site.shortName}
          </h1>
        </Entrance>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
        <Entrance delay={0.55} y={28}>
          <PortraitPlaceholder />
        </Entrance>
      </div>

      <div className="relative flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
        <Entrance delay={0.3} y={18}>
          <p className="max-w-[240px] text-[clamp(0.8rem,1.2vw,1.05rem)] font-light leading-snug text-ink sm:max-w-[280px] md:max-w-[320px]">
            {site.tagline}
          </p>
        </Entrance>

        <Entrance delay={0.45} y={18}>
          <div className="flex flex-col items-start gap-3 sm:items-end">
            <a
              href={`mailto:${site.email}`}
              className="accent-pill flex h-12 items-center justify-center whitespace-nowrap rounded-full px-8 text-[11px] font-medium uppercase tracking-[0.2em] transition-transform hover:scale-[1.02] sm:h-14 sm:px-11 sm:text-xs md:text-sm"
            >
              Say hello
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 items-center text-xs font-light text-muted transition-colors hover:text-ink sm:text-[13px]"
            >
              or message me on WhatsApp
            </a>
          </div>
        </Entrance>
      </div>
    </header>
  );
}
