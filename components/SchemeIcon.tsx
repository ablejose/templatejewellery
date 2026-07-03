import type { SVGProps } from "react";
import type { SchemeIconName } from "@/types/brand";

/**
 * Line-style SVG icons for the /schemes feature cards. Each glyph approximates
 * the reference set and inherits its color via `currentColor` (rendered gold).
 * Sizing and color come from the `className` passed by the card.
 */
export function SchemeIcon({
  name,
  className,
}: {
  name: SchemeIconName;
  className?: string;
}) {
  const base: SVGProps<SVGSVGElement> = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
    className,
  };

  switch (name) {
    case "save-tag":
      return (
        <svg {...base}>
          <path d="M20.6 13.4 13.4 20.6a2 2 0 0 1-2.83 0l-6.17-6.17A2 2 0 0 1 3.8 13V5a1 1 0 0 1 1-1h8a2 2 0 0 1 1.4.6l6.4 6.4a2 2 0 0 1 0 2.8Z" />
          <circle cx="8" cy="8" r="1.3" />
        </svg>
      );
    case "reward-badge":
      return (
        <svg {...base}>
          <circle cx="12" cy="9" r="5.5" />
          <path d="M12 6.2l1 2 2.2.3-1.6 1.5.4 2.2-2-1.1-2 1.1.4-2.2L8.8 8.5l2.2-.3 1-2Z" />
          <path d="M9 13.6 7.7 20l4.3-2.1L16.3 20 15 13.6" />
        </svg>
      );
    case "growth-chart":
      return (
        <svg {...base}>
          <circle cx="9.5" cy="9.5" r="5.5" />
          <path d="M9.5 4v5.5H15" />
          <path d="M16.5 20v-4M20 20v-8" />
        </svg>
      );
    case "accumulate-clock":
      return (
        <svg {...base}>
          <ellipse cx="8" cy="6" rx="4.3" ry="1.8" />
          <path d="M3.7 6v4.2c0 1 1.9 1.8 4.3 1.8" />
          <path d="M12.3 6v3" />
          <circle cx="15.5" cy="15" r="4.5" />
          <path d="M15.5 13v2l1.4 1" />
        </svg>
      );
    case "plan-edit":
      return (
        <svg {...base}>
          <rect x="3.5" y="4" width="10.5" height="14" rx="1.5" />
          <path d="M6.4 14v-3M8.8 14v-6M11.2 14v-4" />
          <path d="M20.4 9.6 14.6 15.4l-2.6.7.7-2.6 5.8-5.8a1.35 1.35 0 0 1 1.9 1.9Z" />
        </svg>
      );
    case "card-clock":
      return (
        <svg {...base}>
          <rect x="3" y="6" width="18" height="11" rx="2" />
          <path d="M3 10h18" />
          <circle cx="16.5" cy="15.5" r="3.7" />
          <path d="M16.5 14v1.7l1.2.7" />
        </svg>
      );
    default:
      return null;
  }
}
