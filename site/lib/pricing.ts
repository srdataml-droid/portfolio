/**
 * Starting prices, by region and by tier.
 *
 * Two independent ladders, deliberately not conversions of each other. A naira
 * price derived from the dollar one is a number no Lagos business will pay; a
 * dollar price derived from the naira one reads as inexperience abroad. Each
 * column is priced against its own market.
 *
 * The headline on a card is the CHEAPEST tier, because "starting from" should
 * mean the smallest real engagement, not the average one.
 *
 * These figures were set from 2026 market research — Africa-based freelance
 * AI/ML at $25–75/hr, global junior ML around $50/hr, agent and RAG work
 * carrying a 30–60% premium over generalist ML — and positioned below the
 * agency floor for the same deliverable. They are a considered starting point,
 * not a quote. Change them here and the site follows.
 */

export type Region = "NG" | "US" | "GB" | "EU" | "DEFAULT";

export const CURRENCY_BY_REGION: Record<Region, string> = {
  NG: "NGN",
  US: "USD",
  GB: "GBP",
  EU: "EUR",
  DEFAULT: "USD",
};

export type Tier = {
  name: string;
  /** A project of mine that sits at this tier, so the price means something. */
  anchor: string;
  prices: Record<Region, number>;
};

export type Service = {
  slug: string;
  name: string;
  /** The problem, not the technology. */
  blurb: string;
  tiers: Tier[];
};

export const services: Service[] = [
  {
    slug: "trustworthy-llm",
    name: "LLM systems that can be trusted near real data",
    blurb:
      "A model next to your database, your documents or your forms — constrained so it refuses, stops, and leaves a reason behind rather than inventing something plausible.",
    tiers: [
      {
        name: "Focused agent",
        anchor: "one job, one or two tools — like my job-extractor",
        prices: { NG: 300_000, US: 1_200, GB: 950, EU: 1_100, DEFAULT: 1_200 },
      },
      {
        name: "Guarded and evaluated",
        anchor: "guardrails, a loop budget, a benchmark that can fail — like my sql-agent",
        prices: { NG: 600_000, US: 2_400, GB: 1_900, EU: 2_200, DEFAULT: 2_400 },
      },
      {
        name: "Decisioning system",
        anchor: "learned prior, bounded rules, an audit trail — like trustlane",
        prices: { NG: 1_200_000, US: 5_000, GB: 3_950, EU: 4_600, DEFAULT: 5_000 },
      },
    ],
  },
  {
    slug: "decision-ml",
    name: "Models that make a decision, not just a prediction",
    blurb:
      "A score of 0.73 is not an action. The threshold gets chosen by what being wrong actually costs, and the result is something someone can defend on Monday.",
    tiers: [
      {
        name: "Predictive model",
        anchor: "clean structured data, evaluated against a baseline, delivered",
        prices: { NG: 250_000, US: 1_000, GB: 800, EU: 920, DEFAULT: 1_000 },
      },
      {
        name: "Model and serving",
        anchor: "leakage control, time-based validation, an API — like my trip-ETA service",
        prices: { NG: 550_000, US: 2_200, GB: 1_750, EU: 2_000, DEFAULT: 2_200 },
      },
      {
        name: "Decision system",
        anchor: "threshold priced in money, drift monitored — like my fraud scorer",
        prices: { NG: 900_000, US: 3_800, GB: 3_000, EU: 3_500, DEFAULT: 3_800 },
      },
    ],
  },
  {
    slug: "operations-platforms",
    name: "Operations that currently live in someone's inbox",
    blurb:
      "Orders, bookings and requests coordinated by message and memory, turned into records with owners and deadlines — so it holds together when one person is unavailable.",
    tiers: [
      {
        name: "Site with a real backend",
        anchor: "pages, forms, light admin — like the RCCG platform",
        prices: { NG: 300_000, US: 1_200, GB: 950, EU: 1_100, DEFAULT: 1_200 },
      },
      {
        name: "Application",
        anchor: "auth, a database, a dashboard people log into",
        prices: { NG: 600_000, US: 2_400, GB: 1_900, EU: 2_200, DEFAULT: 2_400 },
      },
      {
        name: "Platform",
        anchor: "multi-role, an order pipeline, notifications, live migrations — like Bodman",
        prices: { NG: 1_100_000, US: 4_500, GB: 3_550, EU: 4_150, DEFAULT: 4_500 },
      },
    ],
  },
];

export function startingPrice(service: Service, region: Region): number {
  return Math.min(...service.tiers.map((tier) => tier.prices[region]));
}

export function formatPrice(amount: number, region: Region): string {
  return new Intl.NumberFormat(region === "NG" ? "en-NG" : "en-US", {
    style: "currency",
    currency: CURRENCY_BY_REGION[region],
    maximumFractionDigits: 0,
  }).format(amount);
}
