"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateManagerialRemuneration, formatCurrency } from "@/lib/calculations";
import type { ManagerialRemunerationInputs } from "@/types/calculations";

export default function ManagerialRemunerationPage() {
  const [inputs, setInputs] = useState<ManagerialRemunerationInputs>({
    netProfit: 0,
    managingDirectorSalary: 0,
    wholeTimeDirectorSalary: 0,
    otherExecutiveDirectors: 0,
    nonExecutiveDirectors: 0,
    numOtherExecDirectors: 0,
    numNonExecDirectors: 0,
  });

  const [result, setResult] = useState<ReturnType<
    typeof calculateManagerialRemuneration
  > | null>(null);

  const updateField = (
    field: keyof ManagerialRemunerationInputs,
    value: string
  ) => {
    setInputs((prev) => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const calculate = () => {
    setResult(calculateManagerialRemuneration(inputs));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/" className="text-sm text-neutral-400 hover:text-white">
        &larr; Back to all calculators
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-1">
        Managerial Remuneration
      </h1>
      <p className="text-neutral-400 mb-8">
        Section 197 / Schedule V &mdash; Calculate 11% cap on managerial
        remuneration
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-neutral-200">Inputs</h2>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Net Profit (Section 198)
            </label>
            <input
              type="number"
              value={inputs.netProfit || ""}
              onChange={(e) => updateField("netProfit", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              MD/WTD Salary (Actual)
            </label>
            <input
              type="number"
              value={inputs.managingDirectorSalary || ""}
              onChange={(e) =>
                updateField("managingDirectorSalary", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Other Executive Directors (Total Actual)
            </label>
            <input
              type="number"
              value={inputs.otherExecutiveDirectors || ""}
              onChange={(e) =>
                updateField("otherExecutiveDirectors", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Number of Other Executive Directors
            </label>
            <input
              type="number"
              value={inputs.numOtherExecDirectors || ""}
              onChange={(e) =>
                updateField("numOtherExecDirectors", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Non-Executive Directors Fee (Total Actual)
            </label>
            <input
              type="number"
              value={inputs.nonExecutiveDirectors || ""}
              onChange={(e) =>
                updateField("nonExecutiveDirectors", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Number of Non-Executive Directors
            </label>
            <input
              type="number"
              value={inputs.numNonExecDirectors || ""}
              onChange={(e) =>
                updateField("numNonExecDirectors", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            Calculate Compliance
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
                label="Max Total Remuneration (11%)"
                value={formatCurrency(result.maxTotalRemuneration)}
              />
              <ResultRow
                label="Max MD/WTD (5%)"
                value={formatCurrency(result.maxMDRemuneration)}
              />
              <ResultRow
                label="Max Other Exec Directors (1% each)"
                value={formatCurrency(result.maxOtherExecRemuneration)}
              />
              <ResultRow
                label="Max Non-Exec Directors (1% each)"
                value={formatCurrency(result.maxNonExecRemuneration)}
              />
              <ResultRow
                label="Actual Total Remuneration"
                value={formatCurrency(result.actualTotalRemuneration)}
                highlight
              />
              {result.excessRemuneration > 0 && (
                <ResultRow
                  label="Excess Remuneration"
                  value={formatCurrency(result.excessRemuneration)}
                  highlight
                />
              )}

              <div className="mt-6 p-4 rounded-lg bg-neutral-800/50 border border-neutral-700">
                <h3 className="text-sm font-semibold text-neutral-300 mb-2">
                  Reference
                </h3>
                <ul className="text-xs text-neutral-400 space-y-1">
                  <li>Section 197 of Companies Act, 2013</li>
                  <li>Maximum 11% of net profit for all directors combined</li>
                  <li>MD/WTD: 5% of net profit</li>
                  <li>Other directors: 1% each (max 3 non-exec)</li>
                  <li>Schedule V for companies with no/inadequate profits</li>
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
          ? success
            ? "bg-green-600/10 border border-green-500/30"
            : "bg-red-600/10 border border-red-500/30"
          : "bg-neutral-800/50"
      }`}
    >
      <span className="text-sm text-neutral-400">{label}</span>
      <span
        className={`font-semibold ${
          highlight
            ? success
              ? "text-green-400"
              : "text-red-400"
            : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
