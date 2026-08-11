import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProjectDemo } from "@/components/sections/ProjectDemo";
import { flagship } from "@/lib/content";

export function generateStaticParams() {
  return flagship.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = flagship.find((entry) => entry.slug === slug);
  if (!project) return {};

  const title = `${project.name} · R.Karan`;
  return {
    title,
    description: project.hook,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: { title, description: project.hook, url: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const project = flagship.find((entry) => entry.slug === slug);
  if (!project) notFound();

  const sections = [
    { term: "Problem", detail: project.problem },
    { term: "Approach", detail: project.approach },
    { term: "Outcome", detail: project.outcome },
  ];

  return (
    <article className="mx-auto max-w-page px-6 pt-4 pb-24 sm:px-10">
      <Link
        href="/#benchmarks"
        className="group inline-flex items-center gap-2 py-1.5 text-sm text-white/65 transition-colors hover:text-white"
      >
        <ArrowLeft className="nudge nudge-back h-4 w-4" />
        Back to the work
      </Link>

      <header className="mt-12 border-b border-white/10 pb-10">
        <div className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: project.accent }}
          />
          <span className="text-xs tracking-widest text-white/60 uppercase">
            {project.repo.kind === "public" ? "Public repo" : "Repo pending"}
          </span>
        </div>

        <h1 className="font-num mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
          {project.name}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-[1.5] text-white/85 md:text-xl">
          {project.hook}
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/12 bg-white/[0.03] px-3 py-1.5 text-xs text-white/75"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-white/90"
            >
              Open the live app ↗
            </a>
          ) : null}

          {project.repo.kind === "public" ? (
            <a
              href={project.repo.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm text-white transition-colors hover:bg-white/10"
            >
              Read the source ↗
            </a>
          ) : (
            <span className="inline-flex rounded-full border border-dashed border-white/25 px-5 py-2.5 text-sm text-white/55">
              Repo publishing pending
            </span>
          )}
        </div>
      </header>

      <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div className="space-y-10">
          {sections.map((section) => (
            <section key={section.term}>
              <h2
                className="text-xs tracking-[0.18em] uppercase"
                style={{ color: project.accent }}
              >
                {section.term}
              </h2>
              <p className="mt-3 max-w-2xl text-base leading-[1.75] text-white/80">
                {section.detail}
              </p>
            </section>
          ))}
        </div>

        <aside className="liquid-glass h-fit rounded-2xl p-6 lg:sticky lg:top-10">
          <p className="text-xs tracking-widest text-white/55 uppercase">Live demo</p>
          <div className="mt-5">
            <ProjectDemo slug={project.slug} accent={project.accent} />
          </div>
        </aside>
      </div>
    </article>
  );
}
