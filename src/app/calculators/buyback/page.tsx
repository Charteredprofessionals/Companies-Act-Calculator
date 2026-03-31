"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateBuyback, formatCurrency } from "@/lib/calculations";
import type { BuybackInputs } from "@/types/calculations";

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

      <h1 className="text-3xl font-bold mt-4 mb-1">Buyback of Shares</h1>
      <p className="text-neutral-400 mb-8">
        Section 68 &mdash; Verify 25% limit & debt-equity ratio compliance
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-neutral-200">Inputs</h2>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Paid-up Equity Capital
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
              <ResultRow
                label="Compliant?"
                value={result.isCompliant ? "Yes" : "No"}
                highlight
                success={result.isCompliant}
              />
              <ResultRow
                label="Max Buyback (25% of capital + reserves)"
                value={formatCurrency(result.maxBuybackFromCapitalReserves)}
              />
              <ResultRow
                label="Proposed Buyback Value"
                value={formatCurrency(result.proposedBuybackValue)}
                highlight
              />
              <ResultRow
                label="Within 25% Limit?"
                value={result.isWithinPercentageLimit ? "Yes" : "No"}
                success={result.isWithinPercentageLimit}
              />
              <ResultRow
                label="Debt-Equity Ratio After Buyback"
                value={`${result.debtEquityRatioAfterBuyback.toFixed(2)} : 1`}
              />
              <ResultRow
                label="Debt-Equity Compliant? (max 2:1)"
                value={result.isDebtEquityCompliant ? "Yes" : "No"}
                success={result.isDebtEquityCompliant}
              />

              <div className="mt-6 p-4 rounded-lg bg-neutral-800/50 border border-neutral-700">
                <h3 className="text-sm font-semibold text-neutral-300 mb-2">
                  Reference
                </h3>
                <ul className="text-xs text-neutral-400 space-y-1">
                  <li>Section 68 of Companies Act, 2013</li>
                  <li>Max 25% of paid-up capital + free reserves</li>
                  <li>Debt-equity ratio must not exceed 2:1 post-buyback</li>
                  <li>Buyback must be completed within 12 months</li>
                  <li>Free reserves must be created equal to buyback value</li>
                </ul>
              </div>
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

function ResultRow({
  label,
  value,
  highlight,
  success,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  success?: boolean;
}) {
  return (
    <div
      className={`flex justify-between items-center py-3 px-4 rounded-lg ${
        highlight
          ? success !== undefined
            ? success
              ? "bg-green-600/10 border border-green-500/30"
              : "bg-red-600/10 border border-red-500/30"
            : "bg-blue-600/10 border border-blue-500/30"
          : "bg-neutral-800/50"
      }`}
    >
      <span className="text-sm text-neutral-400">{label}</span>
      <span
        className={`font-semibold ${
          highlight
            ? success !== undefined
              ? success
                ? "text-green-400"
                : "text-red-400"
              : "text-blue-400"
            : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
