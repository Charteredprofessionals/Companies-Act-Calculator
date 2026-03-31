export function ComplianceStatus({
  isCompliant,
  label,
}: {
  isCompliant: boolean;
  label?: string;
}) {
  return (
    <div
      className={`p-4 rounded-lg border ${
        isCompliant
          ? "bg-green-600/10 border-green-500/30"
          : "bg-red-600/10 border-red-500/30"
      }`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-lg ${
            isCompliant
              ? "bg-green-600/20 text-green-400"
              : "bg-red-600/20 text-red-400"
          }`}
        >
          {isCompliant ? "\u2713" : "\u2717"}
        </span>
        <div>
          <span
            className={`text-sm font-semibold ${
              isCompliant ? "text-green-400" : "text-red-400"
            }`}
          >
            {isCompliant ? "Compliant" : "Non-Compliant"}
          </span>
          {label && (
            <p className="text-xs text-neutral-400 mt-0.5">{label}</p>
          )}
        </div>
      </div>
    </div>
  );
}
