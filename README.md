# Portfolio — Irenikase Samuel Temitope

AI / Machine Learning Engineer, Lagos.

- **Current site:** https://samuel-irenikase-portfolio.vercel.app
- **Original site:** https://srdataml-droid.github.io/portfolio/ (still served from this repo)
- **CV:** [`CV.md`](./CV.md)

---

## Where this started

An OND in Computer Science from Yaba College of Technology, self-directed study
after it, and structured online internship programmes. No industry title to lead
with, and no way to prove anything except by building things and measuring them
honestly.

So that is what the first stretch was: six projects, each taken end to end
rather than left in a notebook. Every one of them is public, MIT-licensed, and
carries the committed report the numbers are read from. The rule I set myself
was that a result only counts if it has a baseline it must beat and an
evaluation that can actually fail.

| Project | What it measures |
|---|---|
| [trip-eta-predictor](https://github.com/srdataml-droid/trip-eta-predictor) | MAE 2.80 min, 48.5% better than the distance rule; 9.2 ms p50 serving |
| [demand-forecaster](https://github.com/srdataml-droid/demand-forecaster) | MAE 57.03, 21.6% below seasonal naive, winning all eight backtest weeks |
| [fraud-risk-scorer](https://github.com/srdataml-droid/fraud-risk-scorer) | PR-AUC 0.75; 55.1% cheaper than reviewing everything |
| [docs-rag-service](https://github.com/srdataml-droid/docs-rag-service) | hit@3 0.896, citations validated, refusal measured both ways |
| [job-extractor](https://github.com/srdataml-droid/job-extractor) | 0.852 per-field accuracy vs 0.769 for regex rules |
| [sql-agent](https://github.com/srdataml-droid/sql-agent) | 0.941 execution accuracy, all three safety attacks refused |

299 tests across the six, none of them touching the network.

Worth saying plainly: these run on public datasets. They show method, not
clients. The `fraud-risk-scorer` cost figures are in the dataset's own
anonymised units, which is why they are never converted into a currency
anywhere I present them.

## Where it is now

**[Bodman Outfits](https://github.com/srdataml-droid/Bodman-Outfits)** is the
line between the two halves of this. It is a tailoring business in Lagos that
ran on WhatsApp messages and memory — commissions, fittings and orders all in
one inbox, and nothing that could be looked up twice.

It now runs on a platform I built and shipped: catalogue, commissioning,
appointment requests, an order pipeline, and an admin the shop actually uses.
Next.js and NestJS over Postgres, live on Vercel, Render and Supabase, with 13
migrations applied to production without downtime. Every enquiry arrives as a
record with a deadline attached, and the customer gets told when their garment
is ready.

That is the difference between the two stretches. The first proved I could
measure. The second put something in front of people who are not me, and kept
it running.

## Other things worth opening

Not everything is on the CV. These are on GitHub and some of them are among the
better things I have built.

**[trustlane](https://github.com/srdataml-droid/trustlane)** — an agentic KYC
pipeline. It reads a submitted identity document, decides for itself which
further checks are worth running, and returns APPROVE / REVIEW / REJECT with
every reason recorded: a learned risk prior adjusted by rules that are each
individually capped, so no hand-written rule can quietly overrule the model.
**PR-AUC 0.8651 against 0.7633 for rules alone**, on 6,000 applications at 6%
fraud, split chronologically so an identifier's later reuse cannot inform its
earlier one.

Two things about it I would rather say than have found: it is evaluated on
**synthetic** data, because real identity documents cannot go in a public repo,
which makes it weaker evidence than the projects above. And the honest result is
split — the model ranks materially better than rules, and at the operating point
that actually ships, it costs more. Both halves are in the README.

**[jobscout](https://github.com/srdataml-droid/jobscout)** — finds remote AI and
data roles a Nigeria-based junior can actually get, ranks them against a written
profile, and names the skills the market keeps asking for that the profile does
not have. Four public job APIs, no keys, no accounts. TF-IDF and logistic
regression, trained in under a second, about 210 MB peak memory, never touches a
GPU. The geography gate is the brutal one: on the last run it cut 595 postings to
47. The 92% cross-validated accuracy flatters it, and the README says why.

**[Geldium AI collections system](https://github.com/srdataml-droid/AI_powered_collections_system_strategy_deck)**
— built for the Tata iQ AI Transformation virtual experience. Geldium Finance is
a fictional client with a real problem: by the time collections notices someone
is in trouble, it is too late to help them. 500 customers, 18 columns, predicting
who is about to go delinquent and what intervention fits each one. It did not
stop at the deck — the repo carries the trained model, an agent, a notifier and a
scheduler, containerised and deployed.

**[langchain_answer-solver](https://github.com/srdataml-droid/langchain_answer-solver)**
— a tool-calling research agent over LangChain: DuckDuckGo and Wikipedia as
tools, a pydantic schema forcing the answer into topic, summary, sources and
tools used, and swappable providers behind it. Earlier work than the rest of this
page, and it shows — no README and no evaluation yet.

## What changed in how I work

Shipping something a business depends on teaches things a dataset cannot:

- **The business metric beats the model metric.** The fraud scorer picks its
  threshold by cost — analyst time against fraud value — not by a default 0.5.
  That habit came first and turned out to matter everywhere.
- **Order of operations is a real risk.** Deploying code before its migration,
  or after, decides whether a live form keeps working. On Bodman that had to be
  planned, not discovered.
- **Verify at the edges, not the comfortable middle.** Layouts that hold at
  390px break at 320px. Servers keep serving a stale build after a rebuild.
  Both cost me hours before I learned to check.
- **Write down what the numbers do not cover.** Every report says where the
  result stops being true. That is the part I would want to read.

## This repository

| Path | What it is |
|---|---|
| `index.html`, `style.css`, `script.js` | The original site, plain HTML/CSS/JS, still what GitHub Pages serves |
| [`site/`](./site) | The rebuilt site — React 19, Next.js, Tailwind, Framer Motion, GSAP, in both light and dark |
| `CV.md` | The current CV |
| `Irenikase_Samuel_Temitope_CV.pdf` | The same, as a PDF |

`site/` cannot be served by GitHub Pages: it has an edge route behind the
currency display, so it needs a host that runs code. It is deployed to Vercel
at the link above. Everything in it is data-driven from `site/lib/content.ts`,
so changing what the site claims never means editing layout.

## What is still open

- A 3D portrait for the hero — the slot is built, the render is not.
- A live "try it" demo for one of the LLM projects, behind FastAPI.
- The three of the six not yet written up as case studies on the new site:
  the demand forecaster, the docs RAG service and the job extractor.
- A README and an evaluation for `langchain_answer-solver`.
- Trustlane and JobScout deserve case studies on the site too; right now they
  are only listed here.
