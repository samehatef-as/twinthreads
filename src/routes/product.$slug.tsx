import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ColorSelector, SizeSelector } from "@/components/site/VariantSelectors";
import { ProductCard } from "@/components/site/ProductCard";
import { formatEGP, getDrop, getProduct, products, stockFor, type Size } from "@/lib/catalog";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    const t = p ? `${p.name} — Twin Threads` : "Product — Twin Threads";
    const d = p
      ? `${p.shortDescription} ${formatEGP(p.price)}. Cash on delivery across Egypt.`
      : "Twin Threads product";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
        { property: "og:type", content: "product" },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="container-editorial py-48 text-center">
      <p className="display text-5xl">This piece doesn’t exist.</p>
      <Link to="/shop" className="eyebrow link-line mt-8 inline-block">
        Back to shop
      </Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData();
  const drop = getDrop(p.dropId);
  const cart = useCart();
  const [colorId, setColorId] = useState(p.colors[0]!.id);
  const [size, setSize] = useState<Size | null>(null);
  const color = p.colors.find((c) => c.id === colorId)!;

  const gallery = useMemo(() => {
    const extra = (color.images ?? []).map((src) => ({
      src,
      alt: `${p.name} in ${color.name}`,
      kind: "model" as const,
    }));
    return [...extra, ...p.images.filter((i) => !color.images?.includes(i.src))];
  }, [color, p]);

  const available = size ? stockFor(p, colorId, size) > 0 : true;

  const add = () => {
    if (!size) {
      toast("Please choose a size.");
      return;
    }
    cart.add({
      productId: p.id,
      slug: p.slug,
      name: p.name,
      colorId,
      colorName: color.name,
      size,
      unitPrice: p.price,
      quantity: 1,
      image: gallery[0]!.src,
    });
    cart.setOpen(true);
  };

  return (
    <>
      <div className="container-editorial grid gap-12 pb-24 pt-28 lg:grid-cols-12">
        <div className="grid gap-3 lg:col-span-7">
          {gallery.map((img, i) => (
            <img
              key={img.src + i}
              src={img.src}
              alt={img.alt}
              className="w-full bg-muted object-contain"
              loading={i === 0 ? "eager" : "lazy"}
            />
          ))}
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-28">
            <nav className="eyebrow text-muted-foreground" aria-label="Breadcrumb">
              <Link to="/shop" className="link-line">
                Shop
              </Link>{" "}
              /{" "}
              <Link to="/shop" search={{ drop: p.dropId }} className="link-line">
                Drop {drop?.number}
              </Link>
            </nav>
            <h1 className="display mt-6 text-6xl">{p.name}</h1>
            <p className="mt-4 text-lg">{formatEGP(p.price)}</p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {p.shortDescription}
            </p>
            {p.includes && <p className="eyebrow mt-4">Includes: {p.includes.join(" + ")}</p>}

            <div className="mt-10 space-y-8">
              <ColorSelector
                product={p}
                value={colorId}
                onChange={(c) => {
                  setColorId(c);
                  setSize(null);
                }}
              />
              <SizeSelector product={p} colorId={colorId} value={size} onChange={setSize} />
              <div className="flex items-center justify-between">
                <p className="eyebrow">
                  <span
                    className={`mr-2 inline-block size-1.5 rounded-full ${available ? "bg-foreground" : "bg-destructive"}`}
                  />
                  {size ? (available ? "In stock" : "Sold out") : "Select a size"}
                </p>
                <Link
                  to="/info/$page"
                  params={{ page: "size-guide" }}
                  className="eyebrow link-line text-muted-foreground"
                >
                  Size guide
                </Link>
              </div>
              <Button variant="editorial" className="w-full" onClick={add} disabled={!available}>
                Add to bag — {formatEGP(p.price)}
              </Button>
              <p className="eyebrow text-center text-muted-foreground">
                Cash on delivery · Delivered across Egypt
              </p>
            </div>

            <Accordion
              type="multiple"
              defaultValue={["details"]}
              className="mt-10 border-t border-border"
            >
              <Item v="details" t="Details">
                <p className="mb-4">{p.description}</p>
                <ul className="list-inside list-disc space-y-1">
                  {p.details.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </Item>
              <Item v="material" t="Material & Fit">
                <p>Material: {p.material}</p>
                <p className="mt-2">Fit: {p.fit}</p>
                <p className="mt-2">SKU: {p.sku}</p>
              </Item>
              <Item v="shipping" t="Shipping">
                Delivered in 2–5 working days across Egypt. Flat shipping fee shown at checkout. Pay
                in cash on delivery.
              </Item>
              <Item v="returns" t="Returns & Exchange">
                Exchanges within 14 days for unworn pieces with tags attached.{" "}
                <Link to="/info/$page" params={{ page: "returns" }} className="link-line">
                  Read more
                </Link>
              </Item>
            </Accordion>
          </div>
        </div>
      </div>

      <section className="container-editorial border-t border-border py-24">
        <h2 className="display text-5xl">Complete the vision</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {products
            .filter((x) => x.id !== p.id)
            .map((x) => (
              <ProductCard key={x.id} product={x} />
            ))}
        </div>
      </section>
    </>
  );
}

function Item({ v, t, children }: { v: string; t: string; children: React.ReactNode }) {
  return (
    <AccordionItem value={v} className="border-border">
      <AccordionTrigger className="eyebrow py-5 hover:no-underline">{t}</AccordionTrigger>
      <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
