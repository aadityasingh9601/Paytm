"use server";

import axios from "axios";
import { bankWithOnrampSchema, bankWithOnRampInput } from "@repo/schema/schema";
import db from "@repo/db/client";

export const verifyOnramps = async (data: bankWithOnRampInput) => {
  console.log(data);

  const result = bankWithOnrampSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error);
    return {
      success: false,
      error: result.error.message,
    };
  }

  //Ensure the user who's trying to add the money even exists or not.
  const user = await db.user.findUnique({
    where: {
      id: data.userId,
    },
  });

  if (!user) {
    return {
      success: false,
      error: "User doesn't exists!",
    };
  }

  //If the user hasn't set up their tpin yet.
  if (user.tpin == null) {
    return {
      success: false,
      error:
        "Setup your tpin first (in account settings) to enable bank transfers!",
    };
  }

  //Check if the tpin entered is correct or not.
  if (user.tpin !== data.tpin) {
    return {
      success: false,
      error: "Tpin is incorrect",
    };
  }

  //If correct, transaction is successful & request goes to the bank web hook hanlder that the transaction is completed
  //successfully, inform it, so that it can update the details.
  const res = await axios.post(
    "http://host.docker.internal:3003/bankWebhook",
    {
      token: data.token,
      userId: data.userId,
      amount: data.amount,
    },
    {},
  );

  console.log(res);

  if (res.status === 200) {
    return {
      success: true,
      message: "Transaction successful!",
    };
  } else {
    return {
      success: false,
      error: res.data,
    };
  }

  //Also you can maintain a queue or something like that here to ensure the transaction that are failed, unable to be
  //processed currently, must try again, or if there's some error occured then send failure message altogether.
};
