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
- The three projects not yet written up as case studies on the new site:
  the demand forecaster, the docs RAG service and the job extractor.
