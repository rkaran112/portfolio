const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4";

/**
 * Fixed full-screen loop behind everything, plus the two container guide lines
 * at the 36rem edges. The video is decorative — if the host ever stops serving
 * it, the #0c0c0c canvas underneath is the fallback.
 */
export function Backdrop() {
  return (
    <>
      <div className="pointer-events-none fixed inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-hidden
          className="pointer-events-none h-full w-full object-cover"
          src={VIDEO_SRC}
        />
      </div>

      {/* Scrim. The raw video has bright passages that white body copy cannot
          survive, so everything reads against a controlled floor instead. */}
      <div className="pointer-events-none fixed inset-0 z-[1] bg-[#0c0c0c]/78" />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 40%, transparent 0%, rgba(12,12,12,0.55) 70%, rgba(12,12,12,0.85) 100%)",
        }}
      />

      <div className="pointer-events-none fixed inset-y-0 left-1/2 z-[5] hidden w-px -translate-x-[calc(50%+36rem)] bg-white/10 md:block" />
      <div className="pointer-events-none fixed inset-y-0 left-1/2 z-[5] hidden w-px translate-x-[calc(-50%+36rem)] bg-white/10 md:block" />
    </>
  );
}

/** Grain filter used by the shiny headline. */
export function NoiseFilter() {
  return (
    <svg className="absolute h-0 w-0" aria-hidden focusable="false">
      <filter id="c3-noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          stitchTiles="stitch"
        />
        <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.35 0" />
        <feComposite in2="SourceGraphic" operator="in" result="noise" />
        <feBlend in="SourceGraphic" in2="noise" mode="multiply" />
      </filter>
    </svg>
  );
}
