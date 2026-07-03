import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Clock, Phone, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ProductVisual } from "@/components/ProductVisual";
import { pexels } from "@/lib/images";

export const Route = createFileRoute("/visit")({
  head: () => ({
    meta: [
      { title: "Visit — JP MAN WORLD, Ikoyi" },
      { name: "description", content: "Visit JP MAN WORLD at 14 Bourdillon Road, Ikoyi, Lagos. Hours, directions, WhatsApp." },
      { property: "og:title", content: "Visit — JP MAN WORLD" },
      { property: "og:description", content: "14 Bourdillon Road, Ikoyi, Lagos." },
    ],
  }),
  component: Visit,
});

function Visit() {
  return (
    <>
      <section className="border-b border-border">
        <div className="container-editorial pt-14 pb-12 md:pt-20 md:pb-16">
          <Reveal>
            <p className="eyebrow">Visit · 訪問</p>
            <h1 className="display mt-4 text-5xl md:text-7xl">14 Bourdillon Road,<br />Ikoyi.</h1>
            <p className="mt-8 max-w-xl text-muted-foreground">
              Cedar walls, a tea counter, a rotating gallery of makers. Come in for a cup of hojicha.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Photo grid */}
      <section className="container-editorial py-14">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          <Reveal><div className="aspect-[3/4] overflow-hidden"><ProductVisual tone="wood" seed={41} src={pexels.teaCeremony} label="Tea counter inside the store" className="h-full w-full" /></div></Reveal>
          <Reveal delay={80}><div className="aspect-[3/4] overflow-hidden md:translate-y-8"><ProductVisual tone="cream" seed={44} src={pexels.sushi} label="Tableware display" className="h-full w-full" /></div></Reveal>
          <Reveal delay={160}><div className="aspect-[3/4] overflow-hidden"><ProductVisual tone="stone" seed={47} src={pexels.vintageCups} label="Cup collection on shelves" className="h-full w-full" /></div></Reveal>
          <Reveal delay={240}><div className="aspect-[3/4] overflow-hidden md:translate-y-8"><ProductVisual tone="ink" seed={50} src={pexels.incense} label="Incense in a ceramic vase" className="h-full w-full" /></div></Reveal>
        </div>
      </section>

      {/* Details */}
      <section className="container-editorial grid gap-10 pb-24 md:grid-cols-[1fr_1.2fr] md:gap-16">
        <Reveal>
          <div className="space-y-8">
            <div>
              <p className="eyebrow flex items-center gap-2"><MapPin className="h-3.5 w-3.5" strokeWidth={1.25} /> Address</p>
              <p className="mt-3 font-serif text-2xl leading-snug">14 Bourdillon Road<br />Ikoyi, Lagos 101233<br />Nigeria</p>
            </div>
            <div>
              <p className="eyebrow flex items-center gap-2"><Clock className="h-3.5 w-3.5" strokeWidth={1.25} /> Hours</p>
              <dl className="mt-3 grid max-w-xs grid-cols-2 gap-y-1.5 text-sm">
                <dt className="text-muted-foreground">Mon</dt><dd>Closed</dd>
                <dt className="text-muted-foreground">Tue – Fri</dt><dd>11am – 8pm</dd>
                <dt className="text-muted-foreground">Sat</dt><dd>10am – 9pm</dd>
                <dt className="text-muted-foreground">Sun</dt><dd>12pm – 6pm</dd>
              </dl>
            </div>
            <div>
              <p className="eyebrow flex items-center gap-2"><Phone className="h-3.5 w-3.5" strokeWidth={1.25} /> Contact</p>
              <p className="mt-3 text-sm">+234 (0) 800 000 000<br />hello@jpman.world</p>
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href="https://wa.me/2348000000000" target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-3 bg-primary px-6 py-3 text-xs tracking-[0.28em] uppercase text-primary-foreground hover:bg-accent">
                <MessageCircle className="h-4 w-4" strokeWidth={1.5} /> WhatsApp us
              </a>
              <a href="https://www.google.com/maps/search/?api=1&query=Bourdillon+Road+Ikoyi+Lagos" target="_blank" rel="noreferrer noopener" className="border-b border-foreground pb-1 text-xs tracking-[0.28em] uppercase hover:text-accent">
                Open in Google Maps →
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <div className="relative aspect-[4/5] overflow-hidden border border-border bg-muted">
            {/* Editorial map illustration */}
            <svg viewBox="0 0 400 500" className="h-full w-full">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="oklch(0.85 0.008 80)" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="400" height="500" fill="oklch(0.955 0.012 82)" />
              <rect width="400" height="500" fill="url(#grid)" />
              <path d="M0 300 Q 100 260 200 290 T 400 260" stroke="oklch(0.62 0.055 55)" strokeWidth="18" fill="none" opacity="0.35" />
              <path d="M60 0 L 80 500" stroke="oklch(0.78 0.008 80)" strokeWidth="26" opacity="0.55" />
              <path d="M0 180 L 400 200" stroke="oklch(0.78 0.008 80)" strokeWidth="18" opacity="0.55" />
              <path d="M280 0 L 300 500" stroke="oklch(0.78 0.008 80)" strokeWidth="14" opacity="0.4" />
              <g transform="translate(200 250)">
                <circle r="42" fill="oklch(0.505 0.135 28)" opacity="0.15" />
                <circle r="22" fill="oklch(0.505 0.135 28)" opacity="0.35" />
                <circle r="9" fill="oklch(0.505 0.135 28)" />
                <text y="-52" textAnchor="middle" fontFamily="serif" fontSize="14" fill="oklch(0.22 0.008 60)">JP MAN</text>
              </g>
              <text x="20" y="480" fontFamily="sans-serif" fontSize="9" letterSpacing="3" fill="oklch(0.45 0.01 60)">IKOYI · LAGOS</text>
            </svg>
          </div>
        </Reveal>
      </section>
    </>
  );
}
