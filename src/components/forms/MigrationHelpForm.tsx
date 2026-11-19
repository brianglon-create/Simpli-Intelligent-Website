"use client";

import { useState, type FormEvent } from "react";
import { PersonalFollowUp } from "@/components/PersonalFollowUp";
import { inputClass, primaryButtonClass } from "@/components/classes";
import { campaignFields, postLead } from "@/components/forms/post-lead";
import type { Interest } from "@/lib/leads/types";
import { REGION_GROUPS } from "@/lib/regions";
import { SITE } from "@/lib/site";

export function MigrationHelpForm({
  page,
  product,
  id = "migration-help",
}: {
  page: string;
  product: Interest;
  id?: string;
}) {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [currentSoftware, setCurrentSoftware] = useState("");
  const [narrativeLibrarySize, setNarrativeLibrarySize] = useState("");
  const [reportCount, setReportCount] = useState("");
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
      formKind: "migration",
      name,
      company,
      email,
      stateProvince,
      currentSoftware,
      narrativeLibrarySize,
      reportCount,
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
      <div id={id} className="scroll-mt-28 max-w-xl" role="status">
        <h3 className="font-display text-2xl font-semibold text-navy">We&apos;ll reply by email.</h3>
        <p className="mt-4 text-base leading-relaxed text-muted">
          Thanks for telling us about your narratives. This signup does not buy the product.
        </p>
        <PersonalFollowUp />
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

      <Field id={`${id}-name`} label="Name" error={errors.name}>
        <input
          id={`${id}-name`}
          name="name"
          autoComplete="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(errors.name)}
          className={inputClass}
        />
      </Field>
      <Field id={`${id}-company`} label="Business name" error={errors.company}>
        <input
          id={`${id}-company`}
          name="company"
          autoComplete="organization"
          required
          value={company}
          onChange={(event) => setCompany(event.target.value)}
          aria-invalid={Boolean(errors.company)}
          className={inputClass}
        />
      </Field>
      <Field id={`${id}-email`} label="Email" error={errors.email}>
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(errors.email)}
          className={inputClass}
        />
      </Field>
      <Field id={`${id}-region`} label="State or province" error={errors.stateProvince}>
        <select
          id={`${id}-region`}
          name="stateProvince"
          required
          value={stateProvince}
          onChange={(event) => setStateProvince(event.target.value)}
          aria-invalid={Boolean(errors.stateProvince)}
          className={inputClass}
        >
          <option value="">Choose one</option>
          {REGION_GROUPS.map((group) => (
            <optgroup key={group.label} label={group.label}>
              {group.options.map((region) => (
                <option key={region} value={region}>
                  {region}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </Field>
      <Field
        id={`${id}-software`}
        label="Current inspection software"
        error={errors.currentSoftware}
      >
        <input
          id={`${id}-software`}
          name="currentSoftware"
          required
          value={currentSoftware}
          onChange={(event) => setCurrentSoftware(event.target.value)}
          aria-invalid={Boolean(errors.currentSoftware)}
          className={inputClass}
        />
      </Field>
      <Field
        id={`${id}-library`}
        label="About how large is your narrative library?"
        error={errors.narrativeLibrarySize}
        optional
      >
        <input
          id={`${id}-library`}
          name="narrativeLibrarySize"
          value={narrativeLibrarySize}
          onChange={(event) => setNarrativeLibrarySize(event.target.value)}
          className={inputClass}
        />
      </Field>
      <Field
        id={`${id}-reports`}
        label="About how many Horizon reports do you have?"
        error={errors.reportCount}
        optional
      >
        <input
          id={`${id}-reports`}
          name="reportCount"
          value={reportCount}
          onChange={(event) => setReportCount(event.target.value)}
          className={inputClass}
        />
      </Field>
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
            I agree to receive emails from {SITE.brandLine} about bringing my narratives
            into Simpli Check. I can unsubscribe at any time.
          </label>
        </div>
        {errors.consent ? (
          <p id={`${id}-consent-error`} className="mt-2 text-sm text-danger" role="alert">
            {errors.consent}
          </p>
        ) : null}
        <p className="mt-2 text-sm text-muted">
          <a href="/privacy" className="font-medium text-navy underline-offset-2 hover:underline">
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
        {pending ? "Sending..." : "Help me bring my narratives"}
      </button>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  optional = false,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-navy">
        {label}
        {optional ? <span className="font-normal text-muted"> (optional)</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
