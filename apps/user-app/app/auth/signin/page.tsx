"use client";
import { TextInput } from "@repo/ui/TextInput";
import { Button2 } from "@repo/ui/Button2";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signinInput } from "@repo/schema/schema";

export default function page() {
  type signinData = z.infer<typeof signinInput>;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinInput), // Apply the zodResolver
  });

  const router = useRouter();

  const onSubmit = async (data: signinData) => {
    console.log(data);
    try {
      const res = await signIn("credentials", {
        phone: data.phone,
        password: data.password,
        redirect: false,
        callbackUrl: process.env.NEXTAUTH_URL,
      });
      console.log(res?.status);
      if (res?.status === 200) {
        router.push("/dashboard");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center h-[92.5vh]">
      <div className="flex flex-col justify-center items-center border-[2px] rounded-md border-grey-800 bg-white w-[26rem] min-h-[23rem] p-5">
        <div className="text-2xl">Log in</div>
        <div className="flex flex-col justify-center min-w-[20rem] gap-[1rem]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <TextInput
                register={register}
                name="phone"
                errors={errors}
                label=""
                type="text"
                placeholder="Enter phone number"
              />
              <TextInput
                register={register}
                errors={errors}
                name="password"
                label=""
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <Button2 shade="solid" type="submit">
              Next
            </Button2>
            <Button2
              onClick={() => {
                router.push("/auth/signup");
              }}
              shade="regular"
              type="button"
            >
              No account? Sign up!
            </Button2>
          </form>
        </div>
      </div>
    </div>
  );
}
