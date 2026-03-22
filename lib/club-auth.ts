/**
 * Client-side club session (demo — replace with real auth later).
 */

export const CLUB_SESSION_KEY = "sportchain_club_session";
export const CLUB_AUTH_CHANGE_EVENT = "sportchain-club-auth";

export type ClubSession = {
  clubName: string;
  loggedInAt: string;
};

export function getClubSession(): ClubSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CLUB_SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ClubSession;
  } catch {
    return null;
  }
}

export function setClubSession(session: ClubSession): void {
  localStorage.setItem(CLUB_SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new CustomEvent(CLUB_AUTH_CHANGE_EVENT));
}

export function clearClubSession(): void {
  localStorage.removeItem(CLUB_SESSION_KEY);
  window.dispatchEvent(new CustomEvent(CLUB_AUTH_CHANGE_EVENT));
}
