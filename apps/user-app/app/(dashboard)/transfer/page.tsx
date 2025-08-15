import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import db from "@repo/db/client";

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  //console.log(session);
  const txns = await db.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
    orderBy: {
      startTime: "desc",
    },
  });
  return txns.map((t: any) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function () {
  const transactions = await getOnRampTransactions();

  return (
    <div className="w-screen bg-brown-500">
      <div className="text-4xl text-[#6a51a6] pt-4 mb-8 font-bold">
        Bank Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoney />
        </div>
        <div>
          <OnRampTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
