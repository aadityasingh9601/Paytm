"use client";
import { TextInput } from "@repo/ui/TextInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema, accountInput } from "@repo/schema/schema";
import { Button } from "@repo/ui/Button";
import { updateAccount } from "../app/lib/actions/updateAccount";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

export default function AccountForm({
  accountInfo,
  updateEdit,
}: {
  accountInfo: {
    email: string;
    phone: string;
    country: string;
    name: string;
    tpin: string;
  };
  updateEdit: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: accountInfo,
  });

  const session = useSession();
  const userId = session.data?.user.id;

  const onSubmit = async (data: accountInput) => {
    console.log(data);

    const res = await updateAccount(Number(userId), data);

    console.log(res);

    if (res.success) {
      updateEdit(false);
      toast.success(res.message ?? "Success");
    } else {
      toast.error(res.error ?? "Some error occured!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-4 ">
        <TextInput
          size="sm"
          label="Name"
          placeholder="Enter your name"
          name="name"
          register={register}
          errors={errors}
        />
        <TextInput
          size="sm"
          label="Email"
          placeholder="Enter your email"
          name="email"
          register={register}
          errors={errors}
        />
        <TextInput
          size="sm"
          label="Phone"
          placeholder="Enter your phone number"
          name="phone"
          register={register}
          errors={errors}
        />
        <TextInput
          size="sm"
          label="T-PIN"
          placeholder="Set your Tpin"
          name="tpin"
          register={register}
          errors={errors}
        />
        <TextInput
          size="sm"
          label="Country"
          placeholder="Enter your country"
          name="country"
          register={register}
          errors={errors}
        />
        <div className=" pt-4">
          <Button type="submit">Save</Button>
        </div>
      </div>
    </form>
  );
}
