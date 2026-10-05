/**
 * Turns a raw `/api/rfq` HTTP response into the outcome the form shows.
 *
 * Kept free of imports so `scripts/test-rfq.mjs` can transpile this one file
 * on its own and test the exact decision the browser makes.
 *
 * The rule that matters: a request counts as sent ONLY when the API answers
 * 2xx with a JSON body whose `delivered` is literally `true`. An unparseable
 * body, a missing field, `delivered: false`, or any other value is reported as
 * NOT sent, so the form keeps every input and never claims a lead reached us
 * when nothing confirmed it.
 */
export type RfqOutcome =
  | { kind: "ok" }
  | { kind: "undelivered" }
  | { kind: "rateLimited" }
  | { kind: "invalid"; field?: string };

function parse(bodyText: string): unknown {
  try {
    return JSON.parse(bodyText);
  } catch {
    return null;
  }
}

export function classifyRfqResponse(status: number, bodyText: string): RfqOutcome {
  if (status === 429) return { kind: "rateLimited" };

  const body = parse(bodyText);
  const obj = body !== null && typeof body === "object" ? (body as Record<string, unknown>) : null;

  if (status === 422) {
    return { kind: "invalid", field: typeof obj?.field === "string" ? obj.field : undefined };
  }

  if (status >= 200 && status < 300 && obj?.delivered === true) return { kind: "ok" };

  return { kind: "undelivered" };
}
