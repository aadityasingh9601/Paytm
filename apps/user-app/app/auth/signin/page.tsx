"use client";
import { TextInput } from "@repo/ui/TextInput";
import { Button2 } from "@repo/ui/Button2";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinSchema, signinInput } from "@repo/schema/schema";
import { useState } from "react";
import toast, { LoaderIcon } from "react-hot-toast";

export default function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signinSchema),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: signinInput) => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        number: data.number,
        password: data.password,
        redirect: false,
        callbackUrl: process.env.NEXTAUTH_URL,
      });
      if (res?.status === 200) {
        router.push("/dashboard");
      }
      if (res?.status === 401) {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  // Error handler
  const onError = (err: unknown) => {
    console.error("Validation Errors:", err);
  };

  return (
    <div className="flex justify-center items-center h-[92.8vh]">
      <div className="flex flex-col justify-center items-center border-[2px] rounded-md border-grey-800 bg-white w-[26rem] min-h-[23rem] p-5">
        <div className="text-2xl">Log in</div>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className="flex flex-col justify-center min-w-[20rem] gap-[1rem]">
            <div>
              <TextInput
                size="md"
                register={register}
                name="number"
                errors={errors}
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
                placeholder="Enter your password"
              />
            </div>
            <Button2 shade="solid" type="submit">
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
                router.push("/auth/signup");
              }}
              shade="regular"
              type="button"
            >
              No account? Sign up!
            </Button2>
          </div>
        </form>
      </div>
    </div>
  );
}
