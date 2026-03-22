"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Navbar } from "@/components/Navbar";
import { setClubSession } from "@/lib/club-auth";

/** Demo defaults — click Sign in only */
const DEMO_CLUB_NAME = "Workplace by IRSA";
const DEMO_PASSWORD = "demo";

export default function LoginPage() {
  const router = useRouter();
  const [clubName, setClubName] = useState(DEMO_CLUB_NAME);
  const [password, setPassword] = useState(DEMO_PASSWORD);
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const name = clubName.trim();
    if (!name) {
      setError("Enter your club name.");
      return;
    }
    if (!password) {
      setError("Enter your password.");
      return;
    }
    setClubSession({
      clubName: name,
      loggedInAt: new Date().toISOString(),
    });
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col px-4 py-12 sm:px-6">
        <h1 className="mb-2 text-2xl font-black uppercase text-[var(--color-primary)] sm:text-3xl">
          Club login
        </h1>
        <p className="mb-8 text-sm text-[var(--color-subtle-text)]">
          Sign in to manage your padel club dashboard, add matches, and keep records.{" "}
          <strong className="text-[var(--color-foreground)]">Demo:</strong> fields are pre-filled —
          just press Sign in.
        </p>

        <form
          onSubmit={handleSubmit}
          className="border-4 border-[var(--color-primary)] bg-[var(--color-surface)] p-6 shadow-[6px_6px_0_rgba(0,0,0,0.15)]"
        >
          <div className="mb-4">
            <label
              htmlFor="club-name"
              className="navbar-text block text-[10px] uppercase text-[var(--color-subtle-text)]"
            >
              Club name
            </label>
            <input
              id="club-name"
              type="text"
              autoComplete="organization"
              value={clubName}
              onChange={(e) => setClubName(e.target.value)}
              placeholder={DEMO_CLUB_NAME}
              className="mt-1 w-full border-2 border-[var(--color-primary)] bg-[var(--color-muted)]/40 px-3 py-2 text-sm"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="club-password"
              className="navbar-text block text-[10px] uppercase text-[var(--color-subtle-text)]"
            >
              Password
            </label>
            <input
              id="club-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border-2 border-[var(--color-primary)] bg-[var(--color-muted)]/40 px-3 py-2 text-sm"
            />
          </div>
          {error ? <p className="mb-4 text-sm font-medium text-rose-700 dark:text-rose-400">{error}</p> : null}
          <button
            type="submit"
            className="navbar-text btn-gold mb-4 w-full border-2 border-[var(--color-accent-gold)] px-4 py-3 text-xs uppercase"
          >
            Sign in
          </button>
          <Link href="/" className="block text-center text-sm text-[var(--color-primary)] underline-offset-2 hover:underline">
            ← Back to home
          </Link>
        </form>
      </main>
    </div>
  );
}
