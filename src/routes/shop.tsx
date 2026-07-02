import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SlidersHorizontal, Search as SearchIcon } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { collections, products, type CollectionSlug } from "@/lib/catalog";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — JP MAN WORLD" },
      { name: "description", content: "Every object in the store. Filter by collection, search by maker, sort by intent." },
      { property: "og:title", content: "Shop — JP MAN WORLD" },
      { property: "og:description", content: "Every object in the store." },
    ],
  }),
  component: Shop,
});

type Sort = "featured" | "price-asc" | "price-desc" | "new";

function Shop() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"all" | CollectionSlug>("all");
  const [sort, setSort] = useState<Sort>("featured");

  const list = useMemo(() => {
    let l = products.slice();
    if (filter !== "all") l = l.filter((p) => p.collection === filter);
    if (q.trim()) {
      const s = q.toLowerCase();
      l = l.filter((p) => p.name.toLowerCase().includes(s) || p.maker.toLowerCase().includes(s) || p.origin.toLowerCase().includes(s));
    }
    if (sort === "price-asc") l.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") l.sort((a, b) => b.price - a.price);
    if (sort === "new") l.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    return l;
  }, [q, filter, sort]);

  return (
    <>
      <section className="border-b border-border">
        <div className="container-editorial pt-14 pb-10 md:pt-20 md:pb-14">
          <Reveal>
            <p className="eyebrow">Shop · 店</p>
            <h1 className="display mt-4 text-5xl md:text-7xl">Everything, all at once.</h1>
            <p className="mt-6 max-w-xl text-muted-foreground">
              {products.length} objects, from {new Set(products.map((p) => p.origin)).size} places in Japan.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sticky top-16 z-30 border-b border-border bg-background/90 backdrop-blur md:top-20">
        <div className="container-editorial flex flex-wrap items-center gap-4 py-4">
          <div className="flex flex-1 min-w-[220px] items-center gap-2 border-b border-foreground/70 pb-2">
            <SearchIcon className="h-4 w-4 text-muted-foreground" strokeWidth={1.25} />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search product, maker or origin"
              className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-2 text-xs">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" strokeWidth={1.25} />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as typeof filter)}
              className="cursor-pointer border-b border-foreground/70 bg-transparent pb-2 pr-2 text-xs tracking-[0.22em] uppercase focus:outline-none"
            >
              <option value="all">All collections</option>
              {collections.map((c) => (
                <option key={c.slug} value={c.slug}>{c.name}</option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="cursor-pointer border-b border-foreground/70 bg-transparent pb-2 pr-2 text-xs tracking-[0.22em] uppercase focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="new">Newest</option>
              <option value="price-asc">Price · low</option>
              <option value="price-desc">Price · high</option>
            </select>
          </div>
        </div>
      </section>

      <section className="container-editorial py-14 md:py-20">
        <p className="eyebrow mb-10">{list.length} results</p>
        {list.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">Nothing here yet. Try a different search.</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
            {list.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 8) * 50}>
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
