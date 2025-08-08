"use client";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/TextInput";
import { Button } from "@repo/ui/Button";
import { verifyOnramps } from "../app/lib/actions/verifyOnramps";
import { verifyOnrampsSchema } from "@repo/schema/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type txnData = {
  id: number;
  status: "Success" | "Failed" | "Processing";
  token: string;
  amount: number;
  userId: number;
  provider: string;
  startTime: Date;
};

//This will handle the client side part for your netbanking ui page, just like addMoney.tsx & p2pTransactions.tsx, etc
//also create a server action here that u can use to handle the backned logic.

export default function VerifyTpin({ txn }: { txn: txnData }) {
  type verifyOnrampData = z.infer<typeof verifyOnrampsSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verifyOnrampsSchema),
  });

  const onSubmit = async (data: verifyOnrampData) => {
    const res = await verifyOnramps({
      userId: txn.userId,
      amount: txn.amount,
      token: txn.token,
      pin: data.pin,
    });
    console.log(res);
  };

  return (
    <div>
      <Card
        title={`You are transfering ₹${txn.amount / 100} from your ${txn.provider} bank account to Paytm PVT LTD`}
      >
        <div className="w-full flex flex-col gap-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <TextInput
                label={"Enter you Tpin"}
                placeholder={"Enter your 6 digit Tpin here"}
                register={register}
                name="pin"
                errors={errors}
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit">Add Money</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
