import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/site/Field";
import { useCart } from "@/lib/cart";
import { formatEGP } from "@/lib/catalog";
import { createOrderId, governorates, paymentMethods, type Order } from "@/lib/orders";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Twin Threads" },
      {
        name: "description",
        content: "Complete your Twin Threads order. Cash on delivery across Egypt.",
      },
      { property: "og:title", content: "Checkout — Twin Threads" },
      { property: "og:description", content: "Cash on delivery across Egypt." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your full name").max(80),
  phone: z
    .string()
    .trim()
    .regex(/^(\+20|0)?1[0125]\d{8}$/, "Enter a valid Egyptian mobile number"),
  email: z.string().trim().email("Enter a valid email").max(120).or(z.literal("")),
  governorate: z.string().min(1, "Choose a governorate"),
  city: z.string().trim().min(2, "Enter your city / area").max(80),
  address: z.string().trim().min(4, "Enter your street address").max(200),
  building: z.string().trim().min(1, "Required").max(40),
  apartment: z.string().trim().max(40),
  notes: z.string().trim().max(500),
});

function Checkout() {
  const cart = useCart();
  const [errors, setErrors] = useState<Partial<Record<keyof z.infer<typeof schema>, string>>>({});
  const [payment, setPayment] = useState(paymentMethods.find((m) => m.enabled)!.id);
  const [order, setOrder] = useState<Order | null>(null);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const r = schema.safeParse(Object.fromEntries(new FormData(e.currentTarget)));
    if (!r.success)
      return setErrors(
        Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message])),
      );
    const o: Order = {
      id: createOrderId(),
      customer: r.data,
      items: cart.lines,
      subtotal: cart.subtotal,
      shipping: cart.shipping,
      discount: 0,
      total: cart.total,
      paymentMethod: payment,
      paymentStatus: "unpaid",
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    // TODO: send to backend. Stored locally until an orders backend is connected.
    const prev = JSON.parse(localStorage.getItem("tt-orders") ?? "[]");
    localStorage.setItem("tt-orders", JSON.stringify([...prev, o]));
    setOrder(o);
    cart.clear();
    window.scrollTo(0, 0);
  };

  if (order)
    return (
      <div className="container-editorial pb-32 pt-40 text-center">
        <p className="eyebrow text-muted-foreground">Order {order.id}</p>
        <h1 className="display mx-auto mt-6 max-w-3xl text-6xl md:text-7xl">
          Thank you, {order.customer.name.split(" ")[0]}.
        </h1>
        <p className="mx-auto mt-6 max-w-md text-sm text-muted-foreground">
          We’ll call {order.customer.phone} to confirm. Please have {formatEGP(order.total)} ready
          in cash on delivery.
        </p>
        <Button variant="editorial-outline" className="mt-10" asChild>
          <Link to="/shop">Continue shopping</Link>
        </Button>
      </div>
    );

  if (cart.lines.length === 0)
    return (
      <div className="container-editorial pb-32 pt-40 text-center">
        <h1 className="display text-6xl">Your bag is empty.</h1>
        <Button variant="editorial" className="mt-10" asChild>
          <Link to="/shop">Shop the drops</Link>
        </Button>
      </div>
    );

  return (
    <div className="container-editorial grid gap-16 pb-32 pt-32 lg:grid-cols-12">
      <form onSubmit={submit} noValidate className="lg:col-span-7">
        <h1 className="display text-6xl">Checkout</h1>
        <Section title="01 — Contact">
          <Field label="Full name" name="name" required error={errors.name} />
          <Field label="Phone" name="phone" type="tel" required error={errors.phone} />
          <Field
            label="Email (optional)"
            name="email"
            type="email"
            error={errors.email}
            className="sm:col-span-2"
          />
        </Section>
        <Section title="02 — Delivery">
          <Field
            label="Governorate"
            name="governorate"
            options={governorates}
            required
            error={errors.governorate}
          />
          <Field label="City / Area" name="city" required error={errors.city} />
          <Field
            label="Street address"
            name="address"
            required
            error={errors.address}
            className="sm:col-span-2"
          />
          <Field label="Building" name="building" required error={errors.building} />
          <Field label="Apartment" name="apartment" error={errors.apartment} />
          <Field
            label="Notes"
            name="notes"
            textarea
            error={errors.notes}
            className="sm:col-span-2"
          />
        </Section>
        <section className="mt-14">
          <h2 className="eyebrow border-b border-foreground pb-3">03 — Payment</h2>
          <div className="mt-6 space-y-3" role="radiogroup">
            {paymentMethods.map((m) => (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={payment === m.id}
                disabled={!m.enabled}
                onClick={() => setPayment(m.id)}
                className={cn(
                  "flex w-full items-center justify-between border p-5 text-left",
                  payment === m.id ? "border-foreground" : "border-border",
                  !m.enabled && "opacity-40",
                )}
              >
                <span>
                  <span className="block text-sm">{m.label}</span>
                  <span className="text-xs text-muted-foreground">{m.description}</span>
                </span>
                <span
                  className={cn(
                    "size-3 rounded-full border border-foreground",
                    payment === m.id && "bg-foreground",
                  )}
                />
              </button>
            ))}
          </div>
        </section>
        <Button variant="editorial" type="submit" className="mt-12 w-full">
          Place order — {formatEGP(cart.total)}
        </Button>
      </form>

      <aside className="lg:col-span-4 lg:col-start-9">
        <div className="bg-cotton p-8 lg:sticky lg:top-28">
          <h2 className="eyebrow">Your order</h2>
          <ul className="mt-6 divide-y divide-border">
            {cart.lines.map((l) => (
              <li key={`${l.productId}${l.colorId}${l.size}`} className="flex gap-4 py-4">
                <img src={l.image} alt={l.name} className="h-20 w-16 object-cover" />
                <div className="flex-1 text-sm">
                  <p className="font-serif text-lg">{l.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {l.colorName} · {l.size} · ×{l.quantity}
                  </p>
                </div>
                <p className="text-sm">{formatEGP(l.unitPrice * l.quantity)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-border pt-4 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <dt>Subtotal</dt>
              <dd>{formatEGP(cart.subtotal)}</dd>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <dt>Shipping</dt>
              <dd>{formatEGP(cart.shipping)}</dd>
            </div>
            <div className="flex justify-between border-t border-border pt-3 font-medium">
              <dt>Total</dt>
              <dd>{formatEGP(cart.total)}</dd>
            </div>
          </dl>
        </div>
      </aside>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <h2 className="eyebrow border-b border-foreground pb-3">{title}</h2>
      <div className="mt-6 grid gap-8 sm:grid-cols-2">{children}</div>
    </section>
  );
}
