import { Link } from "@tanstack/react-router";
import { Minus, Plus, X } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { lineKey, useCart } from "@/lib/cart";
import { formatEGP } from "@/lib/catalog";

export function CartDrawer() {
  const c = useCart();
  return (
    <Sheet open={c.open} onOpenChange={c.setOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 border-l border-border bg-background p-0 sm:max-w-md [&>button]:hidden"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-6">
          <SheetTitle className="eyebrow font-medium">Bag ({c.count})</SheetTitle>
          <SheetDescription className="sr-only">Your selected pieces</SheetDescription>
          <button aria-label="Close bag" onClick={() => c.setOpen(false)}>
            <X className="size-5" strokeWidth={1.2} />
          </button>
        </div>

        {c.lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 text-center">
            <p className="display text-4xl">Your bag is empty.</p>
            <Button variant="editorial-outline" asChild onClick={() => c.setOpen(false)}>
              <Link to="/shop">Explore the drops</Link>
            </Button>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto px-6">
              {c.lines.map((l) => {
                const k = lineKey(l);
                return (
                  <li key={k} className="flex gap-4 py-6">
                    <img
                      src={l.image}
                      alt={l.name}
                      className="h-32 w-24 object-cover"
                      loading="lazy"
                    />
                    <div className="flex flex-1 flex-col">
                      <div className="flex justify-between gap-2">
                        <p className="font-serif text-xl">{l.name}</p>
                        <p className="text-sm">{formatEGP(l.unitPrice * l.quantity)}</p>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {l.colorName} · {l.size} · {formatEGP(l.unitPrice)}
                      </p>
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-border">
                          <button
                            className="p-2"
                            aria-label="Decrease quantity"
                            onClick={() => c.updateQty(k, l.quantity - 1)}
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-8 text-center text-xs">{l.quantity}</span>
                          <button
                            className="p-2"
                            aria-label="Increase quantity"
                            onClick={() => c.updateQty(k, l.quantity + 1)}
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>
                        <button
                          className="eyebrow link-line text-muted-foreground"
                          onClick={() => c.remove(k)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="space-y-3 border-t border-border px-6 py-6 text-sm">
              <Row label="Subtotal" value={formatEGP(c.subtotal)} />
              <Row label="Shipping" value={formatEGP(c.shipping)} />
              <Row label="Total" value={formatEGP(c.total)} strong />
              <Button
                variant="editorial"
                className="mt-4 w-full"
                asChild
                onClick={() => c.setOpen(false)}
              >
                <Link to="/checkout">Checkout — Cash on Delivery</Link>
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div
      className={`flex justify-between ${strong ? "border-t border-border pt-3 font-medium" : "text-muted-foreground"}`}
    >
      <span className="eyebrow">{label}</span>
      <span>{value}</span>
    </div>
  );
}
