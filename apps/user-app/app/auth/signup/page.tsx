"use client";
import { TextInput } from "@repo/ui/TextInput";
import { Button2 } from "@repo/ui/Button2";
import { useRouter } from "next/navigation";
import axios from "axios";

import { signupSchema, signupInput } from "@repo/schema/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast, LoaderIcon } from "react-hot-toast";
import { useState } from "react";

export default function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema), // Apply the zodResolver
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: signupInput) => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/signup", data, {});
      console.log(res);
      if (res.data.status === 200) {
        toast.success(res.data.message);
        router.push("/auth/signin");
      }
      if (res.data.status === 400) {
        toast.error(res.data.message);
      }
    } catch (e: unknown) {
      toast.error("Some error occured");
    }
    setLoading(false);
  };

  // Error handler
  const onError = (err: unknown) => {
    console.error("Validation Errors:", err);
  };
  return (
    <div className="flex justify-center items-center h-[92.8vh]">
      <div className="flex flex-col justify-center items-center border-[2px] rounded-md border-grey-800 bg-white w-[26rem] min-h-[23rem] max-h-[31rem] p-5">
        <div className="text-2xl">Sign up</div>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
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
                name="number"
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

            <Button2 shade="solid" type="submit" disabled={loading}>
              {loading ? (
                <div className="flex justify-center">
                  <LoaderIcon style={{ height: "1.5rem", width: "1.5rem" }} />
                </div>
              ) : (
                "Next"
              )}
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
