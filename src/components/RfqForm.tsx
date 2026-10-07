"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, type UseFormReturn, type UseFormSetValue } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { createRfqSchema, type RfqInput } from "@/lib/rfqSchema";
import type { RfqProductOption } from "@/lib/rfqOptions";
import { classifyRfqResponse } from "@/lib/rfqOutcome";
import { company } from "@/data/company";
import { LocaleLink } from "@/components/LocaleLink";
import type { Lang } from "@/lib/locale";

const fieldBase =
  "w-full min-h-[50px] rounded-[10px] border border-line-strong bg-white px-3.5 py-3 text-[16px] text-primary outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-muted focus-visible:border-accent focus-visible:shadow-[0_0_0_3px_rgba(20,70,240,.15)] focus-visible:outline-none aria-[invalid=true]:border-danger";

type Status = "idle" | "sending" | "ok" | "undelivered" | "rateLimited";

const EMPTY_VALUES: RfqInput = {
  name: "",
  company: "",
  email: "",
  phone: "",
  product: "",
  grade: "",
  form: "",
  quantity: "",
  message: "",
  website: "",
};

const FIELD_NAMES = Object.keys(EMPTY_VALUES) as (keyof RfqInput)[];

function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-[14px] font-semibold text-primary">
      {children}
      {required && <span className="text-accent"> *</span>}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-[13.5px] text-danger">
      {message}
    </p>
  );
}

/**
 * Reads `?product=&grade=` (as sent by the "Request a quote" links on
 * product pages) and pushes them into the already-mounted form via
 * `setValue`. Deliberately the *only* thing in this tree that calls
 * `useSearchParams`, and deliberately renders nothing: everything else —
 * the real, visible, unprefilled form — lives outside this `<Suspense>`
 * boundary so it prerenders as static HTML. Only this tiny child is
 * client-side-rendered (see node_modules/next/dist/docs/01-app/03-api-
 * reference/04-functions/use-search-params.md, "Behavior > Prerendering"),
 * and it has no visual fallback gap because it never renders anything
 * itself.
 */
function PrefillFromParams({
  products,
  setValue,
}: {
  products: RfqProductOption[];
  setValue: UseFormSetValue<RfqInput>;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const p = searchParams.get("product");
    const product = p && products.some((pr) => pr.slug === p) ? p : "";
    if (!product) return;
    setValue("product", product);

    const found = products.find((pr) => pr.slug === product);
    const g = searchParams.get("grade");
    const grade = g && found && found.grades.some((o) => o.value === g) ? g : "";
    if (grade) setValue("grade", grade);
  }, [searchParams, setValue, products]);

  return null;
}

function SuccessPanel({
  lang,
  headingRef,
  onReset,
}: {
  lang: Lang;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onReset: () => void;
}) {
  const en = lang === "en";
  const c = company.contact;
  return (
    <div className="border-t border-line pt-7 text-center">
      <CheckCircle2 className="mx-auto size-10 text-accent" aria-hidden />
      {/* tabIndex=-1 lets this take focus programmatically (below) without
          joining the normal Tab order. Moving focus here is what reliably
          announces the outcome to assistive tech — more reliable than
          hoping a newly-inserted live region gets picked up. */}
      <h3 ref={headingRef} tabIndex={-1} className="mt-4 text-[28px] font-semibold text-primary outline-none">
        {en ? "We've received your request" : "ได้รับคำขอของคุณแล้ว"}
      </h3>
      <p className="mx-auto mt-2 max-w-md leading-relaxed text-secondary">
        {en
          ? `Our team will get back to you as soon as possible during business hours (${c.hoursEn}). For anything urgent, call or message us on LINE right away.`
          : `ทีมงานจะติดต่อกลับโดยเร็วที่สุดในเวลาทำการ (${c.hoursTh}) หากต้องการติดต่อด่วน โทรหรือทักไลน์ได้ทันที`}
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <a
          href={`tel:${c.tels[0]}`}
          className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-line bg-white px-5 text-sm font-semibold text-primary hover:border-accent hover:bg-accent-tint"
        >
          <Phone className="size-4" aria-hidden />
          {c.telsDisplay[0]}
        </a>
        <a
          href={c.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 rounded-[10px] border border-line bg-white px-5 text-sm font-semibold text-primary hover:border-accent hover:bg-accent-tint"
        >
          <MessageCircle className="size-4" aria-hidden />
          LINE {c.lineId}
        </a>
      </div>
      <button type="button" className="mt-6 text-sm font-medium text-accent hover:underline" onClick={onReset}>
        {en ? "Send another request" : "ส่งคำขอใหม่อีกครั้ง"}
      </button>
    </div>
  );
}

function RfqFormFields({
  lang,
  products,
  form,
  status,
  setStatus,
}: {
  lang: Lang;
  products: RfqProductOption[];
  form: UseFormReturn<RfqInput>;
  status: Status;
  setStatus: (s: Status) => void;
}) {
  const en = lang === "en";
  const c = company.contact;
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    setFocus,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const product = watch("product");
  const selected = products.find((p) => p.slug === product);
  const gradeOptions = useMemo(() => selected?.grades ?? [], [selected]);
  const productField = register("product");

  async function onSubmit(data: RfqInput) {
    setStatus("sending");
    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      // Every branch of this decision lives in classifyRfqResponse (shared
      // with scripts/test-rfq.mjs). Only a 2xx whose JSON says
      // `delivered: true` counts as sent; anything else — a 5xx, an
      // unparseable body, `delivered: false` or a missing field — is the
      // "not sent" outcome and keeps every input filled in so the visitor
      // can retry or copy their text instead of re-typing it.
      const outcome = classifyRfqResponse(res.status, await res.text().catch(() => ""));

      if (outcome.kind === "rateLimited") {
        setStatus("rateLimited");
        return;
      }

      if (outcome.kind === "invalid") {
        const target = (FIELD_NAMES as string[]).includes(outcome.field ?? "")
          ? (outcome.field as keyof RfqInput)
          : "message";
        setError(target, {
          type: "server",
          message: en ? "Please check this field and try again." : "กรุณาตรวจสอบข้อมูลนี้อีกครั้ง",
        });
        setFocus(target);
        setStatus("idle");
        return;
      }

      if (outcome.kind === "undelivered") {
        setStatus("undelivered");
        return;
      }

      setStatus("ok");
      reset();
    } catch {
      // A network error means the request may never have reached the
      // server at all — same "not sent" outcome, inputs kept.
      setStatus("undelivered");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5" aria-describedby="rfq-fallback">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="rfq-name" required>
            {en ? "Full name" : "ชื่อ–นามสกุล"}
          </Label>
          <input
            id="rfq-name"
            {...register("name")}
            className={fieldBase}
            placeholder={en ? "Your name" : "ชื่อของคุณ"}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "rfq-name-error" : undefined}
          />
          <FieldError id="rfq-name-error" message={errors.name?.message} />
        </div>
        <div>
          <Label htmlFor="rfq-company">{en ? "Company" : "ชื่อบริษัท"}</Label>
          <input
            id="rfq-company"
            {...register("company")}
            className={fieldBase}
            placeholder={en ? "Company name (optional)" : "ชื่อบริษัท (ถ้ามี)"}
            aria-invalid={!!errors.company}
            aria-describedby={errors.company ? "rfq-company-error" : undefined}
          />
          <FieldError id="rfq-company-error" message={errors.company?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="rfq-email" required>
            {en ? "Email" : "อีเมล"}
          </Label>
          <input
            id="rfq-email"
            type="email"
            {...register("email")}
            className={fieldBase}
            placeholder="you@example.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "rfq-email-error" : undefined}
          />
          <FieldError id="rfq-email-error" message={errors.email?.message} />
        </div>
        <div>
          <Label htmlFor="rfq-phone" required>
            {en ? "Phone number" : "เบอร์โทรศัพท์"}
          </Label>
          <input
            id="rfq-phone"
            type="tel"
            {...register("phone")}
            className={fieldBase}
            placeholder="08x-xxx-xxxx"
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? "rfq-phone-error" : undefined}
          />
          <FieldError id="rfq-phone-error" message={errors.phone?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="rfq-product" required>
            {en ? "Product" : "สินค้า"}
          </Label>
          <select
            id="rfq-product"
            {...productField}
            onChange={(e) => {
              productField.onChange(e);
              // A genuine product change invalidates any grade already
              // chosen for the old product. `PrefillFromParams` sets both
              // fields via `setValue`, which does not fire this handler
              // (no real `change` event), so the initial `?product=&grade=`
              // prefill is unaffected.
              setValue("grade", "");
            }}
            className={fieldBase}
            aria-invalid={!!errors.product}
            aria-describedby={errors.product ? "rfq-product-error" : undefined}
          >
            <option value="" disabled>
              {en ? "Select a product" : "เลือกสินค้า"}
            </option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                {p.name[lang]}
              </option>
            ))}
          </select>
          <FieldError id="rfq-product-error" message={errors.product?.message} />
        </div>
        <div>
          <Label htmlFor="rfq-grade">{en ? "Grade" : "เกรด"}</Label>
          <select
            id="rfq-grade"
            {...register("grade")}
            className={fieldBase}
            disabled={!selected}
            aria-invalid={!!errors.grade}
            aria-describedby={errors.grade ? "rfq-grade-error" : undefined}
          >
            <option value="">{en ? "Select a grade (optional)" : "เลือกเกรด (ไม่บังคับ)"}</option>
            {gradeOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label[lang]}
              </option>
            ))}
          </select>
          <FieldError id="rfq-grade-error" message={errors.grade?.message} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="rfq-form">{en ? "Form" : "รูปแบบ"}</Label>
          <input
            id="rfq-form"
            {...register("form")}
            className={fieldBase}
            placeholder={en ? "e.g. rod, plate, strip (optional)" : "เช่น แท่ง แผ่น แถบ (ไม่บังคับ)"}
            aria-invalid={!!errors.form}
            aria-describedby={errors.form ? "rfq-form-error" : undefined}
          />
          <FieldError id="rfq-form-error" message={errors.form?.message} />
        </div>
        <div>
          <Label htmlFor="rfq-quantity">{en ? "Quantity" : "จำนวน"}</Label>
          <input
            id="rfq-quantity"
            {...register("quantity")}
            className={fieldBase}
            placeholder={en ? "e.g. 500 kg (optional)" : "เช่น 500 กก. (ไม่บังคับ)"}
            aria-invalid={!!errors.quantity}
            aria-describedby={errors.quantity ? "rfq-quantity-error" : undefined}
          />
          <FieldError id="rfq-quantity-error" message={errors.quantity?.message} />
        </div>
      </div>

      <div>
        <Label htmlFor="rfq-message" required>
          {en ? "Message" : "ข้อความ"}
        </Label>
        <textarea
          id="rfq-message"
          rows={5}
          {...register("message")}
          className={`${fieldBase} resize-y`}
          placeholder={
            en
              ? "Tell us the size, specification and anything else we should know."
              : "บอกเราเกี่ยวกับขนาด สเปค และรายละเอียดอื่น ๆ ที่ควรทราบ"
          }
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "rfq-message-error" : undefined}
        />
        <FieldError id="rfq-message-error" message={errors.message?.message} />
      </div>

      {/* Honeypot: real visitors never see or reach this field. A bot that
          fills in every input (including hidden ones) trips it, and the API
          silently drops the submission instead of 422-ing it (see
          api/rfq/route.ts) — see rfqSchema.ts for why. */}
      <div style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }} aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSubmitting || status === "sending"}
          className="inline-flex min-h-[50px] items-center justify-center gap-2.5 whitespace-nowrap rounded-[10px] bg-accent px-6 text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-accent-hover disabled:opacity-60"
        >
          {status === "sending" ? (en ? "Sending…" : "กำลังส่ง…") : en ? "Send quote request" : "ส่งคำขอใบเสนอราคา"}
        </button>
        <p id="rfq-fallback" className="text-[13px] text-secondary">
          {en ? "Or reach us directly: call " : "หรือติดต่อด่วน: โทร "}
          <a className="text-accent underline underline-offset-[3px]" href={`tel:${c.tels[0]}`}>
            {c.telsDisplay[0]}
          </a>{" "}
          · LINE{" "}
          <a className="text-accent underline underline-offset-[3px]" href={c.lineUrl} target="_blank" rel="noopener noreferrer">
            {c.lineId}
          </a>
        </p>
      </div>

      <p className="text-sm text-secondary">
        {en ? "How we handle the details you send: " : "การจัดการข้อมูลที่คุณส่งมา: "}
        <LocaleLink href="/privacy" className="font-medium text-link underline underline-offset-[3px]">
          {en ? "privacy notice" : "นโยบายความเป็นส่วนตัว"}
        </LocaleLink>
      </p>
    </form>
  );
}

/**
 * RFQ ("request a quote") form. The form itself (`RfqFormFields`) and the
 * success panel are plain, static-friendly markup — no dynamic API calls —
 * so they prerender as real HTML. Only `PrefillFromParams`, which reads
 * `?product=&grade=` via `useSearchParams`, is isolated behind
 * `<Suspense>`; it renders nothing, so there's no visual placeholder gap,
 * and `/contact` / `/en/contact` stay static.
 */
export function RfqForm({ lang, products }: { lang: Lang; products: RfqProductOption[] }) {
  const en = lang === "en";
  const c = company.contact;
  const schema = useMemo(() => createRfqSchema(lang, products), [lang, products]);
  const form = useForm<RfqInput>({
    resolver: zodResolver(schema),
    defaultValues: EMPTY_VALUES,
  });
  const [status, setStatus] = useState<Status>("idle");
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // Moving focus to the success heading is the reliable way to get
  // assistive tech to announce the outcome — more reliable than hoping a
  // newly-inserted live region gets picked up.
  useEffect(() => {
    if (status === "ok") successHeadingRef.current?.focus();
  }, [status]);

  return (
    <div>
      <Suspense fallback={null}>
        <PrefillFromParams products={products} setValue={form.setValue} />
      </Suspense>

      {/* Persistent live region: this node stays mounted across every
          status transition (it's a sibling of the form/success views, not
          nested inside either), so assistive tech reliably announces a
          rate-limit or non-delivery notice instead of missing it because
          the whole subtree it used to live in got replaced. */}
      <div aria-live="polite" role="status">
        {status === "rateLimited" && (
          <p className="mb-5 rounded-[10px] border border-dashed border-[#E2B36B] bg-[#FFF6E8] px-4 py-3 text-sm text-[#8A4B00]">
            {en
              ? `You've sent several requests in a short time. Please wait a moment and try again, or contact us directly: call ${c.telsDisplay[0]} or LINE ${c.lineId}.`
              : `คุณส่งคำขอบ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่ หรือติดต่อโดยตรง โทร ${c.telsDisplay[0]} หรือ LINE ${c.lineId}`}
          </p>
        )}
        {status === "undelivered" && (
          <p className="mb-5 rounded-[10px] border border-dashed border-[#E2B36B] bg-[#FFF6E8] px-4 py-3 text-sm text-[#8A4B00]">
            {en
              ? `Your request was NOT sent. Please call ${c.telsDisplay[0]} or LINE ${c.lineId}.`
              : `คำขอของคุณยังไม่ถูกส่ง กรุณาโทร ${c.telsDisplay[0]} หรือ LINE ${c.lineId}`}
          </p>
        )}
      </div>

      {status === "ok" ? (
        <SuccessPanel lang={lang} headingRef={successHeadingRef} onReset={() => setStatus("idle")} />
      ) : (
        <RfqFormFields lang={lang} products={products} form={form} status={status} setStatus={setStatus} />
      )}
    </div>
  );
}
