import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PromoBar } from "./PromoBar";

const PROMO_KEY = "oxverse.promo.20off.v1.dismissed";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [promoVisible, setPromoVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setPromoVisible(localStorage.getItem(PROMO_KEY) !== "1");
  }, []);

  function dismiss() {
    localStorage.setItem(PROMO_KEY, "1");
    setPromoVisible(false);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      {promoVisible && <PromoBar onDismiss={dismiss} />}
      <Header topOffset={promoVisible ? 40 : 0} />
      <main
        className="flex-1"
        style={{ paddingTop: (promoVisible ? 40 : 0) + 64 }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-ink-muted">
      <span className="size-1.5 rounded-full bg-primary" />
      {children}
    </div>
  );
}