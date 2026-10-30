import { cn } from "@/lib/cn";

/**
 * Hero placeholder — an abstract interior study (arched window, light falling
 * on the floor, a plinth with a sphere) drawn in the brand palette.
 * Pure SVG: no external requests, no layout shift, crisp at any size.
 * Replaced automatically by a photograph once `heroContent.image` is set.
 */
export function ArchitecturalVisual({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 760"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
      className={cn("h-full w-full", className)}
    >
      <defs>
        <linearGradient id="av-wall" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EFE7DC" />
          <stop offset="1" stopColor="#DCCDBA" />
        </linearGradient>
        <linearGradient id="av-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#D2C1AB" />
          <stop offset="1" stopColor="#C4B29B" />
        </linearGradient>
        <linearGradient id="av-window" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FCFBF8" />
          <stop offset="1" stopColor="#F3ECE1" />
        </linearGradient>
        <linearGradient id="av-beam" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FCFBF8" stopOpacity="0.75" />
          <stop offset="1" stopColor="#FCFBF8" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="av-plinth" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#E9DFD2" />
          <stop offset="1" stopColor="#CDBCA6" />
        </linearGradient>
        <radialGradient id="av-sphere" cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#F5F1EA" />
          <stop offset="0.6" stopColor="#B9A68E" />
          <stop offset="1" stopColor="#8D7C69" />
        </radialGradient>
        <filter id="av-soft" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* Wall and floor */}
      <rect width="600" height="760" fill="url(#av-wall)" />
      <rect y="580" width="600" height="180" fill="url(#av-floor)" />
      <path d="M0 580h600" stroke="#B8A58D" strokeWidth="1" opacity="0.6" />

      {/* Arched window */}
      <path d="M170 560V260a130 130 0 0 1 260 0v300Z" fill="url(#av-window)" />
      <path
        d="M170 560V260a130 130 0 0 1 260 0v300Z"
        fill="none"
        stroke="#CBB9A2"
        strokeWidth="10"
      />
      <path d="M300 132v428M170 340h260" stroke="#D9CBB8" strokeWidth="4" />
      <path d="M160 566h280" stroke="#C7B49C" strokeWidth="6" />

      {/* Light cast on the floor */}
      <path d="M170 580h260l120 180H230Z" fill="url(#av-beam)" filter="url(#av-soft)" />
      <path d="M296 580h8l40 180h-12Z" fill="#C9B69E" opacity="0.35" filter="url(#av-soft)" />

      {/* Plinth with sphere */}
      <path d="M392 694l36 66h120l-44-66Z" fill="#A8947C" opacity="0.28" filter="url(#av-soft)" />
      <rect x="392" y="520" width="112" height="176" fill="url(#av-plinth)" />
      <path d="M392 520h112" stroke="#F3ECE1" strokeWidth="2" />
      <circle cx="448" cy="482" r="38" fill="url(#av-sphere)" />

      {/* Wall shadow — gives depth on the left */}
      <rect width="120" height="580" fill="#B8A58D" opacity="0.12" filter="url(#av-soft)" />
    </svg>
  );
}
