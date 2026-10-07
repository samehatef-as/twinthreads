import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Slide {
  image: string;
  eyebrow: string;
  title: readonly string[];
  copy: string;
  cta: { label: string; slug: string };
}

export function HeroSlider({
  slides,
  interval = 7000,
}: {
  slides: readonly Slide[];
  interval?: number;
}) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setI((n) => (n + 1) % slides.length), interval);
    return () => clearTimeout(t);
  }, [i, slides.length, interval]);
  const s = slides[i] ?? slides[0]!;

  return (
    <section
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-ink text-ink-foreground"
      aria-roledescription="carousel"
    >
      {slides.map((sl, n) => (
        <div
          key={n}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1.6s]",
            n === i ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={n !== i}
        >
          <img
            src={sl.image}
            alt=""
            className={cn("size-full object-cover", n === i && "animate-slow-zoom")}
            width={1920}
            height={1088}
            {...(n === 0 ? { fetchPriority: "high" as const } : { loading: "lazy" as const })}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-overlay" />

      <div className="container-editorial relative flex h-full flex-col justify-end pb-16 md:pb-20">
        <div key={i} className="max-w-3xl animate-rise">
          <p className="eyebrow mb-6 text-ink-muted">{s.eyebrow}</p>
          <h1 className="display text-[clamp(3.5rem,10vw,9.5rem)] uppercase">
            {s.title.map((t) => (
              <span key={t} className="block">
                {t}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-foreground/80">{s.copy}</p>
          <Button variant="editorial-light" className="mt-8" asChild>
            <Link to="/product/$slug" params={{ slug: s.cta.slug }}>
              {s.cta.label} <ArrowRight className="size-4" strokeWidth={1.2} />
            </Link>
          </Button>
        </div>

        <div className="mt-12 flex items-center gap-6 border-t border-ink-border pt-5">
          <span className="eyebrow">
            {String(i + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
          <div className="flex flex-1 gap-2">
            {slides.map((_, n) => (
              <button
                key={n}
                aria-label={`Slide ${n + 1}`}
                onClick={() => setI(n)}
                className="h-6 flex-1 max-w-24"
              >
                <span
                  className={cn(
                    "block h-px transition-colors duration-500",
                    n === i ? "bg-ink-foreground" : "bg-ink-border",
                  )}
                />
              </button>
            ))}
          </div>
          <span className="eyebrow hidden text-ink-muted md:inline">Scroll</span>
        </div>
      </div>

      <aside
        className="eyebrow absolute right-10 top-1/2 hidden -translate-y-1/2 flex-col items-end gap-5 text-right text-ink-foreground/80 xl:flex"
        aria-label="Brand notes"
      >
        <span>
          Cairo
          <br />
          Egypt
        </span>
        <span className="h-12 w-px bg-ink-border" />
        <span>
          Luxury
          <br />
          Streetwear
        </span>
        <span className="h-12 w-px bg-ink-border" />
        <span>
          Two brothers.
          <br />
          One vision.
        </span>
      </aside>
    </section>
  );
}
