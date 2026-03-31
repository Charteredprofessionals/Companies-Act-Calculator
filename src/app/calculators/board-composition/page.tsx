"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateBoardComposition } from "@/lib/calculations";
import type { BoardCompositionInputs, CompanyType } from "@/types/calculations";
import {
  ResultRow,
  Tooltip,
  FormulaDisplay,
  ReferenceSection,
  Interpretation,
  StatutoryDisclaimer,
  ComplianceStatus,
  PrintButton,
} from "@/components";
import { calculatorMeta } from "@/lib/calculations/metadata";

const meta = calculatorMeta["board-composition"];

export default function BoardCompositionPage() {
  const [inputs, setInputs] = useState<BoardCompositionInputs>({
    companyType: "public",
    isListed: false,
    paidUpShareCapital: 0,
    turnover: 0,
    isPublicFinancialInstitution: false,
    currentDirectors: 0,
    nonExecutiveDirectors: 0,
    womanDirector: false,
    residentDirector: false,
  });

  const [result, setResult] = useState<ReturnType<
    typeof calculateBoardComposition
  > | null>(null);

  const updateField = (
    field: keyof BoardCompositionInputs,
    value: string | boolean
  ) => {
    setInputs((prev) => ({
      ...prev,
      [field]:
        typeof value === "boolean"
          ? value
          : field === "companyType"
            ? value
            : parseFloat(value) || 0,
    }));
  };

  const calculate = () => {
    setResult(calculateBoardComposition(inputs));
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

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isListed"
              checked={inputs.isListed}
              onChange={(e) => updateField("isListed", e.target.checked)}
              className="w-4 h-4 rounded bg-neutral-800 border-neutral-700"
            />
            <label htmlFor="isListed" className="text-sm text-neutral-400">
              Listed Company <Tooltip text={meta.inputTooltips.isListed} />
            </label>
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
              Turnover <Tooltip text={meta.inputTooltips.turnover} />
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
              Current Number of Directors <Tooltip text={meta.inputTooltips.currentDirectors} />
            </label>
            <input
              type="number"
              value={inputs.currentDirectors || ""}
              onChange={(e) =>
                updateField("currentDirectors", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Current Independent/Non-Executive Directors <Tooltip text={meta.inputTooltips.nonExecutiveDirectors} />
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

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="womanDirector"
              checked={inputs.womanDirector}
              onChange={(e) => updateField("womanDirector", e.target.checked)}
              className="w-4 h-4 rounded bg-neutral-800 border-neutral-700"
            />
            <label htmlFor="womanDirector" className="text-sm text-neutral-400">
              Has Woman Director <Tooltip text={meta.inputTooltips.womanDirector} />
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="residentDirector"
              checked={inputs.residentDirector}
              onChange={(e) =>
                updateField("residentDirector", e.target.checked)
              }
              className="w-4 h-4 rounded bg-neutral-800 border-neutral-700"
            />
            <label
              htmlFor="residentDirector"
              className="text-sm text-neutral-400"
            >
              Has Resident Director (182+ days in India) <Tooltip text={meta.inputTooltips.residentDirector} />
            </label>
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
              <ComplianceStatus isCompliant={result.isCompliant} />

              <ResultRow
                label="Minimum Directors"
                value={result.minDirectors.toString()}
              />
              <ResultRow
                label="Maximum Directors"
                value={result.maxDirectors.toString()}
              />
              <ResultRow
                label="Woman Director Required?"
                value={result.needsWomanDirector ? "Yes (Listed)" : "No"}
              />
              <ResultRow
                label="Resident Director Required?"
                value="Yes"
              />
              <ResultRow
                label="Independent Directors Needed"
                value={result.needsIndependentDirectors.toString()}
              />

              {result.complianceIssues.length > 0 && (
                <div className="mt-4 p-4 rounded-lg bg-red-600/10 border border-red-500/30">
                  <h3 className="text-sm font-semibold text-red-400 mb-2">
                    Compliance Issues
                  </h3>
                  <ul className="text-xs text-red-300 space-y-1">
                    {result.complianceIssues.map((issue, i) => (
                      <li key={i}>- {issue}</li>
                    ))}
                  </ul>
                </div>
              )}

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
