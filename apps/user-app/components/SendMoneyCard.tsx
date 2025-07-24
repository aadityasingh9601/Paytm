"use client";
import { Button } from "@repo/ui/Button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/Center";
import { TextInput } from "@repo/ui/TextInput";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export const SendMoneyCard = () => {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState(0);
  return (
    <div className="h-full flex justify-center flex-col">
      <Card title="Send Money">
        <div className="min-w-72 pt-2">
          <TextInput
            placeholder="Enter number"
            label="Phone number"
            onChange={(value) => {
              setNumber(value);
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
            <Button
              onClick={() => {
                //doing * 100 to avoid sending and storing decimals in our database.
                p2pTransfer(number, amount * 100);
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
