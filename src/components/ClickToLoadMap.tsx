"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";

/**
 * Google Maps embed that loads only after the visitor asks for it. Until the
 * button is pressed nothing is requested from Google, so no IP/device data is
 * shared with Google just for opening /contact (the privacy notice describes
 * this). The static HTML is the button alone, so the page stays prerendered.
 */
export function ClickToLoadMap({
  src,
  title,
  buttonLabel,
  note,
}: {
  src: string;
  title: string;
  buttonLabel: string;
  note: string;
}) {
  const [show, setShow] = useState(false);

  if (show) {
    return (
      <iframe
        src={src}
        title={title}
        referrerPolicy="no-referrer-when-downgrade"
        className="mt-5 aspect-[4/3] w-full rounded-xl border border-line"
      />
    );
  }

  return (
    <div className="mt-5 flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-xl border border-line bg-surface p-6 text-center">
      <button
        type="button"
        onClick={() => setShow(true)}
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-background px-5 text-sm font-semibold text-primary hover:border-accent"
      >
        <MapPin className="size-4" aria-hidden />
        {buttonLabel}
      </button>
      <p className="max-w-xs text-[13px] leading-relaxed text-secondary">{note}</p>
    </div>
  );
}
