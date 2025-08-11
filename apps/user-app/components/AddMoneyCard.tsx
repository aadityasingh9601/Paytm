"use client";
import { Button } from "@repo/ui/Button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/Select";
import { TextInput } from "@repo/ui/TextInput";
import { onRampTransaction } from "../app/lib/actions/onRampTransaction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addMoneySchema, addMoneyInput } from "@repo/schema/schema";

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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addMoneySchema),
  });

  const onSubmit = async (data: addMoneyInput) => {
    //Server action handling the logic here.
    const res = await onRampTransaction(data.amount * 100, data.provider);
    window.location.href = `${redirectUrl}/${res.token}` || "";
  };
  return (
    <Card title="Add Money">
      <div className="w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label={"Amount"}
            placeholder={"Amount"}
            register={register}
            options={{ valueAsNumber: true }}
            errors={errors}
            name="amount"
          />
          <div className="py-4 text-left">Bank</div>
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
