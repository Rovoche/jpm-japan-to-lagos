import { useEffect, useState } from "react";
import { X } from "lucide-react";

const KEY = "rovoche-badge-dismissed";

export function RovocheBadge() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(KEY) === "1") return;
    setDismissed(false);
    const t = window.setTimeout(() => setVisible(true), 3000);
    return () => window.clearTimeout(t);
  }, []);

  if (dismissed) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${
        visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
      }`}
    >
      <div className="group flex items-center gap-3 rounded-full border border-border bg-background/85 px-4 py-2 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.35)] backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        <a
          href="https://rovoche.com"
          target="_blank"
          rel="noreferrer noopener"
          className="text-[11px] tracking-[0.24em] uppercase text-foreground hover:text-accent"
        >
          Concept by <span className="font-medium">ROVOCHE</span>
        </a>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={() => {
            window.localStorage.setItem(KEY, "1");
            setVisible(false);
            window.setTimeout(() => setDismissed(true), 500);
          }}
          className="ml-1 grid h-5 w-5 place-items-center rounded-full text-muted-foreground opacity-70 hover:bg-muted hover:opacity-100"
        >
          <X className="h-3 w-3" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}
