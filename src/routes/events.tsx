import { createFileRoute } from "@tanstack/react-router";
import { Calendar, MapPin, Users } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ProductVisual } from "@/components/ProductVisual";
import { events } from "@/lib/catalog";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Events — JP MAN WORLD" },
      { name: "description", content: "Japanese tastings, culture nights and workshops at the JP MAN store in Ikoyi, Lagos." },
      { property: "og:title", content: "Events — JP MAN WORLD" },
      { property: "og:description", content: "Tastings, workshops and culture nights in Lagos." },
    ],
  }),
  component: Events,
});

function Events() {
  return (
    <>
      <section className="border-b border-border bg-paper">
        <div className="container-editorial pt-14 pb-16 md:pt-20 md:pb-24">
          <Reveal>
            <p className="eyebrow">Events · 催し</p>
            <h1 className="display mt-4 text-5xl md:text-7xl">Come sit with us.</h1>
            <p className="mt-8 max-w-xl text-muted-foreground">
              Small gatherings at the store — tastings, workshops, and evenings that translate a piece of Japan into a Lagos night.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-editorial py-16 md:py-24">
        <div className="space-y-6">
          {events.map((e, i) => (
            <Reveal key={e.slug} delay={i * 70}>
              <article className="group grid gap-6 border-b border-border pb-6 md:grid-cols-[240px_1fr_auto] md:items-center md:gap-10">
                <div className="relative aspect-[5/4] w-full overflow-hidden md:aspect-[5/4]">
                  <ProductVisual tone={e.tone} seed={i * 23 + 7} src={e.image} label={e.title} className="h-full w-full transition-transform duration-[1200ms] group-hover:scale-105" />
                </div>
                <div>
                  <p className="eyebrow">{e.date}</p>
                  <h3 className="mt-3 font-serif text-2xl md:text-3xl">{e.title}</h3>
                  <p className="mt-3 max-w-lg text-sm text-muted-foreground">{e.description}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-2"><Calendar className="h-3.5 w-3.5" strokeWidth={1.25} />{e.time}</span>
                    <span className="inline-flex items-center gap-2"><MapPin className="h-3.5 w-3.5" strokeWidth={1.25} />{e.location}</span>
                    <span className="inline-flex items-center gap-2"><Users className="h-3.5 w-3.5" strokeWidth={1.25} />{e.seats}</span>
                  </div>
                </div>
                <button className="inline-flex w-fit items-center gap-3 bg-primary px-6 py-3 text-xs tracking-[0.28em] uppercase text-primary-foreground hover:bg-accent md:justify-self-end">
                  Reserve
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-20 border border-border p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <p className="eyebrow">Private events · 貸切</p>
                <h3 className="mt-4 font-serif text-3xl">Book the tea counter for your evening.</h3>
                <p className="mt-3 max-w-lg text-muted-foreground">
                  Six to sixteen guests, kaiseki-style tastings, private matcha service. We'll shape the evening around you.
                </p>
              </div>
              <a href="mailto:events@jpman.world" className="inline-flex items-center gap-3 border-b border-foreground pb-1 text-xs tracking-[0.28em] uppercase hover:text-accent">
                Enquire →
              </a>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
