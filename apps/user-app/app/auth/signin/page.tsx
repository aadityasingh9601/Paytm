"use client";
import { TextInput } from "@repo/ui/TextInput";
import { Button2 } from "@repo/ui/Button2";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function page() {
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  return (
    <div className="flex justify-center items-center h-[92.5vh]">
      <div className="flex flex-col justify-center items-center border-[2px] rounded-md border-grey-800 bg-white w-[26rem] min-h-[23rem] p-5">
        <div className="text-2xl">Log in</div>
        <div className="flex flex-col justify-center min-w-[20rem] gap-[1rem]">
          <div className="flex flex-col">
            <TextInput
              label=""
              type="text"
              placeholder="Enter phone number"
              onChange={(value) => {
                setNumber(value);
              }}
            />
            <TextInput
              label=""
              type="password"
              placeholder="Enter your password"
              onChange={(value) => {
                setPassword(value);
              }}
            />
          </div>
          <Button2
            onClick={async () => {
              const res = await signIn("credentials", {
                phone: number,
                password: password,
                redirect: false,
                callbackUrl: process.env.NEXTAUTH_URL,
              });
              if (res?.status === 200) {
                router.push("/dashboard");
              }
              console.log(res);
            }}
            type="solid"
          >
            Next
          </Button2>
          <Button2
            onClick={() => {
              router.push("/auth/signup");
            }}
            type="regular"
          >
            No account? Sign up!
          </Button2>
        </div>
      </div>
    </div>
  );
}
