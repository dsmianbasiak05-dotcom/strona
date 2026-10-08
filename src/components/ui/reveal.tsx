"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

interface RevealProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: ReactNode;
  delay?: number;
  y?: number;
}

/** Fade + rise on enter viewport. Reduced motion handled by MotionConfig. */
export function Reveal({ children, delay = 0, y = 28, ...props }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Line-by-line masked headline reveal — the signature motion of the brand.
 * Each line slides up from behind an overflow mask.
 */
export function RevealLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  as: Tag = "h2",
  animateOnMount = false,
  srLabel,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
  animateOnMount?: boolean;
  /** Accessible / SEO text for the heading when lines are stylised. */
  srLabel?: string;
}) {
  const trigger = animateOnMount
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px -10% 0px" } };

  return (
    <Tag className={className}>
      {srLabel && <span className="sr-only">{srLabel}</span>}
      <motion.span
        aria-hidden={srLabel ? true : undefined}
        className="block"
        initial="hidden"
        {...trigger}
        transition={{ staggerChildren: 0.09, delayChildren: delay }}
      >
        {lines.map((line, i) => (
          <span key={i} className="-mt-[0.14em] block overflow-hidden pt-[0.14em] pb-[0.04em]">
            <motion.span
              className={lineClassName ?? "block"}
              variants={{
                hidden: { y: "105%" },
                show: { y: "0%", transition: { duration: 1.05, ease } },
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
