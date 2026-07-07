// Spec: results-page-spec.md §13 (C7 broker capture)
import { useEffect, useId, useRef, useState } from "react";
import type { FormEvent } from "react";
import type { LenderResult } from "../engine/types";
import { copy } from "../lib/copy";

interface BrokerOverlayProps {
  lenders: LenderResult[];
  selected: LenderResult | null;
  submitted: boolean;
  onSubmitted: (lead: { first: string; mobile: string; lender: string }) => void;
  onClose: () => void;
}

type Fields = {
  first: string;
  last: string;
  mobile: string;
  email: string;
  lender: string;
  journey: string;
  notes: string;
  consent: boolean;
};

function validMobile(value: string) {
  const digits = value.replace(/\D/g, "");
  return /^04\d{8}$/.test(digits) || /^614\d{8}$/.test(digits);
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function BrokerOverlay({ lenders, selected, submitted, onSubmitted, onClose }: BrokerOverlayProps) {
  const titleId = useId();
  const firstRef = useRef<HTMLInputElement | null>(null);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const [success, setSuccess] = useState<{ first: string; mobile: string; lender: string } | null>(null);
  const [fields, setFields] = useState<Fields>({
    first: "",
    last: "",
    mobile: "",
    email: "",
    lender: selected?.id ?? "",
    journey: "",
    notes: "",
    consent: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    firstRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function update<K extends keyof Fields>(key: K, value: Fields[K]) {
    setFields((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (sending || submitted || success) return;
    const nextErrors: Partial<Record<keyof Fields, string>> = {};
    if (!fields.first.trim()) nextErrors.first = copy.broker.errors.first;
    if (!fields.last.trim()) nextErrors.last = copy.broker.errors.last;
    if (!validMobile(fields.mobile)) nextErrors.mobile = copy.broker.errors.mobile;
    if (!validEmail(fields.email)) nextErrors.email = copy.broker.errors.email;
    if (!fields.journey) nextErrors.journey = copy.broker.errors.journey;
    if (!fields.consent) nextErrors.consent = copy.broker.errors.consent;

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      firstRef.current?.focus();
      return;
    }

    setSending(true);
    setFailed(false);
    await new Promise((resolve) => globalThis.setTimeout(resolve, 350));
    setSending(false);
    const lenderName = lenders.find((lender) => lender.id === fields.lender)?.name ?? copy.broker.noPreference;
    const lead = { first: fields.first.trim(), mobile: fields.mobile.trim(), lender: lenderName };
    setSuccess(lead);
    onSubmitted(lead);
  }

  const successState = success || (submitted ? { first: fields.first || "there", mobile: fields.mobile || "your mobile", lender: copy.broker.noPreference } : null);

  return (
    <div className="rp-broker-overlay" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <button type="button" className="rp-update-scrim" aria-label={copy.update.cancel} onClick={onClose} />
      <div className="rp-broker-panel">
        <button type="button" className="rp-close-button" aria-label={copy.update.cancel} onClick={onClose}>
          ×
        </button>
        <div className="rp-eyebrow">{copy.broker.eyebrow}</div>
        <h2 id={titleId}>{copy.broker.title}</h2>
        <p>{copy.broker.lede}</p>
        {successState ? (
          <div className="rp-broker-success">
            <div aria-hidden="true">✓</div>
            <h3>{copy.broker.successTitle(successState.first)}</h3>
            <p>
              {successState.lender === copy.broker.noPreference
                ? copy.broker.successNoPreference(successState.mobile)
                : copy.broker.successBody(successState.mobile, successState.lender)}
            </p>
            <button type="button" className="rp-primary-cta" onClick={onClose}>
              {copy.broker.done}
            </button>
          </div>
        ) : (
          <form className="rp-broker-form" onSubmit={submit} noValidate>
            <label>
              <span>{copy.broker.first}</span>
              <input aria-label={copy.broker.first} ref={firstRef} value={fields.first} onChange={(event) => update("first", event.target.value)} />
              {errors.first ? <em>{errors.first}</em> : null}
            </label>
            <label>
              <span>{copy.broker.last}</span>
              <input aria-label={copy.broker.last} value={fields.last} onChange={(event) => update("last", event.target.value)} />
              {errors.last ? <em>{errors.last}</em> : null}
            </label>
            <label>
              <span>{copy.broker.mobile}</span>
              <input
                aria-label={copy.broker.mobile}
                inputMode="tel"
                placeholder="0400 000 000"
                value={fields.mobile}
                onChange={(event) => update("mobile", event.target.value)}
              />
              {errors.mobile ? <em>{errors.mobile}</em> : null}
            </label>
            <label>
              <span>{copy.broker.email}</span>
              <input aria-label={copy.broker.email} type="email" value={fields.email} onChange={(event) => update("email", event.target.value)} />
              {errors.email ? <em>{errors.email}</em> : null}
            </label>
            <label className="rp-form-wide">
              <span>{copy.broker.lender}</span>
              <select aria-label={copy.broker.lender} value={fields.lender} onChange={(event) => update("lender", event.target.value)}>
                <option value="">{copy.broker.noPreference}</option>
                {lenders.map((lender) => (
                  <option key={lender.id} value={lender.id}>
                    {lender.name} — {lender.product}
                  </option>
                ))}
              </select>
            </label>
            <fieldset className="rp-form-wide">
              <legend>{copy.broker.journey}</legend>
              <div className="rp-chip-grid">
                {copy.broker.stages.map((stage) => (
                  <button
                    key={stage}
                    type="button"
                    className={fields.journey === stage ? "is-selected" : ""}
                    aria-pressed={fields.journey === stage}
                    onClick={() => update("journey", stage)}
                  >
                    {stage}
                  </button>
                ))}
              </div>
              {errors.journey ? <em>{errors.journey}</em> : null}
            </fieldset>
            <label className="rp-form-wide">
              <span>{copy.broker.notes}</span>
              <textarea aria-label={copy.broker.notes} rows={3} maxLength={500} value={fields.notes} onChange={(event) => update("notes", event.target.value)} />
            </label>
            <label className="rp-consent rp-form-wide">
              <input aria-label={copy.broker.consent} type="checkbox" checked={fields.consent} onChange={(event) => update("consent", event.target.checked)} />
              <span>{copy.broker.consent}</span>
              {errors.consent ? <em>{errors.consent}</em> : null}
            </label>
            {failed ? <div className="rp-form-error">{copy.broker.fail}</div> : null}
            <button type="submit" className="rp-primary-cta rp-form-wide" disabled={sending}>
              {sending ? copy.broker.sending : copy.broker.submit}
            </button>
            <p className="rp-broker-fine rp-form-wide">{copy.broker.fine}</p>
          </form>
        )}
      </div>
    </div>
  );
}
