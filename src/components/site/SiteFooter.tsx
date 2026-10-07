import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const shop = [
  { label: "Shop", to: "/shop", drop: undefined },
  { label: "Drop 01", to: "/shop", drop: "drop-01" },
  { label: "Drop 02", to: "/shop", drop: "drop-02" },
  { label: "Drop 03", to: "/shop", drop: "drop-03" },
  { label: "Story", to: "/story", drop: undefined },
  { label: "Contact", to: "/contact", drop: undefined },
] as const;
const customer = [
  { label: "Shipping", page: "shipping" },
  { label: "Returns & Exchanges", page: "returns" },
  { label: "Size Guide", page: "size-guide" },
  { label: "FAQ", page: "faq" },
  { label: "Privacy", page: "privacy" },
  { label: "Terms", page: "terms" },
] as const;

export function SiteFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="container-editorial grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="display mt-10 max-w-sm text-3xl text-ink-foreground/90">
            You don’t follow trends, you create them.
          </p>
        </div>
        <FooterCol title="Navigate" className="md:col-span-2">
          {shop.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              search={l.drop ? { drop: l.drop } : {}}
              className="link-line"
            >
              {l.label}
            </Link>
          ))}
        </FooterCol>
        <FooterCol title="Customer" className="md:col-span-3">
          {customer.map((l) => (
            <Link key={l.page} to="/info/$page" params={{ page: l.page }} className="link-line">
              {l.label}
            </Link>
          ))}
        </FooterCol>
        <FooterCol title="Social" className="md:col-span-2">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="link-line">
            Instagram
          </a>
          <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="link-line">
            TikTok
          </a>
        </FooterCol>
      </div>
      <div className="container-editorial flex flex-col gap-2 border-t border-ink-border py-6 eyebrow text-ink-muted md:flex-row md:justify-between">
        <span>© {new Date().getFullYear()} Twin Threads</span>
        <span>Egypt · EGP</span>
        <span>Two brothers, one vision</span>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <h3 className="eyebrow mb-6 text-ink-muted">{title}</h3>
      <div className="flex flex-col items-start gap-3 text-sm">{children}</div>
    </div>
  );
}
