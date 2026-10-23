"use client";

import { useEffect, useState } from "react";
import { SHUTDOWN_DEADLINE_ISO, SHUTDOWN_LABEL } from "@/lib/offers";

const DEADLINE = new Date(SHUTDOWN_DEADLINE_ISO).getTime();

function parts(now: number) {
  const diff = Math.max(0, DEADLINE - now);
  const totalSeconds = Math.floor(diff / 1000);
  return {
    passed: diff === 0,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

export function Countdown() {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const tick = () => setNow(Date.now());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const value = now == null ? null : parts(now);
  const units = [
    { label: "Days", text: value ? String(value.days) : "—" },
    { label: "Hours", text: value ? pad(value.hours) : "—" },
    { label: "Minutes", text: value ? pad(value.minutes) : "—" },
    { label: "Seconds", text: value ? pad(value.seconds) : "—" },
  ];

  return (
    <div className="mt-10">
      <p className="text-sm font-medium text-muted">
        {value?.passed
          ? `${SHUTDOWN_LABEL} has passed. Horizon export tools were scheduled to stop that day.`
          : `Countdown to the end of ${SHUTDOWN_LABEL}, Eastern Time.`}
      </p>
      <div className="mt-4 grid max-w-xl grid-cols-4 gap-3" aria-hidden="true">
        {units.map((unit) => (
          <div key={unit.label} className="border border-border bg-white px-2 py-4 text-center">
            <div className="font-display text-3xl font-semibold tabular-nums text-navy sm:text-4xl">
              {unit.text}
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-[0.12em] text-muted">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
      <p className="sr-only">
        {value?.passed
          ? `The ${SHUTDOWN_LABEL} export deadline has passed.`
          : value
            ? `${value.days} days until the end of ${SHUTDOWN_LABEL}.`
            : `Deadline ${SHUTDOWN_LABEL}.`}
      </p>
    </div>
  );
}
