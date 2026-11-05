import type { CSSProperties } from 'react';

interface FadeInOptions {
  /** How far (px) the element slides up from while hidden. */
  offset?: number;
  /** Transition duration in seconds. */
  duration?: number;
}

/** Staggered fade-and-slide-in style used by the HUD panels. */
export function fadeIn(
  visible: boolean,
  delayMs: number,
  { offset = 8, duration = 0.4 }: FadeInOptions = {},
): CSSProperties {
  return {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : `translateY(${offset}px)`,
    transition: `all ${duration}s ease ${delayMs}ms`,
  };
}
