import { getServerSession } from "next-auth";
import { BalanceCard } from "../../../components/BalanceCard";
import { QuickStatsCard } from "../../../components/QuickStats";
import db from "@repo/db/client";
import { authOptions } from "../../lib/auth";
import { QuickActions } from "../../../components/QuickActions";
import { P2pTxnData } from "@repo/types/types";

type TxnData = Omit<P2pTxnData, "fromUser" | "toUser">;

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await db.balance.findFirst({
    where: {
      userId: Number(session?.user?.id),
    },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getTxnData() {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  //Fetching records of the last 30 days.
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const txnData = await db.p2pTransfers.findMany({
    where: {
      OR: [{ fromUserId: Number(userId) }, { toUserId: Number(userId) }],
      timeStamp: {
        gte: thirtyDaysAgo,
      },
    },
  });

  const sentTxns: TxnData[] = [];
  const receivedTxns: TxnData[] = [];
  let sentSum = 0;
  let receivedSum = 0;

  //Currently both the sent transfers data & received transfers data are combined, so we need to separate them.

  txnData.forEach((t) => {
    if (t.fromUserId === Number(userId)) {
      sentSum += t.amount;
      sentTxns.push(t);
    } else {
      receivedSum += t.amount;
      receivedTxns.push(t);
    }
  });

  return {
    sentSum,
    receivedSum,
    recTxnLength: receivedTxns.length,
    sentTxnLength: sentTxns.length,
  };
}

export default async function () {
  const session = await getServerSession(authOptions);
  const userName = session?.user?.name ?? "User";
  const balance = await getBalance();
  const txnData = await getTxnData();

  return (
    <div className="w-screen bg-brown-500">
      <div className="text-4xl text-[#6a51a6] pt-8 pl-4 mb-8 font-bold">
        Welcome back, {userName}
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <QuickActions />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <QuickStatsCard txnsData={txnData} />
          </div>
        </div>
      </div>
    </div>
  );
}
