import { getServerSession } from "next-auth";
import AccountCard from "../../../components/AccountCard";
import { authOptions } from "../../lib/auth";
import db from "@repo/db/client";

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

export default async function () {
  const session = await getServerSession(authOptions);
  const accountData = await getAccountInfo(session.user?.id);

  return (
    <div className="w-screen mr-4">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Account settings
      </div>
      <div>
        <AccountCard accountData={accountData} />
      </div>
    </div>
  );
}
