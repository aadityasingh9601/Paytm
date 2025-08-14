import { getServerSession } from "next-auth";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { QuickStatsCard } from "../../../components/QuickStats";
import db from "@repo/db/client";
import { authOptions } from "../../lib/auth";

async function getBalance() {
  const session = await getServerSession(authOptions);
  console.log(session);
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

export default async function () {
  const balance = await getBalance();
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
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <QuickStatsCard amount={balance.amount} locked={balance.locked} />
          </div>
        </div>
      </div>
    </div>
  );
}
