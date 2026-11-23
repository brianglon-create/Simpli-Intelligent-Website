export function CheckHeadline({ id, className = "" }: { id?: string; className?: string }) {
  return (
    <h1
      id={id}
      aria-label="Your words. Your photos. Your report, done faster."
      className={`font-display font-semibold leading-[1.12] tracking-tight text-navy text-[1.35rem] sm:text-[1.65rem] lg:whitespace-nowrap lg:text-[clamp(1.7rem,2.15vw,2.7rem)] ${className}`}
    >
      <span className="block lg:inline">Your words.</span>
      <span className="block lg:inline"> Your photos.</span>
      <span className="block lg:inline"> Your report, done faster.</span>
    </h1>
  );
}
