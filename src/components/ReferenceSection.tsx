export function ReferenceSection({
  section,
  points,
}: {
  section: string;
  points: string[];
}) {
  return (
    <div className="mt-6 p-4 rounded-lg bg-neutral-800/50 border border-neutral-700">
      <h3 className="text-sm font-semibold text-neutral-300 mb-2">
        Reference
      </h3>
      <ul className="text-xs text-neutral-400 space-y-1">
        <li className="text-neutral-300 font-medium">{section}</li>
        {points.map((p, i) => (
          <li key={i}>- {p}</li>
        ))}
      </ul>
    </div>
  );
}
