# Active Context: Companies Act 2013 Calculators

## Current State

**Status**: ✅ All 11 calculators implemented and passing typecheck/lint

The application is a fully functional Companies Act 2013 compliance calculator webapp with 11 statutory calculators, a searchable dashboard, and professional dark theme.

## Recently Completed

- [x] Base Next.js 16 setup with App Router
- [x] TypeScript type definitions for all 11 calculators
- [x] Calculation engine in `src/lib/calculations/index.ts`
- [x] Dashboard page with searchable calculator cards
- [x] CSR Expenditure Calculator (Section 135)
- [x] Depreciation Calculator (Schedule II)
- [x] Managerial Remuneration Calculator (Section 197/Schedule V)
- [x] Net Profit Calculator (Section 198)
- [x] Dividend Calculator (Section 123)
- [x] Buyback of Shares Calculator (Section 68)
- [x] Related Party Transactions Calculator (Section 188)
- [x] Board Composition Calculator (Section 149)
- [x] Director Fee Calculator (Section 197)
- [x] Reserves & Surplus Calculator (Section 123)
- [x] Deposits Calculator (Section 73)
- [x] Updated memory bank documentation
- [x] TypeScript typecheck passes
- [x] ESLint passes

## Current Structure

| File/Directory | Purpose | Status |
|---|---|---|
| `src/app/page.tsx` | Dashboard with 11 calculator cards | Complete |
| `src/app/layout.tsx` | Root layout with nav bar | Complete |
| `src/app/calculators/*/page.tsx` | 11 calculator pages | Complete |
| `src/types/calculations.ts` | All TypeScript interfaces | Complete |
| `src/lib/calculations/index.ts` | All calculation functions | Complete |

## Calculator Coverage

| Section | Calculator | Status |
|---|---|---|
| Section 135 | CSR Expenditure | Complete |
| Schedule II | Depreciation (SLM/WDV) | Complete |
| Section 197/Schedule V | Managerial Remuneration | Complete |
| Section 198 | Net Profit | Complete |
| Section 123 | Dividend | Complete |
| Section 68 | Buyback of Shares | Complete |
| Section 188 | Related Party Transactions | Complete |
| Section 149 | Board Composition | Complete |
| Section 197 | Director Fee | Complete |
| Section 123 | Reserves & Surplus | Complete |
| Section 73 | Deposits | Complete |

## Session History

| Date | Changes |
|---|---|
| 2026-03-31 | Built complete Companies Act 2013 calculator webapp with 11 calculators |

## Pending Improvements

- [ ] PDF export functionality
- [ ] Multi-company comparison mode
- [ ] Additional calculators (Auditor rotation, Insider trading limits, etc.)
- [ ] Save/load calculation history (requires database)
