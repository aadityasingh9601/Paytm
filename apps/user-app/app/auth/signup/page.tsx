"use client";
import { TextInput } from "@repo/ui/TextInput";
import { Button2 } from "@repo/ui/Button2";
import { useRouter } from "next/navigation";
import axios from "axios";

import { signupSchema, signupInput } from "@repo/schema/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

export default function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema), // Apply the zodResolver
  });

  const router = useRouter();

  const onSubmit = async (data: signupInput) => {
    console.log(data);
    try {
      const res = await axios.post("/api/auth/signup", data, {});
      if (res.status === 200) {
        toast.success(res.data);
        router.push("/auth/signin");
      }
      if (res.status === 400) {
        console.log(res);
        toast.error(res.data);
      }
    } catch (e: unknown) {
      toast.error("Some error occured");
      console.log(e);
    }
  };
  return (
    <div className="flex justify-center items-center h-[92.8vh]">
      <div className="flex flex-col justify-center items-center border-[2px] rounded-md border-grey-800 bg-white w-[26rem] min-h-[23rem] max-h-[31rem] p-5">
        <div className="text-2xl">Sign up</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col justify-center min-w-[20rem] gap-[1rem]">
            <div>
              <TextInput
                size="md"
                register={register}
                errors={errors}
                name="email"
                label=""
                type="email"
                placeholder="Enter your email"
              />
              <TextInput
                size="md"
                register={register}
                errors={errors}
                name="phone"
                label=""
                type="text"
                placeholder="Enter phone number"
              />
              <TextInput
                size="md"
                register={register}
                errors={errors}
                name="password"
                label=""
                type="password"
                placeholder="Enter password"
              />
            </div>

            <Button2 shade="solid" type="submit">
              Next
            </Button2>
            <Button2
              onClick={() => {
                router.push("/auth/signin");
              }}
              type="button"
              shade="regular"
            >
              Existing account? Log in!
            </Button2>
          </div>
        </form>
      </div>
    </div>
  );
}
