import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { Logo } from "./Logo";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export const navLinks = [
  { label: "Shop", to: "/shop", drop: undefined },
  { label: "Drop 01", to: "/shop", drop: "drop-01" },
  { label: "Story", to: "/story", drop: undefined },
  { label: "Contact", to: "/contact", drop: undefined },
] as const;

const DARK_HERO_ROUTES = ["/", "/story"];

export function SiteHeader() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const { count, setOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [path]);
  useEffect(() => setMenu(false), [path]);

  const overHero = DARK_HERO_ROUTES.includes(path) && !scrolled;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-colors duration-500",
          overHero
            ? "text-ink-foreground"
            : "border-b border-border bg-background/90 text-foreground backdrop-blur-md",
        )}
      >
        <div className="container-editorial flex h-20 items-center gap-10">
          <Logo />
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                search={l.drop ? { drop: l.drop } : {}}
                className="eyebrow link-line pb-1"
                activeProps={{ className: "bg-[length:100%_1px]" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-5">
            <span className="eyebrow hidden opacity-80 md:inline">EGP</span>
            <Link to="/shop" aria-label="Search products" className="hidden md:inline-flex">
              <Search className="size-[18px]" strokeWidth={1.3} />
            </Link>
            <Link to="/contact" aria-label="Account" className="hidden md:inline-flex">
              <User className="size-[18px]" strokeWidth={1.3} />
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label={`Bag, ${count} items`}
              className="relative inline-flex items-center gap-2"
            >
              <ShoppingBag className="size-[18px]" strokeWidth={1.3} />
              <span className="eyebrow">{count}</span>
              {count > 0 && (
                <span className="absolute -right-1 -top-1 size-1.5 rounded-full bg-tangerine" />
              )}
            </button>
            <button className="lg:hidden" aria-label="Open menu" onClick={() => setMenu(true)}>
              <Menu className="size-5" strokeWidth={1.3} />
            </button>
          </div>
        </div>
      </header>

      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col bg-ink text-ink-foreground transition-opacity duration-500 lg:hidden",
          menu ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden={!menu}
      >
        <div className="container-editorial flex h-20 items-center justify-between">
          <Logo />
          <button aria-label="Close menu" onClick={() => setMenu(false)}>
            <X className="size-6" strokeWidth={1.2} />
          </button>
        </div>
        <nav className="container-editorial mt-10 flex flex-col gap-4" aria-label="Mobile">
          {navLinks.map((l, i) => (
            <Link
              key={l.label}
              to={l.to}
              search={l.drop ? { drop: l.drop } : {}}
              className="display text-6xl"
            >
              <span className="eyebrow mr-4 align-middle text-ink-muted">0{i + 1}</span>
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="container-editorial mt-auto flex justify-between border-t border-ink-border py-6 eyebrow text-ink-muted">
          <span>Cairo, Egypt</span>
          <span>EGP</span>
        </div>
      </div>
    </>
  );
}
