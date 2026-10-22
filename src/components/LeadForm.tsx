"use client";

import { useState, type FormEvent } from "react";
import { inputClass, primaryButtonClass } from "@/components/classes";
import { ThankYou } from "@/components/ThankYou";
import type { Interest, SuccessBody } from "@/lib/leads/types";
import { REGION_GROUPS } from "@/lib/regions";
import { SITE } from "@/lib/site";

const INTEREST_OPTIONS: { value: Interest; label: string; hint: string }[] = [
  {
    value: "archive",
    label: "Simpli Archive",
    hint: "Keep Horizon report history searchable",
  },
  {
    value: "check",
    label: "Simpli Check",
    hint: "Join the inspection software waitlist",
  },
  {
    value: "both",
    label: "Archive and Check",
    hint: "History now, and the Check waitlist",
  },
  {
    value: "operate",
    label: "Simpli Operate",
    hint: "Business operations software",
  },
  {
    value: "reach",
    label: "Simpli Reach",
    hint: "Business growth software",
  },
];

const SUBMIT_LABEL: Record<Interest, string> = {
  archive: "Protect my report history",
  check: "Join the Simpli Check waitlist",
  both: "Join the list",
  operate: "Join the Simpli Operate list",
  reach: "Join the Simpli Reach list",
};

type FieldErrors = Record<string, string>;

function campaignFields() {
  if (typeof window === "undefined") {
    return {
      source: null,
      utmSource: null,
      utmMedium: null,
      utmCampaign: null,
      utmContent: null,
      utmTerm: null,
    };
  }
  const params = new URLSearchParams(window.location.search);
  const pick = (key: string) => {
    const value = params.get(key)?.trim() ?? "";
    return value ? value.slice(0, 200) : null;
  };
  return {
    source: pick("source"),
    utmSource: pick("utm_source"),
    utmMedium: pick("utm_medium"),
    utmCampaign: pick("utm_campaign"),
    utmContent: pick("utm_content"),
    utmTerm: pick("utm_term"),
  };
}

export function LeadForm({
  page,
  interests = ["archive", "check", "both", "operate", "reach"],
  defaultInterest,
  lockInterest = false,
  id = "signup",
}: {
  page: string;
  interests?: Interest[];
  defaultInterest?: Interest;
  lockInterest?: boolean;
  id?: string;
}) {
  const options = INTEREST_OPTIONS.filter((option) => interests.includes(option.value));
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [stateProvince, setStateProvince] = useState("");
  const [software, setSoftware] = useState<"horizon" | "other" | "">("");
  const [softwareOther, setSoftwareOther] = useState("");
  const [interest, setInterest] = useState<Interest | "">(defaultInterest ?? "");
  const [reportCount, setReportCount] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SuccessBody | null>(null);

  const showReportCount =
    !lockInterest &&
    (interest === "" || interest === "archive" || interest === "check" || interest === "both");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);
    setErrors({});

    if (!interest) {
      setErrors({ interest: "Choose what you want to hear about." });
      return;
    }

    setPending(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          company,
          email,
          stateProvince,
          software,
          softwareOther,
          interest,
          reportCount,
          consent,
          page,
          hp_token: (
            event.currentTarget.elements.namedItem("hp_token") as HTMLInputElement | null
          )?.value ?? "",
          ...campaignFields(),
        }),
      });
      const body = (await response.json()) as
        | SuccessBody
        | { ok: false; error?: string; message?: string; fields?: FieldErrors };

      if (response.ok && body.ok) {
        setResult(body);
        return;
      }

      if ("fields" in body && body.fields) {
        setErrors(body.fields);
        setFormError("Check the highlighted fields and try again.");
        return;
      }

      setFormError(
        ("message" in body && body.message) ||
          `We couldn't save that. Email ${SITE.contactEmail} and we'll add you manually.`,
      );
    } catch {
      setFormError(
        `We couldn't save that. Email ${SITE.contactEmail} and we'll add you manually.`,
      );
    } finally {
      setPending(false);
    }
  }

  if (result) {
    return (
      <div id={id} className="scroll-mt-28">
        <ThankYou result={result} />
      </div>
    );
  }

  const submitLabel = interest ? SUBMIT_LABEL[interest] : "Join the list";
  const locked = options.find((option) => option.value === interest);

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
        <input
          id={`${id}-hp`}
          name="hp_token"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
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
          aria-describedby={errors.name ? `${id}-name-error` : undefined}
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
          aria-describedby={errors.company ? `${id}-company-error` : undefined}
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
          aria-describedby={errors.email ? `${id}-email-error` : undefined}
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
          aria-describedby={errors.stateProvince ? `${id}-region-error` : undefined}
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

      <Field id={`${id}-software`} label="Current inspection software" error={errors.software}>
        <select
          id={`${id}-software`}
          name="software"
          required
          value={software}
          onChange={(event) => setSoftware(event.target.value as "horizon" | "other" | "")}
          aria-invalid={Boolean(errors.software)}
          aria-describedby={errors.software ? `${id}-software-error` : undefined}
          className={inputClass}
        >
          <option value="">Choose one</option>
          <option value="horizon">Horizon</option>
          <option value="other">Other</option>
        </select>
      </Field>

      {software === "other" ? (
        <Field id={`${id}-software-other`} label="Which software?" error={errors.softwareOther}>
          <input
            id={`${id}-software-other`}
            name="softwareOther"
            value={softwareOther}
            onChange={(event) => setSoftwareOther(event.target.value)}
            className={inputClass}
          />
        </Field>
      ) : null}

      {lockInterest && locked ? (
        <p className="text-sm font-medium text-navy">
          You&apos;re joining the {locked.label} list.
        </p>
      ) : (
        <fieldset>
          <legend className="text-sm font-semibold text-navy">I want to hear about</legend>
          <div className="mt-3 grid gap-2">
            {options.map((option) => (
              <label
                key={option.value}
                className="flex cursor-pointer items-start gap-3 border border-border bg-white px-3 py-3 text-sm text-navy"
              >
                <input
                  type="radio"
                  name="interest"
                  value={option.value}
                  className="mt-1"
                  checked={interest === option.value}
                  onChange={() => setInterest(option.value)}
                  required
                />
                <span>
                  <span className="block font-semibold">{option.label}</span>
                  <span className="mt-1 block text-muted">{option.hint}</span>
                </span>
              </label>
            ))}
          </div>
          {errors.interest ? (
            <p className="mt-2 text-sm text-danger" role="alert">
              {errors.interest}
            </p>
          ) : null}
        </fieldset>
      )}

      {showReportCount ? (
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
      ) : null}

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
            I agree to receive emails from {SITE.brandLine}, about the product I
            selected. I can unsubscribe at any time.
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

      <p className="text-sm text-muted">This reserves your place. It does not charge a card.</p>

      <button type="submit" className={primaryButtonClass} disabled={pending}>
        {pending ? "Sending..." : submitLabel}
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
        <p id={`${id}-error`} className="mt-2 text-sm text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}
