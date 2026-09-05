"use client";

import { useCurrency } from "@/components/currency";
import { Reveal } from "@/components/motion";
import {
  formatPrice,
  services,
  startingPrice,
  type Region,
  type Service,
} from "@/lib/pricing";

/**
 * Region drives the price ladder, not a conversion. The currency context
 * already knows where the visitor is (edge header) and what they overrode it
 * to, so pricing reuses that single answer rather than detecting twice.
 */
function regionFor(currency: string): Region {
  if (currency === "NGN") return "NG";
  if (currency === "USD") return "US";
  if (currency === "GBP") return "GB";
  if (currency === "EUR") return "EU";
  return "DEFAULT";
}

function ServiceCard({ service, region }: { service: Service; region: Region }) {
  return (
    <article className="flex flex-col gap-6 rounded-[28px] border border-line bg-surface p-7 sm:rounded-[32px] sm:p-9">
      <div className="flex flex-col gap-3">
        <h3 className="m-0 text-xl font-medium leading-snug text-ink [text-wrap:pretty] md:text-2xl">
          {service.name}
        </h3>
        <p className="m-0 text-[15px] font-light leading-relaxed text-muted [text-wrap:pretty]">
          {service.blurb}
        </p>
      </div>

      <div className="flex items-baseline gap-2.5">
        <span className="text-[13px] font-light text-faint">Starting from</span>
        <span className="text-2xl font-medium text-ink" suppressHydrationWarning>
          {formatPrice(startingPrice(service, region), region)}
        </span>
      </div>

      <ul className="m-0 flex list-none flex-col gap-3 p-0">
        {service.tiers.map((tier) => (
          <li
            key={tier.name}
            className="flex flex-col gap-1 border-t border-line pt-3 first:border-t-0 first:pt-0"
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-sm font-medium text-ink">{tier.name}</span>
              <span className="flex-none text-sm font-light text-muted" suppressHydrationWarning>
                {formatPrice(tier.prices[region], region)}
              </span>
            </div>
            <span className="text-xs font-light text-faint [text-wrap:pretty]">{tier.anchor}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Pricing() {
  const { currency } = useCurrency();
  const region = regionFor(currency);

  return (
    <section id="services" className="scroll-mt-20 px-4 py-20 sm:px-8 sm:py-24 md:px-14 md:py-28">
      <Reveal className="flex flex-col gap-4">
        <h2 className="head-gradient m-0 text-[16vw] font-black uppercase leading-[0.9] tracking-[-0.03em] sm:text-[12vw] md:text-[132px]">
          Services
        </h2>
        <p className="m-0 max-w-[620px] text-base font-light leading-relaxed text-muted [text-wrap:pretty] md:text-[17px]">
          Three things, because those are the three I can point at evidence for. Every price is a
          starting point for the smallest real version of the work, and every tier names a project
          of mine that sits at it.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.slug} delay={index * 0.06} as="div" className="h-full">
            <ServiceCard service={service} region={region} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-8" delay={0.1}>
        <p className="m-0 max-w-[620px] text-[13px] font-light leading-relaxed text-faint [text-wrap:pretty]">
          Prices show in your region&rsquo;s currency, and the picker in the footer overrides that if
          it guessed wrong. The naira and dollar ladders are priced independently against their own
          markets rather than converted, so neither is a division of the other.
        </p>
      </Reveal>
    </section>
  );
}
