import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

/** Wordmark placeholder — swap the inner markup for the official logo files (light/dark) when provided. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      to="/"
      aria-label="Twin Threads — home"
      className={cn("inline-flex flex-col leading-none", className)}
    >
      <span className="font-serif text-2xl tracking-[0.18em] md:text-[1.7rem]">TWIN THREADS</span>
      <span className="eyebrow mt-1 text-[0.55rem] tracking-[0.5em] opacity-70">
        Cairo · Est. Egypt
      </span>
    </Link>
  );
}
