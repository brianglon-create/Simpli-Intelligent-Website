const SECRET =
  /(?:sb_secret_[A-Za-z0-9_-]+|sb_publishable_[A-Za-z0-9_-]+|eyJ[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}\.[A-Za-z0-9_-]{8,}|postgres(?:ql)?:\/\/\S+)/gi;

export function redactSecrets(value: string): string {
  return value.replace(SECRET, "[redacted]");
}

/** Log a server failure with Supabase code, message, details, and hint. Never includes secrets. */
export function logServerError(context: string, error: unknown): void {
  if (error && typeof error === "object") {
    const row = error as {
      code?: unknown;
      message?: unknown;
      details?: unknown;
      hint?: unknown;
    };
    const message =
      typeof row.message === "string"
        ? row.message
        : error instanceof Error
          ? error.message
          : "unknown";
    const parts = [
      typeof row.code === "string" ? `code=${redactSecrets(row.code)}` : null,
      `message=${redactSecrets(message)}`,
      typeof row.details === "string" ? `details=${redactSecrets(row.details)}` : null,
      typeof row.hint === "string" ? `hint=${redactSecrets(row.hint)}` : null,
    ].filter((part): part is string => Boolean(part));
    console.error(context, parts.join(" "));
    return;
  }

  console.error(
    context,
    error instanceof Error ? redactSecrets(error.message) : "unknown",
  );
}
