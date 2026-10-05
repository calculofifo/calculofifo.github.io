import { BottomNav } from "@/components/layout/bottom-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { SkipLink } from "@/components/layout/skip-link";

export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <SkipLink />
      <SiteHeader />
      <main id="contenido" tabIndex={-1} className="pb-24 outline-none md:pb-0">
        {children}
      </main>
      <SiteFooter />
      {/* Spacer so the footer clears the fixed bottom nav on mobile. */}
      <div aria-hidden className="h-16 md:hidden" />
      <BottomNav />
    </>
  );
}
