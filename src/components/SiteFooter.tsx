import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border bg-primary text-primary-foreground">
      <div className="container-editorial py-16 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="font-serif text-3xl tracking-[0.14em]">JP MAN</div>
            <div className="mt-1 text-[10px] tracking-[0.42em] uppercase opacity-70">World · Lagos</div>
            <p className="mt-6 max-w-sm text-sm leading-relaxed opacity-80">
              A Japanese lifestyle house in Lagos. We source, curate and share objects, food and rituals from Japan — for the everyday life in Nigeria.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="mt-8 flex max-w-sm items-center gap-2 border-b border-primary-foreground/40 pb-2"
            >
              <input
                type="email"
                required
                placeholder="Your email"
                className="w-full bg-transparent text-sm placeholder:text-primary-foreground/60 focus:outline-none"
              />
              <button className="text-xs tracking-[0.22em] uppercase hover:text-accent">Subscribe</button>
            </form>
          </div>

          <FooterCol
            title="Shop"
            links={[
              { to: "/shop", label: "All Products" },
              { to: "/collections", label: "Collections" },
              { to: "/collections/seasonal", label: "Seasonal Picks" },
              { to: "/collections/gifting", label: "Gifting" },
            ]}
          />
          <FooterCol
            title="Experience"
            links={[
              { to: "/journal", label: "Journal" },
              { to: "/events", label: "Events" },
              { to: "/visit", label: "Visit Store" },
              { to: "/about", label: "About" },
            ]}
          />
          <FooterCol
            title="Care"
            links={[
              { to: "/contact", label: "Contact" },
              { to: "/wishlist", label: "Wishlist" },
              { to: "/cart", label: "Cart" },
            ]}
            extra={
              <a
                href="https://instagram.com/jpman.world"
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.22em] uppercase hover:text-accent"
              >
                <Instagram className="h-4 w-4" strokeWidth={1.25} />
                Instagram
              </a>
            }
          />
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-primary-foreground/20 pt-8 text-xs opacity-70 md:flex-row md:justify-between">
          <p>© {year} JP MAN WORLD. All rights reserved.</p>
          <p>14 Bourdillon Road, Ikoyi · Lagos, Nigeria</p>
        </div>

        {/* Rovoche signature */}
        <div className="mt-10 flex justify-center border-t border-primary-foreground/15 pt-10">
          <div className="text-center">
            <p className="text-[10px] tracking-[0.32em] uppercase opacity-60">Demo Concept for JP MAN WORLD</p>
            <a
              href="https://rovoche.com"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-block font-serif text-2xl tracking-[0.3em] transition-colors hover:text-accent"
            >
              ROVOCHE
            </a>
            <p className="mt-2 text-[11px] italic tracking-wide opacity-70">Built on Rock. Crafted to Last.</p>
            <p className="mt-3 text-[10px] tracking-[0.22em] uppercase opacity-55">
              Designed and developed by{" "}
              <a
                href="https://rovoche.com"
                target="_blank"
                rel="noreferrer noopener"
                className="link-underline link-underline-hover hover:text-accent"
              >
                rovoche.com
              </a>
            </p>
            <p className="mt-4 text-[10px] tracking-wide opacity-45">
              Speculative concept created exclusively for JP MAN WORLD.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
  extra,
}: {
  title: string;
  links: { to: string; label: string }[];
  extra?: React.ReactNode;
}) {
  return (
    <div>
      <h4 className="eyebrow mb-4 text-primary-foreground/80">{title}</h4>
      <ul className="space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="opacity-85 link-underline link-underline-hover hover:opacity-100">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
      {extra}
    </div>
  );
}
