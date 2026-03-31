"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateReservesSurplus, formatCurrency } from "@/lib/calculations";
import type { ReservesSurplusInputs } from "@/types/calculations";
import {
  ResultRow,
  Tooltip,
  ReferenceSection,
  FormulaDisplay,
  StatutoryDisclaimer,
  PrintButton,
} from "@/components";
import { calculatorMeta } from "@/lib/calculations/metadata";

const meta = calculatorMeta["reserves-surplus"];

export default function ReservesSurplusPage() {
  const [inputs, setInputs] = useState<ReservesSurplusInputs>({
    openingBalance: 0,
    profitForYear: 0,
    dividendPaid: 0,
    transferToReserves: 0,
    transferFromReserves: 0,
    otherAdjustments: 0,
  });

  const [result, setResult] = useState<ReturnType<
    typeof calculateReservesSurplus
  > | null>(null);

  const updateField = (field: keyof ReservesSurplusInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const calculate = () => {
    setResult(calculateReservesSurplus(inputs));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/" className="text-sm text-neutral-400 hover:text-white">
        &larr; Back to all calculators
      </Link>
      <div className="flex justify-end mt-2"><PrintButton /></div>

      <h1 className="text-3xl font-bold mt-4 mb-1">{meta.title}</h1>
      <p className="text-neutral-400 mb-8">
        {meta.section} &mdash; {meta.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-neutral-200">Inputs</h2>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Opening Balance
              <Tooltip text={meta.inputTooltips.openingBalance} />
            </label>
            <input
              type="number"
              value={inputs.openingBalance || ""}
              onChange={(e) => updateField("openingBalance", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Profit for the Year (Net)
              <Tooltip text={meta.inputTooltips.profitForYear} />
            </label>
            <input
              type="number"
              value={inputs.profitForYear || ""}
              onChange={(e) => updateField("profitForYear", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Dividend Paid
              <Tooltip text={meta.inputTooltips.dividendPaid} />
            </label>
            <input
              type="number"
              value={inputs.dividendPaid || ""}
              onChange={(e) => updateField("dividendPaid", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Transfer to Reserves (Statutory)
              <Tooltip text={meta.inputTooltips.transferToReserves} />
            </label>
            <input
              type="number"
              value={inputs.transferToReserves || ""}
              onChange={(e) =>
                updateField("transferToReserves", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Transfer from Reserves (Capitalization)
              <Tooltip text={meta.inputTooltips.transferFromReserves} />
            </label>
            <input
              type="number"
              value={inputs.transferFromReserves || ""}
              onChange={(e) =>
                updateField("transferFromReserves", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Other Adjustments (+/-)
              <Tooltip text={meta.inputTooltips.otherAdjustments} />
            </label>
            <input
              type="number"
              value={inputs.otherAdjustments || ""}
              onChange={(e) =>
                updateField("otherAdjustments", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            Calculate Reserves
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-neutral-200 mb-5">
            Results
          </h2>
          {result ? (
            <div className="space-y-4">
              <ResultRow
                label="Closing Balance"
                value={formatCurrency(result.closingBalance)}
                highlight
              />
              <ResultRow
                label="Free Reserves"
                value={formatCurrency(result.freeReserves)}
                highlight
              />
              <ResultRow
                label="Restricted Reserves"
                value={formatCurrency(result.restrictedReserves)}
              />

              <FormulaDisplay title="Formulas" formulas={meta.formulas} />
              <ReferenceSection
                section={meta.references.section}
                points={meta.references.points}
              />
              <StatutoryDisclaimer />
            </div>
          ) : (
            <div className="text-neutral-500 text-sm">
              Enter values and click calculate
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
