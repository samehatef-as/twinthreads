import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { shippingFor, type CartLine } from "./orders";

interface CartCtx {
  lines: CartLine[];
  count: number;
  subtotal: number;
  shipping: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (line: CartLine) => void;
  updateQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
}

export const lineKey = (l: Pick<CartLine, "productId" | "colorId" | "size">) =>
  `${l.productId}:${l.colorId}:${l.size}`;

const Ctx = createContext<CartCtx | null>(null);
const KEY = "tt-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch (e) {
      console.error(e);
    }
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready) localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, ready]);

  const value = useMemo<CartCtx>(() => {
    const subtotal = lines.reduce((s, l) => s + l.unitPrice * l.quantity, 0);
    const shipping = shippingFor(subtotal);
    return {
      lines,
      count: lines.reduce((s, l) => s + l.quantity, 0),
      subtotal,
      shipping,
      total: subtotal + shipping,
      open,
      setOpen,
      add: (line) =>
        setLines((prev) => {
          const k = lineKey(line);
          const found = prev.find((l) => lineKey(l) === k);
          if (found)
            return prev.map((l) =>
              lineKey(l) === k ? { ...l, quantity: l.quantity + line.quantity } : l,
            );
          return [...prev, line];
        }),
      updateQty: (k, qty) =>
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => lineKey(l) !== k)
            : prev.map((l) => (lineKey(l) === k ? { ...l, quantity: qty } : l)),
        ),
      remove: (k) => setLines((prev) => prev.filter((l) => lineKey(l) !== k)),
      clear: () => setLines([]),
    };
  }, [lines, open]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used within CartProvider");
  return c;
}
