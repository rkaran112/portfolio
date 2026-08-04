import { EMAIL, GITHUB_URL, LINKEDIN_URL, LOCATION, roles } from "@/lib/content";

const link = "transition-colors hover:text-white";

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-page border-t border-white/10 px-6 py-10 sm:px-10">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 text-xs text-white/60">
        <span>
          R.Karan · {roles} · {LOCATION}
        </span>
        <div className="flex flex-wrap gap-6">
          <a className={link} href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <a className={link} href={LINKEDIN_URL} target="_blank" rel="noreferrer noopener">
            LinkedIn ↗
          </a>
          <a className={link} href={GITHUB_URL} target="_blank" rel="noreferrer noopener">
            GitHub ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
