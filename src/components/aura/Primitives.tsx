// lucide-react v1 dropped brand marks, so no Github glyph — Code2 reads the
// same in context and avoids pulling in a second icon set.
import { ChevronRight, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function LogoMark({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 256 256" fill="currentColor" className={className} aria-hidden>
      <path d="M 0 128 C 70.692 128 128 185.308 128 256 L 64 256 C 64 220.654 35.346 192 0 192 Z M 256 192 C 220.654 192 192 220.654 192 256 L 128 256 C 128 185.308 185.308 128 256 128 Z M 128 0 C 128 70.692 70.692 128 0 128 L 0 64 C 35.346 64 64 35.346 64 0 Z M 192 0 C 192 35.346 220.654 64 256 64 L 256 128 C 185.308 128 128 70.692 128 0 Z" />
    </svg>
  );
}

/**
 * The spec's Apple pill, pointed at something real. The Apple mark belongs to
 * the macOS chrome further down the page, not to a link that opens GitHub.
 */
export function PrimaryButton({
  label = "View the code",
  href,
  full,
}: {
  label?: string;
  href: string;
  full?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer noopener"
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-all hover:bg-white/90 active:scale-[0.98]",
        full && "w-full",
      )}
    >
      <Code2 className="h-4 w-4" />
      {label}
      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-[1px]" />
    </a>
  );
}

export function GhostButton({
  label,
  href,
  external,
}: {
  label: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
    >
      {label}
      <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-[1px]" />
    </a>
  );
}

export function SectionEyebrow({ label, tag }: { label: string; tag?: string }) {
  return (
    <div className="flex items-center gap-2.5 text-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-white" />
      <span className="font-medium text-white">{label}</span>
      {tag ? (
        <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs text-white/70">
          {tag}
        </span>
      ) : null}
    </div>
  );
}

/**
 * Shiny gradient applied to the second headline line. The source spec bottoms
 * out at #091020, which is near-black — as the sweep animates, whole words drop
 * out against the dark canvas. Dark stops raised so the text stays readable at
 * every point in the loop; the blue-to-cyan character is unchanged.
 */
export const gradientStyle: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, #6f8fc4 0%, #7fb4e8 12.5%, #A4F4FD 32.5%, #00d2ff 50%, #7fb4e8 67.5%, #6f8fc4 87.5%, #6f8fc4 100%)",
  backgroundSize: "200% auto",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
  filter: "url(#c3-noise)",
};
