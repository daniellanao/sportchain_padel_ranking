import type { Metadata } from "next";
import Image from "next/image";

import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Pitch — Sportchain Padel Ranking",
  description:
    "Amateur padel, ELO ratings, public app, club licenses — pitch deck for your talk.",
};

const CUES = [
  { kicker: "Who", phrase: "Amateur padel players" },
  { kicker: "Core", phrase: "ELO-based rating system" },
  { kicker: "Public", phrase: "Rankings + match history + Δ after each game" },
  { kicker: "Access", phrase: "Anyone — open web app" },
  { kicker: "Clubs", phrase: "Licensed to run tournaments" },
  { kicker: "Clubs", phrase: "Use this ranking system" },
] as const;

export default function PitchPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="relative flex items-center justify-center min-h-[40vh] bg-[var(--color-primary)] border-b-4 border-[var(--color-accent-gold)]">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white uppercase tracking-wide drop-shadow-xl text-center">
          Sportchain Padel Ranking
        </h1>
      </section>
      {/* Hero — tournaments visual + headline cues */}
      <section className="relative min-h-[min(85vh,720px)] w-full overflow-hidden border-b-4 border-[var(--color-primary)]">
        <Image
          src="/tournaments/aleph_padel_tournament.png"
          alt=""
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-[rgba(11,31,59,0.88)] via-[rgba(11,31,59,0.75)] to-[rgba(11,31,59,0.92)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex min-h-[min(85vh,720px)] max-w-5xl flex-col justify-center px-4 py-16 text-center sm:px-6">
          <p className="navbar-text mb-4 text-xs uppercase tracking-[0.25em] text-[var(--color-accent-gold)]">
            Pitch 
          </p>
          <h1 className="mb-6 text-3xl font-black uppercase leading-tight text-white drop-shadow-md sm:text-4xl md:text-5xl">
            Padel ELO Ranking Platform for amateur padel players.
          </h1>
          <ul className="mx-auto flex max-w-2xl flex-col gap-3 text-left text-lg font-semibold leading-snug text-[rgba(232,236,245,0.95)] sm:text-xl">
            <li className="flex gap-2">
              <span className="text-[var(--color-accent-gold)]">→</span>
              <span>ELO rating — transparent, practical and esay to understand</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--color-accent-gold)]">→</span>
              <span>Public app: rankings, history, rating changes</span>
            </li>
            <li className="flex gap-2">
              <span className="text-[var(--color-accent-gold)]">→</span>
              <span>Clubs: license → tournaments + this system</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Memory cues — keywords only */}
      <section className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
        <h2 className="mb-8 text-center text-3xl font-black uppercase text-[var(--color-primary)] sm:text-4xl tracking-wide">
          What is ELO?
        </h2>
        <div className="mx-auto max-w-2xl rounded border-4 border-[var(--color-primary)] bg-[var(--color-surface)] p-10 sm:p-14 text-center shadow-[6px_6px_0_rgba(0,0,0,0.12)]">
          <p className="text-[2.5rem] sm:text-[3rem] text-[var(--color-accent-gold)] font-black mb-6 leading-tight uppercase drop-shadow">
            RATING SYSTEM
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-[var(--color-primary)] mb-6">
            Used in chess & sports.<br />
            Shows your skill - easy, clear.
          </p>
          <p className="text-xl sm:text-2xl font-semibold text-[var(--color-primary)]">
            The higher your ELO, the better you are. <br />(0 to 3000)
          </p>
        </div>
      </section>

      {/* Second strip — same image, reinforces visual for camera */}
      <section className="relative border-t-4 border-[var(--color-accent-gold)]">
        <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <div className="relative aspect-[21/9] w-full overflow-hidden border-4 border-[var(--color-primary)] shadow-[8px_8px_0_rgba(0,0,0,0.15)]">
            <Image
              src="/tournaments/startup_web3_tournament.png"
              alt="Business model and club licensing"
              fill
              className="object-cover object-[center_40%]"
              sizes="(max-width: 1200px) 100vw, 1152px"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-[rgba(11,31,59,0.55)] px-4">
              <div className="max-w-3xl text-center">
                <p className="text-2xl font-black uppercase leading-tight text-white drop-shadow sm:text-3xl md:text-4xl mb-5">
                  Business Model
                </p>
                <ul className="mx-auto flex flex-col gap-3 text-lg font-semibold leading-snug text-white sm:text-xl">
                  <li>
                    <span className="text-[var(--color-accent-gold)]">•</span>
                    <span className="ml-2">Clubs can license the platform to host rankings and tournaments.</span>
                  </li>
                  <li>
                    <span className="text-[var(--color-accent-gold)]">•</span>
                    <span className="ml-2">Player perks: unlock exclusive features or bonuses by getting a membership.</span>
                  </li>
                  <li>
                    <span className="text-[var(--color-accent-gold)]">•</span>
                    <span className="ml-2">Clubs set their own fees and can offer special rewards to paid members.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Final section — Gamification message */}
      <section className="relative border-t-4 border-[var(--color-accent-gold)] bg-[var(--color-primary)]">
        <div className="mx-auto max-w-4xl px-4 py-14 sm:px-10 text-center">
          <h2 className="mb-4 text-3xl sm:text-4xl font-black uppercase text-[var(--color-accent-gold)] drop-shadow">
            Gamify Real Life
          </h2>
          <p className="mb-3 text-xl sm:text-2xl font-semibold text-white">
            Transform real-world matches with the excitement of gaming.
          </p>
          <p className="text-lg sm:text-xl text-white">
            Track your progress, climb the leaderboard, and make every game more motivating and fun. Your next level awaits!
          </p>
        </div>
      </section>
    </div>
  );
}
