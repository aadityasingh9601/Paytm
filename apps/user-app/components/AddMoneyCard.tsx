"use client";
import { Button } from "@repo/ui/Button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/Select";
import { TextInput } from "@repo/ui/TextInput";
import { onRampTransaction } from "../app/lib/actions/onRampTransaction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMoneySchema, addMoneyInput } from "@repo/schema/schema";
import { useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

const SUPPORTED_BANKS = [
  {
    name: "HDFC",
  },
  {
    name: "Axis",
  },
];

export const AddMoney = () => {
  //If you have multiple banks with differenet redirect urls you can create a separate state managment for them too, like
  //it was done earlier, using a SUPPORTED_BANKS array.
  const redirectUrl = "http://localhost:3001/netbanking";
  const searchParams = useSearchParams();
  let isSucess = searchParams.get("success");
  useEffect(() => {
    if (isSucess === "true") {
      toast.success("Transaction successful!");
      // Make sure to clean up URL (remove the success parameter), else the task will happen again and again.
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [isSucess]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addMoneySchema),
  });

  const onSubmit = async (data: addMoneyInput) => {
    //Server action handling the logic here.
    const res = await onRampTransaction(data.amount, data.provider);
    window.location.href = `${redirectUrl}/${res.token}` || "";
  };
  return (
    <Card title="💳Add Money to wallet">
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            size="md"
            label={"💵 Amount"}
            placeholder={"Amount"}
            register={register}
            options={{ valueAsNumber: true }}
            errors={errors}
            name="amount"
          />
          <div className="py-4 text-left">🏛️ Select Bank</div>
          <Select
            register={register}
            errors={errors}
            name="provider"
            options={SUPPORTED_BANKS.map((x) => ({
              key: x.name,
              value: x.name,
            }))}
          />
          <div className="flex justify-center pt-4">
            <Button type="submit">Add Money</Button>
          </div>
        </form>
      </div>
    </Card>
  );
};
