import express from "express";
import db from "@repo/db/client";
import bodyParser from "body-parser";
import cors from "cors";
import { bankWebhookSchema } from "@repo/schema/schema";

const app = express();

// const corsOptions = {
//   origin: ["http://localhost:3001"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   headers: ["Content-Type", "Authorization"],
// };

app.use(cors());

//To parse the incoming request bodies.
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Bank webhook handler");
});

app.post("/bankWebhook", async (req, res) => {
  try {
    //Only do this, if the status is still processing. Add zod validation too.
    console.log(req.body);
    const { token, userId, amount } = req.body;
    console.log(amount);

    //Add zod validation here.
    const result = bankWebhookSchema.safeParse(req.body);
    if (!result.success) {
      console.log(result.error);
      res.status(400).send(result.error);
      return;
    }
    //Check if the request actually came from the bank using a webhook secret here.

    const paymentInformation = {
      token: token,
      userId: Number(userId),
      amount: amount * 100,
    };
    //Here the bank has told us that this is the token, this is the user, this is the amount that they has transfered or
    //or something, now we've to store this transaction details & payment info in the database.

    //We've used a transaction here, as we want both the queries to complete simultaneously else, neither should.
    //Why see in your notebook.
    await db.$transaction([
      db.balance.update({
        where: {
          userId: paymentInformation.userId,
        },
        data: {
          amount: {
            increment: paymentInformation.amount,
          },
        },
      }),
      db.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    //It's also imporatant here as it tells the bank thath the request was success, means you don't have to give any refund.
    res.status(200).json({
      message: "Captured!",
    });
  } catch (e) {
    console.log(e);
    //It's crucial to send 411 to the bank, as it means request failed, so the bank will refund the money to the user.

    res.status(411).json({
      message: "Unable to process transaction",
    });
  }
});

app.listen(3003, () => {
  console.log("Bank webhook handler listening on port 3003 ");
});
