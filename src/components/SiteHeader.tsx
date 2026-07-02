import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Search, Heart, ShoppingBag, X } from "lucide-react";

const nav = [
  { to: "/collections", label: "Collections" },
  { to: "/shop", label: "Shop" },
  { to: "/journal", label: "Journal" },
  { to: "/events", label: "Events" },
  { to: "/visit", label: "Visit" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <div className="border-b border-border/70 bg-primary text-primary-foreground">
        <div className="container-editorial flex h-8 items-center justify-center overflow-hidden text-[10px] tracking-[0.28em] uppercase">
          <span className="opacity-90">Complimentary delivery within Lagos on orders above ₦50,000 · Now open in Ikoyi</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 border-b border-border/60 backdrop-blur transition-colors duration-500 ${
          scrolled ? "bg-background/90" : "bg-background/70"
        }`}
      >
        <div className="container-editorial grid h-16 grid-cols-[auto_1fr_auto] items-center gap-6 md:h-20">
          <button
            type="button"
            className="grid h-9 w-9 place-items-center -ml-2 md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" strokeWidth={1.25} />
          </button>

          <nav className="hidden items-center gap-8 md:flex">
            {nav.slice(0, 3).map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-xs tracking-[0.22em] uppercase link-underline link-underline-hover"
                activeProps={{ className: "text-accent" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <Link to="/" className="text-center">
            <div className="font-serif text-xl leading-none tracking-[0.14em] md:text-2xl">JP MAN</div>
            <div className="mt-0.5 text-[9px] tracking-[0.42em] uppercase text-muted-foreground">World · Lagos</div>
          </Link>

          <div className="flex items-center justify-end gap-1 md:gap-2">
            <nav className="mr-4 hidden items-center gap-8 md:flex">
              {nav.slice(3).map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="text-xs tracking-[0.22em] uppercase link-underline link-underline-hover"
                  activeProps={{ className: "text-accent" }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <button aria-label="Search" className="grid h-9 w-9 place-items-center hover:text-accent">
              <Search className="h-[18px] w-[18px]" strokeWidth={1.25} />
            </button>
            <Link to="/wishlist" aria-label="Wishlist" className="grid h-9 w-9 place-items-center hover:text-accent">
              <Heart className="h-[18px] w-[18px]" strokeWidth={1.25} />
            </Link>
            <Link to="/cart" aria-label="Cart" className="relative grid h-9 w-9 place-items-center hover:text-accent">
              <ShoppingBag className="h-[18px] w-[18px]" strokeWidth={1.25} />
              <span className="absolute right-1 top-1 grid h-4 w-4 place-items-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">2</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-sumi/40 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute left-0 top-0 h-full w-[86%] max-w-sm bg-background transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-border p-5">
            <span className="font-serif text-xl tracking-widest">JP MAN</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="grid h-9 w-9 place-items-center">
              <X className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>
          <nav className="flex flex-col p-5">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="border-b border-border/60 py-4 font-serif text-2xl"
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <div className="p-5 text-xs text-muted-foreground">
            <p className="eyebrow mb-3">Visit</p>
            <p>14 Bourdillon Road, Ikoyi<br />Lagos, Nigeria</p>
          </div>
        </aside>
      </div>
    </>
  );
}
