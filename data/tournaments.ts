/**
 * Tournament listings (dummy data).
 * One upcoming event: Aleph Padel Tournament March '26 — March 25, 18:30, Swiss, 4 rounds, 32 players.
 */

export type TournamentStatus = "upcoming" | "completed" | "cancelled";

export type Tournament = {
  id: string;
  /** URL-safe identifier, `lower_snake_case` (e.g. `aleph_padel_tournament_march_26`) */
  slug: string;
  /** Display title */
  name: string;
  /** ISO date YYYY-MM-DD (local calendar day for the event) */
  dateISO: string;
  /** 24h time HH:mm */
  time24h: string;
  /** Human-readable date for UI (avoids SSR timezone drift) */
  dateLabel: string;
  /** Human-readable time for UI */
  timeLabel: string;
  playerCount: number;
  /** e.g. swiss */
  format: "swiss";
  rounds: number;
  status: TournamentStatus;
  /** Public URL — file lives under `public/` (e.g. `/tournaments/aleph_padel_tournament.png`) */
  imageUrl?: string;
};

/** Single upcoming tournament */
export const UPCOMING_TOURNAMENTS: Tournament[] = [
  {
    id: "aleph-padel-march-26",
    slug: "aleph_padel_tournament_march_26",
    name: "Aleph Padel Tournament March '26",
    dateISO: "2025-03-25",
    time24h: "18:30",
    dateLabel: "March 25, 2025",
    timeLabel: "18:30 (6:30 PM)",
    playerCount: 32,
    format: "swiss",
    rounds: 4,
    status: "upcoming",
    imageUrl: "/tournaments/aleph_padel_tournament.png",
  },
];

export const PAST_TOURNAMENTS: Tournament[] = [];

export function getTournamentBySlug(slug: string): Tournament | undefined {
  return [...UPCOMING_TOURNAMENTS, ...PAST_TOURNAMENTS].find((t) => t.slug === slug);
}
