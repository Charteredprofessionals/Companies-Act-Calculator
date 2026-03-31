export function Interpretation({ text }: { text: string }) {
  return (
    <div className="mt-4 p-4 rounded-lg bg-blue-900/15 border border-blue-500/20">
      <h3 className="text-sm font-semibold text-blue-400 mb-1">
        Interpretation
      </h3>
      <p className="text-sm text-neutral-300 leading-relaxed">{text}</p>
    </div>
  );
}
