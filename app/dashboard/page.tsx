"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { AddMatchForm } from "@/components/AddMatchForm";
import { Navbar } from "@/components/Navbar";
import { CLUB_AUTH_CHANGE_EVENT, clearClubSession, getClubSession, type ClubSession } from "@/lib/club-auth";
import { CLUB_MATCHES_CHANGE_EVENT, getClubMatches, type ClubMatchRecord } from "@/lib/club-matches";

type SessionState = ClubSession | null | "loading";

export default function DashboardPage() {
  const router = useRouter();
  const [session, setSession] = useState<SessionState>("loading");
  const [matches, setMatches] = useState<ClubMatchRecord[]>([]);

  const refresh = useCallback(() => {
    setSession(getClubSession());
    setMatches(getClubMatches());
  }, []);

  useEffect(() => {
    refresh();
    const onAuth = () => refresh();
    window.addEventListener(CLUB_AUTH_CHANGE_EVENT, onAuth);
    window.addEventListener(CLUB_MATCHES_CHANGE_EVENT, onAuth);
    return () => {
      window.removeEventListener(CLUB_AUTH_CHANGE_EVENT, onAuth);
      window.removeEventListener(CLUB_MATCHES_CHANGE_EVENT, onAuth);
    };
  }, [refresh]);

  useEffect(() => {
    if (session === "loading") return;
    if (!session) {
      router.replace("/login");
    }
  }, [session, router]);

  function handleLogout() {
    clearClubSession();
    router.push("/");
    router.refresh();
  }

  if (session === "loading" || !session) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="mx-auto max-w-2xl px-4 py-16 text-center text-[var(--color-subtle-text)]">
          Loading…
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 border-b-4 border-[var(--color-accent-gold)] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="navbar-text text-xs uppercase tracking-[0.15em] text-[var(--color-primary)]">
              Club dashboard
            </p>
            <h1 className="max-w-xl text-2xl font-black uppercase text-[var(--color-primary)] sm:text-3xl">
              {session.clubName}
            </h1>
            <p className="mt-2 text-sm text-[var(--color-subtle-text)]">
              Record doubles matches, track results, and keep your venue organized. ELO is managed per
              player on the main ranking.
            </p>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            className="navbar-text shrink-0 self-start border-2 border-[var(--color-accent-gold)] bg-[var(--color-primary)] px-4 py-2 text-xs uppercase text-white transition hover:brightness-110"
          >
            Log out
          </button>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="border-4 border-[var(--color-primary)] bg-[var(--color-muted)]/50 p-4 shadow-[4px_4px_0_rgba(0,0,0,0.12)]">
            <p className="navbar-text text-[10px] uppercase text-[var(--color-subtle-text)]">
              Matches recorded
            </p>
            <p className="navbar-text text-3xl tabular-nums text-[var(--color-primary)] sm:text-4xl">
              {matches.length}
            </p>
          </div>
          <div className="border-4 border-[var(--color-primary)] bg-[var(--color-muted)]/50 p-4 shadow-[4px_4px_0_rgba(0,0,0,0.12)]">
            <p className="navbar-text text-[10px] uppercase text-[var(--color-subtle-text)]">
              Quick link
            </p>
            <Link
              href="/ranking"
              className="mt-1 inline-block font-medium text-[var(--color-primary)] underline-offset-2 hover:underline"
            >
              View public ranking
            </Link>
          </div>
          <div className="border-4 border-[var(--color-primary)] bg-[var(--color-muted)]/50 p-4 shadow-[4px_4px_0_rgba(0,0,0,0.12)]">
            <p className="navbar-text text-[10px] uppercase text-[var(--color-subtle-text)]">
              Quick link
            </p>
            <Link
              href="/tournaments"
              className="mt-1 inline-block font-medium text-[var(--color-primary)] underline-offset-2 hover:underline"
            >
              Tournaments
            </Link>
          </div>
        </div>

        <section className="mb-10">
          <AddMatchForm onAdded={refresh} />
        </section>

        <section>
          <h2 className="navbar-text mb-4 text-xs uppercase tracking-[0.12em] text-[var(--color-primary)]">
            Recent matches (this browser)
          </h2>
          {matches.length === 0 ? (
            <p className="text-sm text-[var(--color-subtle-text)]">
              No matches yet — add one above.
            </p>
          ) : (
            <div className="overflow-x-auto border-4 border-[var(--color-primary)] shadow-[6px_6px_0_rgba(0,0,0,0.2)]">
              <table className="w-full min-w-[640px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b-4 border-[var(--color-primary)] bg-[var(--color-primary)] text-white">
                    <th className="navbar-text px-3 py-3 text-xs uppercase sm:px-4">Date</th>
                    <th className="navbar-text px-3 py-3 text-xs uppercase sm:px-4">Team A</th>
                    <th className="navbar-text px-3 py-3 text-xs uppercase sm:px-4">Team B</th>
                    <th className="navbar-text px-3 py-3 text-xs uppercase sm:px-4">Score</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((m, index) => (
                    <tr
                      key={m.id}
                      className={
                        index % 2 === 0
                          ? "border-b border-[var(--color-muted)] bg-[var(--color-muted)]/60"
                          : "border-b border-[var(--color-muted)] bg-[var(--color-surface)]"
                      }
                    >
                      <td className="whitespace-nowrap px-3 py-2 sm:px-4">{m.dateISO}</td>
                      <td className="px-3 py-2 sm:px-4">
                        {m.teamA[0]} <span className="text-[var(--color-subtle-text)]">&</span> {m.teamA[1]}
                      </td>
                      <td className="px-3 py-2 sm:px-4">
                        {m.teamB[0]} <span className="text-[var(--color-subtle-text)]">&</span> {m.teamB[1]}
                      </td>
                      <td className="navbar-text px-3 py-2 tabular-nums sm:px-4">
                        {m.scoreA} – {m.scoreB}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
