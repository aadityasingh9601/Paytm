"use client";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/TextInput";
import { Button } from "@repo/ui/Button";

//You can make it a async component now, to fetch the transaction data using the token, like u've done in p2p & transfer,
//you can use the verifyTpin client component in this page & pass any data to it if necessary.

interface Props {
  params: {
    id: string;
  };
}

export default function page({ params }: Props) {
  const token = params;
  return (
    <div className="flex justify-center items-center h-[92.5vh]">
      <div className="min-w-[40rem]"></div>
    </div>
  );
}
