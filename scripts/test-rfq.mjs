#!/usr/bin/env node
/**
 * Exercises the real `/api/rfq` route (controller ruling R9) against a
 * built, running server — not a unit test with the route's internals
 * mocked out. Two server instances are started in turn, each with a
 * different environment, because "is SMTP configured" is read from
 * `process.env` at request time:
 *
 *   A. RFQ_TEST_JSON_TRANSPORT=1 — nodemailer's jsonTransport composes the
 *      real message (subject/text/html) without opening a network
 *      connection, and the route includes it in the response as
 *      `testMessage` (test-mode-only field, see api/rfq/route.ts). Covers
 *      delivered:true, the honeypot's silent no-op, 422s, CR/LF rejection,
 *      and the per-IP 429.
 *   B. No SMTP_* and no RFQ_TEST_JSON_TRANSPORT set at all — the real
 *      "nothing configured" path. Covers delivered:false.
 *
 * Run with `npm run test:rfq`. Requires a production build (`next build`);
 * this script builds one if `.next/BUILD_ID` is missing.
 */

import { spawn, execFileSync } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(fileURLToPath(new URL(".", import.meta.url)), "..");
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");

let failures = 0;
let passed = 0;

function ok(label, cond, detail) {
  if (cond) {
    passed++;
    console.log(`  ok - ${label}`);
  } else {
    failures++;
    console.error(`  FAIL - ${label}${detail ? ` (${detail})` : ""}`);
  }
}

function ensureBuilt() {
  if (existsSync(path.join(root, ".next", "BUILD_ID"))) return;
  console.log("No build found — running `next build` first...");
  execFileSync(process.execPath, [nextBin, "build"], { cwd: root, stdio: "inherit" });
}

/** Start `next start -p <port>` with a clean, explicit env and wait until it answers. */
function startServer(port, envOverrides) {
  const cleanEnv = { ...process.env };
  for (const k of [
    "SMTP_HOST",
    "SMTP_PORT",
    "SMTP_USER",
    "SMTP_PASS",
    "SMTP_TLS_INSECURE",
    "RFQ_TO_EMAIL",
    "RFQ_TEST_JSON_TRANSPORT",
  ]) {
    delete cleanEnv[k];
  }
  const env = { ...cleanEnv, ...envOverrides, PORT: String(port) };

  const child = spawn(process.execPath, [nextBin, "start", "-p", String(port)], {
    cwd: root,
    env,
    stdio: ["ignore", "pipe", "pipe"],
  });

  let stderr = "";
  child.stderr.on("data", (d) => {
    stderr += d.toString();
  });

  const ready = (async () => {
    const url = `http://localhost:${port}/`;
    const deadline = Date.now() + 30_000;
    while (Date.now() < deadline) {
      try {
        const res = await fetch(url);
        if (res.ok || res.status === 404) return;
      } catch {
        // not up yet
      }
      await new Promise((r) => setTimeout(r, 300));
    }
    throw new Error(`server on port ${port} did not become ready. stderr:\n${stderr}`);
  })();

  return { child, ready, getStderr: () => stderr };
}

function stopServer(child) {
  return new Promise((resolve) => {
    child.once("exit", resolve);
    child.kill();
    // Windows sometimes needs a harder nudge.
    setTimeout(() => {
      try {
        child.kill("SIGKILL");
      } catch {
        /* already gone */
      }
    }, 3000);
    setTimeout(resolve, 5000);
  });
}

function basePayload() {
  return {
    name: "Somchai Tester",
    company: "Test Co., Ltd.",
    email: "somchai@example.com",
    phone: "081-234-5678",
    product: "beryllium-copper",
    grade: "C17200",
    form: "Rod",
    quantity: "500 kg",
    message: "Please quote 500 kg of C17200 rod, 10mm diameter.",
    website: "",
  };
}

async function postRfq(port, ip, body) {
  const res = await fetch(`http://localhost:${port}/api/rfq`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-forwarded-for": ip },
    body: JSON.stringify(body),
  });
  let json = null;
  try {
    json = await res.json();
  } catch {
    /* no body */
  }
  return { status: res.status, headers: res.headers, json };
}

async function runJsonTransportSuite(port) {
  console.log("\nServer A (RFQ_TEST_JSON_TRANSPORT=1) — delivered:true, validation, honeypot, rate limit");

  // 1. Valid submission -> delivered:true, composed message contains the
  //    product/grade/fields with a header-injection-safe subject.
  {
    const { status, json } = await postRfq(port, "10.0.1.1", basePayload());
    ok("valid submission returns 200", status === 200, `status=${status}`);
    ok("delivered:true", json?.ok === true && json?.delivered === true, JSON.stringify(json));
    const msg = json?.testMessage ? JSON.parse(json.testMessage) : null;
    ok("message composed", !!msg, "no testMessage in response");
    if (msg) {
      ok("subject contains family name", /Beryllium Copper/i.test(msg.subject ?? ""), msg.subject);
      ok("subject contains grade", /C17200/.test(msg.subject ?? ""), msg.subject);
      ok("subject has no CR/LF", !/[\r\n]/.test(msg.subject ?? ""), JSON.stringify(msg.subject));
      // nodemailer normalizes `replyTo` into an address object/array rather
      // than keeping the plain string, so match loosely on its content.
      ok(
        "reply-to is submitter email",
        JSON.stringify(msg.replyTo ?? "").includes("somchai@example.com"),
        JSON.stringify(msg.replyTo),
      );
      ok("text body contains product/grade/fields", /Rod/.test(msg.text ?? "") && /500 kg/.test(msg.text ?? ""), msg.text);
    }
  }

  // 2. CR/LF in name -> rejected (422, field "name").
  {
    const { status, json } = await postRfq(port, "10.0.1.2", { ...basePayload(), name: "Somchai\r\nBcc: evil@example.com" });
    ok("CR/LF in name -> 422", status === 422, `status=${status}`);
    ok("422 names the field", json?.ok === false && json?.field === "name", JSON.stringify(json));
  }

  // 3. Bad email -> 422, field "email".
  {
    const { status, json } = await postRfq(port, "10.0.1.3", { ...basePayload(), email: "not-an-email" });
    ok("bad email -> 422", status === 422, `status=${status}`);
    ok("422 names the field", json?.ok === false && json?.field === "email", JSON.stringify(json));
  }

  // 4. Unknown product slug -> 422, field "product".
  {
    const { status, json } = await postRfq(port, "10.0.1.4", { ...basePayload(), product: "unobtainium" });
    ok("unknown product -> 422", status === 422, `status=${status}`);
    ok("422 names the field", json?.ok === false && json?.field === "product", JSON.stringify(json));
  }

  // 5. Honeypot filled -> same success shape as a real send, but no mail
  //    composed (no `testMessage`, which only appears once sendMail runs).
  {
    const { status, json } = await postRfq(port, "10.0.1.5", { ...basePayload(), website: "http://spam.example" });
    ok("honeypot -> 200", status === 200, `status=${status}`);
    ok("honeypot -> success shape", json?.ok === true && json?.delivered === true, JSON.stringify(json));
    ok("honeypot -> no mail composed", json?.testMessage === undefined, JSON.stringify(json));
  }

  // 6. Per-IP rate limit: 5 allowed in the window, 6th -> 429 + Retry-After.
  {
    const ip = "10.0.1.6";
    const results = [];
    for (let i = 0; i < 6; i++) {
      results.push(await postRfq(port, ip, basePayload()));
    }
    const first5 = results.slice(0, 5);
    const sixth = results[5];
    ok("first 5 requests from one IP succeed", first5.every((r) => r.status === 200), JSON.stringify(first5.map((r) => r.status)));
    ok("6th request -> 429", sixth.status === 429, `status=${sixth.status}`);
    ok("429 has Retry-After", !!sixth.headers.get("retry-after"), "missing header");
  }
}

async function runUnconfiguredSuite(port) {
  console.log("\nServer B (no SMTP configured) — delivered:false");
  const { status, json } = await postRfq(port, "10.0.2.1", basePayload());
  ok("valid submission returns 200", status === 200, `status=${status}`);
  ok("delivered:false when SMTP is unset", json?.ok === true && json?.delivered === false, JSON.stringify(json));
}

async function main() {
  ensureBuilt();

  const portA = 4175;
  const serverA = startServer(portA, { RFQ_TEST_JSON_TRANSPORT: "1" });
  try {
    await serverA.ready;
    await runJsonTransportSuite(portA);
  } finally {
    await stopServer(serverA.child);
  }

  const portB = 4176;
  const serverB = startServer(portB, {});
  try {
    await serverB.ready;
    await runUnconfiguredSuite(portB);
  } finally {
    await stopServer(serverB.child);
  }

  console.log(`\n${passed} passed, ${failures} failed`);
  if (failures > 0) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
