import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";

export function SiteFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-atmosphere flex min-h-full flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
