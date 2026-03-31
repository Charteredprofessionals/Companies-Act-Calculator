# System Patterns: Companies Act 2013 Calculators

## Architecture Overview

```
src/
├── app/
│   ├── layout.tsx                        # Root layout with nav bar
│   ├── page.tsx                          # Dashboard with calculator cards
│   ├── globals.css                       # Tailwind imports
│   └── calculators/
│       ├── csr/page.tsx                  # Section 135 CSR
│       ├── depreciation/page.tsx         # Schedule II Depreciation
│       ├── managerial-remuneration/      # Section 197/Schedule V
│       ├── net-profit/page.tsx           # Section 198
│       ├── dividend/page.tsx             # Section 123
│       ├── buyback/page.tsx              # Section 68
│       ├── related-party/page.tsx        # Section 188
│       ├── board-composition/page.tsx    # Section 149
│       ├── director-fee/page.tsx         # Section 197
│       ├── reserves-surplus/page.tsx     # Section 123
│       └── deposits/page.tsx            # Section 73
├── types/
│   └── calculations.ts                   # All TypeScript interfaces
└── lib/
    └── calculations/
        └── index.ts                      # All calculation functions + utilities
```

## Key Design Patterns

### 1. Calculation Separation Pattern
Each calculator has:
- **Type definition** in `src/types/calculations.ts` (Inputs + Outputs interfaces)
- **Calculation function** in `src/lib/calculations/index.ts` (pure functions, no side effects)
- **UI page** in `src/app/calculators/[name]/page.tsx` (Client Component with state)

### 2. Client-Side State Pattern
All calculator pages use:
- `useState` for inputs and results
- Pure calculation functions (no API calls)
- `useCallback` for field update handlers where performance matters

### 3. Result Display Pattern
Each calculator follows the same visual pattern:
- Left column: Input fields with labels
- Right column: Result rows with `ResultRow` component
- Compliance results use green/red color coding
- Non-compliance results use blue highlight
- Statutory reference box at bottom of results

### 4. Form Pattern
- Number inputs with `type="number"`
- Empty string as placeholder (not "0")
- `parseFloat(value) || 0` for safe parsing
- No form validation blocking (values default to 0)

## Styling Conventions

- Dark theme: `bg-neutral-950`, `bg-neutral-800/50`, `border-neutral-700`
- Blue accent: `bg-blue-600`, `text-blue-400`, `border-blue-500/30`
- Green success: `bg-green-600/10`, `text-green-400`, `border-green-500/30`
- Red failure: `bg-red-600/10`, `text-red-400`, `border-red-500/30`
- Yellow warning: `bg-yellow-600/10`, `text-yellow-400`, `border-yellow-500/30`
- Input style: `bg-neutral-800 border-neutral-700 rounded-lg px-3 py-2`

## File Naming Conventions

- Calculator pages: kebab-case directory (`board-composition/`)
- All pages: `page.tsx`
- Types: descriptive interfaces with `Inputs`/`Outputs` suffixes
- Functions: `calculate[Name]` naming pattern
