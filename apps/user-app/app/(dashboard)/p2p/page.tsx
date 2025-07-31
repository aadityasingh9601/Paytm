//@ts-ignore Make sure you fix this later.
import { getServerSession } from "next-auth";
import { P2PTransactions } from "../../../components/p2pTransactions";
import { SendMoneyCard } from "../../../components/SendMoneyCard";
import db from "@repo/db/client";
import { authOptions } from "../../lib/auth";

async function getP2PTransactions() {
  const session = await getServerSession(authOptions);
  console.log(session?.user.id);
  const p2pTxns = await db.p2pTransfers.findMany({
    relationLoadStrategy: "join",
    include: {
      fromUser: true,
      toUser: true,
    },
    where: {
      OR: [
        { fromUserId: Number(session?.user?.id) },
        { toUserId: Number(session?.user?.id) },
      ],
    },
  });

  console.log(p2pTxns);
  return p2pTxns;
}

//These components are called as async componenets. Revise and read more about different ways of doing things in next.js,when
//to use server actions, when to use async components etc.
export default async function page() {
  const transactions = await getP2PTransactions();
  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        P2P Transfers
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <SendMoneyCard />
        </div>
        <div>
          {/*@ts-ignore */}
          <P2PTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
