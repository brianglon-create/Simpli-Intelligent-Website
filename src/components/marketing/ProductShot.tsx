"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CheckShot } from "@/lib/check-shots";

function openDialog(dialog: HTMLDialogElement) {
  if (typeof dialog.showModal === "function" && !dialog.open) {
    try {
      dialog.showModal();
      return;
    } catch {
      // jsdom and a few older browsers do not implement showModal.
    }
  }
  dialog.setAttribute("open", "");
}

function closeDialog(dialog: HTMLDialogElement) {
  if (typeof dialog.close === "function") {
    try {
      dialog.close();
      return;
    } catch {
      // Fall through to the attribute when close() is unavailable.
    }
  }
  dialog.removeAttribute("open");
}

export function ProductShot({
  shot,
  sizes = "(min-width: 1024px) 560px, 100vw",
}: {
  shot: CheckShot;
  sizes?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open && dialogRef.current) openDialog(dialogRef.current);
  }, [open]);

  function close() {
    if (dialogRef.current) closeDialog(dialogRef.current);
    setOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="block w-full cursor-zoom-in border border-border bg-white text-left"
      >
        <Image
          src={shot.src}
          alt={shot.alt}
          width={shot.width}
          height={shot.height}
          sizes={sizes}
          className="h-auto w-full"
        />
      </button>
      {open ? (
        <dialog
          ref={dialogRef}
          aria-label={shot.title}
          className="w-[min(96vw,72rem)] max-h-[92vh] overflow-auto rounded-md border border-border bg-white p-3 backdrop:bg-navy/75 sm:p-4"
          onClose={() => setOpen(false)}
          onClick={(event) => {
            if (event.target === dialogRef.current) close();
          }}
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <p className="font-display text-sm font-semibold text-navy">{shot.title}</p>
            <button
              type="button"
              onClick={close}
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-border px-3 text-sm font-medium text-navy"
            >
              Close
            </button>
          </div>
          <Image
            src={shot.src}
            alt=""
            width={shot.width}
            height={shot.height}
            sizes="96vw"
            className="h-auto w-full"
          />
        </dialog>
      ) : null}
    </>
  );
}
