"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";

export const onRampTransaction = async (amount: number, provider: string) => {
  //Get the current user's session details from this method.

  const session = await getServerSession(authOptions);
  //In the real world, this token is received by the bank by sending it the request, it'll be the secure token for our
  //transaction available for one time.
  const token = Math.random().toString(); //You can generate this using other random strings generator too.
  console.log(session);
  const userId = session?.user.id;

  if (!userId) {
    return "User not logged in!";
  }

  //Else create a entry in onRampTransacation table.
  const entry = await db.onRampTransaction.create({
    data: {
      userId: Number(userId),
      startTime: new Date(),
      token: token,
      amount: amount,
      provider: provider,
      status: "Processing",
    },
  });

  //Inform the user that on ramp transaction is added.
  return {
    message: "On Ramp transaction added",
  };
};
