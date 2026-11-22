"use client";

import { useState, type FormEvent } from "react";
import { inputClass, primaryButtonClass } from "@/components/classes";
import { campaignFields, postLead } from "@/components/forms/post-lead";
import type { Interest } from "@/lib/leads/types";
import { SITE } from "@/lib/site";

const PRODUCT_LABEL: Record<Interest, string> = {
  archive: "Simpli Archive",
  check: "Simpli Check",
  both: "Simpli Check and Simpli Archive",
  operate: "Simpli Operate",
  reach: "Simpli Reach",
};

export function EmailUpdatesForm({
  page,
  product,
  id = "updates",
}: {
  page: string;
  product: Interest;
  id?: string;
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setErrors({});
    setPending(true);
    const result = await postLead({
      formKind: "updates",
      email,
      interest: product,
      consent,
      page,
      hp_token:
        (event.currentTarget.elements.namedItem("hp_token") as HTMLInputElement | null)
          ?.value ?? "",
      ...campaignFields(),
    });
    setPending(false);
    if (result.ok) {
      setDone(true);
      return;
    }
    setErrors(result.fields ?? {});
    setFormError(result.message);
  }

  if (done) {
    return (
      <div id={id} className="scroll-mt-28 max-w-xl border border-border bg-white p-6" role="status">
        <h3 className="font-display text-2xl font-semibold text-navy">
          You&apos;re signed up for updates.
        </h3>
        <p className="mt-4 text-base leading-relaxed text-muted">
          We&apos;ll email you. This signup does not buy the product.
        </p>
        <p className="mt-4">
          <a href="/check" className="font-semibold text-blue hover:text-navy">
            Read about Simpli Check
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      id={id}
      className="scroll-mt-28 max-w-xl space-y-5"
      onSubmit={onSubmit}
      noValidate
      aria-busy={pending}
    >
      <div className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={`${id}-hp`}>Company website</label>
        <input id={`${id}-hp`} name="hp_token" type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>
      <div>
        <label htmlFor={`${id}-email`} className="block text-sm font-semibold text-navy">
          Email
        </label>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
          className={`${inputClass} mt-2`}
        />
        {errors.email ? (
          <p id={`${id}-email-error`} className="mt-2 text-sm text-danger" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>
      <div>
        <div className="flex items-start gap-3">
          <input
            id={`${id}-consent`}
            name="consent"
            type="checkbox"
            className="mt-1 h-4 w-4 accent-navy"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            required
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${id}-consent-error` : undefined}
          />
          <label htmlFor={`${id}-consent`} className="text-sm leading-relaxed text-muted">
            I agree to receive emails from {SITE.brandLine} about {PRODUCT_LABEL[product]}. I
            can unsubscribe at any time.
          </label>
        </div>
        {errors.consent ? (
          <p id={`${id}-consent-error`} className="mt-2 text-sm text-danger" role="alert">
            {errors.consent}
          </p>
        ) : null}
        <p className="mt-2 text-sm text-muted">
          <a href="/legal/privacy" className="font-medium text-navy underline-offset-2 hover:underline">
            Read the privacy policy
          </a>
        </p>
      </div>
      {formError ? (
        <p role="alert" className="text-sm text-danger">
          {formError}
        </p>
      ) : null}
      <button type="submit" className={`${primaryButtonClass} w-full sm:w-auto`} disabled={pending}>
        {pending ? "Sending..." : "Send me launch updates"}
      </button>
    </form>
  );
}
