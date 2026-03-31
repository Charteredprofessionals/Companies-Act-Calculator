# Project Brief: Companies Act 2013 Compliance Calculators

## Purpose

A comprehensive web application that provides all statutory calculations required under the Companies Act, 2013 (India). The app serves as a digital compliance tool for company secretaries, chartered accountants, finance teams, and corporate legal professionals.

## Target Users

- Company Secretaries (CS)
- Chartered Accountants (CA)
- Corporate Finance Teams
- Compliance Officers
- Legal Professionals
- Students studying corporate law

## Core Use Case

Users navigate to specific calculators (CSR, Depreciation, Net Profit, etc.), enter company-specific financial data, and receive computed results with compliance status and statutory references.

## Calculators Included

| Calculator | Section | Description |
|---|---|---|
| CSR Expenditure | Section 135 | 2% obligation on average net profits |
| Depreciation | Schedule II | SLM/WDV based on asset useful life |
| Managerial Remuneration | Section 197/Schedule V | 11% cap on total remuneration |
| Net Profit | Section 198 | Computation for managerial remuneration |
| Dividend | Section 123 | Free reserves, depreciation shortfall |
| Buyback | Section 68 | 25% limit, debt-equity ratio |
| Related Party Transactions | Section 188 | Approval thresholds |
| Board Composition | Section 149 | Director requirements, independent directors |
| Director Fee | Section 197 | Sitting fees computation |
| Reserves & Surplus | Section 123 | Free vs restricted reserves |
| Deposits | Section 73 | Member & public deposit limits |

## Key Requirements

### Must Have
- Accurate calculations per Companies Act 2013
- Real-time computation (no server round-trip for calculations)
- Statutory references shown with each result
- Compliance status indicators (compliant/non-compliant)
- Search functionality on dashboard
- Responsive design

### Nice to Have
- PDF export of calculation results
- Historical calculation storage
- Multi-company comparison

## Constraints
- Calculations are indicative - professional verification required
- Based on Companies Act 2013 and applicable rules as of 2026
- No external API dependencies for calculations (all client-side)
- Framework: Next.js 16 + React 19 + Tailwind CSS 4
