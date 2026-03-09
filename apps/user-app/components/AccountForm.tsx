"use client";
import { TextInput } from "@repo/ui/TextInput";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema, accountInput } from "@repo/schema/schema";
import { Button } from "@repo/ui/Button";
import { updateAccount } from "../app/lib/actions/updateAccount";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useStore } from "@repo/store/store";
import { AccountData } from "@repo/types/types";
import { useState } from "react";
import { LoaderIcon } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";

export default function AccountForm({
  accountInfo,
  updateEdit,
}: {
  accountInfo: AccountData;
  updateEdit?: any;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: accountInfo,
  });

  const pathname = usePathname();
  const router = useRouter();
  const session = useSession();
  const userId = session.data?.user.id;
  const [loading, setLoading] = useState(false);
  const updateAccountInfo = useStore((state) => state.updateAccount);

  const onSubmit = async (data: accountInput) => {
    setLoading(true);
    const res = await updateAccount(Number(userId), data);
    if (res.success) {
      setLoading(false);
      if (res.data) updateAccountInfo(res?.data);
      //Trigger a JWT token refresh.
      console.log(session);
      const updated = await session.update({ forceRefresh: true });
      console.log(updated);

      toast.success(res.message ?? "Success!");
      if (pathname === "/setup") {
        router.push("/dashboard");
      } else if (pathname === "/account") {
        updateEdit(false);
      }
    } else {
      toast.error(res.message ?? "Some error occured!");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="pt-4">
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
          isReadOnly={true}
          name="email"
          register={register}
          errors={errors}
        >
          <div>Email can't be changed!</div>
        </TextInput>
        <TextInput
          size="sm"
          label="Phone"
          placeholder="Enter your phone number"
          isReadOnly={true}
          name="number"
          register={register}
          errors={errors}
        >
          <div>Phone number can't be changed!</div>
        </TextInput>
        <TextInput
          size="sm"
          label="T-PIN"
          type="password"
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
        <div className="flex pt-2 justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? (
              <LoaderIcon
                style={{
                  height: "1.3rem",
                  width: "1.3rem",
                  margin: "0 0.4rem 0 0.4rem",
                }}
              />
            ) : (
              "Save"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
