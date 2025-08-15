import { Card } from "@repo/ui/card";

export const OnRampTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    // TODO: Can the type of `status` be more specific?
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  return (
    <div>
      <Card title="📋Recent Transactions">
        <div className="pt-2">
          {transactions.map((t) => (
            <div className="flex justify-between border-b">
              <div>
                <div className="text-sm">{t.provider}</div>
                <div className="text-sm">
                  {t.status === "Success"
                    ? "✅"
                    : t.status === "Processing"
                      ? "⏳"
                      : "❌"}
                  {t.status}
                </div>
                <div className="text-slate-600 text-sm">
                  {t.time.toDateString()}
                </div>
              </div>
              <div className="flex flex-col justify-center text-emerald-600">
                + ₹ {t.amount / 100}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
