import axios from "axios";
import { verifyOnrampsSchema } from "@repo/schema/schema";
import db from "@repo/db/client";

let redirectUrl = "http://localhost:3000/transfer";

export const verifyOnramps = async (data: any) => {
  console.log(data);

  //Add zod validation here.

  //Use the combined schema and type of both verifyOnrampsInput and bankWebhookInput, as both are needed here.

  const result = verifyOnrampsSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error); // ZodError instance
    return new Response(result.error.message, {
      status: 400,
    });
  }

  //Ensure the user who's trying to add the money even exists or not.
  const user = await db.user.findUnique({
    where: {
      id: data.userId,
    },
  });

  if (!user) {
    return new Response("User doesn't exists!", {
      status: 400,
    });
  }

  //Check if the tpin entered is correct or not.

  //If correct, transaction is successful & request goes to the bank web hook hanlder that the transaction is completed
  //successfully, inform it, so that it can update the details.
  const res = await axios.post(
    "http://localhost:3003/bankWebhook",
    {
      token: data.token,
      userId: data.userId,
      amount: data.amount,
    },
    {}
  );

  //console.log(res);
  if (res.status === 200) {
    //Show a toast notification or pop-up here for success.

    //Redirect back to the website.
    window.location.href = `${redirectUrl}` || "";
  }

  //Also you can maintain a queue or something like that here to ensure the transaction that are failed, unable to be
  //processed currently, must try again, or if there's some error occured then send failure message altogether.
};
