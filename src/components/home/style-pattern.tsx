import type { StyleKey } from "@/lib/commerce/types";

/**
 * ⚠️ PLACEHOLDER ARTWORK
 * Abstract line patterns that stand in for style / haircut photography.
 * Each pattern hints at the finish: flat grain, broken strokes, lift,
 * sleek sweep, loose wave. Replace with editorial photos when available.
 */

// Deterministic PRNG so server & client render identical markup.
function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export function StylePattern({ style, color }: { style: StyleKey; color: string }) {
  const common = {
    viewBox: "0 0 400 600",
    preserveAspectRatio: "xMidYMid slice",
    className: "absolute inset-0 h-full w-full",
    "aria-hidden": true,
  } as const;

  if (style === "matte") {
    const r = rng(7);
    const dots = Array.from({ length: 900 }, () => [r() * 400, r() * 600, 0.6 + r() * 1.2]);
    return (
      <svg {...common}>
        {dots.map(([x, y, rad], i) => (
          <circle key={i} cx={x.toFixed(1)} cy={y.toFixed(1)} r={rad.toFixed(2)} fill={color} opacity="0.35" />
        ))}
      </svg>
    );
  }

  if (style === "textured") {
    const r = rng(42);
    const strokes = Array.from({ length: 260 }, () => {
      const x = r() * 420 - 10;
      const y = r() * 620 - 10;
      const a = -1.9 + r() * 0.9;
      const l = 14 + r() * 30;
      return [x, y, x + Math.cos(a) * l, y + Math.sin(a) * l];
    });
    return (
      <svg {...common}>
        {strokes.map(([x1, y1, x2, y2], i) => (
          <line
            key={i}
            x1={x1.toFixed(1)}
            y1={y1.toFixed(1)}
            x2={x2.toFixed(1)}
            y2={y2.toFixed(1)}
            stroke={color}
            strokeWidth="1.6"
            strokeLinecap="round"
            opacity="0.45"
          />
        ))}
      </svg>
    );
  }

  if (style === "volume") {
    return (
      <svg {...common}>
        {Array.from({ length: 22 }, (_, i) => {
          const y = 640 - i * 26;
          return (
            <path
              key={i}
              d={`M-20 ${y} C 90 ${y - 120 - i * 6}, 310 ${y - 120 - i * 6}, 420 ${y}`}
              fill="none"
              stroke={color}
              strokeWidth="1.3"
              opacity="0.45"
            />
          );
        })}
      </svg>
    );
  }

  if (style === "slick") {
    return (
      <svg {...common}>
        {Array.from({ length: 34 }, (_, i) => {
          const y = -40 + i * 20;
          return (
            <path
              key={i}
              d={`M-20 ${y + 120} C 120 ${y + 100}, 220 ${y - 10}, 420 ${y - 60}`}
              fill="none"
              stroke={color}
              strokeWidth="1.1"
              opacity="0.5"
            />
          );
        })}
      </svg>
    );
  }

  // natural
  return (
    <svg {...common}>
      {Array.from({ length: 26 }, (_, i) => {
        const y = i * 24;
        const amp = 10 + (i % 5) * 3;
        return (
          <path
            key={i}
            d={`M-20 ${y} q 50 ${-amp} 100 0 t 100 0 t 100 0 t 100 0 t 100 0`}
            fill="none"
            stroke={color}
            strokeWidth="1.2"
            opacity="0.45"
          />
        );
      })}
    </svg>
  );
}
