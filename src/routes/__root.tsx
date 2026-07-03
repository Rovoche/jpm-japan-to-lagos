import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { RovocheBadge } from "@/components/RovocheBadge";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">404 · 見つかりません</p>
        <h1 className="display mt-6 text-5xl">This page has drifted.</h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Every road leads somewhere. Let's return to the beginning.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center gap-3 border-b border-foreground pb-1 text-xs tracking-[0.22em] uppercase hover:text-accent"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Something went quiet</p>
        <h1 className="display mt-6 text-4xl">This page didn't load.</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          A soft error. Please try again, or return home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="border-b border-foreground pb-1 text-xs tracking-[0.22em] uppercase hover:text-accent"
          >
            Try again
          </button>
          <a href="/" className="border-b border-foreground pb-1 text-xs tracking-[0.22em] uppercase hover:text-accent">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "JP MAN WORLD — Bring Japan Home" },
      { name: "description", content: "A Japanese lifestyle house in Lagos. Curated objects, food, and rituals from Japan — for the everyday life in Nigeria." },
      { name: "author", content: "JP MAN WORLD · Concept by ROVOCHE" },
      { property: "og:title", content: "JP MAN WORLD — Bring Japan Home" },
      { property: "og:description", content: "A Japanese lifestyle house in Lagos. Curated objects, food, and rituals from Japan — for the everyday life in Nigeria." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "JP MAN WORLD" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#f4ecdc" },
      { name: "twitter:title", content: "JP MAN WORLD — Bring Japan Home" },
      { name: "twitter:description", content: "A Japanese lifestyle house in Lagos. Curated objects, food, and rituals from Japan — for the everyday life in Nigeria." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/25471cb9-cbea-40e9-b035-94017ba2c7a3/id-preview-49e7a2f0--06ada3e9-3914-417e-ba9d-0ea414190d85.lovable.app-1783012781182.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/25471cb9-cbea-40e9-b035-94017ba2c7a3/id-preview-49e7a2f0--06ada3e9-3914-417e-ba9d-0ea414190d85.lovable.app-1783012781182.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,400&family=Inter:wght@300;400;500;600&family=Noto+Serif+JP:wght@300;400;500&display=swap",
      },
      { rel: "icon", href: "/favicon.ico.jpg", type: "image/jpeg" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
      <RovocheBadge />
    </QueryClientProvider>
  );
}
