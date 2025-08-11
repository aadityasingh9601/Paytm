export default function AccountCardItem({
  field,
  value,
}: {
  field: string;
  value: string;
}) {
  return (
    <div className="flex gap-40 p-4">
      <div className="text-sm text-gray-500">{field}</div>
      <div className="text-base font-medium ">{value}</div>
    </div>
  );
}
