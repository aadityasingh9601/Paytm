"use client";
import { Card } from "@repo/ui/card";
import { authOptions } from "../app/lib/auth";
import { useStore } from "@repo/store/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { formatTransactionTime } from "../utils";

interface User {
  id: number;
  email: string;
  name: string;
  number: string;
  password: string;
}

export const P2PTransactions = ({
  transactions,
}: {
  transactions: {
    id: number;
    amount: number;
    timeStamp: Date;
    fromUserId: number;
    toUserId: number;
    fromUser: User;
    toUser: User;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  const session = useSession();
  //Access your zustand store here.
  const p2pTxns = useStore((state: any) => state.p2pTxns);
  const setP2P = useStore((state: any) => state.setP2P);

  useEffect(() => {
    setP2P(transactions);
  }, []);
  //console.log(p2pTxns);

  return (
    //Improve this card here to showcase also the name of the other person in the transaction, also if money is received
    //showcase in green color with plus, if debited, showcase in red color or with a minus sign.
    <Card title="📋Recent Transactions">
      <div className=""></div>
      <div
        className="overflow-y-scroll pt-2 hide-scrollbar"
        style={{ height: "32rem" }}
      >
        {p2pTxns?.map((t: any) => {
          const otherPerson =
            session?.data?.user.id === t.fromUser.id.toString()
              ? t.toUser
              : t.fromUser;
          return (
            <div className="flex justify-between items-center border-b py-1">
              <div>
                <div className="text-md">{otherPerson?.name.toUpperCase()}</div>
                <div className="text-slate-600 text-xs">
                  {formatTransactionTime(t.timeStamp)}
                </div>
              </div>
              <div
                className={`flex flex-col text-lg justify-center ${Number(session?.data?.user.id) === Number(t.fromUserId) ? "text-red-500" : "text-emerald-600"}`}
              >
                {Number(session?.data?.user.id) === Number(t.fromUserId)
                  ? "-"
                  : "+"}{" "}
                ₹ {t.amount / 100}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
