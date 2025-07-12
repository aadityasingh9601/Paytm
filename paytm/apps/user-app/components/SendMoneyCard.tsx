"use client";
import { Button } from "@repo/ui/Button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/Center";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";

export const SendMoneyCard = () => {
  const [number, setNumber] = useState(0);
  const [amount, setAmount] = useState(0);
  return (
    <div className="h-full flex justify-center flex-col">
      <Center>
        <Card title="Send Money">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder="Enter number"
              label="Phone number"
              onChange={(value) => {
                setNumber(Number(value));
              }}
            />
            <TextInput
              placeholder="Enter amount"
              label="Amount"
              onChange={(value) => {
                setAmount(Number(value));
              }}
            />
            <div className="pt-4 flex justify-center">
              <Button onClick={() => {}}>Send</Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
};
