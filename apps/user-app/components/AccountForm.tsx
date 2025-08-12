"use client";
import { TextInput } from "@repo/ui/TextInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema, accountInput } from "@repo/schema/schema";
import { Button } from "@repo/ui/Button";

export default function AccountForm({
  accountInfo,
}: {
  accountInfo: {
    email: string;
    phone: string;
    country: string;
    name: string;
    tpin: string;
  };
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      phone: accountInfo.phone,
      email: accountInfo.email,
      tpin: accountInfo.tpin,
    },
  });

  const onSubmit = (data: accountInput) => {
    console.log(data);
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
