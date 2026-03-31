"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateBuyback, formatCurrency } from "@/lib/calculations";
import type { BuybackInputs } from "@/types/calculations";
import {
  ResultRow,
  Tooltip,
  ComplianceStatus,
  FormulaDisplay,
  ReferenceSection,
  Interpretation,
  StatutoryDisclaimer,
  PrintButton,
} from "@/components";
import { calculatorMeta } from "@/lib/calculations/metadata";

const meta = calculatorMeta["buyback"];

export default function BuybackPage() {
  const [inputs, setInputs] = useState<BuybackInputs>({
    paidUpEquityCapital: 0,
    freeReserves: 0,
    securitiesPremium: 0,
    totalDebt: 0,
    numberOfSharesOutstanding: 0,
    buybackPrice: 0,
    numberOfSharesToBuyback: 0,
  });

  const [result, setResult] = useState<ReturnType<
    typeof calculateBuyback
  > | null>(null);

  const updateField = (field: keyof BuybackInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const calculate = () => {
    setResult(calculateBuyback(inputs));
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
              Paid-up Equity Capital
              <Tooltip text={meta.inputTooltips.paidUpEquityCapital} />
            </label>
            <input
              type="number"
              value={inputs.paidUpEquityCapital || ""}
              onChange={(e) =>
                updateField("paidUpEquityCapital", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Free Reserves
              <Tooltip text={meta.inputTooltips.freeReserves} />
            </label>
            <input
              type="number"
              value={inputs.freeReserves || ""}
              onChange={(e) => updateField("freeReserves", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Securities Premium Account
              <Tooltip text={meta.inputTooltips.securitiesPremium} />
            </label>
            <input
              type="number"
              value={inputs.securitiesPremium || ""}
              onChange={(e) =>
                updateField("securitiesPremium", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Total Debt (Borrowings)
              <Tooltip text={meta.inputTooltips.totalDebt} />
            </label>
            <input
              type="number"
              value={inputs.totalDebt || ""}
              onChange={(e) => updateField("totalDebt", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Number of Shares Outstanding
              <Tooltip text={meta.inputTooltips.numberOfSharesOutstanding} />
            </label>
            <input
              type="number"
              value={inputs.numberOfSharesOutstanding || ""}
              onChange={(e) =>
                updateField("numberOfSharesOutstanding", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Buyback Price (per share)
              <Tooltip text={meta.inputTooltips.buybackPrice} />
            </label>
            <input
              type="number"
              value={inputs.buybackPrice || ""}
              onChange={(e) => updateField("buybackPrice", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Number of Shares to Buyback
              <Tooltip text={meta.inputTooltips.numberOfSharesToBuyback} />
            </label>
            <input
              type="number"
              value={inputs.numberOfSharesToBuyback || ""}
              onChange={(e) =>
                updateField("numberOfSharesToBuyback", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            Check Compliance
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-neutral-200 mb-5">
            Results
          </h2>
          {result ? (
            <div className="space-y-4">
              <ComplianceStatus
                isCompliant={result.isCompliant}
                label="Section 68 compliance check"
              />
              <ResultRow
                label="Max Buyback (25% of capital + reserves)"
                value={formatCurrency(result.maxBuybackFromCapitalReserves)}
                formula="25% x (Capital + Reserves + Premium)"
              />
              <ResultRow
                label="Proposed Buyback Value"
                value={formatCurrency(result.proposedBuybackValue)}
                highlight
                formula="Price x Shares to Buyback"
              />
              <ResultRow
                label="Within 25% Limit?"
                value={result.isWithinPercentageLimit ? "Yes" : "No"}
                success={result.isWithinPercentageLimit}
              />
              <ResultRow
                label="Debt-Equity Ratio After Buyback"
                value={`${result.debtEquityRatioAfterBuyback.toFixed(2)} : 1`}
                formula="Total Debt / Net Worth (post-buyback)"
              />
              <ResultRow
                label="Debt-Equity Compliant? (max 2:1)"
                value={result.isDebtEquityCompliant ? "Yes" : "No"}
                success={result.isDebtEquityCompliant}
              />

              {meta.interpretResult && (
                <Interpretation text={meta.interpretResult(result)} />
              )}
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
