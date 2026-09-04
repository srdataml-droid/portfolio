/**
 * Every figure in this file traces to a report committed in the repository it
 * belongs to. Nothing here is estimated, rounded up, or inferred — if a number
 * cannot be pointed at in a repo, it does not appear on the site.
 */

export const site = {
  name: "Irenikase Samuel Temitope",
  shortName: "Samuel",
  role: "AI / Machine Learning Engineer",
  location: "Lagos, Nigeria",
  tagline:
    "I build AI and machine-learning systems, and I try to leave every problem clearer than I found it.",
  email: "samuelirenikase@gmail.com",
  // Kept in international form so the wa.me link resolves from any country.
  whatsapp: "2347061313517",
  github: "https://github.com/srdataml-droid/",
  linkedin: "https://www.linkedin.com/in/samuel-irenikase-582954364/",
  x: "https://x.com/SIrenikase54366",
  cv: "https://github.com/srdataml-droid/portfolio/blob/main/CV.md",
  education: "OND Computer Science, Yaba College of Technology",
} as const;

export const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
  "Hi Samuel — I have a problem I'd like to talk through",
)}`;

export const nav = [
  { label: "Work", href: "#work" },
  { label: "Approach", href: "#approach" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const tools = [
  "Python",
  "pandas",
  "NumPy",
  "scikit-learn",
  "XGBoost",
  "FastAPI",
  "PostgreSQL",
  "Prisma",
  "TypeScript",
  "Next.js",
  "NestJS",
  "Docker",
  "Supabase",
  "Vercel",
] as const;

/**
 * Each result is a number paired with the plain words that say what it means.
 * The pairing is deliberate: a bare metric reads as a boast, a described one
 * reads as a fact.
 */
export const results = [
  { value: "2.80 min", label: "average trip-ETA error" },
  { value: "48.5%", label: "better than the distance rule it replaced" },
  { value: "21.6%", label: "less forecast error than seasonal naive" },
  { value: "55.1%", label: "cheaper than reviewing every transaction" },
  { value: "0.896", label: "retrieval hit@3, citations validated" },
  { value: "0.941", label: "execution accuracy on a guarded SQL agent" },
  { value: "0.852", label: "per-field extraction accuracy" },
  { value: "299", label: "tests, none touching the network" },
  { value: "13", label: "database migrations applied to production" },
] as const;

export type Stat = { value: string; label: string };

export type Project = {
  slug: string;
  index: string;
  kicker: string;
  name: string;
  repo: string;
  problem: string;
  built: string;
  changed: string;
  stats: Stat[];
  /**
   * A genuinely naira-denominated figure, so it is the one number on the site
   * that the currency picker converts. Taken from the catalogue's confirmed
   * per-category starting prices, not estimated.
   */
  priceFromNaira?: number;
  /** Rendered as a two-bar comparison beneath the stats when present. */
  comparison?: {
    caption: string;
    footnote: string;
    bars: { value: string; label: string; weight: number; accent?: boolean }[];
  };
};

export const projects: Project[] = [
  {
    slug: "bodman-outfits",
    index: "01",
    kicker: "Live platform · A real business in Lagos",
    name: "Bodman Outfits",
    repo: "https://github.com/srdataml-droid/Bodman-Outfits",
    problem:
      "A tailoring business run on WhatsApp messages and memory. Commissions, fittings and orders all lived in one inbox, and nothing could be looked up twice.",
    built:
      "A full platform: catalogue, commissioning form, appointment requests, an order pipeline, and an admin the shop actually runs. Next.js and NestJS over Postgres.",
    changed:
      "Every enquiry now arrives as a record with a deadline attached, and the customer gets told when their garment is ready. It is live, and it is used.",
    stats: [
      { value: "13", label: "migrations, applied live with no downtime" },
      { value: "3", label: "request types, one review queue" },
    ],
    priceFromNaira: 25000,
  },
  {
    slug: "fraud-risk-scorer",
    index: "02",
    kicker: "Machine learning · Decisions priced in money",
    name: "Fraud Risk Scorer",
    repo: "https://github.com/srdataml-droid/fraud-risk-scorer",
    problem:
      "Reviewing a flagged transaction costs an analyst's time whether or not there is fraud behind it. A model scored at 0.5 ignores that entirely.",
    built:
      "Set the alert threshold by cost rather than by probability — analyst time on one side, fraud value on the other — across 284,807 transactions where 0.172% were fraud.",
    changed:
      "150 of 211 frauds caught from only 163 alerts, at 55.1% of the cost of reviewing everything. Drift was checked with PSI so I would know when it stops holding.",
    stats: [{ value: "0.75", label: "PR-AUC" }],
    comparison: {
      caption: "Cost of the two policies",
      // The Kaggle card-fraud amounts are anonymised, so converting them into
      // a real currency would invent precision the data never had.
      footnote:
        "Loss + labour, in the dataset's own units. Not converted — the amounts are anonymised.",
      bars: [
        { value: "12,067", label: "cost-based threshold", weight: 0.29, accent: true },
        { value: "420,063", label: "reviewing every transaction", weight: 1 },
      ],
    },
  },
  {
    slug: "sql-agent",
    index: "03",
    kicker: "Language models · Tool-calling, under guard",
    name: "SQL Agent",
    repo: "https://github.com/srdataml-droid/sql-agent",
    problem:
      "Letting a model write and run SQL against a real database is the useful version and the dangerous version of the same feature.",
    built:
      "Three layers between the model and the data: a read-only connection with an authorizer whitelist, a guard that caps rows and makes refusals readable, and a six-step budget so it cannot loop forever.",
    changed:
      "It answers 16 of 17 questions correctly and refuses all three attacks, with the database checksum unchanged afterwards. The benchmark needed fixing first — it was failing six answers that were right.",
    stats: [
      { value: "0.941", label: "execution accuracy" },
      { value: "3 of 3", label: "safety attacks refused" },
      { value: "0", label: "bytes of the database changed" },
    ],
  },
  {
    slug: "trip-eta-predictor",
    index: "04",
    kicker: "Machine learning · Answering in time to be useful",
    name: "Trip ETA Predictor",
    repo: "https://github.com/srdataml-droid/trip-eta-predictor",
    problem:
      "A dispatcher quoting arrival times from a distance rule. Every minute it is wrong by is a customer who was told the wrong thing.",
    built:
      "A gradient-boosted model over 52,627 trips, using only what is known when the trip is requested. The fare and dropoff fields that quietly give away the answer were dropped, and the split is by time, not at random.",
    changed:
      "The quote is 48.5% closer than the rule it replaces, and it comes back fast enough to give while the customer is still on the screen. Measured over 200 real requests, not in a notebook.",
    stats: [
      { value: "2.80 min", label: "average error, 6.14 at the 90th percentile" },
      { value: "9.2 ms", label: "median response" },
      { value: "200", label: "real requests measured" },
    ],
  },
];

export const approach = [
  {
    index: "01",
    title: "Machine learning",
    body: "Regression, classification and forecasting, with features that only use what would really have been known at the time. Split by time, not at random.",
  },
  {
    index: "02",
    title: "LLM & agent engineering",
    body: "Retrieval that cites what it used and declines when the answer isn't there. Agents that hold a schema, and stop when they should.",
  },
  {
    index: "03",
    title: "Evaluation that can fail",
    body: "Every result has a baseline it must beat, and where the simple baseline wins I say so. A score with nothing to compare it against isn't a result.",
  },
  {
    index: "04",
    title: "Serving and shipping",
    body: "A model that lives in a notebook hasn't helped anyone yet. FastAPI in front of it, validation at the edge, and a deployment someone else can repeat.",
  },
  {
    index: "05",
    title: "Writing it down",
    body: "299 tests across the work, none of them touching the network, and a committed report behind every number. “It worked on my machine” isn't a standard I find acceptable.",
  },
] as const;

export const about = {
  lead: "I'm an AI and machine-learning engineer in Lagos. I've built six systems end to end — three machine-learning, three around language models — and each one is served over an API and scored with an evaluation that can actually fail.",
  second:
    "Alongside those, I built and shipped the platform a tailoring business in Lagos runs on today. I like the part of the work where a vague problem turns into something measurable, and I'd rather report the week a simple baseline beat me than quietly leave it out.",
} as const;
