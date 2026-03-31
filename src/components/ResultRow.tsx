export function ResultRow({
  label,
  value,
  highlight,
  success,
  formula,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  success?: boolean;
  formula?: string;
}) {
  return (
    <div
      className={`flex justify-between items-center py-3 px-4 rounded-lg ${
        highlight
          ? success !== undefined
            ? success
              ? "bg-green-600/10 border border-green-500/30"
              : "bg-red-600/10 border border-red-500/30"
            : "bg-blue-600/10 border border-blue-500/30"
          : "bg-neutral-800/50"
      }`}
    >
      <div className="flex flex-col">
        <span className="text-sm text-neutral-400">{label}</span>
        {formula && (
          <span className="text-[11px] text-neutral-500 font-mono mt-0.5">
            {formula}
          </span>
        )}
      </div>
      <span
        className={`font-semibold ${
          highlight
            ? success !== undefined
              ? success
                ? "text-green-400"
                : "text-red-400"
              : "text-blue-400"
            : "text-white"
        }`}
      >
        {value}
      </span>
    </div>
  );
}
