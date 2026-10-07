import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { HeroSlider } from "@/components/site/HeroSlider";
import { Button } from "@/components/ui/button";
import { drops, formatEGP, heroSlides, products } from "@/lib/catalog";
import brothers from "@/assets/brothers.jpg";
import detail from "@/assets/detail.jpg";
import hero2 from "@/assets/hero-2.jpg";
import jacket from "@/assets/jacket.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Twin Threads — Two Brothers, One Vision" },
      {
        name: "description",
        content:
          "Luxury streetwear from Cairo. Three drops: Classic, Streetwear, Hybrid. Cash on delivery across Egypt.",
      },
      { property: "og:title", content: "Twin Threads — Two Brothers, One Vision" },
      {
        property: "og:description",
        content: "Luxury streetwear from Cairo. Classic → Streetwear → Hybrid.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const jacketP = products[0]!;
  return (
    <>
      <HeroSlider slides={heroSlides} />

      {/* Brand statement */}
      <section className="container-editorial py-28 md:py-40">
        <p className="eyebrow text-muted-foreground">The Twin Threads Manifesto</p>
        <h2 className="display mt-8 text-[clamp(3rem,8vw,8rem)] uppercase">
          Two brothers.
          <br />
          <span className="italic normal-case text-muted-foreground">Two styles.</span>
          <br />
          One vision.
        </h2>
        <div className="mt-14 grid gap-10 md:grid-cols-12">
          <p className="text-base leading-relaxed md:col-span-5 md:col-start-7">
            One of us dresses for the street. The other dresses for the room. Twin Threads is what
            happens when we stop arguing about it — streetwear silhouettes, cut with classic
            restraint, in colors that last longer than a season.
          </p>
        </div>
      </section>

      {/* Featured drop */}
      <section className="bg-ink text-ink-foreground">
        <div className="grid md:grid-cols-12">
          <div className="relative md:col-span-7">
            <img
              src={jacket}
              alt="The Linen Jacket against raw concrete"
              loading="lazy"
              width={1024}
              height={1344}
              className="h-full max-h-[920px] w-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-between gap-12 px-6 py-16 md:col-span-5 md:px-14 md:py-20">
            <p className="eyebrow text-ink-muted">Featured — Drop 01 / Classic</p>
            <div>
              <h2 className="display text-7xl md:text-8xl">
                The Linen
                <br />
                Jacket
              </h2>
              <p className="mt-8 max-w-sm text-sm leading-relaxed text-ink-foreground/75">
                {jacketP.description}
              </p>
              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-ink-border pt-6 text-sm">
                <div>
                  <dt className="eyebrow text-ink-muted">Material</dt>
                  <dd className="mt-2">{jacketP.material}</dd>
                </div>
                <div>
                  <dt className="eyebrow text-ink-muted">Price</dt>
                  <dd className="mt-2">{formatEGP(jacketP.price)}</dd>
                </div>
              </dl>
            </div>
            <Button variant="editorial-light" className="self-start" asChild>
              <Link to="/product/$slug" params={{ slug: jacketP.slug }}>
                Shop the jacket <ArrowRight className="size-4" strokeWidth={1.2} />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Two brothers */}
      <section className="container-editorial grid items-end gap-12 py-28 md:grid-cols-12 md:py-40">
        <div className="md:col-span-5">
          <img
            src={brothers}
            alt="The two Twin Threads founders"
            loading="lazy"
            width={1280}
            height={1600}
            className="w-full object-cover"
          />
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="eyebrow text-muted-foreground">The Brothers</p>
          <div className="mt-10 grid grid-cols-2 border-t border-foreground">
            <div className="border-r border-border pr-6 pt-6">
              <p className="eyebrow">Brother I</p>
              <p className="display mt-4 text-5xl">Street</p>
              <p className="mt-4 text-sm text-muted-foreground">
                Volume, comfort, hoodies worn like a uniform.
              </p>
            </div>
            <div className="pl-6 pt-6">
              <p className="eyebrow">Brother II</p>
              <p className="display mt-4 text-5xl italic">Classic</p>
              <p className="mt-4 text-sm text-muted-foreground">
                Clean lines, quiet fabrics, nothing loud.
              </p>
            </div>
          </div>
          <p className="display mt-14 text-4xl">The difference is the design.</p>
          <Link to="/story" className="eyebrow link-line mt-8 inline-block pb-1">
            Read our story
          </Link>
        </div>
      </section>

      {/* Editorial imagery */}
      <section className="relative h-[85svh] min-h-[520px] overflow-hidden text-ink-foreground">
        <img
          src={hero2}
          alt="Twin Threads suit in a concrete colonnade"
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-overlay" />
        <div className="container-editorial relative flex h-full items-end pb-16">
          <p className="display max-w-4xl text-[clamp(2.5rem,6vw,6rem)]">
            “You don’t follow trends, you create them.”
          </p>
        </div>
      </section>

      {/* Drops */}
      <section className="container-editorial py-28 md:py-36">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="display text-6xl md:text-7xl">The Drops</h2>
          <p className="eyebrow text-muted-foreground">Classic → Streetwear → Hybrid</p>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
          {drops.map((d, n) => {
            const p = products.find((x) => x.dropId === d.id)!;
            return (
              <Link
                key={d.id}
                to="/product/$slug"
                params={{ slug: p.slug }}
                className={`group block ${n === 1 ? "md:mt-24" : ""}`}
              >
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={d.image}
                    alt={`Drop ${d.number} — ${d.title}`}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-[1.4s] ease-editorial group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-6 flex items-baseline gap-4 border-t border-border pt-4">
                  <span className="eyebrow text-muted-foreground">Drop {d.number}</span>
                  <span className="display text-4xl">{d.title}</span>
                </div>
                <p className="mt-3 max-w-xs text-sm text-muted-foreground">{d.statement}</p>
                <p className="eyebrow mt-4">
                  {p.name} — {formatEGP(p.price)}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Styling */}
      <section className="bg-cotton">
        <div className="container-editorial grid items-center gap-12 py-24 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="eyebrow text-muted-foreground">Styling Notes</p>
            <h2 className="display mt-6 text-5xl md:text-6xl">Wear it both ways.</h2>
            <ul className="mt-10 space-y-5 text-sm">
              <li className="border-t border-border pt-4">
                <span className="eyebrow mr-3">01</span>Linen Jacket, loose at the side, over a
                plain tee.
              </li>
              <li className="border-t border-border pt-4">
                <span className="eyebrow mr-3">02</span>Cinch it for a cleaner, classic line.
              </li>
              <li className="border-t border-border pt-4">
                <span className="eyebrow mr-3">03</span>Half-zip over a white tee with tailored
                trousers.
              </li>
            </ul>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <img
              src={detail}
              alt="Cotton-linen fabric and drawstring detail"
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container-editorial py-32 text-center md:py-44">
        <p className="eyebrow text-muted-foreground">Delivered across Egypt · Cash on delivery</p>
        <h2 className="display mx-auto mt-8 max-w-4xl text-[clamp(3rem,7vw,7rem)] uppercase">
          Create, don’t follow.
        </h2>
        <Button variant="editorial" className="mt-12" asChild>
          <Link to="/shop">Shop all drops</Link>
        </Button>
      </section>
    </>
  );
}
