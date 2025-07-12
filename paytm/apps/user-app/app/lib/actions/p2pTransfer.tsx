"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";

export const p2pTransfer = async (to: string, amount: number) => {
  //First check the login status of the current user.
  const session = await getServerSession(authOptions);
  const from = session?.user?.id;
  //If userId doesn't exists means the user isn't logged in or some problem
  if (!from) {
    return {
      message: "Error while sending, check your login status",
    };
  }

  //Find the user to whom money has to be sent.
  const toUser = await db.user.findFirst({
    where: {
      number: to,
    },
  });

  if (!toUser) {
    return {
      message: "User not found",
    };
  }

  //Create a transaction as we want everything to happen or nothing to happen.
  await db.$transaction(async (tx) => {
    // const fromBalance = await db.balance.findFirst({
    //   where: {
    //     userId: from,
    //   },
    // });

    //This will ensure locking of rows in the database. So that only one transaction can access the database at one time.
    //const fromBalance = await db.$queryRaw `SELECT * FROM "Balance" WHERE "userId"= ${from} FOR UPDATE`;
    const fromBalance =
      await db.$queryRaw`SELECT * FROM "Balance" WHERE userId=${from} FOR UPDATE`;

    if (!fromBalance || fromBalance?.amount < amount) {
      return {
        message: "Insufficient funds",
      };
    }

    //debit from fromUser account.
    await db.balance.update({
      where: {
        userId: from,
      },
      data: {
        amount: {
          decrement: amount,
        },
      },
    });
    //credit to toUser account
    await db.balance.update({
      where: {
        userId: toUser.id,
      },
      data: {
        amount: {
          increment: amount,
        },
      },
    });
  });
};
