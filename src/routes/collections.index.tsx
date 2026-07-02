import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductVisual } from "@/components/ProductVisual";
import { collections, products } from "@/lib/catalog";

export const Route = createFileRoute("/collections/")({
  head: () => ({
    meta: [
      { title: "Collections — JP MAN WORLD" },
      { name: "description", content: "Seven collections of curated Japanese objects — kitchen, tea, skin, home, snacks, gifting and seasonal picks." },
      { property: "og:title", content: "Collections — JP MAN WORLD" },
      { property: "og:description", content: "Seven ways to bring Japan into the room." },
    ],
  }),
  component: CollectionsIndex,
});

function CollectionsIndex() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-editorial pt-16 pb-14 md:pt-24 md:pb-20">
          <Reveal>
            <p className="eyebrow">Collections · 蒐集</p>
            <h1 className="display mt-6 max-w-4xl text-5xl md:text-7xl lg:text-8xl">
              Seven doorways<br />into Japan.
            </h1>
            <p className="mt-8 max-w-xl text-muted-foreground">
              Each collection is an edit — makers, materials, and stories chosen for one specific corner of daily life.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-editorial py-16 md:py-24">
        <div className="grid gap-x-6 gap-y-16 md:grid-cols-2">
          {collections.map((c, i) => {
            const count = products.filter((p) => p.collection === c.slug).length;
            const tone = (["cream", "wood", "stone", "paper", "ink", "cream", "wood"] as const)[i];
            return (
              <Reveal key={c.slug} delay={i * 60}>
                <Link to="/collections/$slug" params={{ slug: c.slug }} className="group block">
                  <div className="relative aspect-[5/4] overflow-hidden">
                    <ProductVisual tone={tone} seed={i * 13 + 2} className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-sumi/50 to-transparent" />
                    <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-primary-foreground">
                      <div>
                        <p className="text-[10px] tracking-[0.32em] uppercase opacity-90">{c.jp} · {count} items</p>
                        <h2 className="mt-2 font-serif text-3xl md:text-4xl">{c.name}</h2>
                      </div>
                      <ArrowUpRight className="h-6 w-6 opacity-80 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1" strokeWidth={1.25} />
                    </div>
                  </div>
                  <p className="mt-5 max-w-md text-sm text-muted-foreground">{c.description}</p>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
