import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import type { Product } from "@/lib/catalog";
import { ProductVisual } from "./ProductVisual";
import { formatNaira } from "@/lib/format";

export function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  return (
    <Link
      to="/product/$slug"
      params={{ slug: product.slug }}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <div className="absolute inset-0 transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]">
          <ProductVisual tone={product.images[0].tone} seed={index + product.slug.length} className="h-full w-full" />
        </div>

        <div className="absolute left-4 top-4 flex gap-2">
          {product.isNew && <span className="eyebrow bg-background/85 px-2 py-1 backdrop-blur">New</span>}
          {product.isLimited && <span className="eyebrow bg-accent px-2 py-1 text-accent-foreground">Limited</span>}
        </div>

        <button
          type="button"
          aria-label={`Save ${product.name} to wishlist`}
          onClick={(e) => { e.preventDefault(); }}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-background/85 text-foreground opacity-0 backdrop-blur transition-all duration-500 group-hover:opacity-100 hover:bg-background"
        >
          <Heart className="h-4 w-4" strokeWidth={1.25} />
        </button>

        <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="bg-background/90 px-4 py-2.5 text-center text-xs tracking-widest uppercase backdrop-blur">
            Quick view
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="eyebrow mb-1">{product.jp}</p>
          <h3 className="font-serif text-lg leading-tight text-foreground">{product.name}</h3>
          <p className="mt-1 text-xs text-muted-foreground">{product.origin}</p>
        </div>
        <p className="shrink-0 font-serif text-lg text-foreground tabular-nums">{formatNaira(product.price)}</p>
      </div>
    </Link>
  );
}
