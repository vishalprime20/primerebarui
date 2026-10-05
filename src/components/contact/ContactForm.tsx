"use client";

import { FormEvent, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { consumeQuoteNotes } from "@/lib/quoteHandoff";

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
  const [message, setMessage] = useState("");
  const [focusMessage, setFocusMessage] = useState(false);
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const applyNotes = () => {
      const notes = consumeQuoteNotes();
      if (!notes) return;
      setSubmitted(false);
      setMessage((prev) => (prev.trim() ? `${prev.trim()}\n\n${notes}` : notes));
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
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
          Thanks for submitting!
        </p>
        <p className="mt-3 text-muted">
          We received your request and will get back to you shortly.
        </p>
        <Button
          className="mt-6"
          variant="secondary"
          onClick={() => {
            setSubmitted(false);
            setMessage("");
          }}
        >
          Send another message
        </Button>
      </motion.div>
    );
  }

  return (
    <form
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
        <Field label="Project type" id="projectType" className="sm:col-span-2">
          <select id="projectType" name="projectType" className={inputClass}>
            <option value="">Select a type</option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
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

      <div className="mt-6">
        <Button type="submit" magnetic className="w-full sm:w-auto">
          Submit Request
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
