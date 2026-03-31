"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ResultRow,
  FormulaDisplay,
  ReferenceSection,
  Interpretation,
  StatutoryDisclaimer,
  Tooltip,
  PrintButton,
} from "@/components";
import {
  calculateDepreciation,
  formatCurrency,
  ASSET_CLASSES,
} from "@/lib/calculations";
import { calculatorMeta } from "@/lib/calculations/metadata";
import type { DepreciationAsset, DepreciationOutputs, AssetClass } from "@/types/calculations";

const meta = calculatorMeta["depreciation"];

export default function DepreciationPage() {
  const [method, setMethod] = useState<"SLM" | "WDV">("WDV");
  const [assetClass, setAssetClass] = useState<AssetClass>("buildings_concrete");
  const [cost, setCost] = useState<number>(0);
  const [residualValuePercent, setResidualValuePercent] = useState<number>(5);
  const [result, setResult] = useState<DepreciationOutputs | null>(null);

  const calculate = () => {
    const asset: DepreciationAsset = {
      id: "1",
      name: "Asset",
      assetClass,
      cost,
      residualValuePercent,
      dateOfPurchase: "",
      dateOfUse: "",
      method,
    };
    setResult(calculateDepreciation(asset));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link
        href="/"
        className="text-sm text-neutral-400 hover:text-white transition-colors"
      >
        &larr; Back to all calculators
      </Link>
      <div className="flex justify-end mt-2"><PrintButton /></div>

      <h1 className="text-3xl font-bold mt-4 mb-1">
        Depreciation Calculator
      </h1>
      <p className="text-neutral-400 mb-8">
        Schedule II &mdash; Calculate SLM/WDV depreciation based on useful life
        of asset classes
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <h2 className="text-lg font-semibold text-neutral-200">Inputs</h2>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Asset Class
              <Tooltip text={meta.inputTooltips.assetClass} />
            </label>
            <select
              value={assetClass}
              onChange={(e) => setAssetClass(e.target.value as AssetClass)}
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {ASSET_CLASSES.map((ac) => (
                <option key={ac.value} value={ac.value}>
                  {ac.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Method
              <Tooltip text={meta.inputTooltips.method} />
            </label>
            <div className="flex gap-3">
              {(["WDV", "SLM"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMethod(m)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                    method === m
                      ? "bg-blue-600 text-white"
                      : "bg-neutral-800 text-neutral-400 hover:text-white"
                  }`}
                >
                  {m === "WDV"
                    ? "Written Down Value"
                    : "Straight Line Method"}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Cost of Asset
              <Tooltip text={meta.inputTooltips.cost} />
            </label>
            <input
              type="number"
              value={cost || ""}
              onChange={(e) => setCost(parseFloat(e.target.value) || 0)}
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-400 mb-1">
              Residual Value (%)
              <Tooltip text={meta.inputTooltips.residualValuePercent} />
            </label>
            <input
              type="number"
              value={residualValuePercent || ""}
              onChange={(e) =>
                setResidualValuePercent(parseFloat(e.target.value) || 0)
              }
              className="w-full px-3 py-2 rounded-lg bg-neutral-800 border border-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="5"
            />
          </div>

          <button
            onClick={calculate}
            className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            Calculate Depreciation
          </button>

          <FormulaDisplay title="Formulas" formulas={meta.formulas} />
        </div>

        <div>
          <h2 className="text-lg font-semibold text-neutral-200 mb-5">
            Results
          </h2>
          {result ? (
            <div className="space-y-4">
              <ResultRow
                label="Useful Life"
                value={`${result.usefulLifeYears} years`}
              />
              <ResultRow
                label="Rate per Annum"
                value={`${result.ratePerAnnum}%`}
              />
              <ResultRow
                label="Annual Depreciation"
                value={formatCurrency(result.annualDepreciation)}
                highlight
              />
              <ResultRow
                label="WDV After Depreciation"
                value={formatCurrency(result.wdvAfterDepreciation)}
              />

              <Interpretation text={meta.interpretResult!(result)} />

              <ReferenceSection
                section={meta.references.section}
                points={meta.references.points}
              />
            </div>
          ) : (
            <div className="text-neutral-500 text-sm">
              Enter values and click calculate to see results
            </div>
          )}
        </div>
      </div>

      <StatutoryDisclaimer />
    </div>
  );
}
