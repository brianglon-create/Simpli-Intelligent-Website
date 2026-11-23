import { CheckoutLink, CheckoutPlaceholderNote } from "@/components/CheckoutLink";
import { SiteFrame } from "@/components/SiteFrame";
import { primaryButtonClass } from "@/components/classes";
import { CHECKOUT, isConfiguredUrl } from "@/lib/checkout";
import { pageMetadata } from "@/lib/metadata";
import { FOUNDER_ONBOARDING } from "@/lib/offer-copy";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Welcome | Simpli Intelligent",
  description: "What happens after you buy Simpli Check or Simpli Archive.",
  path: "/welcome",
  index: false,
});

export default function WelcomePage() {
  const loginReady = isConfiguredUrl(CHECKOUT.loginUrl);
  return (
    <SiteFrame>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="font-display text-xs font-semibold tracking-[0.18em] text-blue">
          AFTER YOU BUY
        </p>
        <h1 className="font-display mt-4 text-4xl font-semibold leading-tight tracking-tight text-navy sm:text-5xl">
          Here&apos;s what happens next.
        </h1>
        <ol className="mt-8 space-y-6 text-lg leading-relaxed text-muted">
          <li>
            <span className="font-semibold text-navy">1. Watch your email. </span>
            We&apos;ll write from {SITE.contactEmail}.
          </li>
          <li>
            <span className="font-semibold text-navy">2. Onboarding. </span>
            {FOUNDER_ONBOARDING}
          </li>
          <li>
            <span className="font-semibold text-navy">3. Sign in. </span>
            {loginReady
              ? "Use the sign-in link to open your account."
              : "The sign-in link is a placeholder until the login URL is connected."}
          </li>
        </ol>
        <div className="mt-10">
          <CheckoutLink
            href={CHECKOUT.loginUrl}
            pendingHref="#login-not-connected"
            className={`${primaryButtonClass} w-full justify-center sm:w-auto`}
          >
            Sign in
          </CheckoutLink>
        </div>
        <div className="mt-6">
          <CheckoutPlaceholderNote id="welcome-checkout-note" />
        </div>
        <p className="mt-8 text-sm text-muted">
          <a href={CHECKOUT.termsUrl} className="font-medium text-navy underline-offset-2 hover:underline">
            Terms & Conditions
          </a>
          {" · "}
          <a href="/legal/privacy" className="font-medium text-navy underline-offset-2 hover:underline">
            Privacy
          </a>
        </p>
      </article>
    </SiteFrame>
  );
}
