# Irenikase Samuel Temitope

**AI / Machine Learning Engineer — Intern / Junior**
Based in Lagos, Nigeria · **Open to remote roles worldwide (any time zone)**

`samuelirenikase@gmail.com` · [github.com/srdataml-droid](https://github.com/srdataml-droid) · [Portfolio](https://srdataml-droid.github.io/portfolio/)

---

## Profile

AI/ML engineer with an OND in Computer Science (Yaba College of Technology) and
six end-to-end projects — three machine-learning and three LLM-engineering —
each built, served over an API and scored with an evaluation that can actually
fail. Every number on this CV is measured and reproducible from the committed
report in the linked repository — all six are public and MIT-licensed. Comfortable across the full loop a
junior role asks for: data cleaning and leakage control, model building,
evaluation design, serving via FastAPI, and LLM/agent engineering with
citations, structured output and safety guards.

## Skills

- **Languages & libraries:** Python, pandas, NumPy, scikit-learn, joblib
- **ML engineering:** regression (gradient boosting), classification,
  time-series forecasting with horizon-safe feature engineering, time-based
  validation, cost-based thresholds, model drift monitoring (PSI)
- **LLM engineering:** RAG with citation grounding and refusal behaviour,
  tool-calling agents, schema-constrained structured extraction with
  validation-driven repair, multi-provider failover, prompt ablation
- **Engineering:** FastAPI serving with request validation, SQLite (read-only
  + authorizer, SQL authoring), git, standard-library `unittest` (299 tests
  across the portfolio, none touching the network), CI-ready reproducibility
- **Tooling:** OpenAI-compatible APIs (Cerebras, NVIDIA, ZAI, OpenRouter,
  Ollama), Docker concepts, Linux

## Projects

### 1. Trip ETA Predictor — regression with serving API
[`trip-eta-predictor`](https://github.com/srdataml-droid/trip-eta-predictor)
Gradient-boosted regressor predicting trip duration from request-time features
only, on 52,627 NYC taxi trips. Dropped the fare/dropoff fields that would leak
the answer, split by time instead of randomly, and measured MAE over 200 real
HTTP requests: **2.80 min MAE (48.5% better than the dispatcher's distance
rule), P90 error 6.14 min, p50 serving latency 9.2 ms**.

### 2. Week-Ahead Demand Forecaster — time-series with backtest
[`demand-forecaster`](https://github.com/srdataml-droid/demand-forecaster)
Two years of hourly bike-share rentals. Reindexed 165 missing hours as real
zeros, built features that only use data at least 168 hours old (enforced by a
test), and evaluated with a rolling-origin backtest over eight weekly origins:
**MAE 57.03 (21.6% below seasonal naive), winning all eight weeks**. Reports
the three weeks a simple baseline won too — after a hurricane broke the series.

### 3. Fraud Risk Scorer — imbalanced classification with cost decisions
[`fraud-risk-scorer`](https://github.com/srdataml-droid/fraud-risk-scorer)
284,807 card transactions, 0.172% fraud. Chose the alert threshold by **money**
(analyst cost vs. fraud value), not by a fixed 0.5. **PR-AUC 0.75, ROC-AUC
0.945; 55.1% cheaper than reviewing everything** (12,067 vs 420,063 in
loss+labour) while catching 150 of 211 frauds from 163 alerts. Drift analysis
(PSI) shows which features moved between days and rules out clock-hour effects.

### 4. Documentation RAG Service — retrieval, citations, refusal
[`docs-rag-service`](https://github.com/srdataml-droid/docs-rag-service)
Answers questions from a document set with verifiable citations, and refuses
when the answer is absent. Retrieval measured separately from generation
(TF-IDF beats MiniLM embeddings on this corpus, **hit@3 0.896**), citations
validated against the chunks actually retrieved, and refusal behaviour measured
both ways on SQuAD 2.0's deliberately unanswerable questions. A prompt ablation
showed the "stricter" prompt's gains were noise, so the simpler one ships.

### 5. Job Advert Extractor — schema-constrained structured extraction
[`job-extractor`](https://github.com/srdataml-droid/job-extractor)
Turns free-text job adverts into validated records. A pydantic schema is the
contract: a currency must be ISO 4217, a range may not run backwards, and
violations trigger one repair round instead of silent bad output.
**Mean 0.852 per-field accuracy across 24 hand-labelled adverts vs 0.769 for
regex rules and 0.509 for saying "unknown"**; 23 of 24 valid on the first
attempt, none failed. Error analysis is read off committed predictions.

### 6. SQL Agent — guarded tool-calling with execution accuracy
[`sql-agent`](https://github.com/srdataml-droid/sql-agent)
Answers questions about a database by writing and running SQL, with three
defence layers: a read-only connection (SQLite `mode=ro` + authorizer
whitelist), a guard that turns refusals into legible messages and caps rows,
and a six-step loop budget. Evaluated by **execution accuracy — 0.941 (16/17
answerable questions)** — with all three safety attacks refused and the
database checksum unchanged. The benchmark itself was debugged: exact-tuple
comparison was failing six correct answers, so scoring was rebuilt.

## Experience

**Online internship programmes — remote**
Worked through structured industry-style assignments covering Python, data
analysis, machine learning fundamentals and AI engineering, delivered against
deadlines and reviewed. Selected portfolio work above shows the depth.

## Education

**OND, Computer Science** — Yaba College of Technology, Lagos
*(certificate in process)*

**Self-directed study & certificates**
Online courses in machine learning, deep learning, and LLM application
engineering; completed alongside the portfolio above.

## Availability & working style

- **Remote is the opportunity, not a compromise.** I work fully remote from
  Nigeria with a stable connection, and I structure my day around the team's
  time zone — full overlap with US/EU working hours is not a problem
- Used to async work: clear written updates, committed reproducible
  experiments, and owning a task end to end
- Every project ships with its tests and a reproducibility path — "it worked
  on my machine" is not a standard I find acceptable
