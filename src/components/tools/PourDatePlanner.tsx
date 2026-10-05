"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { sendQuoteNotes } from "@/lib/quoteHandoff";
import {
  DRAWING_LEAD_DAYS,
  drawingDeadline,
  formatDisplayDate,
  isRush,
  toIsoDate,
} from "@/lib/pourPlanner";

export function PourDatePlanner() {
  const [pourDate, setPourDate] = useState("");

  const result = useMemo(() => {
    if (!pourDate) return null;
    const deadline = drawingDeadline(pourDate);
    return {
      deadline,
      rush: isRush(pourDate),
      pourLabel: formatDisplayDate(pourDate),
      deadlineLabel: formatDisplayDate(deadline),
    };
  }, [pourDate]);

  const sendToQuote = () => {
    if (!result) return;
    const notes = [
      "Pour-date planner",
      `Pour date: ${result.pourLabel}`,
      `Submit drawings by: ${result.deadlineLabel} (${DRAWING_LEAD_DAYS} calendar days before pour)`,
      result.rush ? "Rush: pour is inside the standard drawing lead time." : null,
    ]
      .filter(Boolean)
      .join("\n");
    sendQuoteNotes(notes);
  };

  return (
    <div>
      <p className="max-w-2xl text-muted">
        Enter the pour date. We back up {DRAWING_LEAD_DAYS} calendar days so you
        know when shop drawings need to be in.
      </p>

      <label
        htmlFor="pour-date"
        className="mt-6 block text-sm text-steel-light"
      >
        Pour date
        <input
          id="pour-date"
          type="date"
          min={toIsoDate(new Date())}
          value={pourDate}
          onChange={(e) => setPourDate(e.target.value)}
          className="focus-ring mt-1.5 w-full max-w-xs rounded-[var(--radius-sm)] border border-black/10 bg-graphite px-3.5 py-3 text-ink-text outline-none [color-scheme:light] focus:border-accent"
        />
      </label>

      {result ? (
        <div className="mt-8 rounded-[var(--radius-md)] border border-black/10 bg-charcoal/60 p-5 sm:p-6">
          <p className="font-display text-xs tracking-[0.18em] text-accent">
            Drawing submittal deadline
          </p>
          <p className="mt-2 font-display text-3xl tracking-[0.06em] text-ink-text">
            {result.deadlineLabel}
          </p>
          <p className="mt-2 text-muted">
            Pour: {result.pourLabel}. Standard lead is {DRAWING_LEAD_DAYS}{" "}
            calendar days.
          </p>
          {result.rush ? (
            <p className="mt-4 rounded-[var(--radius-sm)] border border-accent/40 bg-accent/10 px-3 py-2 text-sm text-steel-light">
              This pour is inside the {DRAWING_LEAD_DAYS}-day window. We can still
              quote it — flag as rush when you send the request.
            </p>
          ) : null}
        </div>
      ) : null}

      <div className="mt-6">
        <Button magnetic disabled={!result} onClick={sendToQuote}>
          Request a quote with these details
        </Button>
      </div>
    </div>
  );
}
