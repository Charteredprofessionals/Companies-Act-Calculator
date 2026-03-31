"use client";

import { useState } from "react";
import Link from "next/link";
import { calculateDirectorFee, formatCurrency } from "@/lib/calculations";
import type { DirectorFeeInputs } from "@/types/calculations";

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

      <h1 className="text-3xl font-bold mt-4 mb-1">Director Fee Calculator</h1>
      <p className="text-neutral-400 mb-8">
        Section 197 &mdash; Calculate sitting fees for board & committee
        meetings
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-neutral-200">Inputs</h2>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Number of Board Meetings (per year)
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

              <div className="mt-6 p-4 rounded-lg bg-neutral-800/50 border border-neutral-700">
                <h3 className="text-sm font-semibold text-neutral-300 mb-2">
                  Reference
                </h3>
                <ul className="text-xs text-neutral-400 space-y-1">
                  <li>Section 197 of Companies Act, 2013</li>
                  <li>Sitting fees paid to non-executive directors</li>
                  <li>Min 1 board meeting per quarter required</li>
                  <li>Listed companies have fee caps based on turnover</li>
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
      <span
        className={`font-semibold ${highlight ? "text-blue-400" : "text-white"}`}
      >
        {value}
      </span>
    </div>
  );
}
