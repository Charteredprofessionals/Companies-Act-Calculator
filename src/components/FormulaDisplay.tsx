export function FormulaDisplay({
  title,
  formulas,
}: {
  title: string;
  formulas: string[];
}) {
  return (
    <div className="mt-6 p-4 rounded-lg bg-neutral-800/80 border border-neutral-700">
      <h3 className="text-sm font-semibold text-neutral-300 mb-2">
        {title}
      </h3>
      <ul className="text-xs text-neutral-400 space-y-1.5 font-mono">
        {formulas.map((f, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-neutral-600 select-none">{">"}</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
