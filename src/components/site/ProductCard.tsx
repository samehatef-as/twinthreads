import { Link } from "@tanstack/react-router";
import { formatEGP, getDrop, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  const a = product.images[0]!;
  const b = product.images[1];
  const drop = getDrop(product.dropId);
  return (
    <Link to="/product/$slug" params={{ slug: product.slug }} className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={a.src}
          alt={a.alt}
          loading="lazy"
          className="absolute inset-0 size-full object-cover transition-transform duration-[1.4s] ease-editorial group-hover:scale-[1.03]"
        />
        {b && (
          <img
            src={b.src}
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        )}
        <span className="eyebrow absolute left-4 top-4 text-ink-foreground">
          Drop {drop?.number}
        </span>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-2xl">{product.name}</h3>
          <div className="mt-2 flex gap-1.5">
            {product.colors.map((c) => (
              <span
                key={c.id}
                title={c.name}
                className="size-2.5 border border-border"
                style={{ background: c.swatch }}
              />
            ))}
          </div>
        </div>
        <p className="text-sm">{formatEGP(product.price)}</p>
      </div>
    </Link>
  );
}
