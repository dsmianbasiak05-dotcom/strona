import { useId } from "react";
import type { PackagingShape } from "@/lib/commerce/types";
import { cn } from "@/lib/utils";

/**
 * ⚠️ PLACEHOLDER PACKAGING ILLUSTRATION
 * A flat, geometric render of MONCRÉ packaging used until real product
 * photography is available. It is intentionally illustrative — it does
 * not imitate a photo. Swap by adding entries to `product.images`.
 */

interface ProductVisualProps {
  shape: PackagingShape;
  label: string;
  size?: string;
  /** "detail" renders a tight crop on the label — used as hover image. */
  view?: "front" | "detail";
  className?: string;
  /** Hide the ground shadow (e.g. on dark backgrounds). */
  shadow?: boolean;
  /** For sets: the packaging that is actually inside the box. */
  items?: SetItem[];
}

export interface SetItem {
  shape: Exclude<PackagingShape, "set">;
  label: string;
  size?: string;
}

const NAVY = "#171936";
const NAVY_2 = "#202342";
const NAVY_3 = "#2d3157";
const CREAM = "#F4EEDC";

function Shading({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={`${id}-body`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor={NAVY} />
        <stop offset="0.28" stopColor={NAVY_3} />
        <stop offset="0.5" stopColor={NAVY_2} />
        <stop offset="1" stopColor="#0d0f24" />
      </linearGradient>
      <linearGradient id={`${id}-cap`} x1="0" x2="1" y1="0" y2="0">
        <stop offset="0" stopColor="#0f1128" />
        <stop offset="0.3" stopColor={NAVY_2} />
        <stop offset="1" stopColor="#0a0b1d" />
      </linearGradient>
      <radialGradient id={`${id}-shadow`} cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#171936" stopOpacity="0.28" />
        <stop offset="1" stopColor="#171936" stopOpacity="0" />
      </radialGradient>
    </defs>
  );
}

const display = { fontFamily: "var(--font-display)" } as const;
const sans = { fontFamily: "var(--font-sans)", fontWeight: 700 } as const;

function Jar({ id, label, size, x = 200, y = 0, s = 1 }: GroupProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* body */}
      <path d="M-112 290 V372 A112 22 0 0 0 112 372 V290 Z" fill={`url(#${id}-body)`} />
      {/* lid */}
      <path d="M-116 226 V284 A116 23 0 0 0 116 284 V226 Z" fill={`url(#${id}-cap)`} />
      <ellipse cx="0" cy="226" rx="116" ry="23" fill={NAVY_3} />
      <ellipse cx="0" cy="226" rx="96" ry="17" fill="none" stroke={CREAM} strokeOpacity="0.12" />
      {/* label */}
      <text x="0" y="345" textAnchor="middle" fontSize="44" fill={CREAM} style={display} letterSpacing="1">
        MONCRÉ
      </text>
      <text x="0" y="365" textAnchor="middle" fontSize="8.5" fill={CREAM} fillOpacity="0.8" style={sans} letterSpacing="3.4">
        {label.toUpperCase()}
      </text>
      <text x="0" y="262" textAnchor="middle" fontSize="7" fill={CREAM} fillOpacity="0.5" style={sans} letterSpacing="2.6">
        {size?.toUpperCase()}
      </text>
    </g>
  );
}

function Shaker({ id, label, size, x = 200, y = 0, s = 1 }: GroupProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-58 196 V392 A58 13 0 0 0 58 392 V196 Z" fill={`url(#${id}-body)`} />
      <path d="M-60 140 V192 A60 13 0 0 0 60 192 V140 Z" fill={`url(#${id}-cap)`} />
      <ellipse cx="0" cy="140" rx="60" ry="13" fill={NAVY_3} />
      {[-24, -8, 8, 24].map((cx) => (
        <circle key={cx} cx={cx} cy="140" r="2.4" fill="#0a0b1d" />
      ))}
      <text x="0" y="300" textAnchor="middle" fontSize="30" fill={CREAM} style={display} letterSpacing="0.5">
        MONCRÉ
      </text>
      <line x1="-30" x2="30" y1="314" y2="314" stroke={CREAM} strokeOpacity="0.35" />
      <text x="0" y="330" textAnchor="middle" fontSize="6.5" fill={CREAM} fillOpacity="0.8" style={sans} letterSpacing="2.4">
        {label.toUpperCase()}
      </text>
      <text x="0" y="372" textAnchor="middle" fontSize="6" fill={CREAM} fillOpacity="0.5" style={sans} letterSpacing="2">
        {size?.toUpperCase()}
      </text>
    </g>
  );
}

function Spray({ id, label, size, x = 200, y = 0, s = 1 }: GroupProps) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* actuator */}
      <path d="M-22 70 H22 V112 H-22 Z" fill={`url(#${id}-cap)`} />
      <path d="M22 80 H34 V90 H22 Z" fill="#0a0b1d" />
      <ellipse cx="0" cy="70" rx="22" ry="5" fill={NAVY_3} />
      {/* collar */}
      <path d="M-30 112 H30 V132 H-30 Z" fill={NAVY} />
      {/* shoulder + body */}
      <path
        d="M-30 132 C-30 142 -56 146 -56 168 V408 A56 12 0 0 0 56 408 V168 C56 146 30 142 30 132 Z"
        fill={`url(#${id}-body)`}
      />
      <text
        x="-6"
        y="0"
        textAnchor="middle"
        fontSize="58"
        fill={CREAM}
        style={display}
        letterSpacing="1"
        transform="translate(18 290) rotate(-90)"
      >
        MONCRÉ
      </text>
      <text
        x="0"
        y="0"
        textAnchor="middle"
        fontSize="6.5"
        fill={CREAM}
        fillOpacity="0.8"
        style={sans}
        letterSpacing="2.4"
        transform="translate(32 290) rotate(-90)"
      >
        {label.toUpperCase()} · {size?.toUpperCase()}
      </text>
    </g>
  );
}

interface GroupProps {
  id: string;
  label: string;
  size?: string;
  x?: number;
  y?: number;
  s?: number;
}

const ShapeMap = { jar: Jar, shaker: Shaker, spray: Spray } as const;

/** Arranges the set's real contents: tall pieces at the back, jars in front. */
function SetComposition({ id, items, label, size }: { id: string; items?: SetItem[]; label: string; size?: string }) {
  const list: SetItem[] = items?.length
    ? items
    : [
        { shape: "spray", label: "Sea Salt Spray", size: "200 ml" },
        { shape: "jar", label, size },
      ];
  const order = { spray: 0, shaker: 1, jar: 2 };
  const sorted = [...list].sort((a, b) => order[a.shape] - order[b.shape]);

  // Slots tuned so all bases sit on the same ground line (~y 398).
  const slots2 = {
    spray: [{ x: 270, y: 40, s: 0.86 }],
    shaker: [{ x: 152, y: 66, s: 0.82 }],
    jar: [{ x: 150, y: 88, s: 0.8 }],
  };
  const slots4 = {
    spray: [{ x: 258, y: 18, s: 0.82 }],
    shaker: [{ x: 150, y: 44, s: 0.8 }],
    jar: [
      { x: 122, y: 206, s: 0.5 },
      { x: 284, y: 206, s: 0.5 },
    ],
  };
  const slots = sorted.length > 2 ? slots4 : slots2;
  const used = { spray: 0, shaker: 0, jar: 0 };

  return (
    <>
      {sorted.map((item, i) => {
        const pos = slots[item.shape][used[item.shape]++] ?? slots[item.shape][0];
        const Shape = ShapeMap[item.shape];
        return <Shape key={i} id={id} label={item.label} size={item.size} x={pos.x} y={pos.y} s={pos.s} />;
      })}
    </>
  );
}

const shadowY: Record<PackagingShape, number> = { jar: 352, shaker: 392, spray: 420, set: 398 };

export function ProductVisual({
  shape,
  label,
  size,
  view = "front",
  className,
  shadow = true,
  items,
}: ProductVisualProps) {
  const rawId = useId();
  const id = `pv${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  // Detail view = tight crop on the label, like a macro shot.
  // Front view is framed per shape (packshot crop); detail = macro on the label.
  const frontBox: Record<PackagingShape, string> = {
    jar: "40 60 320 400",
    shaker: "56 70 288 360",
    spray: "40 50 320 400",
    set: "0 0 400 500",
  };
  const detailBox: Record<PackagingShape, string> = {
    jar: "70 150 260 325",
    shaker: "120 185 160 200",
    spray: "120 150 160 200",
    set: "60 200 200 250",
  };
  const viewBox = view === "detail" ? detailBox[shape] : frontBox[shape];

  return (
    <svg
      viewBox={viewBox}
      className={cn("h-full w-full", className)}
      role="img"
      aria-label={`${label} — ilustracja opakowania (placeholder)`}
      preserveAspectRatio="xMidYMid meet"
    >
      <Shading id={id} />
      {shadow && (
        <ellipse cx="200" cy={shadowY[shape]} rx={shape === "set" ? 170 : shape === "jar" ? 150 : 100} ry="22" fill={`url(#${id}-shadow)`} />
      )}

      {/* Offsets keep each shape optically centred in the 4:5 frame. */}
      {shape === "jar" && <Jar id={id} label={label} size={size} y={-46} />}
      {shape === "shaker" && <Shaker id={id} label={label} size={size} y={-16} />}
      {shape === "spray" && <Spray id={id} label={label} size={size} y={4} />}
      {shape === "set" && <SetComposition id={id} items={items} label={label} size={size} />}
    </svg>
  );
}
