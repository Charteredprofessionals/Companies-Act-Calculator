"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { calculateCSR, formatCurrency } from "@/lib/calculations";
import type { CSRInputs, CSROutputs } from "@/types/calculations";

export default function CSRPage() {
  const [inputs, setInputs] = useState<CSRInputs>({
    netProfitYear1: 0,
    netProfitYear2: 0,
    netProfitYear3: 0,
    existingCSRUnspent: 0,
  });

  const [result, setResult] = useState<CSROutputs | null>(null);

  const updateField = useCallback(
    (field: keyof CSRInputs, value: string) => {
      setInputs((prev) => ({ ...prev, [field]: parseFloat(value) || 0 }));
    },
    []
  );

  const calculate = () => {
    setResult(calculateCSR(inputs));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/"
        className="text-sm text-neutral-400 hover:text-white transition-colors"
      >
        &larr; Back to all calculators
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-1">
        CSR Expenditure Calculator
      </h1>
      <p className="text-neutral-400 mb-8">
        Section 135 &mdash; Calculate 2% CSR obligation on average net profits of
        preceding 3 financial years
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-neutral-200">Inputs</h2>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Net Profit &mdash; Year 1 (Most Recent)
            </label>
            <input
              type="number"
              value={inputs.netProfitYear1 || ""}
              onChange={(e) => updateField("netProfitYear1", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Net Profit &mdash; Year 2
            </label>
            <input
              type="number"
              value={inputs.netProfitYear2 || ""}
              onChange={(e) => updateField("netProfitYear2", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Net Profit &mdash; Year 3
            </label>
            <input
              type="number"
              value={inputs.netProfitYear3 || ""}
              onChange={(e) => updateField("netProfitYear3", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Existing CSR Unspent Amount (from previous year)
            </label>
            <input
              type="number"
              value={inputs.existingCSRUnspent || ""}
              onChange={(e) =>
                updateField("existingCSRUnspent", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            Calculate CSR Obligation
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-neutral-200 mb-5">
            Results
          </h2>
          {result ? (
            <div className="space-y-4">
              <ResultRow
                label="Eligible for CSR?"
                value={result.isEligibleForCSR ? "Yes" : "No"}
                highlight
              />
              <ResultRow
                label="Average Net Profit (3 years)"
                value={formatCurrency(result.averageNetProfit)}
              />
              <ResultRow
                label="CSR Obligation (2% of avg. profit)"
                value={formatCurrency(result.csrObligation)}
                highlight={result.csrObligation > 0}
              />
              <ResultRow
                label="Unspent CSR (Previous Year)"
                value={formatCurrency(result.csrUnspentPrevious)}
              />
              <ResultRow
                label="Total CSR Spend Required"
                value={formatCurrency(result.totalCSRSpend)}
                highlight
              />
              <ResultRow
                label="Needs CSR Committee?"
                value={result.needsCSRCommittee ? "Yes (obligation >= 50L)" : "No"}
              />

              <div className="mt-6 p-4 rounded-lg bg-neutral-800/50 border border-neutral-700">
                <h3 className="text-sm font-semibold text-neutral-300 mb-2">
                  Reference
                </h3>
                <ul className="text-xs text-neutral-400 space-y-1">
                  <li>Section 135 of Companies Act, 2013</li>
                  <li>CSR applicable if net worth {">="} 500 Cr, or turnover {">="} 1000 Cr, or net profit {">="} 5 Cr</li>
                  <li>2% of average net profits of preceding 3 financial years</li>
                  <li>CSR Committee required if obligation {">="} 50 lakhs</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-neutral-500 text-sm">
              Enter values and click calculate to see results
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
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`flex justify-between items-center py-3 px-4 rounded-lg ${
        highlight
          ? "bg-blue-600/10 border border-blue-500/30"
          : "bg-neutral-800/50"
      }`}
    >
      <span className="text-sm text-neutral-400">{label}</span>
      <span className={`font-semibold ${highlight ? "text-blue-400" : "text-white"}`}>
        {value}
      </span>
    </div>
  );
}
