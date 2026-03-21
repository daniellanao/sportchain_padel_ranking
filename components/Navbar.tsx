import Link from "next/link";

const navLinkClass =
  "navbar-text border-2 border-[var(--color-accent-gold)] bg-[var(--color-primary)] px-3 py-2 text-xs uppercase text-white transition hover:brightness-110 sm:px-4";

export function Navbar() {
  return (
    <header className="relative z-10 border-b-4 border-[var(--color-primary)] bg-[rgba(11,31,59,0.9)] px-5 py-4 shadow-[0_6px_0_rgba(0,0,0,0.2)]">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="logo text-sm text-[var(--color-accent-gold)] sm:text-base"
        >
          Sportchain Padel Ranking
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className={navLinkClass}>
            Home
          </Link>
          <Link href="/ranking" className={navLinkClass}>
            Ranking
          </Link>
          <Link href="/tournaments" className={navLinkClass}>
            Tournaments
          </Link>
          <button
            type="button"
            className="navbar-text btn-gold border-2 border-[var(--color-accent-gold)] px-3 py-2 text-xs uppercase sm:px-4"
          >
            Login
          </button>
        </div>
      </nav>
    </header>
  );
}
