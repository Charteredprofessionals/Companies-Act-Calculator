"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateDeposits, formatCurrency } from "@/lib/calculations";
import type { DepositsInputs, CompanyType } from "@/types/calculations";

export default function DepositsPage() {
  const [inputs, setInputs] = useState<DepositsInputs>({
    paidUpShareCapital: 0,
    freeReserves: 0,
    totalDepositsAccepted: 0,
    depositFromMembers: 0,
    depositFromPublic: 0,
    companyType: "public",
  });

  const [result, setResult] = useState<ReturnType<
    typeof calculateDeposits
  > | null>(null);

  const updateField = (field: keyof DepositsInputs, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [field]: field === "companyType" ? value : parseFloat(value) || 0,
    }));
  };

  const calculate = () => {
    setResult(calculateDeposits(inputs));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/" className="text-sm text-neutral-400 hover:text-white">
        &larr; Back to all calculators
      </Link>

      <h1 className="text-3xl font-bold mt-4 mb-1">
        Deposits Calculator
      </h1>
      <p className="text-neutral-400 mb-8">
        Section 73 &mdash; Calculate deposit limits from members & public
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-neutral-200">Inputs</h2>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Company Type
            </label>
            <select
              value={inputs.companyType}
              onChange={(e) => updateField("companyType", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="public">Public Company</option>
              <option value="private">Private Company</option>
            </select>
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Paid-up Share Capital
            </label>
            <input
              type="number"
              value={inputs.paidUpShareCapital || ""}
              onChange={(e) =>
                updateField("paidUpShareCapital", e.target.value)
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
              Total Deposits Currently Accepted
            </label>
            <input
              type="number"
              value={inputs.totalDepositsAccepted || ""}
              onChange={(e) =>
                updateField("totalDepositsAccepted", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Deposits from Members (Current)
            </label>
            <input
              type="number"
              value={inputs.depositFromMembers || ""}
              onChange={(e) =>
                updateField("depositFromMembers", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Deposits from Public (Current)
            </label>
            <input
              type="number"
              value={inputs.depositFromPublic || ""}
              onChange={(e) =>
                updateField("depositFromPublic", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            Check Deposit Limits
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-neutral-200 mb-5">
            Results
          </h2>
          {result ? (
            <div className="space-y-4">
              <ResultRow
                label="Within Limit?"
                value={result.isWithinLimit ? "Yes" : "No"}
                highlight
                success={result.isWithinLimit}
              />
              <ResultRow
                label="Max from Members (10%)"
                value={formatCurrency(result.maxDepositsFromMembers)}
              />
              <ResultRow
                label="Max from Public (25%)"
                value={formatCurrency(result.maxDepositsFromPublic)}
              />
              <ResultRow
                label="Total Max Deposits"
                value={formatCurrency(result.totalMaxDeposits)}
                highlight
              />
              <ResultRow
                label="Deposit Insurance Required?"
                value={result.depositInsuranceRequired ? "Yes" : "No"}
              />

              <div className="mt-6 p-4 rounded-lg bg-neutral-800/50 border border-neutral-700">
                <h3 className="text-sm font-semibold text-neutral-300 mb-2">
                  Reference
                </h3>
                <ul className="text-xs text-neutral-400 space-y-1">
                  <li>Section 73 of Companies Act, 2013</li>
                  <li>Private companies cannot accept deposits</li>
                  <li>Members: max 10% of capital + reserves</li>
                  <li>Public: max 25% of capital + reserves</li>
                  <li>Deposit insurance/complying trust required</li>
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
