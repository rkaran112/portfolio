import { EMAIL, GITHUB_URL, LINKEDIN_URL, LOCATION, NAME } from "@/lib/content";

// py-1.5 keeps these above the 24px minimum touch target on a phone.
const link = "inline-flex items-center py-1.5 transition-colors hover:text-white";

/** The single home for contact details. Nothing above repeats them. */
export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-page border-t border-white/10 px-6 py-10 sm:px-10">
      <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 text-xs text-white/60">
        <span>
          {NAME} · {LOCATION}
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
