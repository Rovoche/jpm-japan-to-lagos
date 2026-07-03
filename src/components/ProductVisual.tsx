// Editorial SVG "photography" placeholders — abstract, warm, Japanese-inspired.
// Deterministic per product so cards stay consistent across renders.

type Tone = "cream" | "paper" | "stone" | "wood" | "ink";

const palette: Record<Tone, { bg: string; mid: string; accent: string; fg: string }> = {
  cream: { bg: "#f4ecdc", mid: "#e8dcc2", accent: "#8a3324", fg: "#2a2420" },
  paper: { bg: "#efe8d8", mid: "#dccdb0", accent: "#7a2e21", fg: "#22201c" },
  stone: { bg: "#d9d2c2", mid: "#b8ad97", accent: "#6b2b20", fg: "#1e1c19" },
  wood:  { bg: "#c9a97a", mid: "#8b6a48", accent: "#3a2618", fg: "#1a120a" },
  ink:   { bg: "#1f1c19", mid: "#2c2825", accent: "#c9502f", fg: "#f0e8d6" },
};

export function ProductVisual({
  tone = "cream",
  seed = 0,
  className = "",
  label,
  src,
}: {
  tone?: Tone;
  seed?: number;
  className?: string;
  label?: string;
  /** Real photo URL. When provided, renders the photo instead of the generated SVG placeholder. */
  src?: string;
}) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={src}
          alt={label ?? ""}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const c = palette[tone];
  const shape = seed % 5;
  const rot = (seed * 13) % 24 - 12;

  return (
    <div className={`relative overflow-hidden ${className}`} aria-hidden={!label}>
      <svg
        viewBox="0 0 400 500"
        preserveAspectRatio="xMidYMid slice"
        className="h-full w-full"
      >
        <defs>
          <linearGradient id={`bg-${seed}-${tone}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={c.bg} />
            <stop offset="100%" stopColor={c.mid} stopOpacity="0.7" />
          </linearGradient>
          <radialGradient id={`spot-${seed}-${tone}`} cx="50%" cy="45%" r="55%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="500" fill={`url(#bg-${seed}-${tone})`} />
        <rect width="400" height="500" fill={`url(#spot-${seed}-${tone})`} />

        <g transform={`translate(200 260) rotate(${rot})`}>
          {shape === 0 && (
            <>
              <ellipse cx="0" cy="20" rx="120" ry="20" fill={c.fg} opacity="0.08" />
              <path d="M-80 -40 Q0 -120 80 -40 Q90 20 0 40 Q-90 20 -80 -40 Z" fill={c.fg} opacity="0.9" />
              <circle cx="30" cy="-30" r="8" fill={c.accent} />
            </>
          )}
          {shape === 1 && (
            <>
              <ellipse cx="0" cy="60" rx="140" ry="14" fill={c.fg} opacity="0.08" />
              <rect x="-70" y="-90" width="140" height="150" rx="6" fill={c.fg} opacity="0.88" />
              <rect x="-70" y="-90" width="140" height="18" fill={c.accent} opacity="0.9" />
            </>
          )}
          {shape === 2 && (
            <>
              <ellipse cx="0" cy="50" rx="110" ry="12" fill={c.fg} opacity="0.08" />
              <circle cx="0" cy="0" r="90" fill={c.fg} opacity="0.9" />
              <circle cx="0" cy="0" r="60" fill={c.bg} opacity="0.55" />
              <circle cx="0" cy="0" r="10" fill={c.accent} />
            </>
          )}
          {shape === 3 && (
            <>
              <ellipse cx="0" cy="70" rx="130" ry="14" fill={c.fg} opacity="0.08" />
              <path d="M-60 60 Q-60 -80 0 -80 Q60 -80 60 60 Z" fill={c.fg} opacity="0.9" />
              <path d="M-40 -60 Q0 -100 40 -60" stroke={c.accent} strokeWidth="6" fill="none" />
            </>
          )}
          {shape === 4 && (
            <>
              <ellipse cx="0" cy="70" rx="140" ry="14" fill={c.fg} opacity="0.08" />
              <path d="M-90 60 L-70 -60 L70 -60 L90 60 Z" fill={c.fg} opacity="0.9" />
              <line x1="-70" y1="-30" x2="70" y2="-30" stroke={c.accent} strokeWidth="3" opacity="0.85" />
            </>
          )}
        </g>

        <g fill={c.fg} opacity="0.35">
          <circle cx="46" cy="60" r="14" />
        </g>
        <text x="46" y="65" textAnchor="middle" fontFamily="serif" fontSize="14" fill={c.bg}>朱</text>
      </svg>
      {label ? (
        <span className="sr-only">{label}</span>
      ) : null}
    </div>
  );
}
