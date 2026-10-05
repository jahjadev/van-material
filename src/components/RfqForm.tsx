"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, MessageCircle, Phone } from "lucide-react";
import {
  createRfqSchema,
  gradeOptionsFor,
  PRODUCT_SLUGS,
  type RfqInput,
} from "@/lib/rfqSchema";
import { families } from "@/data/products";
import { company } from "@/data/company";
import { LocaleLink } from "@/components/LocaleLink";
import type { Lang } from "@/lib/locale";

const fieldBase =
  "w-full rounded-md border border-line bg-surface px-4 py-3 text-[15px] text-primary placeholder:text-secondary/70 focus-visible:border-accent focus-visible:outline-none";

type Status = "idle" | "sending" | "ok" | "error" | "undelivered" | "rateLimited";

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
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-primary">
      {children}
      {required && <span className="text-accent"> *</span>}
    </label>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-[13px] text-accent">
      {message}
    </p>
  );
}

/**
 * The real RFQ form, split from the `RfqForm` export so the part that calls
 * `useSearchParams` (to prefill `?product=&grade=` from the "Request a
 * quote" links on product pages) sits behind a `<Suspense>` boundary. That
 * keeps `/contact` and `/en/contact` static: Next.js client-side-renders
 * only the subtree inside the boundary, and the rest of the page still
 * prerenders (see node_modules/next/dist/docs .../use-search-params.md,
 * "Behavior > Prerendering").
 */
function RfqFormInner({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const c = company.contact;
  const searchParams = useSearchParams();

  const initialProduct = useMemo(() => {
    const p = searchParams.get("product");
    return p && PRODUCT_SLUGS.includes(p) ? p : "";
  }, [searchParams]);

  const initialFamily = families.find((f) => f.slug === initialProduct);

  const initialGrade = useMemo(() => {
    const g = searchParams.get("grade");
    if (!g || !initialFamily) return "";
    return gradeOptionsFor(initialFamily).some((o) => o.value === g) ? g : "";
  }, [searchParams, initialFamily]);

  const schema = useMemo(() => createRfqSchema(lang), [lang]);
  const [status, setStatus] = useState<Status>("idle");

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RfqInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      product: initialProduct,
      grade: initialGrade,
      form: "",
      quantity: "",
      message: "",
      website: "",
    },
  });

  const product = watch("product");
  const family = families.find((f) => f.slug === product);
  const gradeOptions = useMemo(() => gradeOptionsFor(family), [family]);

  // Reset the grade whenever the visitor picks a *different* product than
  // the one already selected — but not on mount, so a prefilled
  // `?product=&grade=` pair survives.
  const prevProductRef = useRef(initialProduct);
  useEffect(() => {
    if (product !== prevProductRef.current) {
      setValue("grade", "");
      prevProductRef.current = product;
    }
  }, [product, setValue]);

  async function onSubmit(data: RfqInput) {
    setStatus("sending");
    try {
      const res = await fetch("/api/rfq", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 429) {
        setStatus("rateLimited");
        return;
      }
      if (!res.ok && res.status !== 422) throw new Error("request failed");
      if (res.status === 422) {
        setStatus("error");
        return;
      }

      const result: { ok?: boolean; delivered?: boolean } = await res
        .json()
        .catch(() => ({}));

      // The API answers 200 even when email delivery fails, so the request
      // only truly reached us when `delivered` is true. On a failed
      // delivery, keep every input filled in so the visitor can retry or
      // copy their text instead of re-typing it.
      if (result.delivered === false) {
        setStatus("undelivered");
        return;
      }

      setStatus("ok");
      reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="rounded-2xl border border-line bg-surface p-6 text-center md:p-8" role="status" aria-live="polite">
        <CheckCircle2 className="mx-auto size-10 text-accent" aria-hidden />
        <h3 className="mt-4 text-lg font-bold text-primary">
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
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 text-sm font-semibold text-primary hover:border-accent"
          >
            <Phone className="size-4" aria-hidden />
            {c.telsDisplay[0]}
          </a>
          <a
            href={c.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-surface px-5 text-sm font-semibold text-primary hover:border-accent"
          >
            <MessageCircle className="size-4" aria-hidden />
            LINE {c.lineId}
          </a>
        </div>
        <button
          type="button"
          className="mt-6 text-sm font-medium text-accent hover:underline"
          onClick={() => setStatus("idle")}
        >
          {en ? "Send another request" : "ส่งคำขอใหม่อีกครั้ง"}
        </button>
      </div>
    );
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
            {...register("product")}
            className={fieldBase}
            aria-invalid={!!errors.product}
            aria-describedby={errors.product ? "rfq-product-error" : undefined}
          >
            <option value="" disabled>
              {en ? "Select a product" : "เลือกสินค้า"}
            </option>
            {families.map((f) => (
              <option key={f.slug} value={f.slug}>
                {f.name[lang]}
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
            disabled={!family}
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
        <input
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div aria-live="polite">
        {status === "error" && (
          <p role="alert" className="rounded-md bg-accent/5 px-4 py-3 text-sm text-accent">
            {en
              ? `Something went wrong while sending. Please try again, or reach us by phone/LINE below.`
              : `เกิดข้อผิดพลาดในการส่ง กรุณาลองใหม่ หรือติดต่อเราทางโทรศัพท์/LINE ด้านล่าง`}
          </p>
        )}
        {status === "rateLimited" && (
          <p role="alert" className="rounded-md bg-accent/5 px-4 py-3 text-sm text-accent">
            {en
              ? `You've sent several requests in a short time. Please wait a moment and try again, or contact us directly: call ${c.telsDisplay[0]} or LINE ${c.lineId}.`
              : `คุณส่งคำขอบ่อยเกินไป กรุณารอสักครู่แล้วลองใหม่ หรือติดต่อโดยตรง โทร ${c.telsDisplay[0]} หรือ LINE ${c.lineId}`}
          </p>
        )}
        {status === "undelivered" && (
          <p role="alert" className="rounded-md bg-accent/5 px-4 py-3 text-sm text-accent">
            {en
              ? `Your request was NOT sent. Please call ${c.telsDisplay[0]} or LINE ${c.lineId}.`
              : `คำขอของคุณยังไม่ถูกส่ง กรุณาโทร ${c.telsDisplay[0]} หรือ LINE ${c.lineId}`}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isSubmitting || status === "sending"}
          className="inline-flex min-h-11 items-center justify-center whitespace-nowrap rounded-full bg-accent px-6 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {status === "sending" ? (en ? "Sending…" : "กำลังส่ง…") : en ? "Send quote request" : "ส่งคำขอใบเสนอราคา"}
        </button>
        <p id="rfq-fallback" className="text-[13px] text-secondary">
          {en ? "Or reach us directly: call " : "หรือติดต่อด่วน: โทร "}
          <a className="text-accent hover:underline" href={`tel:${c.tels[0]}`}>
            {c.telsDisplay[0]}
          </a>{" "}
          · LINE{" "}
          <a className="text-accent hover:underline" href={c.lineUrl} target="_blank" rel="noopener noreferrer">
            {c.lineId}
          </a>
        </p>
      </div>

      <p className="text-sm text-secondary">
        {en ? "How we handle the details you send: " : "การจัดการข้อมูลที่คุณส่งมา: "}
        <LocaleLink href="/privacy" className="font-medium text-accent underline underline-offset-2 hover:text-primary">
          {en ? "privacy notice" : "นโยบายความเป็นส่วนตัว"}
        </LocaleLink>
      </p>
    </form>
  );
}

/** Public export — wraps the search-params-reading form in `<Suspense>`. */
export function RfqForm({ lang }: { lang: Lang }) {
  return (
    <Suspense fallback={<div className="h-[560px]" aria-hidden />}>
      <RfqFormInner lang={lang} />
    </Suspense>
  );
}
