"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateDirectorFee, formatCurrency } from "@/lib/calculations";
import type { DirectorFeeInputs } from "@/types/calculations";
import {
  ResultRow,
  Tooltip,
  ReferenceSection,
  FormulaDisplay,
  StatutoryDisclaimer,
  PrintButton,
} from "@/components";
import { calculatorMeta } from "@/lib/calculations/metadata";

const meta = calculatorMeta["director-fee"];

export default function DirectorFeePage() {
  const [inputs, setInputs] = useState<DirectorFeeInputs>({
    numberOfBoardMeetings: 4,
    numberOfCommitteeMeetings: 4,
    feePerBoardMeeting: 10000,
    feePerCommitteeMeeting: 10000,
    isListed: false,
    paidUpShareCapital: 0,
    turnover: 0,
  });

  const [result, setResult] = useState<ReturnType<
    typeof calculateDirectorFee
  > | null>(null);

  const updateField = (field: keyof DirectorFeeInputs, value: string) => {
    setInputs((prev) => ({
      ...prev,
      [field]:
        field === "isListed"
          ? value === "true"
          : parseFloat(value) || 0,
    }));
  };

  const calculate = () => {
    setResult(calculateDirectorFee(inputs));
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
              Number of Board Meetings (per year)
              <Tooltip text={meta.inputTooltips.numberOfBoardMeetings} />
            </label>
            <input
              type="number"
              value={inputs.numberOfBoardMeetings || ""}
              onChange={(e) =>
                updateField("numberOfBoardMeetings", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Number of Committee Meetings (per year)
              <Tooltip text={meta.inputTooltips.numberOfCommitteeMeetings} />
            </label>
            <input
              type="number"
              value={inputs.numberOfCommitteeMeetings || ""}
              onChange={(e) =>
                updateField("numberOfCommitteeMeetings", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Fee per Board Meeting
              <Tooltip text={meta.inputTooltips.feePerBoardMeeting} />
            </label>
            <input
              type="number"
              value={inputs.feePerBoardMeeting || ""}
              onChange={(e) =>
                updateField("feePerBoardMeeting", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Fee per Committee Meeting
              <Tooltip text={meta.inputTooltips.feePerCommitteeMeeting} />
            </label>
            <input
              type="number"
              value={inputs.feePerCommitteeMeeting || ""}
              onChange={(e) =>
                updateField("feePerCommitteeMeeting", e.target.value)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Company Type
              <Tooltip text={meta.inputTooltips.isListed} />
            </label>
            <select
              value={inputs.isListed ? "true" : "false"}
              onChange={(e) => updateField("isListed", e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="false">Unlisted</option>
              <option value="true">Listed</option>
            </select>
          </div>

          {inputs.isListed && (
            <>
              <div>
                <label className="block text-sm text-neutral-400 mb-1">
                  Turnover
                  <Tooltip text={meta.inputTooltips.turnover} />
                </label>
                <input
                  type="number"
                  value={inputs.turnover || ""}
                  onChange={(e) => updateField("turnover", e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </>
          )}

          <button
            onClick={calculate}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            Calculate Fees
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-neutral-200 mb-5">
            Results
          </h2>
          {result ? (
            <div className="space-y-4">
              <ResultRow
                label="Board Meeting Fees"
                value={formatCurrency(result.totalBoardFees)}
              />
              <ResultRow
                label="Committee Meeting Fees"
                value={formatCurrency(result.totalCommitteeFees)}
              />
              <ResultRow
                label="Total Annual Fees"
                value={formatCurrency(result.totalFees)}
                highlight
              />
              {result.feeCapApplicable && (
                <ResultRow
                  label="Max Annual Fee Cap"
                  value={formatCurrency(result.maxAnnualFee)}
                />
              )}
              <ResultRow
                label="Fee Cap Applicable?"
                value={result.feeCapApplicable ? "Yes (Listed)" : "No"}
              />

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
