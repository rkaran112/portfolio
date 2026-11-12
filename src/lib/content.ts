/**
 * All site copy and data lives here so sections stay presentational.
 *
 * The site is about a person, so the copy is written in the first person.
 * Project write-ups keep one shape everywhere: the problem, what I did about
 * it, then what came out of it. Every number is taken from that project's
 * README or RESULTS file.
 */

export const NAME = "R. Karan";
export const FIRST_NAME = "Karan";
export const GITHUB_HANDLE = "rkaran112";
export const EMAIL = "karan237j@gmail.com";
export const GITHUB_URL = `https://github.com/${GITHUB_HANDLE}`;
export const LINKEDIN_URL = `https://linkedin.com/in/${GITHUB_HANDLE}`;
export const LOCATION = "Bengaluru, Karnataka";

export const roles = "Software and data engineering";

/** One line under the name in the hero. */
export const status = "MCA student at CHRIST, Bengaluru · Class of 2027";

export const intro =
  "I build data pipelines and backend systems, then try to break them to see whether they hold up.";

export const about: string[] = [
  "I'm an MCA student at CHRIST (Deemed to be University) in Bengaluru, graduating in 2027. I did my BCA at CHRIST's Delhi NCR campus, and in between I interned as a data analyst at Exotic India, where I automated a daily order-tracking report that used to be compiled by hand.",
  "Most of what I know, I learned by building. I pick something I don't understand yet, such as how a task queue avoids running a job twice or how a spreadsheet stays fast at a million rows, build it from scratch, and write down what I measured.",
  "I don't trust a result until I've seen it fail. Several projects here include a test that removes the fix on purpose, just to prove the check can catch the bug.",
];

export const now =
  "Right now I'm focused on data engineering: batch and streaming pipelines, data quality checks, and getting numbers that reconcile. I'm looking for internships and entry-level roles in software and data engineering.";

export interface SkillGroup {
  label: string;
  items: string[];
}

/** Only tools that appear in the projects on this page. */
export const skills: SkillGroup[] = [
  { label: "Languages", items: ["Python", "SQL", "TypeScript", "Java"] },
  { label: "Data", items: ["PostgreSQL", "DuckDB", "Redis", "MongoDB", "Parquet", "pandas"] },
  {
    label: "Pipelines",
    items: ["Batch ELT", "Streaming with Kafka / Redpanda", "Star schema", "Data quality checks"],
  },
  { label: "Apps", items: ["FastAPI", "React", "Streamlit", "Spring Boot"] },
  { label: "Tooling", items: ["Docker", "Git", "GitHub Actions", "pytest", "Playwright"] },
];

export type RepoState =
  | { kind: "public"; url: string }
  /** Repo exists but is private. `url` is held ready; nothing renders it. */
  | { kind: "pending"; url?: string }
  | { kind: "in-progress" };

export type ProjectGroup = "data" | "systems";

export const groupLabels: Record<ProjectGroup, { title: string; note: string }> = {
  data: {
    title: "Data engineering",
    note: "Pipelines and analysis. This is where most of my recent time has gone.",
  },
  systems: {
    title: "Systems",
    note: "Things I built from scratch to understand how they work underneath.",
  },
};

export interface Project {
  slug: string;
  name: string;
  group: ProjectGroup;
  /** One line on what it is. */
  hook: string;
  /** Three scannable lines for the main page. The detail page carries the prose. */
  keyPoints: string[];
  /** Why it exists. The situation that made it worth building. */
  problem: string;
  /** What I did about it. */
  approach: string;
  /** What came out of it. */
  outcome: string;
  tech: string[];
  repo: RepoState;
  /** Deployed instance, where one is running. */
  demo?: string;
  /** Screenshot under /public, shown on the detail page. */
  image?: { src: string; alt: string; width: number; height: number };
  /** True when ProjectDemo has an in-page demo for this slug. */
  instrument?: boolean;
  /** Drives the dot and this project's chart colour. */
  accent: string;
}

const repo = (name: string): RepoState => ({
  kind: "public",
  url: `https://github.com/${GITHUB_HANDLE}/${name}`,
});

/** Newest first within each group. */
export const flagship: Project[] = [
  {
    slug: "customer360",
    name: "customer360",
    group: "data",
    hook: "One checked row per customer, merged from three systems that never agreed.",
    keyPoints: [
      "I merge CRM (JSON), orders (CSV) and support tickets (XML) into one schema",
      "Bad records are quarantined with a reason: 7 of 1,501 caught, none lost",
      "129 test cases at 99% coverage, with a live Streamlit dashboard",
    ],
    problem:
      "An e-commerce company keeps customer data in three separate systems: CRM as JSON, orders as CSV and support tickets as XML. Each was built on its own, so the same customer id has three different names and nobody can see a customer's profile, spending and complaints together.",
    approach:
      "I wrote a pipeline that loads all three files, maps them to one common schema, checks data quality, and quarantines every bad record along with the reason it failed. What passes is merged into one row per customer, and a final step proves that every input record is accounted for.",
    outcome:
      "1,501 records go in, 7 are quarantined and 1,494 pass, which produces 497 customers and 12 insight tables in under a second. I covered it with 129 test cases at 99% coverage, CI on Windows and Linux, and 13 failure scenarios. The dashboard is live on Streamlit Cloud.",
    tech: ["Python", "pandas", "Parquet", "Streamlit", "pytest"],
    repo: repo("customer360-pipeline"),
    demo: "https://customer360-pipeline-gft7qijsnafy8u2tz4gyqz.streamlit.app/",
    accent: "#ff8a65",
  },
  {
    slug: "nova-air-pipeline",
    name: "nova-air",
    group: "data",
    hook: "A batch pipeline that turns six months of messy airline files into numbers you can trust.",
    keyPoints: [
      "913,885 source rows across 552 daily batches, all on synthetic data",
      "Every batch reconciles: 552 of 552 balanced, or the run stops",
      "18,587 rows quarantined with a reason; 12,184 late bookings released automatically",
    ],
    problem:
      "Daily airline files for flights, bookings and passengers arrive messy: duplicates, several versions of one record, three timestamp formats, impossible durations, bookings that show up late. A dashboard built straight on top of that cannot be trusted. I used a fictional airline with generated data so I could plant 16 kinds of defect at known rates and check that each one is caught.",
    approach:
      "I built it in layers. Bronze is an exact copy of what arrived. Silver parses, standardises and de-duplicates, and replaces personal data with tokens. Gold is a star schema with KPI tables. Any row that fails a rule goes to a quarantine table with the reason. Each run checks that rows in equal rows loaded plus duplicates, older versions and quarantined rows, and exits with an error if anything is unaccounted for.",
    outcome:
      "Across 184 days the pipeline processed 913,885 rows in 552 batches, and all 552 reconciled exactly. 18,587 rows were quarantined, of which 12,184 were late bookings that were released once their flight arrived. A Streamlit dashboard answers four questions about revenue, routes, delays and whether today's data can be trusted.",
    tech: ["Python", "SQL", "DuckDB", "Parquet", "Streamlit", "GitHub Actions"],
    repo: repo("nova-air-pipeline"),
    image: {
      src: "/projects/nova-air-dashboard.png",
      alt: "Nova Air dashboard, executive overview page with revenue, load factor and on-time KPIs",
      width: 1252,
      height: 2000,
    },
    accent: "#38bdf8",
  },
  {
    slug: "p2p-process-insights",
    name: "p2p-process-insights",
    group: "data",
    hook: "Where purchase orders and invoices wait, worked out in SQL from a real event log.",
    keyPoints: [
      "251,734 order lines and 1.6 million logged steps from the BPI Challenge 2019 log",
      "Invoices wait a median 9.6 days to be booked, and 95.9% of booking is done by hand",
      "Ends in a one-page memo and a deck, not just charts",
    ],
    problem:
      "A purchase-to-pay process has many steps between raising an order and paying the invoice, and the delays hide in the gaps between them. I wanted to practise the analyst's job end to end: take a real log, find where the time goes, and say what the operations team should fix first.",
    approach:
      "I used the public BPI Challenge 2019 event log from a multinational coatings company and did the analysis in DuckDB SQL, with Python for statistics and charts. One seeded run writes every number to a single file, and the report, memo and slides are generated from that file, so no number is typed by hand.",
    outcome:
      "The log has 7,438 distinct paths through the process, and 38 of them cover 80% of lines. The headline surprised me: most invoices paid after 60 days sit in one spend area with longer agreed terms, so they are probably not a failure. The delays the company controls are upstream. Invoices wait a median 9.6 days to be booked, and 3,621 lines worth €49.4M were ordered after the vendor had already invoiced.",
    tech: ["SQL", "DuckDB", "Python", "pandas", "Plotly"],
    repo: repo("p2p-process-insights"),
    image: {
      src: "/projects/p2p-bottlenecks.png",
      alt: "Bar chart of where waiting time goes: invoice receipt to clearing is 34% of all waiting",
      width: 1360,
      height: 544,
    },
    accent: "#facc15",
  },
  {
    slug: "tidal",
    name: "tidal",
    group: "data",
    hook: "A streaming pipeline that counts every event exactly once, even when a consumer is killed.",
    keyPoints: [
      "Data and consumer position move in one Postgres transaction",
      "25 of 25 fault-injection sessions passed all six checks",
      "6,429 events per second, with p99 end-to-end lag of 757 ms",
    ],
    problem:
      "When a stream consumer crashes halfway through a batch, it restarts and reads some events again. If the data was saved but the position was not, those events are counted twice and the totals are quietly wrong.",
    approach:
      "I store the consumer's position in the same Postgres database as the data and advance both in one transaction, so a crash replays the batch without double counting. Late events are handled with watermarks and a small correcting update rather than a rebuild. I built the delivery logic myself instead of using Flink or Spark, because that logic was the thing I wanted to learn.",
    outcome:
      "To prove the design matters, I moved the position write out of the transaction on purpose: the totals came out more than three times too high. With the fix in place, 25 of 25 sessions that kill consumers and pause the database and broker passed all six checks, exact to the cent. Peak throughput was 6,429 events per second with a p99 lag of 757 ms.",
    tech: ["Python", "Redpanda (Kafka)", "PostgreSQL", "Docker", "Prometheus"],
    repo: repo("tidal"),
    accent: "#2dd4bf",
  },
  {
    slug: "tandem",
    name: "tandem",
    group: "systems",
    hook: "A shared document editor that keeps working offline and merges when you reconnect.",
    keyPoints: [
      "Two people can edit with the network unplugged, then merge with no conflict dialog",
      "500 of 500 fault-injection sessions ended with identical documents",
      "Lighthouse 100 for performance and accessibility",
    ],
    problem:
      "Most collaborative editors stop being useful the moment the network drops. I wanted to understand what it takes for two people to keep typing offline and still end up with the same document, with no lost keystrokes.",
    approach:
      "I used Yjs for the merge logic and built everything around it myself: saving to the browser's local database, the WebSocket sync protocol, live cursors, and a test harness that injects network faults and checks every copy of the document converges.",
    outcome:
      "The harness ran 500 sessions with zero diverging documents, and its negative control fails when it should. The app loads offline, has zero automated accessibility violations, and scores 100 on Lighthouse for performance and accessibility.",
    tech: ["TypeScript", "React", "Yjs", "CodeMirror", "WebSocket", "Playwright"],
    repo: repo("tandem"),
    demo: "https://tandem-0k8i.onrender.com/",
    accent: "#f472b6",
  },
  {
    slug: "resume-tailor",
    name: "resume-tailor",
    group: "systems",
    hook: "Picks the resume bullets that fit a job posting and renders the PDF, the same way every time.",
    keyPoints: [
      "I score each bullet against the posting with a fixed matching pass",
      "No randomness, so the same input always gives the same PDF",
      "I built it because I was tailoring my own resume by hand",
    ],
    problem:
      "I was tailoring my resume to each posting by hand, which is slow and inconsistent. Asking a language model to rewrite it is fast, but the output changes on every run, so I could not review it once and rely on it.",
    approach:
      "I wrote a fixed matching pass that scores each bullet against the posting, selects the strongest set and renders that selection to PDF. Nothing in that path is random. Language-model rewrites exist only as an optional extra on top.",
    outcome:
      "The same input always produces the same document, which makes the output reviewable and diffable. 84 tests hold that property in place.",
    tech: ["Python", "FastAPI", "PostgreSQL", "React", "Playwright"],
    repo: repo("resume-tailor"),
    demo: "https://resume-tailor-frontend-lxol.onrender.com",
    instrument: true,
    accent: "#A4F4FD",
  },
  {
    slug: "quorum",
    name: "quorum",
    group: "systems",
    hook: "The Raft consensus algorithm, written from scratch to find out how it really works.",
    keyPoints: [
      "I implemented Raft with no consensus library underneath",
      "The core is a pure function, so a whole cluster runs in one process",
      "147 tests in 25 seconds, about 22,000 checked operations, 0 violations",
    ],
    problem:
      "Consensus is how a group of servers agree on one answer when some of them crash. Most people import a library for it, and I wanted to understand it instead. Testing is the harder half: a real cluster is slow and rarely reproduces the bug you are chasing.",
    approach:
      "I wrote the Raft core as a pure function. It never reads a clock, opens a socket or touches disk; it takes a message and the current time and returns the new state plus outgoing messages. All I/O lives in a separate driver, which lets me run an entire cluster inside one process and delay, drop or reorder messages on purpose.",
    outcome:
      "147 tests run a real cluster in-process in about 25 seconds and check all four safety properties continuously. A checker replays roughly 22,000 operations across failure scenarios with zero violations, and all four negative controls are flagged as expected. A new leader is elected in 235 ms at the median and 430 ms at p95.",
    tech: ["Python", "gRPC", "Docker", "pytest", "mypy --strict"],
    repo: repo("quorum"),
    demo: "https://rkaran112.github.io/quorum/#numbers",
    instrument: true,
    accent: "#b39dff",
  },
  {
    slug: "relay",
    name: "relay",
    group: "systems",
    hook: "A task queue on Postgres where each job's side effect happens exactly once.",
    keyPoints: [
      "A numbered token rejects writes from a worker that already died",
      "The job's result and its side effect commit in one transaction",
      "22 tests against a real Postgres; 100 of 100 failure sessions held",
    ],
    problem:
      "Most task queues promise a job will run at least once, which means it can run twice. When the job charges a card or sends an email, the duplicate is the bug. The hard case is a worker that dies mid-task while it still holds the job.",
    approach:
      "I give every lease on a job a numbered token (a fencing token), and write effects through an outbox table so the commit and the effect share one transaction. A test harness kills workers mid-task. Its negative control removes the token check on purpose, so I can watch the guarantee fail without it.",
    outcome:
      "A late write from a dead worker is rejected because its token is older than the current lease, so the effect lands exactly once. 22 tests run against a real Postgres, and 100 of 100 failure sessions held.",
    tech: ["Python", "PostgreSQL", "Redis", "FastAPI", "OpenTelemetry"],
    repo: repo("relay"),
    image: {
      src: "/projects/relay-dashboard.png",
      alt: "relay dashboard: 230 jobs succeeded, 9 in the dead letter queue with replay buttons",
      width: 1280,
      height: 1043,
    },
    instrument: true,
    accent: "#f5b544",
  },
  {
    slug: "lattice",
    name: "lattice",
    group: "systems",
    hook: "A spreadsheet grid that stays smooth at a million rows.",
    keyPoints: [
      "1,000,000 rows drawn with a fixed pool of about 560 DOM nodes",
      "Formulas run on a Web Worker, so an edit touches 33 of 10,000 cells",
      "Recalculation went from 316 ms to 1.0 ms on a low-end machine",
    ],
    problem:
      "Browser data grids fall over well before a million rows. The page cannot hold that many elements at once, and a naive spreadsheet recalculates every formula on each edit, so typing in one cell stalls the whole sheet.",
    approach:
      "I keep a fixed pool of roughly 560 row elements and reuse them as you scroll, so the page stays the same size no matter how far you go. Formulas live in a dependency graph on a Web Worker, which means an edit only walks the cells that depend on it. I did not use a grid library.",
    outcome:
      "A million rows scroll smoothly, and an edit recalculates 33 of 10,000 cells instead of all of them. Recalculation time fell from 316 ms to 1.0 ms with repaints at 3.4 ms, measured on a deliberately low-end machine.",
    tech: ["TypeScript", "React", "Vite", "Web Worker", "Playwright"],
    repo: repo("lattice"),
    demo: "https://lattice-omega-one.vercel.app/",
    image: {
      src: "/projects/lattice-grid.png",
      alt: "lattice grid showing 1,000,000 rows by 50 columns drawn with 512 live DOM nodes",
      width: 1440,
      height: 820,
    },
    instrument: true,
    accent: "#00d2ff",
  },
  {
    slug: "cacheopt",
    name: "cacheopt",
    group: "systems",
    hook: "Decides, query by query, which of three cache tiers should answer it.",
    keyPoints: [
      "I estimate each query's cost the way a database planner would",
      "It rewrites a query when a cheaper shape exists",
      "2.74x overall speedup on a 12M-row table; p95 from 126 ms to 31 ms",
    ],
    problem:
      "A cache with three tiers only helps if each query reaches the right one. Sending everything to the fastest store wastes memory, sending everything to the slowest wastes time, and most systems choose with a fixed rule that ignores what a query actually costs.",
    approach:
      "I estimate the cost of each query the way a database planner would, rewrite it when a cheaper shape exists, then route it to whichever of the in-memory, Redis or DuckDB tiers should serve it.",
    outcome:
      "On a 12M-row table the benchmark ran 2.74 times faster overall, and p95 latency fell from 126 ms to 31 ms. I report p95 rather than the mean because the slow tail is what people actually notice.",
    tech: ["Python", "SQL", "Redis", "DuckDB", "FastAPI"],
    repo: repo("cacheopt"),
    demo: "https://cacheopt-frontend.onrender.com/",
    instrument: true,
    accent: "#4ade80",
  },
];

export interface Role {
  title: string;
  org: string;
  place: string;
  period: string;
  points: string[];
}

export const experience: Role[] = [
  {
    title: "Data Analyst Intern",
    org: "Exotic India",
    place: "Delhi, India",
    period: "Apr 2024 to May 2024",
    points: [
      "I automated an Excel-based order-tracking ingestion and reporting workflow that handled 10,000+ daily transactions.",
      "I replaced a manual daily compilation with transformation logic across 5+ categories, which gave the fulfilment team same-day visibility.",
    ],
  },
];

export interface Study {
  institution: string;
  campus: string;
  qualification: string;
  period: string;
  detail?: string;
}

export const education: Study[] = [
  {
    institution: "CHRIST (Deemed to be University)",
    campus: "Bengaluru",
    qualification: "Master of Computer Applications",
    period: "Expected May 2027",
    detail: "GPA 8.42 / 10",
  },
  {
    institution: "CHRIST (Deemed to be University)",
    campus: "Delhi NCR",
    qualification: "Bachelor of Computer Applications",
    period: "May 2025",
    detail: "CGPA 8.48 / 10",
  },
];

export interface Supporting {
  name: string;
  note: string;
  repo: RepoState;
}

export const supporting: Supporting[] = [
  {
    name: "selection-bias-audit",
    note: "A credit-risk study on LendingClub data: 2.26 million funded loans against 27.6 million declined applications, asking how much a scorecard is skewed by only seeing the loans that were approved.",
    repo: repo("selection-bias-audit"),
  },
  {
    name: "downturn-lgd",
    note: "A loss-given-default model on 269,338 defaulted loans, estimating how much more a lender loses in a downturn than in an average year.",
    repo: repo("downturn-lgd"),
  },
  {
    name: "partspilot",
    note: "A Spring Boot backend that tells a warehouse which spare parts to reorder and how many. My first real Java project, kept simple on purpose.",
    repo: repo("partspilot"),
  },
  {
    name: "asg-airlines-pipeline",
    note: "Turns a multi-sheet airline Excel export into a cleaned star schema for Power BI: 4,059 rows in, 4,004 out, with the duplicates and the one bad row accounted for.",
    repo: repo("asg-airlines-pipeline"),
  },
  {
    name: "gig-scanner",
    note: "A FastAPI service that scans Reddit for freelance postings. Shared cloud IPs get rate-limited, so it falls back to a clearly labelled sample rather than failing quietly.",
    repo: repo("gig-scanner"),
  },
  {
    name: "baggage-detection",
    note: "An X-ray image classifier that flags contraband in scanned baggage.",
    repo: repo("baggage-detection"),
  },
  {
    name: "gaana_api",
    note: "An unofficial JSON API over a music-streaming catalogue, for clients the official one does not serve.",
    repo: repo("gaana_api"),
  },
  {
    name: "realtime-dq-etl",
    note: "A pipeline with a data-quality gate in front of the warehouse. Only the foundation exists so far: the source database and a traffic generator.",
    repo: { kind: "in-progress" },
  },
];
