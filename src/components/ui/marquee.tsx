import { cn } from "@/lib/utils";

/**
 * Infinite horizontal ticker. Pure CSS animation (GPU transform),
 * paused automatically by the global reduced-motion rule.
 */
export function Marquee({
  items,
  className,
  duration = 40,
  reverse = false,
}: {
  items: string[];
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  const sequence = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 md:px-10">{item}</span>
          <span className="inline-block size-2 rotate-45 bg-current opacity-60 md:size-2.5" />
        </span>
      ))}
    </div>
  );

  return (
    <div className={cn("relative flex overflow-hidden whitespace-nowrap select-none", className)}>
      <span className="sr-only">{items.join(" · ")}</span>
      <div
        className="flex w-max animate-marquee will-change-transform hover:[animation-play-state:paused]"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : "normal",
          } as React.CSSProperties
        }
      >
        {sequence}
        {sequence}
        {sequence}
        {sequence}
      </div>
    </div>
  );
}
