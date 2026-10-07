import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { ProductCard } from "@/components/site/ProductCard";
import { drops, products } from "@/lib/catalog";
import { cn } from "@/lib/utils";

const search = z.object({ drop: z.enum(["drop-01", "drop-02", "drop-03"]).optional() });

export const Route = createFileRoute("/shop")({
  validateSearch: search,
  head: () => ({
    meta: [
      { title: "Shop — Twin Threads" },
      {
        name: "description",
        content:
          "Shop the Twin Threads drops: the Linen Jacket, the Suit and the Half-Zip Sweater.",
      },
      { property: "og:title", content: "Shop — Twin Threads" },
      { property: "og:description", content: "Three drops. Classic, Streetwear, Hybrid." },
    ],
  }),
  component: Shop,
});

function Shop() {
  const { drop } = Route.useSearch();
  const list = drop ? products.filter((p) => p.dropId === drop) : products;
  const current = drops.find((d) => d.id === drop);
  const filters = [
    { id: undefined, label: "All Products" },
    ...drops.map((d) => ({ id: d.id, label: `Drop ${d.number}` })),
  ];

  return (
    <div className="container-editorial pb-32 pt-36">
      <p className="eyebrow text-muted-foreground">
        {current ? `Drop ${current.number} — ${current.theme}` : "The Collection"}
      </p>
      <h1 className="display mt-6 text-[clamp(3.5rem,9vw,8rem)] uppercase">
        {current ? current.title : "Shop"}
      </h1>
      {current && (
        <p className="mt-6 max-w-md text-sm text-muted-foreground">{current.statement}</p>
      )}

      <nav
        className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-b border-border pb-4"
        aria-label="Filter by drop"
      >
        {filters.map((f) => (
          <Link
            key={f.label}
            to="/shop"
            search={f.id ? { drop: f.id } : {}}
            className={cn(
              "eyebrow pb-1",
              drop === f.id
                ? "border-b border-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {f.label}
          </Link>
        ))}
        <span className="eyebrow ml-auto text-muted-foreground">{list.length} pieces</span>
      </nav>

      <div className="mt-14 grid gap-x-6 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <div key={p.id} className={i % 3 === 1 ? "lg:mt-20" : ""}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
    </div>
  );
}
