"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateNetProfit, formatCurrency } from "@/lib/calculations";
import type { NetProfitInputs } from "@/types/calculations";

export default function NetProfitPage() {
  const [inputs, setInputs] = useState<NetProfitInputs>({
    profitAndLoss: 0,
    depreciationAddback: 0,
    directorRemunerationAddback: 0,
    interestAddback: 0,
    lossSaleAssetsAddback: 0,
    provisionBadDebtsAddback: 0,
    otherExpensesAddback: 0,
    profitSaleAssetsDeduct: 0,
    governmentGrantsDeduct: 0,
    otherIncomeDeduct: 0,
    priorPeriodItemsDeduct: 0,
  });

  const [result, setResult] = useState<ReturnType<
    typeof calculateNetProfit
  > | null>(null);

  const updateField = (field: keyof NetProfitInputs, value: string) => {
    setInputs((prev) => ({ ...prev, [field]: parseFloat(value) || 0 }));
  };

  const calculate = () => {
    setResult(calculateNetProfit(inputs));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/" className="text-sm text-neutral-400 hover:text-white">
        &larr; Back to all calculators
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-1">
        Net Profit Calculator
      </h1>
      <p className="text-neutral-400 mb-8">
        Section 198 &mdash; Compute net profit for managerial remuneration
        purposes
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-neutral-200">
            Starting Point
          </h2>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Profit & Loss Account Balance
            </label>
            <input
              type="number"
              value={inputs.profitAndLoss || ""}
              onChange={(e) => updateField("profitAndLoss", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <h2 className="text-lg font-semibold text-green-400 mt-6">
            Add Backs
          </h2>

          {([
            ["depreciationAddback", "Depreciation"],
            ["directorRemunerationAddback", "Director Remuneration"],
            ["interestAddback", "Interest on Loans/Borrowings"],
            ["lossSaleAssetsAddback", "Loss on Sale of Assets"],
            ["provisionBadDebtsAddback", "Provision for Bad Debts"],
            ["otherExpensesAddback", "Other Admissible Expenses"],
          ] as const).map(([field, label]) => (
            <div key={field}>
              <label className="block text-sm text-neutral-400 mb-1">
                {label}
              </label>
              <input
                type="number"
                value={inputs[field] || ""}
                onChange={(e) => updateField(field, e.target.value)}
                className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <h2 className="text-lg font-semibold text-red-400 mt-6">
            Deductions
          </h2>

          {([
            ["profitSaleAssetsDeduct", "Profit on Sale of Assets"],
            ["governmentGrantsDeduct", "Government Grants / Subsidies"],
            ["otherIncomeDeduct", "Other Non-Operating Income"],
            ["priorPeriodItemsDeduct", "Prior Period Items (Credit)"],
          ] as const).map(([field, label]) => (
            <div key={field}>
              <label className="block text-sm text-neutral-400 mb-1">
                {label}
              </label>
              <input
                type="number"
                value={inputs[field] || ""}
                onChange={(e) =>
                  updateField(field as keyof NetProfitInputs, e.target.value)
                }
                className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <button
            onClick={calculate}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            Calculate Net Profit
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-neutral-200 mb-5">
            Results
          </h2>
          {result ? (
            <div className="space-y-4">
              <ResultRow
                label="Starting P&L Balance"
                value={formatCurrency(result.breakdown.startingPAndL)}
              />
              <ResultRow
                label="Total Add Backs"
                value={formatCurrency(result.breakdown.totalAddbacks)}
                className="text-green-400"
              />
              <ResultRow
                label="Total Deductions"
                value={formatCurrency(result.breakdown.totalDeductions)}
                className="text-red-400"
              />
              <ResultRow
                label="Net Profit (Section 198)"
                value={formatCurrency(result.netProfitForManagerialRemuneration)}
                highlight
              />

              <div className="mt-6 p-4 rounded-lg bg-neutral-800/50 border border-neutral-700">
                <h3 className="text-sm font-semibold text-neutral-300 mb-2">
                  Reference
                </h3>
                <ul className="text-xs text-neutral-400 space-y-1">
                  <li>Section 198 of Companies Act, 2013</li>
                  <li>Add back: Depreciation, Director fees, Interest</li>
                  <li>Add back: Loss on sale of assets, Bad debt provision</li>
                  <li>Deduct: Profit on sale of assets, Grants</li>
                  <li>Used as base for managerial remuneration (Section 197)</li>
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
  className,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  className?: string;
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
      <span
        className={`font-semibold ${
          className ?? (highlight ? "text-blue-400" : "text-white")
        }`}
      >
        {value}
      </span>
    </div>
  );
}
