import { primaryButtonClass, secondaryButtonClass } from "@/components/classes";

export function SignupLinks({
  primary = "Protect my report history",
  primaryHref = "#signup",
  secondary = "Join the Simpli Check waitlist",
  secondaryHref = "#check-offer",
}: {
  primary?: string;
  primaryHref?: string;
  secondary?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
      <a href={primaryHref} className={primaryButtonClass}>
        {primary}
      </a>
      <a href={secondaryHref} className={secondaryButtonClass}>
        {secondary}
      </a>
    </div>
  );
}
