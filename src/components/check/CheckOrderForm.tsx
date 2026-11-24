"use client";

import Link from "next/link";
import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { TurnstileField } from "@/components/check/TurnstileField";
import { inputClass, primaryButtonClass } from "@/components/classes";
import { SITE } from "@/lib/site";
import { US_STATES } from "@/lib/us-states";
import {
  CHECK_SEAT_PRICE_USD,
  checkOrderTotalUsd,
  submitCheckOrder,
  validateCheckOrder,
  type OrderFailureKind,
} from "@/lib/operate-checkout";

type SeatChoice = 1 | 2 | 3 | 4 | "more";

const FAILURE_COPY: Record<OrderFailureKind, string> = {
  network:
    "We couldn't reach Simpli Check checkout. If this is a preview, open simpliintelligent.com and start the order there. If you are already on the live site, check your connection and try again.",
  unavailable: `Simpli Check checkout is unavailable right now. Email ${SITE.contactEmail} and we'll help you start.`,
  invalid: "Check the form and try again.",
  incomplete: `The order did not return a next step. Email ${SITE.contactEmail} and we'll help you start Simpli Check.`,
};

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-navy">
        {label}
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

export function CheckOrderForm() {
  const [seats, setSeats] = useState<SeatChoice>(1);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileDown, setTurnstileDown] = useState(false);
  const [resetSignal, setResetSignal] = useState(0);
  const [fields, setFields] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const lock = useRef(false);

  const inputProps = (id: string) => ({
    id,
    className: inputClass,
    "aria-invalid": Boolean(fields[id]) || undefined,
    "aria-describedby": fields[id] ? `${id}-error` : undefined,
  });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current || seats === "more") return;
    setFormError(null);
    const result = validateCheckOrder({
      seats,
      turnstileToken,
      firstName,
      lastName,
      email,
      phone,
      companyName,
      line1,
      line2,
      city,
      state,
      zip,
    });
    if (!result.ok) {
      setFields(result.fields);
      setFormError("Check the highlighted fields and try again.");
      return;
    }
    setFields({});
    lock.current = true;
    setPending(true);
    const order = await submitCheckOrder(result.body);
    if (order.ok) {
      window.location.assign(order.orderUrl);
      return;
    }
    lock.current = false;
    setPending(false);
    setTurnstileToken("");
    setResetSignal((value) => value + 1);
    setFields(order.fields ?? {});
    setFormError(order.detail || FAILURE_COPY[order.kind]);
  }

  return (
    <form className="max-w-2xl space-y-6" onSubmit={onSubmit} noValidate aria-busy={pending}>
      <fieldset>
        <legend className="text-sm font-semibold text-navy">Inspectors</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {([1, 2, 3, 4, "more"] as const).map((choice) => {
            const selected = seats === choice;
            const label = choice === "more" ? "5+" : String(choice);
            return (
              <button
                key={label}
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  setSeats(choice);
                  setFormError(null);
                }}
                className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border px-3 text-sm font-semibold ${
                  selected
                    ? "border-navy bg-navy text-white"
                    : "border-border bg-white text-navy hover:bg-blue-soft"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
        {fields.seats ? (
          <p className="mt-2 text-sm text-danger" role="alert">
            {fields.seats}
          </p>
        ) : null}
      </fieldset>

      {seats === "more" ? (
        <p className="text-base leading-relaxed text-navy">
          <Link href="/#contact" className="font-semibold text-blue underline-offset-2 hover:underline">
            Contact us for 5 or more inspectors
          </Link>
        </p>
      ) : (
        <>
          <p className="text-base text-navy">
            <span className="font-semibold">Early Adopter.</span>{" "}
            ${CHECK_SEAT_PRICE_USD} × {seats} = ${checkOrderTotalUsd(seats)} per month
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field id="firstName" label="First name" error={fields.firstName}>
              <input
                {...inputProps("firstName")}
                name="firstName"
                autoComplete="given-name"
                value={firstName}
                onChange={(event) => setFirstName(event.target.value)}
              />
            </Field>
            <Field id="lastName" label="Last name" error={fields.lastName}>
              <input
                {...inputProps("lastName")}
                name="lastName"
                autoComplete="family-name"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </Field>
          </div>

          <Field id="email" label="Email" error={fields.email}>
            <input
              {...inputProps("email")}
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Field>
          <Field id="phone" label="Phone" error={fields.phone}>
            <input
              {...inputProps("phone")}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </Field>
          <Field id="companyName" label="Company" error={fields.companyName}>
            <input
              {...inputProps("companyName")}
              name="companyName"
              autoComplete="organization"
              value={companyName}
              onChange={(event) => setCompanyName(event.target.value)}
            />
          </Field>
          <Field id="line1" label="Billing street" error={fields.line1}>
            <input
              {...inputProps("line1")}
              name="line1"
              autoComplete="address-line1"
              value={line1}
              onChange={(event) => setLine1(event.target.value)}
            />
          </Field>
          <Field id="line2" label="Apartment, suite, or unit (optional)" error={fields.line2}>
            <input
              {...inputProps("line2")}
              name="line2"
              autoComplete="address-line2"
              value={line2}
              onChange={(event) => setLine2(event.target.value)}
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-3">
            <Field id="city" label="City" error={fields.city}>
              <input
                {...inputProps("city")}
                name="city"
                autoComplete="address-level2"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </Field>
            <Field id="state" label="State" error={fields.state}>
              <select
                {...inputProps("state")}
                name="state"
                autoComplete="address-level1"
                value={state}
                onChange={(event) => setState(event.target.value)}
              >
                <option value="">State</option>
                {US_STATES.map(([code, name]) => (
                  <option key={code} value={code}>
                    {name}
                  </option>
                ))}
              </select>
            </Field>
            <Field id="zip" label="ZIP code" error={fields.zip}>
              <input
                {...inputProps("zip")}
                name="zip"
                inputMode="numeric"
                autoComplete="postal-code"
                maxLength={5}
                value={zip}
                onChange={(event) => setZip(event.target.value)}
              />
            </Field>
          </div>
          <p className="text-sm text-muted">United States</p>

          <div>
            <p className="text-sm font-semibold text-navy">Security check</p>
            <div className="mt-2">
              <TurnstileField
                resetSignal={resetSignal}
                onToken={setTurnstileToken}
                onUnavailable={() => setTurnstileDown(true)}
              />
            </div>
            {fields.turnstileToken ? (
              <p id="turnstileToken-error" className="mt-2 text-sm text-danger" role="alert">
                {fields.turnstileToken}
              </p>
            ) : null}
            {turnstileDown ? (
              <p className="mt-2 text-sm text-danger" role="alert">
                The security check did not load. Refresh the page and try again.
              </p>
            ) : null}
          </div>

          <p className="text-base leading-relaxed text-navy">
            You&apos;ll review and sign the{" "}
            <a href="/legal" className="font-semibold text-blue underline-offset-2 hover:underline">
              Simpli Check agreement
            </a>{" "}
            on the next step.
          </p>

          {formError ? (
            <p className="text-sm text-danger" role="alert">
              {formError}
            </p>
          ) : null}

          <button type="submit" className={`${primaryButtonClass} w-full sm:w-auto`} disabled={pending}>
            {pending ? "Sending…" : "Continue"}
          </button>
        </>
      )}
    </form>
  );
}
