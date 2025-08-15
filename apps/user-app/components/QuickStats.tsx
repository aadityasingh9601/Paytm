import { Card } from "@repo/ui/card";

export const QuickStatsCard = ({
  txnsData,
}: {
  txnsData: {
    sentSum: number;
    receivedSum: number;
    recTxnLength: number;
    sentTxnLength: number;
  };
}) => {
  return (
    <Card title={"📈 Monthly Overview"}>
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div>Money spent</div>
        <div className="text-red-500">
          ₹ {txnsData.sentSum / 100} ( {txnsData.sentTxnLength} transactions)
        </div>
      </div>

      <div className="flex justify-between border-b border-slate-300 py-2">
        <div>Money received</div>
        <div className="text-emerald-600">
          {" "}
          ₹ {txnsData.receivedSum / 100} ({txnsData.recTxnLength} transactions)
        </div>
      </div>
    </Card>
  );
};
