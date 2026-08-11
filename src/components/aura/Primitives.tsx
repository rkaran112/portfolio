// lucide-react v1 dropped brand marks, so there is no GitHub glyph. Code2
// reads the same in context and avoids pulling in a second icon set.
import { ChevronRight, Code2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = { code: Code2, mail: Mail };

/** The one button style on the site. */
export function PrimaryButton({
  label = "View the code",
  href,
  icon = "code",
  full,
}: {
  label?: string;
  href: string;
  icon?: keyof typeof ICONS;
  full?: boolean;
}) {
  const Icon = ICONS[icon];
  // mailto and anchor targets must not open a tab.
  const external = /^https?:/i.test(href);

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90 active:scale-[0.98]",
        full && "w-full",
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
      <ChevronRight className="nudge h-4 w-4" />
    </a>
  );
}

/** Shiny gradient applied to the second headline line. */
export const gradientStyle: React.CSSProperties = {
  backgroundImage:
    "linear-gradient(to right, #091020 0%, #0B2551 12.5%, #A4F4FD 32.5%, #00d2ff 50%, #0B2551 67.5%, #091020 87.5%, #091020 100%)",
  backgroundSize: "200% auto",
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  color: "transparent",
  WebkitTextFillColor: "transparent",
  filter: "url(#c3-noise)",
};
