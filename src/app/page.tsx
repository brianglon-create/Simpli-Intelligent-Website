import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Intelligence } from "@/components/Intelligence";
import { Mission } from "@/components/Mission";
import { Products } from "@/components/Products";

export default function Home() {
  return (
    <div className="site-atmosphere flex min-h-full flex-col">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Mission />
        <Products />
        <Intelligence />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
