import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { collections, products, type CollectionSlug } from "@/lib/catalog";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const collection = collections.find((c) => c.slug === (params.slug as CollectionSlug));
    if (!collection) throw notFound();
    return collection;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Collection"} — JP MAN WORLD` },
      { name: "description", content: loaderData?.description ?? "" },
      { property: "og:title", content: `${loaderData?.name ?? "Collection"} — JP MAN WORLD` },
      { property: "og:description", content: loaderData?.tagline ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="container-editorial py-32 text-center">
      <p className="eyebrow">Not found</p>
      <h1 className="display mt-4 text-4xl">This collection has moved.</h1>
      <Link to="/collections" className="mt-6 inline-block border-b border-foreground pb-1 text-xs tracking-[0.28em] uppercase hover:text-accent">
        Back to collections
      </Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    console.error(error);
    return (
      <div className="container-editorial py-32 text-center">
        <p className="eyebrow">Something went quiet</p>
        <h1 className="display mt-4 text-3xl">This collection didn't load.</h1>
        <button onClick={reset} className="mt-6 border-b border-foreground pb-1 text-xs tracking-[0.28em] uppercase">Try again</button>
      </div>
    );
  },
  component: CollectionPage,
});

function CollectionPage() {
  const collection = Route.useLoaderData() as (typeof collections)[number];
  const items = products.filter((p) => p.collection === collection.slug);

  return (
    <>
      <section className="border-b border-border bg-paper">
        <div className="container-editorial pt-14 pb-16 md:pt-20 md:pb-24">
          <Reveal>
            <Link to="/collections" className="inline-flex items-center gap-2 text-xs tracking-[0.28em] uppercase text-muted-foreground hover:text-accent">
              <ArrowLeft className="h-3 w-3" strokeWidth={1.5} /> All collections
            </Link>
            <div className="mt-8 grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
              <div>
                <p className="eyebrow">{collection.jp} · {items.length} items</p>
                <h1 className="display mt-4 text-5xl md:text-7xl">{collection.name}</h1>
              </div>
              <p className="max-w-md text-muted-foreground md:justify-self-end">{collection.description}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-editorial py-16 md:py-24">
        {items.length === 0 ? (
          <p className="text-center text-muted-foreground">New pieces arriving soon.</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-3 lg:grid-cols-4">
            {items.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <ProductCard product={p} index={i} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
