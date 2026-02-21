"use client";
import { Card } from "@repo/ui/card";
import { LoaderIcon } from "react-hot-toast";
import { useStore } from "@repo/store/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { formatTransactionTime } from "../utils";
import { P2pTxnData } from "@repo/types/types";

export const P2PTransactions = ({
  transactions,
}: {
  transactions: P2pTxnData[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">No Recent transactions</div>
      </Card>
    );
  }
  const session = useSession();
  const userId = session?.data?.user.id;
  //Access your zustand store here.
  const p2pTxns = useStore((state) => state.p2pTxns);
  const setP2P = useStore((state) => state.setP2P);

  useEffect(() => {
    setP2P(transactions);
  }, []);

  return (
    //Improve this card here to showcase also the name of the other person in the transaction, also if money is received
    //showcase in green color with plus, if debited, showcase in red color or with a minus sign.
    <Card title="📋Recent Transactions">
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
                <div className="flex gap-1">
                  <div className="text-md">
                    {otherPerson?.name.toUpperCase()}
                  </div>
                  <div>
                    {userId === t.fromUserId.toString() ? (
                      <ArrowDownleft />
                    ) : (
                      <ArrowUpRight />
                    )}
                  </div>
                </div>
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

function ArrowUpRight() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m19.5 4.5-15 15m0 0h11.25m-11.25 0V8.25"
      />
    </svg>
  );
}

function ArrowDownleft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
      />
    </svg>
  );
}
