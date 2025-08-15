"use client";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/TextInput";
import { Button } from "@repo/ui/Button";
import { verifyOnramps } from "../app/lib/actions/verifyOnramps";
import { verifyOnrampsSchema, verifyOnrampsInput } from "@repo/schema/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

const redirectUrl = `http://localhost:3000/transfer`;

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(verifyOnrampsSchema),
  });

  const onSubmit = async (data: verifyOnrampsInput) => {
    const res = await verifyOnramps({
      userId: txn.userId,
      amount: txn.amount / 100, //DATABASES HAS AMOUNT STORES BY *100, SO TO USE WE'VE TO DIVIDE BY 100
      token: txn.token,
      tpin: data.tpin,
    });
    console.log(res);
    if (res?.success) {
      toast.success(res.message ?? "Success");
      //Redirect back to the website.
      window.location.href = `${redirectUrl}` || "";
    } else {
      console.log(res.error);
      toast.error(res.error);
    }
  };

  return (
    <div>
      <Card
        title={`You are transfering ₹${txn.amount / 100} from your ${txn.provider} bank account to Paytm PVT LTD`}
      >
        <div className="w-full flex flex-col mt-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <TextInput
                size="md"
                label={"Enter you Tpin"}
                placeholder={"Enter your 6 digit Tpin here"}
                register={register}
                name="tpin"
                errors={errors}
              />
            </div>
            <div className="flex justify-center pt-4">
              <Button
                type="button"
                onClick={() => {
                  window.location.href = `${redirectUrl}` || "";
                }}
              >
                Return home
              </Button>
              <Button type="submit">Add Money</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
}
