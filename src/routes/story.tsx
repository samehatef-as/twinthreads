import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { drops } from "@/lib/catalog";
import hero1 from "@/assets/hero-1.jpg";
import brothers from "@/assets/brothers.jpg";
import hero3 from "@/assets/hero-3.jpg";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Our Story — Twin Threads" },
      {
        name: "description",
        content:
          "Two brothers with two different styles — one street, one classic — and the luxury streetwear brand built from the difference.",
      },
      { property: "og:title", content: "Our Story — Twin Threads" },
      {
        property: "og:description",
        content: "Two brothers. One vision. Luxury streetwear from Cairo.",
      },
    ],
  }),
  component: Story,
});

function Story() {
  return (
    <>
      <section className="relative h-[100svh] min-h-[600px] overflow-hidden text-ink-foreground">
        <img
          src={hero1}
          alt="The Twin Threads brothers in Cairo"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-overlay" />
        <div className="container-editorial relative flex h-full flex-col justify-end pb-20">
          <p className="eyebrow text-ink-muted">Our Story</p>
          <h1 className="display mt-6 animate-rise text-[clamp(3.5rem,11vw,10rem)] uppercase">
            Two brothers.
            <br />
            One vision.
          </h1>
        </div>
      </section>

      <section className="container-editorial grid gap-12 py-28 md:grid-cols-12 md:py-40">
        <p className="display text-4xl md:col-span-6 md:text-5xl">
          We grew up in the same house and never once dressed alike.
        </p>
        <div className="space-y-6 text-sm leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9">
          <p>
            One of us lived in hoodies and wide pants — comfort first, volume always. The other
            reached for clean jackets, quiet colors and the kind of fit that doesn’t shout.
          </p>
          <p>
            For years that was an argument. Then it became an idea: what if the street silhouette
            and the classic palette belonged to the same garment?
          </p>
        </div>
      </section>

      <section className="bg-ink text-ink-foreground">
        <div className="container-editorial grid items-center gap-12 py-24 md:grid-cols-12">
          <img
            src={brothers}
            alt="The founders side by side"
            loading="lazy"
            className="w-full md:col-span-5"
          />
          <div className="md:col-span-6 md:col-start-7">
            <p className="eyebrow text-ink-muted">The Result</p>
            <h2 className="display mt-6 text-[clamp(3rem,7vw,7rem)] uppercase">
              Luxury
              <br />
              Streetwear
            </h2>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-ink-foreground/75">
              Made in Egypt, built from difference. Every Twin Threads piece has to pass both
              brothers — if it’s too loud for one or too stiff for the other, it doesn’t get made.
            </p>
          </div>
        </div>
      </section>

      <section className="container-editorial py-28">
        <p className="eyebrow text-muted-foreground">The Progression</p>
        <ol className="mt-10 grid border-t border-foreground md:grid-cols-3">
          {drops.map((d) => (
            <li
              key={d.id}
              className="border-b border-border py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0 md:last:border-r-0"
            >
              <span className="eyebrow text-muted-foreground">Drop {d.number}</span>
              <p className="display mt-4 text-5xl">{d.title}</p>
              <p className="mt-4 text-sm text-muted-foreground">{d.statement}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="relative h-[70svh] min-h-[480px] overflow-hidden text-ink-foreground">
        <img
          src={hero3}
          alt="Cairo rooftop at dusk"
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-overlay" />
        <div className="container-editorial relative flex h-full flex-col items-start justify-end gap-8 pb-16">
          <p className="display max-w-3xl text-5xl md:text-6xl">
            You don’t follow trends, you create them.
          </p>
          <Button variant="editorial-light" asChild>
            <Link to="/shop">Shop the drops</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
