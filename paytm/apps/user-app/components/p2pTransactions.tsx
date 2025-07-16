import { Card } from "@repo/ui/card";

export const P2PTransactions = ({
  transactions,
}: {
  transactions: {
    id: number;
    amount: number;
    timeStamp: Date;
    fromUserId: number;
    toUserId: number;
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
    //Improve this card here to showcase also the name of the other person in the transaction, also if money is received
    //showcase in green color with plus, if debited, showcase in red color or with a minus sign.
    <Card title="Recent Transactions">
      <div className="pt-2">
        {transactions?.map((t) => (
          <div className="flex justify-between">
            <div>
              <div className="text-sm">Received INR</div>
              <div className="text-slate-600 text-xs">
                {t.timeStamp.toDateString()}
              </div>
            </div>
            <div className="flex flex-col justify-center">
              + Rs {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
