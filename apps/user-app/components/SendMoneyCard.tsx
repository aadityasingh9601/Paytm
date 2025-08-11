"use client";
import { Button } from "@repo/ui/Button";
import { Card } from "@repo/ui/card";
import { toast } from "react-hot-toast";
import { TextInput } from "@repo/ui/TextInput";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { p2pSchema, p2pInput } from "@repo/schema/schema";

export const SendMoneyCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(p2pSchema),
  });

  const onSubmit = (data: p2pInput) => {
    console.log(data);
    //doing * 100 to avoid sending and storing decimals in our database.
    p2pTransfer(data.phone, data.amount * 100);
  };
  return (
    <div className="h-full flex justify-center flex-col">
      <Card title="Send Money">
        <div className="min-w-72 pt-2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              register={register}
              errors={errors}
              name="phone"
              placeholder="Enter number"
              label="Phone number"
            />
            <TextInput
              register={register}
              errors={errors}
              name="amount"
              options={{ valueAsNumber: true }}
              placeholder="Enter amount"
              label="Amount"
            />
            <div className="pt-4 flex justify-center">
              <Button type="submit">Send</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};
