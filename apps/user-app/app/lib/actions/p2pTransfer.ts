"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";
import { p2pSchema } from "@repo/schema/schema";

export const p2pTransfer = async (phone: string, amount: number) => {
  //First of all add zod validation here.
  const result = p2pSchema.safeParse({ phone, amount });
  if (!result.success) {
    console.log(result.error.message);
    return {
      success: false,
      error: result.error.message,
    };
  }
  //First check the login status of the current user.
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;
  //If userId doesn't exists means the user isn't logged in or some problem
  if (!userId) {
    return {
      success: false,
      error: "User not logged in!",
    };
  }

  const from = userId;

  if (!from) {
    return {
      success: false,
      error: "Error while sending, check your login status",
    };
  }

  //Find the user to whom money has to be sent.
  const toUser = await db.user.findFirst({
    where: {
      number: phone,
    },
  });

  //If the sender and receiver are the same.
  if (Number(from) === toUser?.id) {
    return {
      success: false,
      error: "You can't send money to yourself!",
    };
  }

  if (!toUser) {
    return {
      success: false,
      error: "User not found",
    };
  }

  let newTxnData;

  //Create a transaction as we want everything to happen or nothing to happen.
  //There is another way to define a transaction, see in other files in this lib folder. Understand both of them & when we use
  //each one.
  await db.$transaction(async (tx: any) => {
    // const fromBalance = await db.balance.findFirst({
    //   where: {
    //     userId: from,
    //   },
    // });

    //This will ensure locking of rows in the database. So that only one transaction can access the database at one time.
    //const fromBalance = await db.$queryRaw `SELECT * FROM "Balance" WHERE "userId"= ${from} FOR UPDATE`;
    const fromBalance =
      await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;

    if (!fromBalance || fromBalance?.amount < amount * 100) {
      return {
        success: false,
        error: "Insufficient funds",
      };
    }

    //debit from fromUser account.
    await tx.balance.update({
      where: {
        userId: Number(from),
      },
      data: {
        amount: {
          decrement: amount * 100,
        },
      },
    });
    //credit to toUser account
    await tx.balance.update({
      where: {
        userId: toUser.id,
      },
      data: {
        amount: {
          increment: amount * 100,
        },
      },
    });

    //Make sure to create transaction history too & show on the UI.
    newTxnData = await tx.p2pTransfers.create({
      data: {
        amount: amount * 100,
        timeStamp: new Date(),
        fromUserId: Number(from),
        toUserId: toUser.id,
      },
      include: {
        fromUser: {
          select: {
            id: true,
            name: true,
          },
        },
        toUser: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  });

  return {
    success: true,
    message: "Transaction successful",
    data: newTxnData,
  };
};
