import { ImageResponse } from "next/og";
import { NAME, flagship } from "@/lib/content";

export const alt = "A project by R. Karan";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return flagship.map((project) => ({ slug: project.slug }));
}

/**
 * Share card for one project, so a link to a write-up previews that project
 * instead of showing nothing. No webfont fetch, so it cannot fail a build.
 */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = flagship.find((entry) => entry.slug === slug);
  const accent = project?.accent ?? "#a4f4fd";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c0c0c",
          color: "#ffffff",
          padding: 80,
        }}
      >
        <div style={{ width: 64, height: 8, borderRadius: 4, background: accent }} />

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
            {project?.name ?? NAME}
          </div>
          <div
            style={{
              fontSize: 36,
              lineHeight: 1.35,
              color: "rgba(255,255,255,0.75)",
              marginTop: 32,
              maxWidth: 1000,
            }}
          >
            {project?.hook ?? ""}
          </div>
        </div>

        <div style={{ fontSize: 26, color: "rgba(255,255,255,0.55)" }}>
          {`${NAME} · ${project?.tech.slice(0, 4).join(" · ") ?? ""}`}
        </div>
      </div>
    ),
    size,
  );
}
