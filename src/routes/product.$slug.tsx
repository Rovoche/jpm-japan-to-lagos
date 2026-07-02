import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, Heart, Minus, Plus, ShoppingBag, Truck, PackageCheck, RotateCcw } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ProductVisual } from "@/components/ProductVisual";
import { ProductCard } from "@/components/ProductCard";
import { products, collections } from "@/lib/catalog";
import { formatNaira } from "@/lib/format";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return product;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Product"} — JP MAN WORLD` },
      { name: "description", content: loaderData?.story ?? "" },
      { property: "og:title", content: `${loaderData?.name ?? "Product"} — JP MAN WORLD` },
      { property: "og:description", content: loaderData?.story ?? "" },
      { property: "og:type", content: "product" },
    ],
  }),
  notFoundComponent: () => (
    <div className="container-editorial py-32 text-center">
      <p className="eyebrow">Not found</p>
      <h1 className="display mt-4 text-4xl">This piece has sold.</h1>
      <Link to="/shop" className="mt-6 inline-block border-b border-foreground pb-1 text-xs tracking-[0.28em] uppercase hover:text-accent">
        Back to shop
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    console.error(error);
    return (
      <div className="container-editorial py-32 text-center">
        <h1 className="display text-3xl">This product didn't load.</h1>
        <button onClick={reset} className="mt-6 border-b border-foreground pb-1 text-xs tracking-[0.28em] uppercase">Try again</button>
      </div>
    );
  },
  component: ProductPage,
});

function ProductPage() {
  const product = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [qty, setQty] = useState(1);
  const collection = collections.find((c) => c.slug === product.collection);
  const related = products.filter((p) => p.collection === product.collection && p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <div className="container-editorial pt-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-xs tracking-[0.28em] uppercase text-muted-foreground hover:text-accent">
          <ArrowLeft className="h-3 w-3" strokeWidth={1.5} /> Back to shop
        </Link>
      </div>

      <section className="container-editorial grid gap-10 py-10 md:grid-cols-[1.15fr_1fr] md:gap-16 md:py-14">
        {/* Gallery */}
        <div>
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden bg-muted">
              <ProductVisual tone={product.images[active].tone} seed={active * 11 + product.slug.length} className="h-full w-full" />
              {product.isLimited && (
                <span className="absolute left-5 top-5 bg-accent px-3 py-1 text-[10px] tracking-[0.28em] uppercase text-accent-foreground">Limited</span>
              )}
            </div>
          </Reveal>
          <div className="mt-4 grid grid-cols-4 gap-3">
            {product.images.map((img, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className={`relative aspect-square overflow-hidden border transition-colors ${
                  active === i ? "border-foreground" : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <ProductVisual tone={img.tone} seed={i * 7 + product.slug.length} className="h-full w-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <Reveal delay={120}>
          <div className="md:sticky md:top-28">
            {collection && (
              <Link to="/collections/$slug" params={{ slug: collection.slug }} className="eyebrow hover:text-accent">
                {collection.name} · {product.jp}
              </Link>
            )}
            <h1 className="display mt-4 text-4xl md:text-5xl">{product.name}</h1>
            <p className="mt-3 text-sm text-muted-foreground">{product.maker} · {product.origin}</p>

            <div className="mt-8 flex items-baseline gap-4">
              <span className="font-serif text-3xl tabular-nums">{formatNaira(product.price)}</span>
              <span className="text-xs tracking-[0.28em] uppercase text-muted-foreground">In stock</span>
            </div>

            <p className="mt-8 text-base leading-relaxed text-foreground/85">{product.story}</p>

            <div className="mt-10 flex items-stretch gap-4">
              <div className="flex items-center border border-foreground">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease" className="grid h-12 w-12 place-items-center hover:bg-muted">
                  <Minus className="h-4 w-4" strokeWidth={1.25} />
                </button>
                <span className="grid h-12 w-10 place-items-center tabular-nums">{qty}</span>
                <button onClick={() => setQty((q) => q + 1)} aria-label="Increase" className="grid h-12 w-12 place-items-center hover:bg-muted">
                  <Plus className="h-4 w-4" strokeWidth={1.25} />
                </button>
              </div>
              <button className="group flex flex-1 items-center justify-center gap-3 bg-primary px-6 text-xs tracking-[0.28em] uppercase text-primary-foreground transition-colors hover:bg-accent">
                <ShoppingBag className="h-4 w-4" strokeWidth={1.5} /> Add to bag
              </button>
              <button aria-label="Wishlist" className="grid h-12 w-12 place-items-center border border-foreground hover:bg-muted">
                <Heart className="h-4 w-4" strokeWidth={1.25} />
              </button>
            </div>

            <ul className="mt-10 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3"><Truck className="h-4 w-4" strokeWidth={1.25} /> Complimentary Lagos delivery over ₦50,000</li>
              <li className="flex items-center gap-3"><PackageCheck className="h-4 w-4" strokeWidth={1.25} /> Furoshiki gift wrap available at checkout</li>
              <li className="flex items-center gap-3"><RotateCcw className="h-4 w-4" strokeWidth={1.25} /> 14-day quiet returns</li>
            </ul>

            {/* Specs */}
            <div className="mt-12 border-t border-border pt-8">
              <p className="eyebrow mb-4">Specifications</p>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                {product.specs.map((s) => (
                  <div key={s.label} className="flex justify-between border-b border-border/60 py-2">
                    <dt className="text-muted-foreground">{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Editorial band */}
      <section className="border-y border-border bg-paper">
        <div className="container-editorial grid gap-10 py-20 md:grid-cols-[1fr_1fr] md:gap-16">
          <Reveal>
            <div className="aspect-[5/6] overflow-hidden">
              <ProductVisual tone="wood" seed={product.slug.length + 40} className="h-full w-full" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col justify-center">
              <p className="eyebrow">The maker · {product.maker}</p>
              <h2 className="display mt-4 text-3xl md:text-4xl">Made in {product.origin}.</h2>
              <p className="mt-6 max-w-md text-muted-foreground">
                We visit every workshop we carry. This piece was chosen for its balance, its patience, and the way it will age with you.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="container-editorial py-20">
          <Reveal>
            <div className="flex items-end justify-between">
              <div>
                <p className="eyebrow">Complete the collection</p>
                <h2 className="display mt-4 text-3xl md:text-4xl">More from {collection?.name}</h2>
              </div>
              {collection && (
                <Link to="/collections/$slug" params={{ slug: collection.slug }} className="border-b border-foreground pb-1 text-xs tracking-[0.28em] uppercase hover:text-accent">
                  View all →
                </Link>
              )}
            </div>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
