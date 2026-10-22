import { logServerError } from "@/lib/leads/error-log";
import { logSupabaseKeyDiagnostic } from "@/lib/leads/key-diagnostic";
import { submitLead } from "@/lib/leads/submit";
import { clientAddress, rateLimit } from "@/lib/leads/rate-limit";
import { SITE } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function sameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (!origin || !host) return false;
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return Response.json({ ok: false, error: "origin" }, { status: 403 });
  }

  if (!rateLimit(clientAddress(request))) {
    return Response.json(
      {
        ok: false,
        error: "rate_limit",
        message: `Please wait a few minutes and try again, or email ${SITE.contactEmail}.`,
      },
      { status: 429 },
    );
  }

  const length = Number(request.headers.get("content-length") ?? "0");
  if (length > 20_000) {
    return Response.json({ ok: false, error: "payload" }, { status: 413 });
  }

  let json: unknown;
  try {
    const text = await request.text();
    if (text.length > 20_000) {
      return Response.json({ ok: false, error: "payload" }, { status: 413 });
    }
    json = JSON.parse(text);
  } catch {
    return Response.json(
      { ok: false, error: "validation", fields: { form: "Check the form and try again." } },
      { status: 400 },
    );
  }

  try {
    const outcome = await submitLead(json);
    const body =
      outcome.status === 200 ? { ...outcome.body, foundingSpot: null } : outcome.body;
    return Response.json(body, {
      status: outcome.status,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    logSupabaseKeyDiagnostic();
    logServerError("Lead route failed", error);
    return Response.json(
      {
        ok: false,
        error: "server",
        message: `We couldn't save that. Email ${SITE.contactEmail} and we'll add you manually.`,
      },
      { status: 500 },
    );
  }
}
