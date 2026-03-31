"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateDeposits, formatCurrency } from "@/lib/calculations";
import type { DepositsInputs, CompanyType } from "@/types/calculations";
import {
  ResultRow,
  Tooltip,
  ReferenceSection,
  FormulaDisplay,
  ComplianceStatus,
  Interpretation,
  StatutoryDisclaimer,
  PrintButton,
} from "@/components";
import { calculatorMeta } from "@/lib/calculations/metadata";

const meta = calculatorMeta["deposits"];

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
              Company Type
              <Tooltip text={meta.inputTooltips.companyType} />
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
              <Tooltip text={meta.inputTooltips.paidUpShareCapital} />
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
              Total Deposits Currently Accepted
              <Tooltip text={meta.inputTooltips.totalDepositsAccepted} />
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
              <Tooltip text={meta.inputTooltips.depositFromMembers} />
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
              <Tooltip text={meta.inputTooltips.depositFromPublic} />
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
              <ComplianceStatus
                isCompliant={result.isWithinLimit}
                label={result.isWithinLimit ? "Deposits are within statutory limits" : "Deposits exceed statutory limits"}
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

              <Interpretation text={meta.interpretResult!(result)} />
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
