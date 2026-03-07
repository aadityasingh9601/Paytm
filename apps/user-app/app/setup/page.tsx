import { accountInput, accountSchema } from "@repo/schema/schema";
import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";
import AccountForm from "../../components/AccountForm";

const getAccountInfo = async (userId: number) => {
  const res = await db.user.findUniqueOrThrow({
    where: {
      id: Number(userId),
    },
    select: {
      email: true,
      name: true,
      tpin: true,
      number: true,
      country: true,
    },
  });

  return {
    name: res.name ?? "",
    email: res.email,
    number: res.number,
    tpin: res.tpin ?? "", //Even if it's null assign a default value to them.
    country: res.country ?? "",
  };
};

export default async function page({}) {
  const session = await getServerSession(authOptions);
  const accountData = await getAccountInfo(session?.user?.id);
  console.log(session);

  return (
    <div className="flex justify-center items-center h-[92.8vh]">
      <div className="flex flex-col justify-center items-center border-[2px] rounded-xl border-grey-800 bg-white w-[32rem] p-5">
        <div className="text-2xl border-b w-full pb-2 mb-2">
          Setup your account
        </div>
        <AccountForm accountInfo={accountData} />
      </div>
    </div>
  );
}
