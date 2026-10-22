import { SiteFrame } from "@/components/SiteFrame";
import { mailingAddress } from "@/lib/env";
import { pageMetadata } from "@/lib/metadata";
import { SITE } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy policy | Simpli Intelligent",
  description:
    "How Simpli Intelligent collects, uses, and deletes signup details for Simpli Archive, Simpli Check, Simpli Operate, and Simpli Reach.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const address = mailingAddress();
  return (
    <SiteFrame>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
        <p className="font-display text-xs font-semibold tracking-[0.18em] text-blue">
          PRIVACY
        </p>
        <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-navy">
          Privacy policy
        </h1>
        <p className="mt-4 text-sm text-muted">Effective October 22, 2026</p>
        <div className="mt-10 space-y-8 text-base leading-relaxed text-muted">
          <section>
            <h2 className="font-display text-2xl font-semibold text-navy">Who we are</h2>
            <p className="mt-3">
              {SITE.name} is operated by {SITE.legalEntity}, {SITE.location}. This
              policy covers the signup form on {SITE.url}. It does not yet cover
              report files, because Simpli Archive is not accepting uploads.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-navy">
              What we collect
            </h2>
            <p className="mt-3">
              If you join a list, we store your name, business name, email, state
              or province, current inspection software, the product you asked about,
              an optional note about how many Horizon reports you have, the page you
              used, and campaign details from the link that brought you here
              (source, utm_source, utm_medium, utm_campaign, utm_content, and
              utm_term when those are present). We also store that you checked the
              consent box, the time you signed up, and, for Simpli Check founding
              spots, the spot number.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-navy">
              Why we use it
            </h2>
            <p className="mt-3">
              We use this information to reply about the product you chose, to count
              Simpli Check founding spots, and to see which campaign a signup came
              from. We do not sell personal information. We do not send third-party
              marketing.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-navy">
              Consent, CASL, and CAN-SPAM
            </h2>
            <p className="mt-3">
              The checkbox is express consent. It is not pre-checked. You can
              refuse, and you can withdraw consent later. Commercial email from us
              will identify {SITE.name} and {SITE.legalEntity}, include a mailing
              address, and include a way to unsubscribe.
            </p>
            <p className="mt-3">
              To unsubscribe, email{" "}
              <a className="font-medium text-navy" href={`mailto:${SITE.contactEmail}?subject=Unsubscribe`}>
                {SITE.contactEmail}
              </a>{" "}
              with the subject Unsubscribe. We will stop commercial email as soon as
              we can, and within 10 business days.
            </p>
            <p className="mt-3">Mailing address: {address}.</p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-navy">
              Where signup records live
            </h2>
            <p className="mt-3">
              Signup records are stored in Supabase (Postgres), written by our
              server with a private key. If email sending is turned on, messages go
              through Resend. Those providers process the data only so we can store
              the signup and send the message you asked for.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-navy">
              How long we keep it
            </h2>
            <p className="mt-3">
              We keep the signup until you ask us to delete it or we no longer need
              it for the conversation you started. Email {SITE.contactEmail} to
              access, correct, or delete your record.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-navy">Children</h2>
            <p className="mt-3">
              This site is for home inspectors and other business owners. It is not
              directed to children.
            </p>
          </section>
          <section>
            <h2 className="font-display text-2xl font-semibold text-navy">Contact</h2>
            <p className="mt-3">
              {SITE.legalEntity}
              <br />
              {address}
              <br />
              <a className="font-medium text-navy" href={`mailto:${SITE.contactEmail}`}>
                {SITE.contactEmail}
              </a>
            </p>
          </section>
        </div>
      </article>
    </SiteFrame>
  );
}
