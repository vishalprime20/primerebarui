"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  BAR_SIZES,
  formatLb,
  formatTons,
  lineWeightLb,
  type BarSize,
} from "@/lib/barWeights";
import { sendQuoteNotes } from "@/lib/quoteHandoff";

type Line = {
  id: number;
  size: BarSize;
  lengthFt: string;
  qty: string;
};

let nextId = 1;

function emptyLine(): Line {
  return { id: nextId++, size: "#5", lengthFt: "", qty: "" };
}

export function WeightCalculator() {
  const [lines, setLines] = useState<Line[]>([emptyLine()]);

  const computed = useMemo(
    () =>
      lines.map((line) => {
        const lengthFt = Number(line.lengthFt);
        const qty = Number(line.qty);
        const lb = lineWeightLb(line.size, lengthFt, qty);
        return { ...line, lengthFt, qty, lb };
      }),
    [lines],
  );

  const totalLb = computed.reduce((sum, line) => sum + line.lb, 0);
  const hasWeight = totalLb > 0;

  const update = (id: number, patch: Partial<Line>) => {
    setLines((prev) => prev.map((line) => (line.id === id ? { ...line, ...patch } : line)));
  };

  const sendToQuote = () => {
    const rows = computed
      .filter((line) => line.lb > 0)
      .map(
        (line) =>
          `${line.size} × ${line.lengthFt} ft × ${line.qty} pcs = ${formatLb(line.lb)} lb (${formatTons(line.lb)} ton)`,
      );
    const notes = [
      "Weight calculator",
      ...rows,
      `Total: ${formatLb(totalLb)} lb / ${formatTons(totalLb)} ton`,
    ].join("\n");
    sendQuoteNotes(notes);
  };

  return (
    <div>
      <p className="max-w-2xl text-muted">
        Select bar size, length, and quantity across multiple lines. Totals use CRSI
        theoretical weights (lb/ft).
      </p>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
          <thead>
            <tr className="font-display text-xs tracking-[0.14em] text-steel">
              <th className="pb-3 pr-3 font-normal">Bar size</th>
              <th className="pb-3 pr-3 font-normal">Length (ft)</th>
              <th className="pb-3 pr-3 font-normal">Qty</th>
              <th className="pb-3 pr-3 font-normal text-right">Weight</th>
              <th className="pb-3 font-normal" />
            </tr>
          </thead>
          <tbody>
            {computed.map((line) => (
              <tr key={line.id} className="border-t border-black/8">
                <td className="py-3 pr-3">
                  <select
                    aria-label="Bar size"
                    value={line.size}
                    onChange={(e) =>
                      update(line.id, { size: e.target.value as BarSize })
                    }
                    className={fieldClass}
                  >
                    {BAR_SIZES.map((bar) => (
                      <option key={bar.size} value={bar.size}>
                        {bar.size} ({bar.lbPerFt} lb/ft)
                      </option>
                    ))}
                  </select>
                </td>
                <td className="py-3 pr-3">
                  <input
                    aria-label="Length in feet"
                    type="number"
                    min={0}
                    step="0.1"
                    inputMode="decimal"
                    placeholder="20"
                    value={line.lengthFt}
                    onChange={(e) => update(line.id, { lengthFt: e.target.value })}
                    className={fieldClass}
                  />
                </td>
                <td className="py-3 pr-3">
                  <input
                    aria-label="Quantity"
                    type="number"
                    min={0}
                    step={1}
                    inputMode="numeric"
                    placeholder="48"
                    value={line.qty}
                    onChange={(e) => update(line.id, { qty: e.target.value })}
                    className={fieldClass}
                  />
                </td>
                <td className="py-3 pr-3 text-right tabular-nums text-steel-light">
                  {line.lb > 0 ? `${formatLb(line.lb)} lb` : "—"}
                </td>
                <td className="py-3 text-right">
                  <button
                    type="button"
                    className="focus-ring rounded-[var(--radius-sm)] px-2 py-1 text-steel hover:text-ink-text disabled:opacity-30"
                    onClick={() =>
                      setLines((prev) => prev.filter((row) => row.id !== line.id))
                    }
                    disabled={lines.length === 1}
                    aria-label="Remove line"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          className="focus-ring font-display text-sm tracking-[0.12em] text-accent hover:text-accent-hover"
          onClick={() => setLines((prev) => [...prev, emptyLine()])}
        >
          + Add line
        </button>
        <div className="text-right">
          <p className="font-display text-2xl tracking-[0.06em] text-ink-text">
            {formatLb(totalLb)} lb
          </p>
          <p className="text-sm text-steel">{formatTons(totalLb)} ton</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-steel">
        Theoretical weight only — not mill-certified. Actual shipped weight may vary.
      </p>

      <div className="mt-6">
        <Button magnetic disabled={!hasWeight} onClick={sendToQuote}>
          Request a quote with these details
        </Button>
      </div>
    </div>
  );
}

const fieldClass =
  "focus-ring w-full rounded-[var(--radius-sm)] border border-black/10 bg-graphite px-3 py-2.5 text-ink-text outline-none focus:border-accent";
