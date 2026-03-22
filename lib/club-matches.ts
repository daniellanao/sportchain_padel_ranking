/**
 * Club-recorded matches stored in localStorage (demo).
 */

export const CLUB_MATCHES_KEY = "sportchain_club_matches";
export const CLUB_MATCHES_CHANGE_EVENT = "sportchain-club-matches";

export type ClubMatchRecord = {
  id: string;
  dateISO: string;
  teamA: [string, string];
  teamB: [string, string];
  scoreA: number;
  scoreB: number;
  recordedAt: string;
};

function dispatchMatchesUpdated() {
  window.dispatchEvent(new CustomEvent(CLUB_MATCHES_CHANGE_EVENT));
}

export function getClubMatches(): ClubMatchRecord[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(CLUB_MATCHES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ClubMatchRecord[];
  } catch {
    return [];
  }
}

export function addClubMatch(record: Omit<ClubMatchRecord, "id" | "recordedAt">): ClubMatchRecord {
  const full: ClubMatchRecord = {
    ...record,
    id: `m-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    recordedAt: new Date().toISOString(),
  };
  const list = getClubMatches();
  list.unshift(full);
  localStorage.setItem(CLUB_MATCHES_KEY, JSON.stringify(list));
  dispatchMatchesUpdated();
  return full;
}
