export interface CalculatorMeta {
  title: string;
  section: string;
  description: string;
  formulas: string[];
  references: { section: string; points: string[] };
  inputTooltips: Record<string, string>;
  interpretResult?: (result: unknown) => string;
}

export const calculatorMeta: Record<string, CalculatorMeta> = {
  csr: {
    title: "CSR Expenditure Calculator",
    section: "Section 135",
    description:
      "Calculate 2% CSR obligation on average net profits of preceding 3 financial years",
    formulas: [
      "Average Net Profit = (Year1 + Year2 + Year3) / 3",
      "CSR Obligation = Average Net Profit x 2%",
      "Total CSR Spend = CSR Obligation + Unspent from Previous Year",
      "CSR Committee needed if obligation >= 50 lakhs",
    ],
    references: {
      section: "Section 135 of Companies Act, 2013",
      points: [
        "CSR applicable if net worth >= 500 Cr, or turnover >= 1000 Cr, or net profit >= 5 Cr",
        "2% of average net profits of preceding 3 financial years",
        "CSR Committee required if obligation >= 50 lakhs",
      ],
    },
    inputTooltips: {
      netProfitYear1:
        "Net profit as per P&L for the most recent financial year, as computed under Section 198.",
      netProfitYear2:
        "Net profit as per P&L for the second preceding financial year.",
      netProfitYear3:
        "Net profit as per P&L for the third preceding financial year.",
      existingCSRUnspent:
        "Unspent CSR amount from the previous financial year that must be spent in the current year per Section 135(5).",
    },
    interpretResult: (r) => {
      const result = r as {
        isEligibleForCSR: boolean;
        csrObligation: number;
      };
      if (!result.isEligibleForCSR)
        return "Your company is not eligible for CSR as the average net profit is below Rs 5 crore threshold.";
      return `Your company must spend at least Rs ${(result.csrObligation / 100000).toFixed(2)} lakhs on CSR activities this year. Unspent amounts must be transferred to a special account within 30 days of the FY end.`;
    },
  },
  depreciation: {
    title: "Depreciation Calculator",
    section: "Schedule II",
    description:
      "Calculate SLM/WDV depreciation based on useful life of asset classes",
    formulas: [
      "SLM: Annual Dep = (Cost - Residual Value) / Useful Life",
      "WDV: Annual Dep = Cost x WDV Rate%",
      "Residual Value typically 5% of original cost",
    ],
    references: {
      section: "Schedule II of Companies Act, 2013",
      points: [
        "WDV Method: Dep = (Cost - Accum. Dep) x Rate",
        "SLM Method: Dep = (Cost - Residual) / Useful Life",
        "Residual value typically 5% of original cost",
      ],
    },
    inputTooltips: {
      assetClass:
        "Select the asset category as defined in Schedule II. Each class has a prescribed useful life and depreciation rate.",
      cost:
        "Original purchase cost of the asset including installation and directly attributable costs.",
      residualValuePercent:
        "The estimated value of the asset at the end of its useful life. Typically 5% of original cost.",
      method:
        "SLM provides equal depreciation each year. WDV provides higher depreciation in earlier years.",
    },
    interpretResult: (r) => {
      const result = r as { annualDepreciation: number; usefulLifeYears: number };
      return `The asset will depreciate by Rs ${(result.annualDepreciation).toLocaleString("en-IN", { maximumFractionDigits: 2 })} annually over ${result.usefulLifeYears} years. After full useful life, the asset should be written off or revalued.`;
    },
  },
  "managerial-remuneration": {
    title: "Managerial Remuneration",
    section: "Section 197 / Schedule V",
    description: "Calculate 11% cap on managerial remuneration",
    formulas: [
      "Max Total Remuneration = Net Profit x 11%",
      "Max MD/WTD Remuneration = Net Profit x 5%",
      "Max per Other Exec Director = Net Profit x 1%",
      "Max per Non-Exec Director = Net Profit x 1%",
    ],
    references: {
      section: "Section 197 of Companies Act, 2013",
      points: [
        "Maximum 11% of net profit for all directors combined",
        "MD/WTD: 5% of net profit",
        "Other directors: 1% each (max 3 non-exec)",
        "Schedule V for companies with no/inadequate profits",
      ],
    },
    inputTooltips: {
      netProfit: "Net profit computed as per Section 198 of the Companies Act, 2013.",
      managingDirectorSalary:
        "Total annual remuneration (salary, perquisites, commission) paid to the Managing Director or Whole-Time Director.",
      wholeTimeDirectorSalary:
        "Total annual remuneration paid to Whole-Time Directors (if separate from MD).",
      otherExecutiveDirectors:
        "Combined actual remuneration paid to all other executive/whole-time directors.",
      nonExecutiveDirectors:
        "Combined sitting fees and commission paid to non-executive directors.",
      numOtherExecDirectors:
        "Count of other executive/whole-time directors (excluding MD/WTD).",
      numNonExecDirectors:
        "Count of non-executive directors on the board.",
    },
    interpretResult: (r) => {
      const result = r as { isCompliant: boolean; excessRemuneration: number };
      if (result.isCompliant)
        return "The total managerial remuneration is within the 11% cap. The company is compliant with Section 197.";
      return `The remuneration exceeds the 11% cap by Rs ${(result.excessRemuneration / 100000).toFixed(2)} lakhs. The company needs Central Government approval under Schedule V for the excess amount.`;
    },
  },
  "net-profit": {
    title: "Net Profit Calculator",
    section: "Section 198",
    description: "Compute net profit for managerial remuneration purposes",
    formulas: [
      "Net Profit = P&L Balance + Add Backs - Deductions",
      "Add Backs: Depreciation, Director Fees, Interest, Loss on Sale, Bad Debts",
      "Deductions: Profit on Sale, Government Grants, Other Non-Operating Income",
    ],
    references: {
      section: "Section 198 of Companies Act, 2013",
      points: [
        "Add back: Depreciation, Director fees, Interest",
        "Add back: Loss on sale of assets, Bad debt provision",
        "Deduct: Profit on sale of assets, Grants",
        "Used as base for managerial remuneration (Section 197)",
      ],
    },
    inputTooltips: {
      profitAndLoss:
        "Balance as per the Profit & Loss Account for the financial year.",
      depreciationAddback:
        "Depreciation debited to P&L — add back as per Section 198.",
      directorRemunerationAddback:
        "Director remuneration debited to P&L — add back as per Section 198.",
      interestAddback:
        "Interest on loans/borrowings debited to P&L — add back.",
      lossSaleAssetsAddback:
        "Loss on sale of assets debited to P&L — add back.",
      provisionBadDebtsAddback:
        "Provision for bad/doubtful debts — add back if admissible.",
      otherExpensesAddback:
        "Other admissible expenses debited to P&L — add back.",
      profitSaleAssetsDeduct:
        "Profit on sale of assets credited to P&L — deduct.",
      governmentGrantsDeduct:
        "Government grants/subsidies received — deduct from net profit.",
      otherIncomeDeduct:
        "Other non-operating income credited to P&L — deduct.",
      priorPeriodItemsDeduct:
        "Prior period items (credit side) — deduct.",
    },
  },
  dividend: {
    title: "Dividend Calculator",
    section: "Section 123",
    description: "Calculate dividend from free reserves & capital",
    formulas: [
      "Proposed Dividend = Paid-up Capital x Dividend Rate%",
      "Depreciation Shortfall = Required - Provided",
      "Available Reserves = Free Reserves - Depreciation Shortfall",
      "Max Dividend = Available Reserves (if >= 0)",
    ],
    references: {
      section: "Section 123 of Companies Act, 2013",
      points: [
        "Dividend from free reserves after providing for depreciation",
        "Cannot declare if unpaid dividend exists for 3+ years",
        "Interim dividend: Only from profits of current year",
      ],
    },
    inputTooltips: {
      paidUpShareCapital:
        "Total paid-up equity share capital as per the latest balance sheet.",
      freeReserves:
        "Reserves available for distribution as dividend (excluding revaluation reserve, capital reserve, etc.).",
      proposedDividendRate:
        "Proposed dividend as a percentage of paid-up share capital (e.g., 100 means 100% dividend).",
      depreciationProvided:
        "Depreciation actually provided in the books of accounts for the year.",
      depreciationRequired:
        "Depreciation required as per Schedule II useful life tables.",
      unpaidDividendYears:
        "Number of years for which unpaid/unclaimed dividend remains outstanding. Cannot declare dividend if 3+ years unpaid.",
    },
    interpretResult: (r) => {
      const result = r as {
        canDeclareFromReserves: boolean;
        isReservesSufficient: boolean;
      };
      if (result.canDeclareFromReserves)
        return "The company can declare the proposed dividend from free reserves. All conditions under Section 123 are satisfied.";
      if (!result.isReservesSufficient)
        return "Free reserves are insufficient for the proposed dividend after adjusting for depreciation shortfall.";
      return "Dividend cannot be declared — there are unpaid/unclaimed dividends from previous years that must be resolved first.";
    },
  },
  buyback: {
    title: "Buyback of Shares",
    section: "Section 68",
    description: "Verify 25% limit & debt-equity ratio compliance",
    formulas: [
      "Max Buyback = 25% x (Paid-up Capital + Free Reserves + Securities Premium)",
      "Debt-Equity Ratio = Total Debt / Net Worth (post-buyback)",
      "Debt-Equity must not exceed 2:1 after buyback",
    ],
    references: {
      section: "Section 68 of Companies Act, 2013",
      points: [
        "Max 25% of paid-up capital + free reserves",
        "Debt-equity ratio must not exceed 2:1 post-buyback",
        "Buyback must be completed within 12 months",
        "Free reserves must be created equal to buyback value",
      ],
    },
    inputTooltips: {
      paidUpEquityCapital:
        "Total paid-up equity share capital as per the latest balance sheet.",
      freeReserves:
        "Free reserves available (not including revaluation reserve or capital reserve).",
      securitiesPremium:
        "Balance in the Securities Premium Account.",
      totalDebt:
        "Total outstanding borrowings/debt (secured + unsecured).",
      numberOfSharesOutstanding:
        "Total number of equity shares currently outstanding.",
      buybackPrice:
        "Price per share at which the company proposes to buy back shares.",
      numberOfSharesToBuyback:
        "Total number of shares proposed to be bought back.",
    },
    interpretResult: (r) => {
      const result = r as { isCompliant: boolean };
      if (result.isCompliant)
        return "The proposed buyback is compliant with both the 25% limit and the 2:1 debt-equity ratio requirement.";
      return "The proposed buyback is NOT compliant. Check whether the value exceeds 25% of capital+reserves or the post-buyback debt-equity ratio exceeds 2:1.";
    },
  },
  "related-party": {
    title: "Related Party Transactions",
    section: "Section 188",
    description: "Determine approval thresholds for RPTs",
    formulas: [
      "Threshold = 10% x max(Paid-up Capital, Turnover)",
      "Board Approval: Always required for all RPTs",
      "Shareholder Approval: If exceeds threshold OR value > Rs 10 Cr",
    ],
    references: {
      section: "Section 188 of Companies Act, 2013",
      points: [
        "All RPTs require Board approval",
        "Shareholder approval if exceeds 10% of turnover/capital",
        "Ordinary resolution required for shareholder approval",
        "Interested parties cannot vote",
      ],
    },
    inputTooltips: {
      transactionType:
        "Select the type of related party transaction. Different thresholds may apply based on the transaction category.",
      transactionValue:
        "Total value of the transaction in rupees. For recurring transactions, consider the aggregate value for the financial year.",
      paidUpShareCapital:
        "Paid-up share capital of the company as per the latest balance sheet.",
      turnover:
        "Turnover of the company for the latest financial year.",
      companyType:
        "Public companies have stricter RPT compliance requirements than private companies.",
    },
    interpretResult: (r) => {
      const result = r as { requiresShareholderApproval: boolean };
      if (result.requiresShareholderApproval)
        return "This transaction requires both Board AND Shareholder approval (ordinary resolution). Interested parties cannot vote on the resolution.";
      return "This transaction requires Board approval only. No shareholder approval is needed as it falls within the prescribed threshold.";
    },
  },
  "board-composition": {
    title: "Board Composition Calculator",
    section: "Section 149",
    description: "Check director requirements & independent director count",
    formulas: [
      "Public Company: Min 3 directors, Max 15",
      "Private Company: Min 2 directors, Max 15",
      "Listed: At least 1 woman director required",
      "All companies: At least 1 resident Indian director",
      "Listed/10Cr+ capital: 1/3rd independent directors",
    ],
    references: {
      section: "Section 149 of Companies Act, 2013",
      points: [
        "Public: min 3, Private: min 2 directors",
        "Listed: at least 1 woman director",
        "At least 1 resident Indian director",
        "Listed/10Cr+ capital: 1/3rd independent directors",
      ],
    },
    inputTooltips: {
      companyType:
        "Public companies require minimum 3 directors; private companies require minimum 2.",
      isListed:
        "Listed companies have additional requirements: woman director, more independent directors.",
      paidUpShareCapital:
        "Public companies with paid-up capital >= Rs 10 crore need at least 2 independent directors.",
      turnover:
        "Listed companies with turnover >= Rs 1000 crore need at least 3 independent directors.",
      currentDirectors:
        "Total number of directors currently on the board.",
      nonExecutiveDirectors:
        "Number of independent/non-executive directors currently on the board.",
      womanDirector:
        "Listed companies must have at least one woman director on the board.",
      residentDirector:
        "Every company must have at least one director who has stayed in India for a total period of not less than 182 days during the financial year.",
    },
    interpretResult: (r) => {
      const result = r as { isCompliant: boolean; complianceIssues: string[] };
      if (result.isCompliant)
        return "The board composition meets all requirements under Section 149. The company is fully compliant.";
      return `The board has ${result.complianceIssues.length} compliance issue(s) that need to be addressed before the next AGM to avoid penalties.`;
    },
  },
  "director-fee": {
    title: "Director Fee Calculator",
    section: "Section 197",
    description: "Calculate sitting fees for board & committee meetings",
    formulas: [
      "Board Fees = Number of Board Meetings x Fee per Meeting",
      "Committee Fees = Number of Committee Meetings x Fee per Meeting",
      "Total Fees = Board Fees + Committee Fees",
      "Listed companies: Fee cap = min(0.1% of Turnover, Rs 1L x Board Meetings)",
    ],
    references: {
      section: "Section 197 of Companies Act, 2013",
      points: [
        "Sitting fees paid to non-executive directors",
        "Min 1 board meeting per quarter required",
        "Listed companies have fee caps based on turnover",
      ],
    },
    inputTooltips: {
      numberOfBoardMeetings:
        "Minimum 4 board meetings per year (one per quarter). Additional meetings may be held.",
      numberOfCommitteeMeetings:
        "Number of Audit Committee, Nomination Committee, and other committee meetings.",
      feePerBoardMeeting:
        "Sitting fee per board meeting. No statutory cap for unlisted companies.",
      feePerCommitteeMeeting:
        "Sitting fee per committee meeting attendance.",
      isListed:
        "Listed companies have additional fee cap restrictions based on turnover.",
      turnover:
        "Required for listed companies to calculate the fee cap (0.1% of turnover).",
    },
  },
  "reserves-surplus": {
    title: "Reserves & Surplus Calculator",
    section: "Section 123",
    description: "Track free reserves and restricted reserves",
    formulas: [
      "Closing Balance = Opening + Profit - Dividend + Transfers In - Transfers Out +/- Other",
      "Free Reserves = Closing Balance - Transfers to Statutory Reserves",
      "Restricted Reserves = Transfers to Statutory Reserves",
    ],
    references: {
      section: "Section 123 of Companies Act, 2013",
      points: [
        "Free reserves: available for dividend/buyback",
        "Restricted reserves: earmarked for specific purposes",
        "Statutory transfers as per applicable rules",
      ],
    },
    inputTooltips: {
      openingBalance:
        "Opening balance of reserves & surplus as per the balance sheet.",
      profitForYear:
        "Net profit for the year after tax (as per P&L account).",
      dividendPaid:
        "Total dividend (interim + final) paid during the year.",
      transferToReserves:
        "Amount transferred to statutory reserves (e.g., under Section 45-IC of RBI Act, or debenture redemption reserve).",
      transferFromReserves:
        "Amount transferred from reserves by way of bonus shares or capitalization.",
      otherAdjustments:
        "Any other adjustments (+/-) to reserves during the year (e.g., prior period adjustments, revaluation).",
    },
  },
  deposits: {
    title: "Deposits Calculator",
    section: "Section 73",
    description: "Calculate deposit limits from members & public",
    formulas: [
      "Public Companies: Max from Members = 10% x (Capital + Reserves)",
      "Public Companies: Max from Public = 25% x (Capital + Reserves)",
      "Private Companies: Cannot accept deposits from members or public",
      "Deposit insurance / complying trust required",
    ],
    references: {
      section: "Section 73 of Companies Act, 2013",
      points: [
        "Private companies cannot accept deposits",
        "Members: max 10% of capital + reserves",
        "Public: max 25% of capital + reserves",
        "Deposit insurance/complying trust required",
      ],
    },
    inputTooltips: {
      companyType:
        "Private companies are generally prohibited from accepting deposits from members or public.",
      paidUpShareCapital:
        "Paid-up share capital as per the latest balance sheet.",
      freeReserves:
        "Free reserves available (not including revaluation or capital reserves).",
      totalDepositsAccepted:
        "Total deposits currently outstanding/accepted by the company.",
      depositFromMembers:
        "Portion of total deposits accepted from members of the company.",
      depositFromPublic:
        "Portion of total deposits accepted from the general public.",
    },
    interpretResult: (r) => {
      const result = r as { isWithinLimit: boolean };
      if (result.isWithinLimit)
        return "The total deposits accepted are within the statutory limits prescribed under Section 73.";
      return "The deposits exceed the statutory limits. The company must take immediate steps to bring deposits within limits or repay excess deposits.";
    },
  },
};
