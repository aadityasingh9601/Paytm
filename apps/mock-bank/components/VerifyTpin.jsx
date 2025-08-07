"use client";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/TextInput";
import { Button } from "@repo/ui/Button";
import { useState } from "react";
import { verifyOnramps } from "../app/lib/actions/verifyOnramps";

//This will handle the client side part for your netbanking ui page, just like addMoney.tsx & p2pTransactions.tsx, etc
//also create a server action here that u can use to handle the backned logic.

export default function VerifyTpin({ txn }) {
  const [pin, setPin] = useState();
  return (
    <div>
      <Card
        title={`You are transfering ₹${txn.amount / 100} from your ${txn.provider} bank account to Paytm PVT LTD`}
      >
        <div className="w-full flex flex-col gap-2">
          <div>
            <TextInput
              label={"Enter you Tpin"}
              placeholder={"Enter your 6 digit Tpin here"}
              onChange={(value) => {
                setPin(value);
              }}
            />
          </div>
          <div className="flex justify-center">
            <Button
              onClick={async () => {
                const res = await verifyOnramps({
                  userId: txn.userId,
                  amount: txn.amount,
                  token: txn.token,
                  pin: pin,
                });
                console.log(res);
              }}
            >
              Add Money
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
