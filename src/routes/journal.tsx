import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ProductVisual } from "@/components/ProductVisual";
import { journal } from "@/lib/catalog";

export const Route = createFileRoute("/journal")({
  head: () => ({
    meta: [
      { title: "Journal — JP MAN WORLD" },
      { name: "description", content: "Notes on Japan from Lagos — rituals, recipes, guides and the quiet stories behind the objects we carry." },
      { property: "og:title", content: "Journal — JP MAN WORLD" },
      { property: "og:description", content: "Notes on Japan from Lagos." },
    ],
  }),
  component: Journal,
});

function Journal() {
  const [lead, ...rest] = journal;
  return (
    <>
      <section className="border-b border-border">
        <div className="container-editorial pt-14 pb-14 md:pt-20 md:pb-20">
          <Reveal>
            <p className="eyebrow">Journal · 日誌</p>
            <h1 className="display mt-4 text-5xl md:text-7xl lg:text-8xl">Notes on Japan,<br />from Lagos.</h1>
            <p className="mt-8 max-w-xl text-muted-foreground">
              Long reads on ritual, small guides on care, and the makers we've met along the way.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Lead */}
      <section className="container-editorial py-16 md:py-20">
        <Reveal>
          <article className="group grid gap-10 md:grid-cols-[1.15fr_1fr] md:gap-14">
            <div className="aspect-[5/6] overflow-hidden md:aspect-[4/5]">
              <ProductVisual tone={lead.tone} seed={2} src={lead.image} label={lead.title} className="h-full w-full transition-transform duration-[1400ms] group-hover:scale-[1.03]" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="eyebrow">Featured · {lead.category}</p>
              <h2 className="display mt-4 text-4xl md:text-5xl lg:text-6xl">{lead.title}</h2>
              <p className="mt-6 max-w-md text-muted-foreground">{lead.excerpt}</p>
              <p className="mt-8 text-xs tracking-[0.22em] uppercase text-muted-foreground">{lead.author} · {lead.date} · {lead.minutes} min read</p>
              <button className="mt-8 inline-flex w-fit items-center gap-3 border-b border-foreground pb-1 text-xs tracking-[0.28em] uppercase hover:text-accent">
                Read the essay <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </div>
          </article>
        </Reveal>
      </section>

      {/* Grid */}
      <section className="container-editorial py-16 md:py-24">
        <div className="grid gap-x-6 gap-y-16 md:grid-cols-3">
          {rest.map((j, i) => (
            <Reveal key={j.slug} delay={i * 80}>
              <article className="group">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <ProductVisual tone={j.tone} seed={i * 19 + 6} src={j.image} label={j.title} className="h-full w-full transition-transform duration-[1200ms] group-hover:scale-[1.05]" />
                </div>
                <p className="eyebrow mt-6">{j.category} · {j.minutes} min</p>
                <h3 className="mt-3 font-serif text-2xl leading-tight">{j.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{j.excerpt}</p>
                <p className="mt-4 text-xs tracking-[0.22em] uppercase text-muted-foreground">{j.author} · {j.date}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
