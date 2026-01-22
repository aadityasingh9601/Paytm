"use client";
import { Button } from "@repo/ui/Button";
import { Card } from "@repo/ui/card";
import { toast } from "react-hot-toast";
import { TextInput } from "@repo/ui/TextInput";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { p2pSchema, p2pInput } from "@repo/schema/schema";
import { useStore } from "@repo/store/store";

export const SendMoneyCard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(p2pSchema),
  });

  const updateP2P = useStore((state: any) => state.updateP2P);

  const onSubmit = async (data: p2pInput) => {
    const res = await p2pTransfer(data.number, data.amount);
    //If everything goes well add a toast notificaation here.
    if (res.success) {
      updateP2P(res.data);
      toast.success(res.message ?? "Success");

      reset();
    } else {
      toast.error(res.error ?? "Some error occured!");
    }
  };
  return (
    <Card title="Send Money">
      <div className="min-w-72 pt-2">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            size="md"
            register={register}
            errors={errors}
            name="number"
            placeholder="Enter number"
            label="📱Phone number"
          />
          <TextInput
            size="md"
            register={register}
            errors={errors}
            name="amount"
            options={{ valueAsNumber: true }}
            placeholder="Enter amount"
            label="💵 Amount"
          />
          <div className="pt-4 flex justify-center">
            <Button type="submit">Send</Button>
          </div>
        </form>
      </div>
    </Card>
  );
};
