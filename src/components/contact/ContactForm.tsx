"use client";

import { FormEvent, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { consumeQuoteNotes } from "@/lib/quoteHandoff";
import { postFormPayload } from "@/lib/formSubmit";

const PROJECT_TYPES = [
  "Commercial",
  "Residential",
  "Infrastructure",
  "Airport",
  "Bridge",
  "Other",
];

const inputClass =
  "focus-ring mt-1.5 w-full rounded-[var(--radius-sm)] border border-black/10 bg-graphite px-3.5 py-3 text-ink-text outline-none transition-colors focus:border-accent";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [projectType, setProjectType] = useState("");
  const [focusMessage, setFocusMessage] = useState(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const applyNotes = () => {
      const payload = consumeQuoteNotes();
      if (!payload) return;
      setSubmitted(false);
      setError("");
      setMessage((prev) =>
        prev.trim() ? `${prev.trim()}\n\n${payload.notes}` : payload.notes,
      );
      if (payload.projectType) setProjectType(payload.projectType);
      setFocusMessage(true);
    };

    applyNotes();
    window.addEventListener("prime-quote-notes", applyNotes);
    return () => {
      window.removeEventListener("prime-quote-notes", applyNotes);
    };
  }, []);

  useEffect(() => {
    if (submitted || !focusMessage) return;
    messageRef.current?.focus();
    setFocusMessage(false);
  }, [submitted, focusMessage, message]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const drawings = data.get("drawings");
    const file = drawings instanceof File && drawings.size > 0 ? drawings : null;

    setSending(true);
    setError("");
    const result = await postFormPayload(
      {
        _subject: "Prime Rebar quote request",
        name: String(data.get("name") ?? ""),
        company: String(data.get("company") ?? ""),
        email: String(data.get("email") ?? ""),
        phone: String(data.get("phone") ?? ""),
        projectType: String(data.get("projectType") ?? ""),
        pourDate: String(data.get("pourDate") ?? ""),
        message: String(data.get("message") ?? ""),
        drawingsName: file?.name ?? "",
      },
      file,
    );
    setSending(false);

    if (result.skipped || result.ok) {
      setSubmitted(true);
      return;
    }
    setError("Could not send the request. Please try again or email the office.");
  };

  if (submitted) {
    return (
      <motion.div
        className="rounded-[var(--radius-md)] border border-accent/40 bg-graphite/80 p-8 text-center"
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        role="status"
      >
        <p className="font-display text-3xl tracking-[0.08em] text-ink-text">
          Thanks, we’ll reply within one business day.
        </p>
        <p className="mt-3 text-muted">
          We received your request and will follow up by email or phone.
        </p>
        <Button
          className="mt-6"
          variant="secondary"
          onClick={() => {
            setSubmitted(false);
            setMessage("");
            setProjectType("");
            setError("");
            formRef.current?.reset();
          }}
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="rounded-[var(--radius-md)] border border-black/10 bg-graphite/70 p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" id="name" required>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={inputClass}
          />
        </Field>
        <Field label="Company" id="company">
          <input
            id="company"
            name="company"
            autoComplete="organization"
            className={inputClass}
          />
        </Field>
        <Field label="Email" id="email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </Field>
        <Field label="Phone" id="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
          />
        </Field>
        <Field label="Project type" id="projectType">
          <select
            id="projectType"
            name="projectType"
            className={inputClass}
            value={projectType}
            onChange={(e) => setProjectType(e.target.value)}
          >
            <option value="">Select a type</option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Pour date" id="pourDate">
          <input
            id="pourDate"
            name="pourDate"
            type="date"
            className={`${inputClass} [color-scheme:light]`}
          />
        </Field>
        <Field label="Drawings" id="drawings" className="sm:col-span-2">
          <input
            id="drawings"
            name="drawings"
            type="file"
            accept=".pdf,.dwg,.dxf,.zip,.jpg,.jpeg,.png,.webp"
            className={`${inputClass} file:mr-3 file:rounded-sm file:border-0 file:bg-charcoal file:px-3 file:py-1.5 file:text-sm file:text-ink-text`}
          />
          <span className="mt-1.5 block text-xs text-steel">
            Optional. The file name is included with the request.
          </span>
        </Field>
        <Field label="Message" id="message" required className="sm:col-span-2">
          <textarea
            ref={messageRef}
            id="message"
            name="message"
            required
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputClass} resize-y`}
          />
        </Field>
      </div>

      {error ? (
        <p className="mt-4 text-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-6">
        <Button type="submit" magnetic className="w-full sm:w-auto" disabled={sending}>
          {sending ? "Sending…" : "Submit Request"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  id,
  required,
  children,
  className = "",
}: {
  label: string;
  id: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label htmlFor={id} className={`block text-sm text-steel-light ${className}`}>
      {label}
      {required ? <span className="text-accent"> *</span> : null}
      {children}
    </label>
  );
}
