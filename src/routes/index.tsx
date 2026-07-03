import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { ProductVisual } from "@/components/ProductVisual";
import { ProductCard } from "@/components/ProductCard";
import { products, collections, journal } from "@/lib/catalog";
import { pexels } from "@/lib/images";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "JP MAN WORLD — Bring Japan Home" },
      { name: "description", content: "A Japanese lifestyle house in Lagos. Curated objects, food, tea and rituals from Japan — for the everyday life in Nigeria." },
      { property: "og:title", content: "JP MAN WORLD — Bring Japan Home" },
      { property: "og:description", content: "A Japanese lifestyle house in Lagos. Objects, food, tea and rituals — for the everyday life in Nigeria." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = products.slice(0, 4);
  const seasonal = products.filter((p) => p.collection === "seasonal");

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-paper">
        <div className="container-editorial grid gap-10 pt-14 pb-20 md:grid-cols-[1.05fr_0.95fr] md:gap-16 md:pt-24 md:pb-32">
          <Reveal>
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-3">
                <span className="h-px w-10 bg-foreground/50" />
                <span className="eyebrow">Est. Lagos · 令和</span>
              </div>
              <h1 className="display mt-6 text-[3.25rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[6.5rem]">
                Bring<br />
                Japan<br />
                <span className="italic text-accent">Home.</span>
              </h1>
              <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">
                JP MAN WORLD is a Japanese lifestyle house in Lagos. We source, curate and share the objects, food and quiet rituals of Japan — for the everyday life in Nigeria.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Link
                  to="/shop"
                  className="group inline-flex items-center gap-3 bg-primary px-7 py-4 text-xs tracking-[0.28em] uppercase text-primary-foreground transition-colors hover:bg-accent"
                >
                  Shop the edit
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} />
                </Link>
                <Link
                  to="/visit"
                  className="group inline-flex items-center gap-2 border-b border-foreground pb-1 text-xs tracking-[0.28em] uppercase hover:text-accent"
                >
                  Visit the store
                  <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </div>
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <ProductVisual tone="wood" seed={7} src={pexels.torii} label="Torii gate in autumn" className="h-full w-full" />
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-primary-foreground mix-blend-difference">
                  <div>
                    <p className="text-[10px] tracking-[0.32em] uppercase opacity-80">Spring Edit · 春</p>
                    <p className="mt-1 font-serif text-xl">Kiso Hinoki, Uji Matcha, and quiet objects for April.</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 hidden aspect-[3/4] w-40 overflow-hidden border-8 border-background md:block">
                <ProductVisual tone="cream" seed={2} src={pexels.teaCeremony} label="Traditional tea ceremony setting" className="h-full w-full" />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Marquee */}
        <div className="overflow-hidden border-t border-border py-4">
          <div className="marquee-track flex w-max gap-14 whitespace-nowrap text-xs tracking-[0.32em] uppercase text-muted-foreground">
            {Array.from({ length: 2 }).map((_, k) => (
              <div key={k} className="flex gap-14">
                {["Iwate", "Kyoto", "Kiso Valley", "Okinawa", "Uji", "Awaji", "Arita", "Tokushima", "Nagasaki"].map((c) => (
                  <span key={`${k}-${c}`} className="flex items-center gap-14">
                    {c}
                    <span className="h-1 w-1 rounded-full bg-foreground/40" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COLLECTIONS */}
      <section className="container-editorial py-24 md:py-32">
        <Reveal>
          <SectionHeading eyebrow="Collections" jp="蒐集" title="Seven ways to bring Japan into the room.">
            Every collection is a small doorway. Pass through — the kitchen, the bath, the tea hour — and you'll find the object made for it.
          </SectionHeading>
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
          {collections.slice(0, 6).map((c, i) => (
            <Reveal key={c.slug} delay={i * 60}>
              <Link
                to="/collections/$slug"
                params={{ slug: c.slug }}
                className="group relative block aspect-[4/5] overflow-hidden bg-muted"
              >
                <ProductVisual
                  tone={(["cream", "paper", "stone", "wood", "ink", "cream"] as const)[i]}
                  seed={i * 11 + 3}
                  src={c.image}
                  label={c.name}
                  className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sumi/60 via-transparent to-transparent" />
                <div className="absolute inset-x-6 bottom-6 flex items-end justify-between text-primary-foreground">
                  <div>
                    <p className="text-[10px] tracking-[0.32em] uppercase opacity-90">{c.jp}</p>
                    <h3 className="mt-2 font-serif text-2xl md:text-3xl">{c.name}</h3>
                  </div>
                  <ArrowUpRight className="h-5 w-5 translate-x-0 opacity-80 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={1.25} />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="border-t border-border bg-paper">
        <div className="container-editorial py-24 md:py-32">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <SectionHeading eyebrow="Featured" jp="今週の一品" title="This week, on the shelf.">
                A small edit chosen by our buyers — from a fourth-generation Iwate foundry to a Kyoto blossom farm.
              </SectionHeading>
            </Reveal>
            <Reveal delay={120}>
              <Link to="/shop" className="border-b border-foreground pb-1 text-xs tracking-[0.28em] uppercase hover:text-accent">
                Shop all →
              </Link>
            </Reveal>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SHOP BY LIFESTYLE */}
      <section className="container-editorial py-24 md:py-32">
        <Reveal>
          <SectionHeading eyebrow="By Lifestyle" jp="暮らし" title="Choose the moment. We'll bring the object." />
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { title: "The Morning Ritual", jp: "朝", copy: "Tea, ceramic, a slow start.", tone: "cream" as const, to: "tea-time" as const },
            { title: "The Kitchen at Work", jp: "台所", copy: "Cast iron, hinoki, honest tools.", tone: "wood" as const, to: "kitchen-table" as const },
            { title: "The Evening Bath", jp: "湯", copy: "Yuzu, camellia, silence.", tone: "stone" as const, to: "skin-ritual" as const },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 90}>
              <Link
                to="/collections/$slug"
                params={{ slug: b.to }}
                className="group block"
              >
                <div className="relative aspect-[5/6] overflow-hidden">
                  <ProductVisual tone={b.tone} seed={i * 17 + 5} className="h-full w-full transition-transform duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] group-hover:scale-105" />
                </div>
                <div className="mt-5">
                  <p className="eyebrow">{b.jp}</p>
                  <h3 className="mt-2 font-serif text-2xl">{b.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{b.copy}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CULTURE */}
      <section className="relative overflow-hidden border-y border-border bg-primary text-primary-foreground">
        <div className="container-editorial grid gap-10 py-24 md:grid-cols-[1fr_1fr] md:gap-20 md:py-40">
          <Reveal>
            <div>
              <p className="eyebrow text-primary-foreground/70">Culture · 文化</p>
              <h2 className="display mt-6 text-4xl md:text-6xl">
                We don't just sell Japanese products.<br />
                <span className="italic text-accent">We bring Japan to Nigeria.</span>
              </h2>
              <p className="mt-8 max-w-md text-primary-foreground/80">
                Every object we carry has a maker and a place. We spend our year visiting small foundries, tea gardens, and family kilns — and translating the stories home to Lagos.
              </p>
              <Link
                to="/about"
                className="mt-10 inline-flex items-center gap-3 border-b border-primary-foreground/60 pb-1 text-xs tracking-[0.28em] uppercase hover:text-accent hover:border-accent"
              >
                Our story <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <div className="grid grid-cols-2 gap-3">
              <div className="aspect-[3/4] overflow-hidden"><ProductVisual tone="ink" seed={9} src={pexels.ramen} label="Bowl of Japanese ramen" className="h-full w-full" /></div>
              <div className="aspect-[3/4] translate-y-10 overflow-hidden"><ProductVisual tone="wood" seed={12} src={pexels.torii} label="Torii gate in autumn" className="h-full w-full" /></div>
              <div className="aspect-[3/4] -translate-y-6 overflow-hidden"><ProductVisual tone="stone" seed={15} src={pexels.teaCeremony} label="Traditional tea ceremony setting" className="h-full w-full" /></div>
              <div className="aspect-[3/4] overflow-hidden"><ProductVisual tone="cream" seed={18} src={pexels.mochi} label="Assorted mochi desserts" className="h-full w-full" /></div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SEASONAL */}
      <section className="container-editorial py-24 md:py-32">
        <Reveal>
          <SectionHeading eyebrow="Seasonal Edit" jp="春" title="Spring, and what we notice.">
            The Japanese calendar counts seventy-two small seasons. This is what we carry for this one.
          </SectionHeading>
        </Reveal>
        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4">
          {[...seasonal, ...products.slice(3, 5)].slice(0, 4).map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <ProductCard product={p} index={i + 4} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* STORE EXPERIENCE */}
      <section className="border-t border-border bg-paper">
        <div className="container-editorial grid gap-10 py-24 md:grid-cols-[0.9fr_1.1fr] md:gap-20 md:py-32">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden">
              <ProductVisual tone="wood" seed={22} src={pexels.knifeAsparagus} label="Preparing food in the store kitchen" className="h-full w-full" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex flex-col justify-center">
              <p className="eyebrow">The Store · 店</p>
              <h2 className="display mt-4 text-4xl md:text-5xl">
                14 Bourdillon Road.<br />A small piece of Japan in Ikoyi.
              </h2>
              <p className="mt-6 max-w-md text-muted-foreground">
                Cedar walls, a tea counter, and a rotating gallery of makers we love. Come for a cup of hojicha; leave with a tetsubin.
              </p>
              <dl className="mt-10 grid grid-cols-2 gap-6 text-sm">
                <div>
                  <dt className="eyebrow mb-2">Hours</dt>
                  <dd>Tue – Sun<br />11am – 8pm</dd>
                </div>
                <div>
                  <dt className="eyebrow mb-2">Contact</dt>
                  <dd>hello@jpman.world<br />+234 (0) 800 000 000</dd>
                </div>
              </dl>
              <div className="mt-10 flex gap-6">
                <Link to="/visit" className="inline-flex items-center gap-3 bg-primary px-6 py-3 text-xs tracking-[0.28em] uppercase text-primary-foreground hover:bg-accent">
                  Directions <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
                <Link to="/events" className="border-b border-foreground pb-1 text-xs tracking-[0.28em] uppercase hover:text-accent">
                  Upcoming events
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* JOURNAL PREVIEW */}
      <section className="container-editorial py-24 md:py-32">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionHeading eyebrow="Journal" jp="日誌" title="Notes on Japan, from Lagos." />
          </Reveal>
          <Reveal delay={120}>
            <Link to="/journal" className="border-b border-foreground pb-1 text-xs tracking-[0.28em] uppercase hover:text-accent">
              Read the Journal →
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {journal.slice(0, 3).map((j, i) => (
            <Reveal key={j.slug} delay={i * 90}>
              <article className="group">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <ProductVisual tone={j.tone} seed={i * 23 + 11} src={j.image} label={j.title} className="h-full w-full transition-transform duration-[1200ms] group-hover:scale-105" />
                </div>
                <p className="eyebrow mt-6">{j.category} · {j.minutes} min</p>
                <h3 className="mt-3 font-serif text-2xl leading-tight">{j.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{j.excerpt}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="border-t border-border bg-paper">
        <div className="container-editorial py-24">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <SectionHeading eyebrow="Instagram" jp="@jpman.world" title="Follow the day, in fragments." />
            </Reveal>
            <Reveal delay={100}>
              <a href="https://instagram.com/jpman.world" target="_blank" rel="noreferrer noopener" className="border-b border-foreground pb-1 text-xs tracking-[0.28em] uppercase hover:text-accent">
                @jpman.world →
              </a>
            </Reveal>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-2 md:grid-cols-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="group relative aspect-square overflow-hidden">
                  <ProductVisual
                    tone={(["cream", "wood", "stone", "paper", "ink", "cream"] as const)[i]}
                    seed={i * 29 + 4}
                    src={[pexels.matchaScoop, pexels.mochi, pexels.teaLeaves, pexels.rockSalt, pexels.sauces, pexels.bathEssentials][i]}
                    className="h-full w-full transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container-editorial py-24 md:py-40">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Letters from Japan · 便り</p>
            <h2 className="display mt-6 text-4xl md:text-5xl">Small notes, once a month.</h2>
            <p className="mt-4 text-muted-foreground">
              New arrivals, seasonal rituals, and a few quiet stories from the road. No noise.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="mx-auto mt-10 flex max-w-md items-center gap-3 border-b border-foreground pb-2">
              <input type="email" required placeholder="Your email address" className="w-full bg-transparent text-sm placeholder:text-muted-foreground focus:outline-none" />
              <button className="text-xs tracking-[0.28em] uppercase hover:text-accent">Subscribe</button>
            </form>
          </div>
        </Reveal>
      </section>
    </>
  );
}
