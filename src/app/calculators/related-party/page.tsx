"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateRelatedParty, formatCurrency } from "@/lib/calculations";
import type { RelatedPartyInputs, RPTTransactionType } from "@/types/calculations";
import {
  ResultRow,
  Tooltip,
  FormulaDisplay,
  ReferenceSection,
  Interpretation,
  StatutoryDisclaimer,
  PrintButton,
} from "@/components";
import { calculatorMeta } from "@/lib/calculations/metadata";

const meta = calculatorMeta["related-party"];

const TRANSACTION_TYPES: { value: RPTTransactionType; label: string }[] = [
  { value: "sale_purchase", label: "Sale/Purchase of Goods" },
  { value: "sale_property", label: "Sale/Purchase of Property" },
  { value: "leasing", label: "Leasing of Property" },
  { value: "services", label: "Rendering/Availing Services" },
  { value: "brand_usage", label: "Usage of Brand/Intellectual Property" },
  { value: "appointing_agent", label: "Appointing Agent for Sale/Purchase" },
  { value: "appointing_manager", label: "Appointing to Office (MD/WTD)" },
  { value: "underwriting_remuneration", label: "Underwriting Remuneration" },
];

export default function RelatedPartyPage() {
  const [inputs, setInputs] = useState<RelatedPartyInputs>({
    transactionType: "sale_purchase",
    transactionValue: 0,
    paidUpShareCapital: 0,
    turnover: 0,
    companyType: "public",
  });

  const [result, setResult] = useState<ReturnType<
    typeof calculateRelatedParty
  > | null>(null);

  const updateField = (
    field: keyof RelatedPartyInputs,
    value: string
  ) => {
    setInputs((prev) => ({
      ...prev,
      [field]:
        field === "companyType" || field === "transactionType"
          ? value
          : parseFloat(value) || 0,
    }));
  };

  const calculate = () => {
    setResult(calculateRelatedParty(inputs));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/" className="text-sm text-neutral-400 hover:text-white">
        &larr; Back to all calculators
      </Link>
      <div className="flex justify-end mt-2"><PrintButton /></div>

      <h1 className="text-3xl font-bold mt-4 mb-1">
        {meta.title}
      </h1>
      <p className="text-neutral-400 mb-8">
        {meta.section} &mdash; {meta.description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-neutral-200">Inputs</h2>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Transaction Type <Tooltip text={meta.inputTooltips.transactionType} />
            </label>
            <select
              value={inputs.transactionType}
              onChange={(e) =>
                updateField("transactionType", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {TRANSACTION_TYPES.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Transaction Value <Tooltip text={meta.inputTooltips.transactionValue} />
            </label>
            <input
              type="number"
              value={inputs.transactionValue || ""}
              onChange={(e) =>
                updateField("transactionValue", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Paid-up Share Capital <Tooltip text={meta.inputTooltips.paidUpShareCapital} />
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
              Turnover (Latest FY) <Tooltip text={meta.inputTooltips.turnover} />
            </label>
            <input
              type="number"
              value={inputs.turnover || ""}
              onChange={(e) => updateField("turnover", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Company Type <Tooltip text={meta.inputTooltips.companyType} />
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

          <button
            onClick={calculate}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            Check Approval Requirements
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-neutral-200 mb-5">
            Results
          </h2>
          {result ? (
            <div className="space-y-4">
              <ResultRow
                label="Board Approval Required"
                value={result.requiresBoardApproval ? "Yes" : "No"}
                success={result.requiresBoardApproval}
              />
              <ResultRow
                label="Shareholder Approval Required"
                value={result.requiresShareholderApproval ? "Yes" : "No"}
                highlight
                success={result.requiresShareholderApproval}
              />
              <ResultRow
                label="Threshold for Approval"
                value={formatCurrency(result.thresholdForApproval)}
              />
              <ResultRow
                label="Exceeds Threshold?"
                value={result.exceedsThreshold ? "Yes" : "No"}
                highlight={result.exceedsThreshold}
              />

              <Interpretation text={meta.interpretResult!(result)} />

              <ReferenceSection
                section={meta.references.section}
                points={meta.references.points}
              />

              <FormulaDisplay title="Formulas" formulas={meta.formulas} />
            </div>
          ) : (
            <div className="text-neutral-500 text-sm">
              Enter values and click calculate
            </div>
          )}

          <StatutoryDisclaimer />
        </div>
      </div>
    </div>
  );
}
