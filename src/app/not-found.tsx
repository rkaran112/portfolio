import Link from "next/link";
import { ArrowLeft } from "lucide-react";

/** Replaces the bare Next.js 404, which had no way back to the site. */
export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-page flex-col items-center px-6 py-32 text-center sm:px-10">
      {/* not-found.js cannot export metadata, so the title is set here;
          React hoists it into <head>. */}
      <title>Page not found · R. Karan</title>
      <p className="font-num text-sm text-white/55">404</p>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">
        That page doesn&rsquo;t exist.
      </h1>
      <p className="mt-5 max-w-md text-base text-white/70">
        The link may be old, or a project may have been renamed.
      </p>
      <Link
        href="/#projects"
        className="group mt-10 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
      >
        <ArrowLeft className="nudge nudge-back h-4 w-4" />
        See my projects
      </Link>
    </section>
  );
}
