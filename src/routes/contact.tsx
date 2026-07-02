import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — JP MAN WORLD" },
      { name: "description", content: "Get in touch with JP MAN WORLD. Wholesale, press, private events, and general enquiries." },
      { property: "og:title", content: "Contact — JP MAN WORLD" },
      { property: "og:description", content: "Say hello." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="border-b border-border">
        <div className="container-editorial pt-14 pb-14 md:pt-20 md:pb-20">
          <Reveal>
            <p className="eyebrow">Contact · 御用</p>
            <h1 className="display mt-4 text-5xl md:text-7xl">Say hello.</h1>
            <p className="mt-8 max-w-xl text-muted-foreground">
              Enquiries, private shopping, press, wholesale, or a tea recommendation. We reply within a business day.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-editorial grid gap-12 py-20 md:grid-cols-[1fr_1.2fr] md:gap-20">
        <Reveal>
          <div className="space-y-8">
            <div>
              <p className="eyebrow flex items-center gap-2"><Mail className="h-3.5 w-3.5" strokeWidth={1.25} /> General</p>
              <a href="mailto:hello@jpman.world" className="mt-2 block font-serif text-2xl hover:text-accent">hello@jpman.world</a>
            </div>
            <div>
              <p className="eyebrow flex items-center gap-2"><Mail className="h-3.5 w-3.5" strokeWidth={1.25} /> Press & Partnerships</p>
              <a href="mailto:press@jpman.world" className="mt-2 block font-serif text-2xl hover:text-accent">press@jpman.world</a>
            </div>
            <div>
              <p className="eyebrow flex items-center gap-2"><MessageCircle className="h-3.5 w-3.5" strokeWidth={1.25} /> WhatsApp</p>
              <a href="https://wa.me/2348000000000" target="_blank" rel="noreferrer noopener" className="mt-2 block font-serif text-2xl hover:text-accent">+234 (0) 800 000 000</a>
            </div>
            <div>
              <p className="eyebrow flex items-center gap-2"><MapPin className="h-3.5 w-3.5" strokeWidth={1.25} /> Studio</p>
              <p className="mt-2 font-serif text-xl">14 Bourdillon Road<br />Ikoyi, Lagos</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={140}>
          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="space-y-6"
          >
            <Field label="Name">
              <input required className="w-full border-b border-foreground bg-transparent py-3 text-base focus:border-accent focus:outline-none" />
            </Field>
            <Field label="Email">
              <input type="email" required className="w-full border-b border-foreground bg-transparent py-3 text-base focus:border-accent focus:outline-none" />
            </Field>
            <Field label="Subject">
              <select className="w-full border-b border-foreground bg-transparent py-3 text-base focus:border-accent focus:outline-none">
                <option>General enquiry</option>
                <option>Press</option>
                <option>Wholesale</option>
                <option>Private event</option>
              </select>
            </Field>
            <Field label="Message">
              <textarea required rows={5} className="w-full resize-none border-b border-foreground bg-transparent py-3 text-base focus:border-accent focus:outline-none" />
            </Field>
            <div className="pt-2">
              <button className="inline-flex items-center gap-3 bg-primary px-8 py-4 text-xs tracking-[0.28em] uppercase text-primary-foreground hover:bg-accent">
                {sent ? "Sent · Thank you" : "Send message"}
              </button>
            </div>
          </form>
        </Reveal>
      </section>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow mb-2 block">{label}</span>
      {children}
    </label>
  );
}
