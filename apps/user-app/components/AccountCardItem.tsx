export default function AccountCardItem({
  field,
  value,
  state,
}: {
  field: string;
  value?: string | number | null;
  state?: boolean | null;
}) {
  return (
    <div className="flex gap-40 p-4">
      <div className="text-sm text-gray-500">{field}</div>
      <div className="text-base font-medium ">
        {state ? (value ? value : "--") : "XXXXXX"}
      </div>
    </div>
  );
}
