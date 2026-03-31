"use client";

import { useState } from "react";
import Link from "next/link";
import type { CalculatorCard } from "@/types/calculations";

const calculators: CalculatorCard[] = [
  {
    id: "csr",
    title: "CSR Expenditure",
    section: "Section 135",
    description: "Calculate 2% CSR obligation on average net profits",
    icon: "M",
    href: "/calculators/csr",
  },
  {
    id: "depreciation",
    title: "Depreciation",
    section: "Schedule II",
    description: "SLM/WDV depreciation based on useful life of assets",
    icon: "D",
    href: "/calculators/depreciation",
  },
  {
    id: "managerial-remuneration",
    title: "Managerial Remuneration",
    section: "Section 197 / Schedule V",
    description: "Calculate 11% cap on managerial remuneration",
    icon: "R",
    href: "/calculators/managerial-remuneration",
  },
  {
    id: "net-profit",
    title: "Net Profit",
    section: "Section 198",
    description: "Compute net profit for managerial remuneration",
    icon: "P",
    href: "/calculators/net-profit",
  },
  {
    id: "dividend",
    title: "Dividend",
    section: "Section 123",
    description: "Calculate dividend from free reserves & capital",
    icon: "V",
    href: "/calculators/dividend",
  },
  {
    id: "buyback",
    title: "Buyback of Shares",
    section: "Section 68",
    description: "Verify 25% limit & debt-equity ratio compliance",
    icon: "B",
    href: "/calculators/buyback",
  },
  {
    id: "related-party",
    title: "Related Party Transactions",
    section: "Section 188",
    description: "Determine approval thresholds for RPTs",
    icon: "T",
    href: "/calculators/related-party",
  },
  {
    id: "board-composition",
    title: "Board Composition",
    section: "Section 149",
    description: "Check director requirements & independent director count",
    icon: "C",
    href: "/calculators/board-composition",
  },
  {
    id: "director-fee",
    title: "Director Fee",
    section: "Section 197",
    description: "Calculate sitting fees for board & committee meetings",
    icon: "F",
    href: "/calculators/director-fee",
  },
  {
    id: "reserves-surplus",
    title: "Reserves & Surplus",
    section: "Section 123",
    description: "Track free reserves and restricted reserves",
    icon: "S",
    href: "/calculators/reserves-surplus",
  },
  {
    id: "deposits",
    title: "Deposits",
    section: "Section 73",
    description: "Calculate deposit limits from members & public",
    icon: "L",
    href: "/calculators/deposits",
  },
];

export default function CalculatorDashboard() {
  const [search, setSearch] = useState("");

  const filtered = calculators.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.section.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-3">
            Companies Act, 2013
          </h1>
          <p className="text-lg text-neutral-400 mb-8">
            Comprehensive compliance calculators for all statutory computations
          </p>
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search calculators..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((calc) => (
            <Link
              key={calc.id}
              href={calc.href}
              className="group block rounded-xl border border-neutral-800 bg-neutral-900 p-6 hover:border-blue-500/50 hover:bg-neutral-800/80 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold text-sm">
                  {calc.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors">
                    {calc.title}
                  </h3>
                  <span className="inline-block text-xs font-mono text-neutral-500 bg-neutral-800 px-2 py-0.5 rounded mt-1">
                    {calc.section}
                  </span>
                  <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                    {calc.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-neutral-500">
            No calculators found matching &quot;{search}&quot;
          </div>
        )}

        <footer className="text-center mt-16 text-xs text-neutral-600">
          <p>
            Disclaimer: Calculations are based on the Companies Act, 2013 and
            applicable rules. Please verify with professional counsel for
            compliance purposes.
          </p>
        </footer>
      </div>
    </main>
  );
}
