import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/catalog";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Wishlist — JP MAN WORLD" },
      { name: "description", content: "Save the pieces you love for later." },
      { property: "og:title", content: "Wishlist — JP MAN WORLD" },
      { property: "og:description", content: "Save the pieces you love." },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  // Demo state — three saved items.
  const saved = [products[0], products[3], products[7]];

  return (
    <section className="container-editorial pt-14 pb-24 md:pt-20">
      <Reveal>
        <div className="flex items-end justify-between">
          <div>
            <p className="eyebrow">Wishlist · 願い</p>
            <h1 className="display mt-4 text-5xl md:text-6xl">Saved for later.</h1>
          </div>
          <p className="text-sm text-muted-foreground">{saved.length} pieces</p>
        </div>
      </Reveal>

      {saved.length === 0 ? (
        <div className="mt-24 flex flex-col items-center text-center">
          <Heart className="h-8 w-8 text-muted-foreground" strokeWidth={1.25} />
          <p className="mt-6 font-serif text-2xl">Your wishlist is empty.</p>
          <Link to="/shop" className="mt-6 border-b border-foreground pb-1 text-xs tracking-[0.28em] uppercase hover:text-accent">
            Browse the shop →
          </Link>
        </div>
      ) : (
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
          {saved.map((p, i) => (
            <Reveal key={p.slug} delay={i * 70}>
              <ProductCard product={p} index={i} />
            </Reveal>
          ))}
        </div>
      )}
    </section>
  );
}
