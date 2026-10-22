import { SiteFrame } from "@/components/SiteFrame";
import { ThankYou } from "@/components/ThankYou";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "You're on the list | Simpli Intelligent",
  description: "Thanks for signing up with Simpli Intelligent.",
  path: "/thank-you",
  index: false,
});

export default function ThankYouPage() {
  return (
    <SiteFrame>
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
        <ThankYou result={null} />
      </div>
    </SiteFrame>
  );
}
