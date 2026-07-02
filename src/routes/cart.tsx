import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ProductVisual } from "@/components/ProductVisual";
import { products } from "@/lib/catalog";
import { formatNaira } from "@/lib/format";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Cart — JP MAN WORLD" },
      { name: "description", content: "Your selection." },
      { property: "og:title", content: "Cart — JP MAN WORLD" },
      { property: "og:description", content: "Your selection." },
    ],
  }),
  component: Cart,
});

type Line = { slug: string; qty: number };

function Cart() {
  const [lines, setLines] = useState<Line[]>([
    { slug: products[0].slug, qty: 1 },
    { slug: products[2].slug, qty: 2 },
  ]);

  const items = lines
    .map((l) => {
      const p = products.find((x) => x.slug === l.slug);
      return p ? { ...l, product: p } : null;
    })
    .filter((x): x is Line & { product: (typeof products)[number] } => !!x);

  const subtotal = items.reduce((s, l) => s + l.product.price * l.qty, 0);
  const shipping = subtotal > 50000 ? 0 : 3500;
  const total = subtotal + shipping;

  const update = (slug: string, delta: number) => {
    setLines((prev) => prev.map((l) => (l.slug === slug ? { ...l, qty: Math.max(1, l.qty + delta) } : l)));
  };
  const remove = (slug: string) => setLines((prev) => prev.filter((l) => l.slug !== slug));

  return (
    <section className="container-editorial pt-14 pb-24 md:pt-20">
      <Reveal>
        <p className="eyebrow">Bag · 買い物袋</p>
        <h1 className="display mt-4 text-5xl md:text-6xl">Your selection.</h1>
      </Reveal>

      {items.length === 0 ? (
        <div className="mt-24 text-center">
          <p className="font-serif text-2xl">Your bag is empty.</p>
          <Link to="/shop" className="mt-6 inline-block border-b border-foreground pb-1 text-xs tracking-[0.28em] uppercase hover:text-accent">
            Continue shopping →
          </Link>
        </div>
      ) : (
        <div className="mt-14 grid gap-14 md:grid-cols-[1.4fr_1fr] md:gap-20">
          <div className="divide-y divide-border border-y border-border">
            {items.map((l, i) => (
              <Reveal key={l.slug} delay={i * 60}>
                <div className="grid grid-cols-[100px_1fr_auto] items-start gap-6 py-6 md:grid-cols-[140px_1fr_auto_auto] md:gap-8">
                  <div className="aspect-[4/5] overflow-hidden bg-muted">
                    <ProductVisual tone={l.product.images[0].tone} seed={l.slug.length} className="h-full w-full" />
                  </div>
                  <div className="min-w-0">
                    <p className="eyebrow">{l.product.jp}</p>
                    <Link to="/product/$slug" params={{ slug: l.product.slug }} className="mt-2 block font-serif text-xl leading-tight hover:text-accent">
                      {l.product.name}
                    </Link>
                    <p className="mt-1 text-xs text-muted-foreground">{l.product.maker} · {l.product.origin}</p>
                    <div className="mt-4 inline-flex items-center border border-foreground">
                      <button onClick={() => update(l.slug, -1)} aria-label="Decrease" className="grid h-9 w-9 place-items-center hover:bg-muted"><Minus className="h-3.5 w-3.5" strokeWidth={1.25} /></button>
                      <span className="grid h-9 w-8 place-items-center text-sm tabular-nums">{l.qty}</span>
                      <button onClick={() => update(l.slug, 1)} aria-label="Increase" className="grid h-9 w-9 place-items-center hover:bg-muted"><Plus className="h-3.5 w-3.5" strokeWidth={1.25} /></button>
                    </div>
                  </div>
                  <p className="font-serif text-lg tabular-nums md:text-xl">{formatNaira(l.product.price * l.qty)}</p>
                  <button onClick={() => remove(l.slug)} aria-label="Remove" className="col-span-full grid h-8 w-8 place-items-center justify-self-end text-muted-foreground hover:text-accent md:col-auto">
                    <X className="h-4 w-4" strokeWidth={1.25} />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <aside className="md:sticky md:top-28">
              <div className="border border-border p-8">
                <p className="eyebrow">Summary · 合計</p>
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">{formatNaira(subtotal)}</dd></div>
                  <div className="flex justify-between"><dt>Shipping (Lagos)</dt><dd className="tabular-nums">{shipping === 0 ? "Complimentary" : formatNaira(shipping)}</dd></div>
                  <div className="flex justify-between border-t border-border pt-3 font-serif text-xl">
                    <dt>Total</dt><dd className="tabular-nums">{formatNaira(total)}</dd>
                  </div>
                </dl>
                <button className="mt-8 w-full bg-primary py-4 text-xs tracking-[0.28em] uppercase text-primary-foreground hover:bg-accent">
                  Proceed to checkout
                </button>
                <p className="mt-3 text-center text-[10px] tracking-widest uppercase text-muted-foreground">Concept demo — checkout disabled</p>
                <label className="mt-6 flex items-start gap-3 text-sm">
                  <input type="checkbox" className="mt-1 accent-current" />
                  <span>Add furoshiki gift wrap for <span className="tabular-nums">₦2,500</span></span>
                </label>
              </div>
              <p className="mt-6 text-xs text-muted-foreground">
                Free Lagos delivery on orders above ₦50,000. Nationwide shipping calculated at checkout.
              </p>
            </aside>
          </Reveal>
        </div>
      )}
    </section>
  );
}
