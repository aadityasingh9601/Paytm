import VerfiyTpin from "../../../components/VerifyTpin";
import db from "@repo/db/client";

//You can make it a async component now, to fetch the transaction data using the token, like u've done in p2p & transfer,
//you can use the verifyTpin client component in this page & pass any data to it if necessary.

interface Props {
  params: {
    id: string;
  };
}

async function getTransactionData(token: string) {
  //This function will fetch the current transaction's data, as that will be used to display info on the netbanking page.
  const t = await db.onRampTransaction.findFirst({
    where: {
      token: token,
    },
  });

  if (t)
    return {
      token: t.token,
      amount: t.amount,
      userId: t.userId,
      provider: t.provider,
    };
}

export default async function page({ params }: Props) {
  const token = params.id;
  const txnData = await getTransactionData(token);
  return (
    <div className="flex justify-center items-center h-[92.5vh]">
      <div className="min-w-[40rem]">
        <VerfiyTpin txn={txnData} />
      </div>
    </div>
  );
}
