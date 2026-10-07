import { createFileRoute, Link, notFound } from "@tanstack/react-router";

type Page = {
  title: string;
  intro: string;
  blocks: { h: string; p: string }[];
  table?: string[][];
};

const pages: Record<string, Page> = {
  shipping: {
    title: "Shipping",
    intro: "We deliver to every governorate in Egypt.",
    blocks: [
      {
        h: "Delivery time",
        p: "Cairo & Giza: 2–3 working days. Other governorates: 3–5 working days.",
      },
      { h: "Cost", p: "A flat shipping fee of EGP 60 is added at checkout." },
      {
        h: "Confirmation",
        p: "We call every order before dispatch to confirm your address and size.",
      },
    ],
  },
  returns: {
    title: "Returns & Exchanges",
    intro: "If it doesn’t fit the vision, we’ll make it right.",
    blocks: [
      {
        h: "Exchanges",
        p: "Exchange size or color within 14 days of delivery. Pieces must be unworn with tags attached.",
      },
      {
        h: "Returns",
        p: "Returns are accepted within 14 days for unworn items. Refunds are issued once the piece is inspected.",
      },
      { h: "How to start", p: "Message us on WhatsApp or email with your order number." },
    ],
  },
  "size-guide": {
    title: "Size Guide",
    intro:
      "Measurements in centimetres, taken flat. Box-fit pieces are cut with intentional volume.",
    blocks: [
      {
        h: "Between sizes?",
        p: "Size down for a cleaner classic line, stay true for the intended box fit.",
      },
    ],
    table: [
      ["Size", "Chest", "Length", "Sleeve"],
      ["S", "58", "68", "60"],
      ["M", "61", "70", "62"],
      ["L", "64", "72", "64"],
      ["XL", "67", "74", "66"],
    ],
  },
  faq: {
    title: "FAQ",
    intro: "The questions we hear most.",
    blocks: [
      {
        h: "Can I pay by card?",
        p: "Right now we accept cash on delivery. Card payment is coming soon.",
      },
      {
        h: "Will a drop be restocked?",
        p: "Some colors return; some don’t. Follow us on Instagram for drop news.",
      },
      { h: "Where are you based?", p: "Cairo, Egypt. Every piece is designed here." },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro: "We only collect what we need to deliver your order.",
    blocks: [
      {
        h: "What we collect",
        p: "Name, phone, email and delivery address — used only to process and deliver orders.",
      },
      {
        h: "Sharing",
        p: "Your details are shared only with our delivery partner. We never sell personal data.",
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    intro: "The short version of how buying from Twin Threads works.",
    blocks: [
      { h: "Orders", p: "Orders are confirmed by phone. We may cancel orders we cannot confirm." },
      { h: "Pricing", p: "All prices are in Egyptian pounds (EGP) and include applicable taxes." },
    ],
  },
};

export const Route = createFileRoute("/info/$page")({
  loader: ({ params }) => {
    const page = pages[params.page];
    if (!page) throw notFound();
    return { page };
  },
  head: ({ loaderData }) => {
    const t = `${loaderData?.page.title ?? "Info"} — Twin Threads`;
    const d = loaderData?.page.intro ?? "Twin Threads customer information";
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
      ],
    };
  },
  component: Info,
});

function Info() {
  const { page } = Route.useLoaderData();
  return (
    <div className="container-editorial grid gap-12 pb-32 pt-36 md:grid-cols-12">
      <div className="md:col-span-5">
        <p className="eyebrow text-muted-foreground">Customer Care</p>
        <h1 className="display mt-6 text-6xl md:text-7xl">{page.title}</h1>
        <p className="mt-6 max-w-sm text-sm text-muted-foreground">{page.intro}</p>
        <nav className="mt-12 flex flex-col items-start gap-2 text-sm">
          {Object.entries(pages).map(([k, v]) => (
            <Link
              key={k}
              to="/info/$page"
              params={{ page: k }}
              className="link-line text-muted-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {v.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="md:col-span-6 md:col-start-7">
        {page.table && (
          <table className="mb-12 w-full text-sm">
            <tbody>
              {page.table.map((row, i) => (
                <tr key={i} className="border-b border-border">
                  {row.map((c, j) => (
                    <td
                      key={j}
                      className={`py-3 ${i === 0 ? "eyebrow text-muted-foreground" : ""}`}
                    >
                      {c}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {page.blocks.map((b, i) => (
          <div key={b.h} className="border-t border-border py-8">
            <p className="eyebrow text-muted-foreground">0{i + 1}</p>
            <h2 className="mt-3 font-serif text-3xl">{b.h}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{b.p}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
