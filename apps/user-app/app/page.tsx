import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";
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

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userInfo = await getAccountInfo(session?.user?.id);
  console.log(userInfo);
  if (typeof session?.user != "undefined") {
    if (userInfo.name == "" || userInfo.tpin == "" || userInfo.country == "") {
      redirect("/setup");
    } else {
      redirect("/dashboard");
    }
  } else {
    redirect("/auth/signin");
  }
}
