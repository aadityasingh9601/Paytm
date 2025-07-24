import { Card } from "@repo/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "../app/lib/auth";

export const P2PTransactions = async ({
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
  const session = await getServerSession(authOptions);
  console.log(session?.user.id);
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
            <div
              style={{
                color:
                  Number(session?.user.id) === Number(t.fromUserId)
                    ? "#dc2626" // Tailwind red-600
                    : "#059669", // Tailwind emerald-60
              }}
              className={`flex flex-col justify-center text-emerald-600 ${Number(session?.user.id) === Number(t.fromUserId) ? "text-emerald-600" : "text-green-600"}`}
            >
              {Number(session?.user.id) === Number(t.fromUserId) ? "-" : "+"} Rs{" "}
              {t.amount / 100}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
