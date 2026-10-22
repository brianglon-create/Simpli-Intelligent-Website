import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { HorizonNotice } from "@/components/HorizonNotice";
import { Intelligence } from "@/components/Intelligence";
import { Mission } from "@/components/Mission";
import { Products } from "@/components/Products";
import { SiteFrame } from "@/components/SiteFrame";

export default function Home() {
  return (
    <SiteFrame>
      <HorizonNotice />
      <Hero />
      <Mission />
      <Products />
      <Intelligence />
      <About />
      <Contact />
    </SiteFrame>
  );
}
