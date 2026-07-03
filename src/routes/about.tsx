import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { ProductVisual } from "@/components/ProductVisual";
import { pexels } from "@/lib/images";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — JP MAN WORLD" },
      { name: "description", content: "JP MAN WORLD is a Japanese lifestyle house in Lagos. Our story, our makers, and the philosophy behind the store." },
      { property: "og:title", content: "About — JP MAN WORLD" },
      { property: "og:description", content: "A Japanese lifestyle house in Lagos." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-editorial pt-14 pb-16 md:pt-20 md:pb-24">
          <Reveal>
            <p className="eyebrow">About · 私達</p>
            <h1 className="display mt-6 text-5xl md:text-7xl lg:text-[6.5rem]">
              We don't just sell<br />Japanese products.
            </h1>
            <p className="display mt-4 text-4xl italic text-accent md:text-6xl lg:text-8xl">We bring Japan to Nigeria.</p>
          </Reveal>
        </div>
      </section>

      <section className="container-editorial grid gap-10 py-20 md:grid-cols-[1fr_1.15fr] md:gap-20">
        <Reveal>
          <div className="aspect-[4/5] overflow-hidden">
            <ProductVisual tone="wood" seed={61} src={pexels.torii} label="Torii gate in autumn" className="h-full w-full" />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="flex flex-col justify-center">
            <p className="eyebrow">Origin · 始まり</p>
            <h2 className="display mt-4 text-3xl md:text-4xl">A store built out of a Sunday obsession.</h2>
            <p className="mt-6 text-muted-foreground">
              JP MAN began in a small Ikoyi apartment, on a table stacked with tetsubin kettles and boxes of Uji matcha carried back in luggage. What started as a personal library of Japanese objects became a shop — and then a small institution.
            </p>
            <p className="mt-4 text-muted-foreground">
              Today we work with dozens of makers across Japan, from a fourth-generation Iwate ironworker to a sakura farmer in Nara. Every object is chosen twice — once for how it looks, once for how it will feel a decade from now.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-border bg-paper">
        <div className="container-editorial py-24">
          <Reveal>
            <p className="eyebrow">Philosophy · 哲学</p>
            <h2 className="display mt-4 max-w-4xl text-3xl md:text-5xl">Four things we believe.</h2>
          </Reveal>
          <div className="mt-16 grid gap-x-10 gap-y-14 md:grid-cols-2">
            {[
              { n: "01", t: "Fewer, better.", c: "We'd rather carry one honest kettle than ten mediocre ones. Every SKU earns its place on the shelf." },
              { n: "02", t: "The maker matters.", c: "We name the workshop, the town, the family. Anonymous products belong to another store." },
              { n: "03", t: "Objects that age well.", c: "A cast-iron pan, a hinoki board, a linen noren — they should be more beautiful in ten years than they are today." },
              { n: "04", t: "Ritual over rush.", c: "The Japanese tea hour is not a break from life; it is the point of it. We build the store around that idea." },
            ].map((v, i) => (
              <Reveal key={v.n} delay={i * 90}>
                <div className="grid grid-cols-[auto_1fr] items-start gap-6">
                  <span className="font-serif text-3xl text-accent">{v.n}</span>
                  <div>
                    <h3 className="font-serif text-2xl">{v.t}</h3>
                    <p className="mt-3 text-muted-foreground">{v.c}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-editorial py-24">
        <Reveal>
          <div className="mx-auto max-w-3xl border-l-2 border-accent pl-8">
            <p className="font-serif text-2xl italic leading-relaxed md:text-3xl">
              "The most Japanese thing we can teach in Lagos is not a product. It is a pace. A way of pouring water. A way of folding cloth."
            </p>
            <p className="eyebrow mt-6">— JP, Founder</p>
          </div>
        </Reveal>
      </section>
    </>
  );
}
