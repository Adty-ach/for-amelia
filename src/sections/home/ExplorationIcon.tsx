/**
 * ExplorationIcon.tsx
 * ---------------------------------
 * Tiny detail mark untuk tiap exploration object — bukan navigasi,
 * murni penanda visual kecil yang mengisyaratkan isi tujuan.
 * Satu svg per experience.id, sengaja sangat sederhana (stroke tipis,
 * ukuran kecil) supaya tetap terasa seperti detail, bukan ikon app.
 */

import type { ReactElement } from "react";

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function StoryIcon(): ReactElement {
  // tiny page marker / bookmark ribbon
  return (
    <svg viewBox="0 0 16 18" width="14" height="16">
      <path {...strokeProps} d="M3 1.5h10v15l-5-3.4-5 3.4z" />
    </svg>
  );
}

function GalleryIcon(): ReactElement {
  // small frame corner accent
  return (
    <svg viewBox="0 0 16 16" width="14" height="14">
      <path {...strokeProps} d="M1.5 6.5v-5h5" />
      <path {...strokeProps} d="M14.5 9.5v5h-5" />
    </svg>
  );
}

function IRememberIcon(): ReactElement {
  // tiny folded-corner note mark
  return (
    <svg viewBox="0 0 16 16" width="14" height="14">
      <path {...strokeProps} d="M2 1.5h8l4 4v9H2z" />
      <path {...strokeProps} d="M10 1.5v4h4" />
    </svg>
  );
}

function TimelineIcon(): ReactElement {
  // tiny dot—line—dot node
  return (
    <svg viewBox="0 0 18 8" width="16" height="8">
      <circle cx="2" cy="4" r="1.6" fill="currentColor" stroke="none" />
      <path {...strokeProps} d="M4.4 4h9.2" />
      <circle cx="15.5" cy="4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function SoundtrackIcon(): ReactElement {
  // tiny waveform bars
  return (
    <svg viewBox="0 0 16 14" width="15" height="13">
      <path {...strokeProps} d="M1.5 8v-2" />
      <path {...strokeProps} d="M5 11v-8" />
      <path {...strokeProps} d="M8.5 13v-12" />
      <path {...strokeProps} d="M12 10v-6" />
      <path {...strokeProps} d="M15 7.5v-1" />
    </svg>
  );
}

function DreamModeIcon(): ReactElement {
  // small star / glow
  return (
    <svg viewBox="0 0 16 16" width="14" height="14">
      <path
        fill="currentColor"
        stroke="none"
        d="M8 1.5 8.9 6.9 14 8 8.9 9.1 8 14.5 7.1 9.1 2 8 7.1 6.9Z"
      />
    </svg>
  );
}

function LetterIcon(): ReactElement {
  // tiny envelope flap detail
  return (
    <svg viewBox="0 0 18 14" width="16" height="13">
      <rect x="1" y="2" width="16" height="10.5" rx="1" {...strokeProps} />
      <path {...strokeProps} d="M1.5 3 9 8.5 16.5 3" />
    </svg>
  );
}

const ICONS: Record<string, () => ReactElement> = {
  story: StoryIcon,
  gallery: GalleryIcon,
  "i-remember": IRememberIcon,
  timeline: TimelineIcon,
  soundtrack: SoundtrackIcon,
  "dream-mode": DreamModeIcon,
  letter: LetterIcon,
};

interface ExplorationIconProps {
  id: string;
}

export function ExplorationIcon({ id }: ExplorationIconProps) {
  const Icon = ICONS[id];
  if (!Icon) return null;
  return <Icon />;
}
