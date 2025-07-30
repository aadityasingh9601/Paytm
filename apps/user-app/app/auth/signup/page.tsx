"use client";
import { TextInput } from "@repo/ui/TextInput";
import { Button2 } from "@repo/ui/Button2";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";

export default function page() {
  //Add zod validatoin or some other validation on the fronntend too.
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  return (
    <div className="flex justify-center items-center h-[92.5vh]">
      <div className="flex flex-col justify-center items-center border-[2px] rounded-md border-grey-800 bg-white w-[26rem] min-h-[23rem] max-h-[31rem] p-5">
        <div className="text-2xl">Sign up</div>
        <div className="flex flex-col justify-center min-w-[20rem] gap-[1rem]">
          <div className="flex flex-col ">
            <TextInput
              label=""
              type="email"
              placeholder="Enter your email"
              onChange={(value) => {
                setEmail(value);
              }}
            />
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
              placeholder="Enter password"
              onChange={(value) => {
                setPassword(value);
              }}
            />
          </div>
          <Button2
            onClick={async () => {
              const res = await axios.post("/api/auth/signup", {
                email: email,
                phone: number,
                password: password,
              });
              if (res.status === 200) {
                router.push("/signin");
              }
            }}
            type="solid"
          >
            Next
          </Button2>
          <Button2
            onClick={() => {
              router.push("/auth/signin");
            }}
            type="regular"
          >
            Existing account? Log in!
          </Button2>
        </div>
      </div>
    </div>
  );
}
