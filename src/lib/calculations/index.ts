import type {
  CSRInputs,
  CSROutputs,
  DepreciationAsset,
  DepreciationOutputs,
  AssetClass,
  ManagerialRemunerationInputs,
  ManagerialRemunerationOutputs,
  NetProfitInputs,
  NetProfitOutputs,
  DividendInputs,
  DividendOutputs,
  BuybackInputs,
  BuybackOutputs,
  RelatedPartyInputs,
  RelatedPartyOutputs,
  BoardCompositionInputs,
  BoardCompositionOutputs,
  DirectorFeeInputs,
  DirectorFeeOutputs,
  ReservesSurplusInputs,
  ReservesSurplusOutputs,
  DepositsInputs,
  DepositsOutputs,
} from "@/types/calculations";

const ASSET_CLASS_CONFIG: Record<
  AssetClass,
  { usefulLife: number; slmRate: number; wdvRate: number }
> = {
  buildings_concrete: { usefulLife: 60, slmRate: 1.63, wdvRate: 3.18 },
  buildings_timber: { usefulLife: 30, slmRate: 3.17, wdvRate: 6.27 },
  buildings_other: { usefulLife: 30, slmRate: 3.17, wdvRate: 6.27 },
  furniture_fittings: { usefulLife: 10, slmRate: 9.5, wdvRate: 18.1 },
  plant_machinery_general: { usefulLife: 15, slmRate: 6.33, wdvRate: 13.91 },
  plant_machinery_specified: {
    usefulLife: 8,
    slmRate: 11.88,
    wdvRate: 22.09,
  },
  motor_vehicles_general: { usefulLife: 8, slmRate: 11.88, wdvRate: 22.09 },
  motor_vehicles_hiring: { usefulLife: 6, slmRate: 15.83, wdvRate: 31.23 },
  computers_servers: { usefulLife: 3, slmRate: 31.67, wdvRate: 63.16 },
  computer_software: { usefulLife: 3, slmRate: 31.67, wdvRate: 63.16 },
  intangibles: { usefulLife: 5, slmRate: 19.0, wdvRate: 36.9 },
  ships: { usefulLife: 20, slmRate: 4.75, wdvRate: 8.84 },
};

export function calculateCSR(inputs: CSRInputs): CSROutputs {
  const averageNetProfit =
    (inputs.netProfitYear1 + inputs.netProfitYear2 + inputs.netProfitYear3) / 3;

  const isEligibleForCSR = averageNetProfit >= 5000000;
  const csrObligation = isEligibleForCSR ? averageNetProfit * 0.02 : 0;
  const needsCSRCommittee = csrObligation >= 500000;

  const totalCSRSpend = csrObligation + inputs.existingCSRUnspent;

  return {
    averageNetProfit,
    csrObligation,
    csrUnspentPrevious: inputs.existingCSRUnspent,
    totalCSRSpend,
    needsCSRCommittee,
    isEligibleForCSR,
  };
}

export function calculateDepreciation(
  asset: DepreciationAsset
): DepreciationOutputs {
  const config = ASSET_CLASS_CONFIG[asset.assetClass];
  const residualValue = (asset.cost * asset.residualValuePercent) / 100;

  let annualDepreciation: number;
  let wdvAfterDepreciation: number;

  if (asset.method === "SLM") {
    annualDepreciation = (asset.cost - residualValue) / config.usefulLife;
    wdvAfterDepreciation = asset.cost - annualDepreciation;
  } else {
    const rate = config.wdvRate / 100;
    annualDepreciation = asset.cost * rate;
    wdvAfterDepreciation = asset.cost - annualDepreciation;
  }

  return {
    annualDepreciation,
    wdvAfterDepreciation: Math.max(wdvAfterDepreciation, residualValue),
    usefulLifeYears: config.usefulLife,
    ratePerAnnum:
      asset.method === "SLM" ? config.slmRate : config.wdvRate,
  };
}

export const ASSET_CLASSES: { value: AssetClass; label: string }[] = [
  { value: "buildings_concrete", label: "Buildings (Concrete/Frameless)" },
  { value: "buildings_timber", label: "Buildings (Wooden/Timber)" },
  { value: "buildings_other", label: "Buildings (Other)" },
  { value: "furniture_fittings", label: "Furniture & Fittings" },
  {
    value: "plant_machinery_general",
    label: "Plant & Machinery (General)",
  },
  {
    value: "plant_machinery_specified",
    label: "Plant & Machinery (Continuous Process)",
  },
  { value: "motor_vehicles_general", label: "Motor Vehicles (General)" },
  {
    value: "motor_vehicles_hiring",
    label: "Motor Vehicles (Hiring Business)",
  },
  { value: "computers_servers", label: "Computers & Servers" },
  { value: "computer_software", label: "Computer Software" },
  { value: "intangibles", label: "Intangibles (Patents, Know-how)" },
  { value: "ships", label: "Ships" },
];

export function calculateManagerialRemuneration(
  inputs: ManagerialRemunerationInputs
): ManagerialRemunerationOutputs {
  const maxTotalRemuneration = inputs.netProfit * 0.11;
  const maxMDRemuneration = inputs.netProfit * 0.05;
  const maxOtherExecRemuneration =
    inputs.numOtherExecDirectors * inputs.netProfit * 0.01;
  const maxNonExecRemuneration =
    inputs.numNonExecDirectors * inputs.netProfit * 0.01;

  const actualTotalRemuneration =
    inputs.managingDirectorSalary +
    inputs.wholeTimeDirectorSalary +
    inputs.otherExecutiveDirectors +
    inputs.nonExecutiveDirectors;

  const excessRemuneration = Math.max(
    0,
    actualTotalRemuneration - maxTotalRemuneration
  );

  return {
    maxTotalRemuneration,
    maxMDRemuneration,
    maxOtherExecRemuneration,
    maxNonExecRemuneration,
    actualTotalRemuneration,
    isCompliant: actualTotalRemuneration <= maxTotalRemuneration,
    excessRemuneration,
  };
}

export function calculateNetProfit(inputs: NetProfitInputs): NetProfitOutputs {
  const totalAddbacks =
    inputs.depreciationAddback +
    inputs.directorRemunerationAddback +
    inputs.interestAddback +
    inputs.lossSaleAssetsAddback +
    inputs.provisionBadDebtsAddback +
    inputs.otherExpensesAddback;

  const totalDeductions =
    inputs.profitSaleAssetsDeduct +
    inputs.governmentGrantsDeduct +
    inputs.otherIncomeDeduct +
    inputs.priorPeriodItemsDeduct;

  const netProfitForManagerialRemuneration =
    inputs.profitAndLoss + totalAddbacks - totalDeductions;

  return {
    netProfitForManagerialRemuneration,
    breakdown: {
      startingPAndL: inputs.profitAndLoss,
      totalAddbacks,
      totalDeductions,
    },
  };
}

export function calculateDividend(inputs: DividendInputs): DividendOutputs {
  const proposedDividendAmount =
    (inputs.paidUpShareCapital * inputs.proposedDividendRate) / 100;

  const depreciationShortfall = Math.max(
    0,
    inputs.depreciationRequired - inputs.depreciationProvided
  );

  const availableReserves = inputs.freeReserves - depreciationShortfall;
  const isReservesSufficient = availableReserves >= proposedDividendAmount;

  const maximumDividend = Math.max(0, availableReserves);

  const canDeclareFromReserves =
    isReservesSufficient && inputs.unpaidDividendYears === 0;

  return {
    maximumDividend,
    proposedDividendAmount,
    isReservesSufficient,
    canDeclareFromReserves,
    dividendPerShare: inputs.proposedDividendRate,
  };
}

export function calculateBuyback(inputs: BuybackInputs): BuybackOutputs {
  const totalCapitalAndReserves =
    inputs.paidUpEquityCapital + inputs.freeReserves + inputs.securitiesPremium;

  const maxBuybackFromCapitalReserves = totalCapitalAndReserves * 0.25;
  const maxBuybackPercentage = 25;

  const proposedBuybackValue = inputs.buybackPrice * inputs.numberOfSharesToBuyback;

  const totalEquityAfter =
    inputs.paidUpEquityCapital -
    (inputs.numberOfSharesToBuyback * inputs.paidUpEquityCapital) /
      inputs.numberOfSharesOutstanding;

  const reservesAfter = inputs.freeReserves - proposedBuybackValue;
  const netWorthAfter = Math.max(1, totalEquityAfter + reservesAfter);
  const debtEquityRatioAfterBuyback = inputs.totalDebt / netWorthAfter;

  const isDebtEquityCompliant = debtEquityRatioAfterBuyback <= 2;
  const isWithinPercentageLimit =
    proposedBuybackValue <= maxBuybackFromCapitalReserves;

  return {
    maxBuybackFromCapitalReserves,
    maxBuybackPercentage,
    proposedBuybackValue,
    debtEquityRatioAfterBuyback,
    isDebtEquityCompliant,
    isWithinPercentageLimit,
    isCompliant: isDebtEquityCompliant && isWithinPercentageLimit,
  };
}

export function calculateRelatedParty(
  inputs: RelatedPartyInputs
): RelatedPartyOutputs {
  const capitalTurnover = Math.max(
    inputs.paidUpShareCapital,
    inputs.turnover
  );

  let thresholdPercentage: number;
  switch (inputs.transactionType) {
    case "sale_purchase":
    case "sale_property":
      thresholdPercentage = 10;
      break;
    case "leasing":
    case "services":
      thresholdPercentage = 10;
      break;
    case "brand_usage":
      thresholdPercentage = 10;
      break;
    case "appointing_agent":
    case "appointing_manager":
      thresholdPercentage = 10;
      break;
    case "underwriting_remuneration":
      thresholdPercentage = 10;
      break;
    default:
      thresholdPercentage = 10;
  }

  const thresholdForApproval = (capitalTurnover * thresholdPercentage) / 100;
  const exceedsThreshold = inputs.transactionValue > thresholdForApproval;

  const requiresBoardApproval = true;
  const requiresShareholderApproval =
    exceedsThreshold || inputs.transactionValue > 100000000;

  return {
    requiresBoardApproval,
    requiresShareholderApproval,
    thresholdForApproval,
    exceedsThreshold,
  };
}

export function calculateBoardComposition(
  inputs: BoardCompositionInputs
): BoardCompositionOutputs {
  const minDirectors = inputs.companyType === "public" ? 3 : 2;
  const maxDirectors = 15;

  const needsWomanDirector = inputs.isListed;
  const needsResidentDirector = true;

  let needsIndependentDirectors = 0;
  if (inputs.isListed) {
    if (inputs.turnover >= 10000000000) {
      needsIndependentDirectors = Math.max(3, Math.floor(minDirectors * 0.33));
    } else {
      needsIndependentDirectors = Math.max(2, Math.floor(minDirectors * 0.33));
    }
  } else if (
    inputs.companyType === "public" &&
    inputs.paidUpShareCapital >= 100000000
  ) {
    needsIndependentDirectors = 2;
  }

  const complianceIssues: string[] = [];

  if (inputs.currentDirectors < minDirectors) {
    complianceIssues.push(
      `Minimum ${minDirectors} directors required, currently ${inputs.currentDirectors}`
    );
  }
  if (needsWomanDirector && !inputs.womanDirector) {
    complianceIssues.push("At least one woman director is required for listed companies");
  }
  if (needsResidentDirector && !inputs.residentDirector) {
    complianceIssues.push(
      "At least one director must be resident in India (182+ days)"
    );
  }
  const currentIndependent = inputs.nonExecutiveDirectors;
  if (currentIndependent < needsIndependentDirectors) {
    complianceIssues.push(
      `At least ${needsIndependentDirectors} independent directors required, currently ${currentIndependent}`
    );
  }

  return {
    minDirectors,
    maxDirectors,
    needsWomanDirector,
    needsResidentDirector,
    needsIndependentDirectors,
    isCompliant: complianceIssues.length === 0,
    complianceIssues,
  };
}

export function calculateDirectorFee(
  inputs: DirectorFeeInputs
): DirectorFeeOutputs {
  const totalBoardFees =
    inputs.numberOfBoardMeetings * inputs.feePerBoardMeeting;
  const totalCommitteeFees =
    inputs.numberOfCommitteeMeetings * inputs.feePerCommitteeMeeting;
  const totalFees = totalBoardFees + totalCommitteeFees;

  const feeCapApplicable = inputs.isListed;
  const maxAnnualFee = feeCapApplicable
    ? Math.min(inputs.turnover * 0.001, 100000 * inputs.numberOfBoardMeetings)
    : totalFees;

  return {
    totalBoardFees,
    totalCommitteeFees,
    totalFees,
    feeCapApplicable,
    maxAnnualFee,
  };
}

export function calculateReservesSurplus(
  inputs: ReservesSurplusInputs
): ReservesSurplusOutputs {
  const closingBalance =
    inputs.openingBalance +
    inputs.profitForYear -
    inputs.dividendPaid +
    inputs.transferFromReserves -
    inputs.transferToReserves +
    inputs.otherAdjustments;

  const freeReserves = Math.max(0, closingBalance - inputs.transferToReserves);
  const restrictedReserves = inputs.transferToReserves;

  return {
    closingBalance,
    freeReserves,
    restrictedReserves,
  };
}

export function calculateDeposits(
  inputs: DepositsInputs
): DepositsOutputs {
  const maxDepositsFromMembers =
    inputs.companyType === "public"
      ? (inputs.paidUpShareCapital + inputs.freeReserves) * 0.1
      : 0;

  const maxDepositsFromPublic =
    inputs.companyType === "public"
      ? (inputs.paidUpShareCapital + inputs.freeReserves) * 0.25
      : 0;

  const totalMaxDeposits = maxDepositsFromMembers + maxDepositsFromPublic;
  const isWithinLimit = inputs.totalDepositsAccepted <= totalMaxDeposits;

  return {
    maxDepositsFromMembers,
    maxDepositsFromPublic,
    totalMaxDeposits,
    isWithinLimit,
    depositInsuranceRequired: inputs.totalDepositsAccepted > 0,
  };
}

export function formatCurrency(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  } else if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  return `₹${amount.toLocaleString("en-IN", { maximumFractionDigits: 2 })}`;
}
