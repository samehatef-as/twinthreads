import { cn } from "@/lib/utils";
import { stockFor, type Product, type Size } from "@/lib/catalog";

export function ColorSelector({
  product,
  value,
  onChange,
}: {
  product: Product;
  value: string;
  onChange: (id: string) => void;
}) {
  const current = product.colors.find((c) => c.id === value);
  return (
    <fieldset>
      <legend className="eyebrow mb-3 flex gap-2">
        <span className="text-muted-foreground">Color</span>
        {current?.name}
      </legend>
      <div className="flex flex-wrap gap-2">
        {product.colors.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-label={c.name}
            aria-pressed={c.id === value}
            onClick={() => onChange(c.id)}
            className={cn(
              "p-1 transition-colors",
              c.id === value
                ? "border border-foreground"
                : "border border-transparent hover:border-border",
            )}
          >
            <span className="block h-5 w-8 border border-border" style={{ background: c.swatch }} />
          </button>
        ))}
      </div>
    </fieldset>
  );
}

export function SizeSelector({
  product,
  colorId,
  value,
  onChange,
}: {
  product: Product;
  colorId: string;
  value: Size | null;
  onChange: (s: Size) => void;
}) {
  return (
    <fieldset>
      <legend className="eyebrow mb-3 text-muted-foreground">Size</legend>
      <div className="grid grid-cols-4 gap-2">
        {product.sizes.map((s) => {
          const out = stockFor(product, colorId, s) === 0;
          return (
            <button
              key={s}
              type="button"
              disabled={out}
              aria-pressed={value === s}
              aria-label={out ? `${s} — sold out` : s}
              onClick={() => onChange(s)}
              className={cn(
                "relative h-12 border text-sm transition-colors",
                value === s
                  ? "border-foreground bg-foreground text-background"
                  : "border-border hover:border-foreground",
                out && "cursor-not-allowed text-muted-foreground line-through hover:border-border",
              )}
            >
              {s}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
