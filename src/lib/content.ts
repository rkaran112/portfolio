/**
 * All site copy and data lives here so sections stay presentational.
 * Placeholder values to verify before deploying are marked PLACEHOLDER.
 *
 * Project copy is written in the third person and structured the same way
 * everywhere: the problem, the approach, then what came out of it.
 */

export const GITHUB_HANDLE = "rkaran112";
export const EMAIL = "karan237j@gmail.com"; // PLACEHOLDER, verify
export const GITHUB_URL = `https://github.com/${GITHUB_HANDLE}`;
export const LINKEDIN_URL = `https://linkedin.com/in/${GITHUB_HANDLE}`;
export const LOCATION = "Bengaluru, Karnataka";

export type RepoState =
  | { kind: "public"; url: string }
  | { kind: "pending" }
  | { kind: "in-progress" };

export interface Project {
  slug: string;
  name: string;
  /** One line on what it is. */
  hook: string;
  /** Three scannable lines for the main page. The detail page carries the prose. */
  keyPoints: string[];
  /** Why it exists. The situation that made it worth building. */
  problem: string;
  /** How it works. The design decision that answers the problem. */
  approach: string;
  /** What came out of it, numbers included but not leading. */
  outcome: string;
  tech: string[];
  repo: RepoState;
  /** Drives the sidebar dot and this project's chart colour. */
  accent: string;
}

export const roles = "SDE · Full-stack · Data engineering";

export const intro = "I build systems and study how they behave under load.";

export const flagship: Project[] = [
  {
    slug: "lattice",
    name: "lattice",
    hook: "A spreadsheet-grade data grid for a million rows.",
    keyPoints: [
      "1,000,000 rows over a fixed pool of ~560 DOM nodes",
      "Formula graph on a Web Worker, so an edit touches 33 of 10,000 nodes",
      "Recalc 316ms to 1.0ms, repaints at 3.4ms, on a low-end machine",
    ],
    problem:
      "Browser data grids fall over well before a million rows. The DOM cannot hold that many nodes at once, and a naive spreadsheet recalculates every formula on each edit, so typing in a single cell stalls the whole sheet.",
    approach:
      "lattice keeps a fixed pool of roughly 560 row elements and recycles them as the viewport moves, so DOM size stays flat no matter how far the user scrolls. Formulas live in a dependency graph on a Web Worker, which means an edit walks only the cells that actually depend on it.",
    outcome:
      "A million rows scroll inside a steady frame budget, and an incremental recalc touches 33 of 10,000 nodes instead of all of them. Recalc time fell from 316ms to 1.0ms with repaints at 3.4ms, measured on a deliberately low-end machine with no GPU acceleration.",
    tech: ["TypeScript", "Vite", "Web Worker", "Playwright"],
    repo: { kind: "pending" },
    accent: "#00d2ff",
  },
  {
    slug: "cacheopt",
    name: "cacheopt",
    hook: "Cost-based query routing across a three-tier cache.",
    keyPoints: [
      "Estimates each query's cost the way a planner would, then picks the tier",
      "Rewrites a query when a cheaper shape exists",
      "2.74x throughput at 10M rows, p95 126ms to 31ms",
    ],
    problem:
      "A three-tier cache only helps if queries reach the right tier. Sending everything to the fastest store wastes memory, sending everything to the slowest one wastes time, and most systems choose with a static rule that ignores what a query actually costs.",
    approach:
      "cacheopt estimates the cost of each query the way a database planner would, rewrites it when a cheaper shape exists, then routes it to whichever of the in-memory, Redis or DuckDB tiers should serve it.",
    outcome:
      "Throughput rose 2.74 times at 10M rows, and p95 latency fell from 126ms to 31ms. p95 rather than mean, because the tail is the number that wakes somebody up.",
    tech: ["SQL", "Redis", "DuckDB", "Query rewriting"],
    repo: { kind: "public", url: `https://github.com/${GITHUB_HANDLE}/cacheopt` },
    accent: "#4ade80",
  },
  {
    slug: "relay",
    name: "relay",
    hook: "A Postgres-backed task queue with exactly-once side effects.",
    keyPoints: [
      "Fencing tokens reject writes from a worker that already died",
      "Transactional outbox keeps the commit and the effect in one transaction",
      "22 tests against real Postgres, chaos harness with a negative control",
    ],
    problem:
      "Most task queues promise at-least-once delivery, which means a side effect can run twice. When that side effect charges a card or sends an email, the duplicate is the bug. The case that breaks naive designs is a worker that dies mid-task while still holding a lease.",
    approach:
      "relay leases jobs with SKIP LOCKED, gives every lease a fencing token, and writes effects through a transactional outbox so the commit and the effect share one transaction. A chaos harness kills workers mid-task, and its negative control removes the fence on purpose so the invariant is seen to fail without it.",
    outcome:
      "A late write from a dead worker is rejected because its token is older than the current lease, so the effect lands exactly once. 22 tests run against a real Postgres, and the codebase stays clean under ruff and mypy --strict.",
    tech: ["Python", "Postgres", "Redis", "FastAPI", "OpenTelemetry"],
    repo: { kind: "pending" },
    accent: "#f5b544",
  },
  {
    slug: "resume-tailor",
    name: "resume-tailor",
    hook: "Deterministic bullet matching that renders a tailored resume to PDF.",
    keyPoints: [
      "A fixed matching pass scores each bullet against the posting",
      "No sampling anywhere, so the same input always yields the same PDF",
      "96 tests hold that property in place",
    ],
    problem:
      "Tailoring a resume to each posting by hand is slow and inconsistent. Language-model rewrites are fast but non-deterministic, so the same input produces a different document every run, and nothing about it can be reviewed or relied on.",
    approach:
      "resume-tailor scores each bullet against the posting with a fixed matching pass, selects the strongest set, then renders that selection to PDF. There is no sampling anywhere in the pipeline.",
    outcome:
      "The same input always produces the same document, which makes the output reviewable and diffable. 96 tests hold that property in place.",
    tech: ["Deterministic pipeline", "PDF rendering"],
    repo: { kind: "pending" },
    accent: "#A4F4FD",
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
      "Built an automated Excel-based ingestion and reporting workflow for order tracking, handling 10,000+ daily transactions.",
      "Wrote transformation and segmentation logic splitting operational data across 5+ categories, replacing a manual daily compilation step for the fulfilment team.",
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
  },
  {
    institution: "CHRIST (Deemed to be University)",
    campus: "Delhi NCR",
    qualification: "BCA Computer Applications",
    period: "May 2025",
    detail: "GPA 8.48 / 10",
  },
];

export interface Supporting {
  name: string;
  note: string;
  repo: RepoState;
}

export const supporting: Supporting[] = [
  {
    name: "realtime-dq-etl",
    note: "A CDC-style ETL pipeline with a data-quality gate in front of the warehouse. The foundation is in place so far: source database and generator.",
    repo: { kind: "in-progress" },
  },
  {
    name: "baggage-detection",
    note: "An X-ray image classifier that flags contraband in scanned baggage.",
    repo: { kind: "public", url: `https://github.com/${GITHUB_HANDLE}/baggage-detection` },
  },
  {
    name: "gaana_api",
    note: "An unofficial JSON API over a music-streaming catalogue, for clients the official one does not serve.",
    repo: { kind: "public", url: `https://github.com/${GITHUB_HANDLE}/gaana_api` },
  },
  {
    name: "gig-scanner",
    note: "A deployed FastAPI service that scans Reddit for freelance postings. Shared cloud IPs get rate-limited, so it falls back to a clearly labelled sample rather than failing quietly.",
    repo: { kind: "public", url: `https://github.com/${GITHUB_HANDLE}/gig-scanner` },
  },
];
