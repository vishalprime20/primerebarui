"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  COATING_BY_ENV,
  PLACEMENT_ENVS,
  type PlacementEnv,
} from "@/lib/coatingGuide";
import { sendToolQuote } from "@/lib/quoteHandoff";

export function CoatingPicker() {
  const [env, setEnv] = useState<PlacementEnv>("dry-interior");
  const advice = COATING_BY_ENV[env];
  const selected = PLACEMENT_ENVS.find((item) => item.id === env)!;

  const sendToQuote = () => {
    const notes = [
      "Coating picker",
      `Placement: ${selected.label}`,
      `Recommended: ${advice.recommended}`,
      advice.alternate ? `Alternate: ${advice.alternate}` : null,
      `Product: ${advice.product}`,
      advice.why,
    ]
      .filter(Boolean)
      .join("\n");
    void sendToolQuote(notes, "Coating picker");
  };

  return (
    <div>
      <p className="max-w-2xl text-muted">
        Pick the concrete placement environment. We recommend a coating so you
        don’t have to wade through a full mill catalog.
      </p>

      <fieldset className="mt-6">
        <legend className="font-display text-sm tracking-[0.14em] text-steel">
          Placement environment
        </legend>
        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {PLACEMENT_ENVS.map((item) => {
            const selectedEnv = item.id === env;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setEnv(item.id)}
                className={`focus-ring rounded-[var(--radius-md)] border px-4 py-3 text-left transition-colors ${
                  selectedEnv
                    ? "border-accent bg-accent/15 text-ink-text"
                    : "border-black/10 bg-charcoal/50 text-steel-light hover:text-ink-text"
                }`}
              >
                <span className="block font-display text-sm tracking-[0.1em]">
                  {item.label}
                </span>
                <span className="mt-1 block text-xs text-steel">{item.description}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="mt-8 rounded-[var(--radius-md)] border border-black/10 bg-charcoal/60 p-5 sm:p-6">
        <p className="font-display text-xs tracking-[0.18em] text-accent">
          Recommendation
        </p>
        <p className="mt-2 font-display text-3xl tracking-[0.06em] text-ink-text">
          {advice.recommended}
        </p>
        {advice.alternate ? (
          <p className="mt-1 text-sm text-steel-light">
            Alternate: {advice.alternate}
          </p>
        ) : null}
        <p className="mt-3 text-muted">{advice.why}</p>
        <p className="mt-3 text-sm text-steel-light">
          Prime Rebar product: {advice.product}
        </p>
      </div>

      <p className="mt-4 text-xs text-steel">
        Guidance only — final coating should follow project specs and engineer of
        record.
      </p>

      <div className="mt-6">
        <Button magnetic onClick={sendToQuote}>
          Request a quote with these details
        </Button>
      </div>
    </div>
  );
}
