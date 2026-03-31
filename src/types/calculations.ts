export type CompanyType = "public" | "private";

export interface CSRInputs {
  netProfitYear1: number;
  netProfitYear2: number;
  netProfitYear3: number;
  existingCSRUnspent: number;
}

export interface CSROutputs {
  averageNetProfit: number;
  csrObligation: number;
  csrUnspentPrevious: number;
  totalCSRSpend: number;
  needsCSRCommittee: boolean;
  isEligibleForCSR: boolean;
}

export interface DepreciationAsset {
  id: string;
  name: string;
  assetClass: AssetClass;
  cost: number;
  residualValuePercent: number;
  dateOfPurchase: string;
  dateOfUse: string;
  method: "SLM" | "WDV";
}

export type AssetClass =
  | "buildings_concrete"
  | "buildings_timber"
  | "buildings_other"
  | "furniture_fittings"
  | "plant_machinery_general"
  | "plant_machinery_specified"
  | "motor_vehicles_general"
  | "motor_vehicles_hiring"
  | "computers_servers"
  | "computer_software"
  | "intangibles"
  | "ships";

export interface DepreciationOutputs {
  annualDepreciation: number;
  wdvAfterDepreciation: number;
  usefulLifeYears: number;
  ratePerAnnum: number;
}

export interface ManagerialRemunerationInputs {
  netProfit: number;
  managingDirectorSalary: number;
  wholeTimeDirectorSalary: number;
  otherExecutiveDirectors: number;
  nonExecutiveDirectors: number;
  numOtherExecDirectors: number;
  numNonExecDirectors: number;
}

export interface ManagerialRemunerationOutputs {
  maxTotalRemuneration: number;
  maxMDRemuneration: number;
  maxOtherExecRemuneration: number;
  maxNonExecRemuneration: number;
  actualTotalRemuneration: number;
  isCompliant: boolean;
  excessRemuneration: number;
}

export interface NetProfitInputs {
  profitAndLoss: number;
  depreciationAddback: number;
  directorRemunerationAddback: number;
  interestAddback: number;
  lossSaleAssetsAddback: number;
  provisionBadDebtsAddback: number;
  otherExpensesAddback: number;
  profitSaleAssetsDeduct: number;
  governmentGrantsDeduct: number;
  otherIncomeDeduct: number;
  priorPeriodItemsDeduct: number;
}

export interface NetProfitOutputs {
  netProfitForManagerialRemuneration: number;
  breakdown: {
    startingPAndL: number;
    totalAddbacks: number;
    totalDeductions: number;
  };
}

export interface DividendInputs {
  paidUpShareCapital: number;
  freeReserves: number;
  proposedDividendRate: number;
  depreciationProvided: number;
  depreciationRequired: number;
  unpaidDividendYears: number;
  arrearsOfDepreciation: number;
}

export interface DividendOutputs {
  maximumDividend: number;
  proposedDividendAmount: number;
  isReservesSufficient: boolean;
  canDeclareFromReserves: boolean;
  dividendPerShare: number;
}

export interface BuybackInputs {
  paidUpEquityCapital: number;
  freeReserves: number;
  securitiesPremium: number;
  totalDebt: number;
  numberOfSharesOutstanding: number;
  buybackPrice: number;
  numberOfSharesToBuyback: number;
}

export interface BuybackOutputs {
  maxBuybackFromCapitalReserves: number;
  maxBuybackPercentage: number;
  proposedBuybackValue: number;
  debtEquityRatioAfterBuyback: number;
  isDebtEquityCompliant: boolean;
  isWithinPercentageLimit: boolean;
  isCompliant: boolean;
}

export interface RelatedPartyInputs {
  transactionType: RPTTransactionType;
  transactionValue: number;
  paidUpShareCapital: number;
  turnover: number;
  companyType: CompanyType;
}

export type RPTTransactionType =
  | "sale_purchase"
  | "sale_property"
  | "leasing"
  | "services"
  | "brand_usage"
  | "appointing_agent"
  | "appointing_manager"
  | "underwriting_remuneration";

export interface RelatedPartyOutputs {
  requiresBoardApproval: boolean;
  requiresShareholderApproval: boolean;
  thresholdForApproval: number;
  exceedsThreshold: boolean;
}

export interface BoardCompositionInputs {
  companyType: CompanyType;
  isListed: boolean;
  paidUpShareCapital: number;
  turnover: number;
  isPublicFinancialInstitution: boolean;
  currentDirectors: number;
  nonExecutiveDirectors: number;
  womanDirector: boolean;
  residentDirector: boolean;
}

export interface BoardCompositionOutputs {
  minDirectors: number;
  maxDirectors: number;
  needsWomanDirector: boolean;
  needsResidentDirector: boolean;
  needsIndependentDirectors: number;
  isCompliant: boolean;
  complianceIssues: string[];
}

export interface DirectorFeeInputs {
  numberOfBoardMeetings: number;
  numberOfCommitteeMeetings: number;
  feePerBoardMeeting: number;
  feePerCommitteeMeeting: number;
  isListed: boolean;
  paidUpShareCapital: number;
  turnover: number;
}

export interface DirectorFeeOutputs {
  totalBoardFees: number;
  totalCommitteeFees: number;
  totalFees: number;
  feeCapApplicable: boolean;
  maxAnnualFee: number;
}

export interface ReservesSurplusInputs {
  openingBalance: number;
  profitForYear: number;
  dividendPaid: number;
  transferToReserves: number;
  transferFromReserves: number;
  otherAdjustments: number;
}

export interface ReservesSurplusOutputs {
  closingBalance: number;
  freeReserves: number;
  restrictedReserves: number;
}

export interface DepositsInputs {
  paidUpShareCapital: number;
  freeReserves: number;
  totalDepositsAccepted: number;
  depositFromMembers: number;
  depositFromPublic: number;
  companyType: CompanyType;
}

export interface DepositsOutputs {
  maxDepositsFromMembers: number;
  maxDepositsFromPublic: number;
  totalMaxDeposits: number;
  isWithinLimit: boolean;
  depositInsuranceRequired: boolean;
}

export interface CalculatorCard {
  id: string;
  title: string;
  section: string;
  description: string;
  icon: string;
  href: string;
}
