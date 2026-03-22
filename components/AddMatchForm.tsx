"use client";

import { useState } from "react";

import { addClubMatch } from "@/lib/club-matches";

type Props = {
  onAdded?: () => void;
};

export function AddMatchForm({ onAdded }: Props) {
  const [dateISO, setDateISO] = useState(() => new Date().toISOString().slice(0, 10));
  const [a1, setA1] = useState("");
  const [a2, setA2] = useState("");
  const [b1, setB1] = useState("");
  const [b2, setB2] = useState("");
  const [scoreA, setScoreA] = useState("6");
  const [scoreB, setScoreB] = useState("4");
  const [message, setMessage] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    const sa = Number(scoreA);
    const sb = Number(scoreB);
    if (!a1.trim() || !a2.trim() || !b1.trim() || !b2.trim()) {
      setMessage("Fill in all four player names.");
      return;
    }
    if (Number.isNaN(sa) || Number.isNaN(sb) || sa < 0 || sb < 0) {
      setMessage("Enter valid game scores.");
      return;
    }
    addClubMatch({
      dateISO,
      teamA: [a1.trim(), a2.trim()],
      teamB: [b1.trim(), b2.trim()],
      scoreA: sa,
      scoreB: sb,
    });
    setMessage("Match saved.");
    onAdded?.();
    setTimeout(() => setMessage(null), 3000);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-4 border-[var(--color-primary)] bg-[var(--color-surface)] p-5 shadow-[6px_6px_0_rgba(0,0,0,0.15)] sm:p-6"
    >
      <p className="navbar-text mb-4 text-xs uppercase tracking-[0.12em] text-[var(--color-primary)]">
        Add padel match (doubles)
      </p>
      <p className="mb-4 text-sm text-[var(--color-subtle-text)]">
        Individual ELO updates can be computed elsewhere; this form records the result for your club.
      </p>

      <div className="mb-4">
        <label className="navbar-text block text-[10px] uppercase text-[var(--color-subtle-text)]">
          Match date
        </label>
        <input
          type="date"
          value={dateISO}
          onChange={(e) => setDateISO(e.target.value)}
          className="mt-1 w-full max-w-xs border-2 border-[var(--color-primary)] bg-[var(--color-muted)]/40 px-3 py-2 text-sm text-[var(--color-foreground)]"
          required
        />
      </div>

      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <fieldset className="border-2 border-[var(--color-accent-gold)]/60 p-3">
          <legend className="navbar-text px-1 text-[10px] uppercase text-[var(--color-primary)]">
            Team A
          </legend>
          <div className="mt-2 space-y-2">
            <input
              placeholder="Player 1"
              value={a1}
              onChange={(e) => setA1(e.target.value)}
              className="w-full border-2 border-[var(--color-muted)] bg-[var(--color-surface)] px-3 py-2 text-sm"
              required
            />
            <input
              placeholder="Player 2"
              value={a2}
              onChange={(e) => setA2(e.target.value)}
              className="w-full border-2 border-[var(--color-muted)] bg-[var(--color-surface)] px-3 py-2 text-sm"
              required
            />
          </div>
        </fieldset>
        <fieldset className="border-2 border-[var(--color-accent-gold)]/60 p-3">
          <legend className="navbar-text px-1 text-[10px] uppercase text-[var(--color-primary)]">
            Team B
          </legend>
          <div className="mt-2 space-y-2">
            <input
              placeholder="Player 1"
              value={b1}
              onChange={(e) => setB1(e.target.value)}
              className="w-full border-2 border-[var(--color-muted)] bg-[var(--color-surface)] px-3 py-2 text-sm"
              required
            />
            <input
              placeholder="Player 2"
              value={b2}
              onChange={(e) => setB2(e.target.value)}
              className="w-full border-2 border-[var(--color-muted)] bg-[var(--color-surface)] px-3 py-2 text-sm"
              required
            />
          </div>
        </fieldset>
      </div>

      <div className="mb-4 flex flex-wrap items-end gap-4">
        <div>
          <label className="navbar-text block text-[10px] uppercase text-[var(--color-subtle-text)]">
            Games Team A
          </label>
          <input
            type="number"
            min={0}
            max={30}
            value={scoreA}
            onChange={(e) => setScoreA(e.target.value)}
            className="mt-1 w-24 border-2 border-[var(--color-primary)] bg-[var(--color-muted)]/40 px-3 py-2 text-sm tabular-nums"
            required
          />
        </div>
        <span className="navbar-text pb-2 text-lg text-[var(--color-subtle-text)]">:</span>
        <div>
          <label className="navbar-text block text-[10px] uppercase text-[var(--color-subtle-text)]">
            Games Team B
          </label>
          <input
            type="number"
            min={0}
            max={30}
            value={scoreB}
            onChange={(e) => setScoreB(e.target.value)}
            className="mt-1 w-24 border-2 border-[var(--color-primary)] bg-[var(--color-muted)]/40 px-3 py-2 text-sm tabular-nums"
            required
          />
        </div>
      </div>

      {message ? (
        <p
          className={`mb-3 text-sm font-medium ${
            message.includes("saved") ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"
          }`}
        >
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        className="navbar-text btn-gold border-2 border-[var(--color-accent-gold)] px-6 py-3 text-xs uppercase shadow-[4px_4px_0_rgba(0,0,0,0.2)]"
      >
        Save match
      </button>
    </form>
  );
}
