"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateDividend, formatCurrency } from "@/lib/calculations";
import type { DividendInputs } from "@/types/calculations";

export default function DividendPage() {
  const [inputs, setInputs] = useState<DividendInputs>({
    paidUpShareCapital: 0,
    freeReserves: 0,
    proposedDividendRate: 0,
    depreciationProvided: 0,
    depreciationRequired: 0,
    unpaidDividendYears: 0,
    arrearsOfDepreciation: 0,
  });

  const [result, setResult] = useState<ReturnType<
    typeof calculateDividend
  > | null>(null);

  const updateField = (field: keyof DividendInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const calculate = () => {
    setResult(calculateDividend(inputs));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/" className="text-sm text-neutral-400 hover:text-white">
        &larr; Back to all calculators
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-1">Dividend Calculator</h1>
      <p className="text-neutral-400 mb-8">
        Section 123 &mdash; Calculate dividend from free reserves & capital
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-neutral-200">Inputs</h2>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Paid-up Share Capital
            </label>
            <input
              type="number"
              value={inputs.paidUpShareCapital || ""}
              onChange={(e) => updateField("paidUpShareCapital", e.target.value)}
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
              Proposed Dividend Rate (%)
            </label>
            <input
              type="number"
              value={inputs.proposedDividendRate || ""}
              onChange={(e) =>
                updateField("proposedDividendRate", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Depreciation Provided in Books
            </label>
            <input
              type="number"
              value={inputs.depreciationProvided || ""}
              onChange={(e) =>
                updateField("depreciationProvided", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Depreciation Required (Schedule II)
            </label>
            <input
              type="number"
              value={inputs.depreciationRequired || ""}
              onChange={(e) =>
                updateField("depreciationRequired", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Years of Unpaid/Unclaimed Dividend
            </label>
            <input
              type="number"
              value={inputs.unpaidDividendYears || ""}
              onChange={(e) =>
                updateField("unpaidDividendYears", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            Calculate Dividend
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-neutral-200 mb-5">
            Results
          </h2>
          {result ? (
            <div className="space-y-4">
              <ResultRow
                label="Can Declare from Reserves?"
                value={result.canDeclareFromReserves ? "Yes" : "No"}
                highlight
                success={result.canDeclareFromReserves}
              />
              <ResultRow
                label="Proposed Dividend Amount"
                value={formatCurrency(result.proposedDividendAmount)}
                highlight
              />
              <ResultRow
                label="Dividend Per Share"
                value={`₹${result.dividendPerShare}`}
              />
              <ResultRow
                label="Reserves Sufficient?"
                value={result.isReservesSufficient ? "Yes" : "No"}
                success={result.isReservesSufficient}
              />
              <ResultRow
                label="Maximum Dividend from Reserves"
                value={formatCurrency(result.maximumDividend)}
              />

              <div className="mt-6 p-4 rounded-lg bg-neutral-800/50 border border-neutral-700">
                <h3 className="text-sm font-semibold text-neutral-300 mb-2">
                  Reference
                </h3>
                <ul className="text-xs text-neutral-400 space-y-1">
                  <li>Section 123 of Companies Act, 2013</li>
                  <li>Dividend from free reserves after providing for depreciation</li>
                  <li>Cannot declare if unpaid dividend exists for 3+ years</li>
                  <li>Interim dividend: Only from profits of current year</li>
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
