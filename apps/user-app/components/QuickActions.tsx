"use client";
import { Button } from "@repo/ui/Button";
import { Card } from "@repo/ui/card";
import { useRouter } from "next/navigation";

export const QuickActions = () => {
  const router = useRouter();
  return (
    <Card title="Quick actions">
      <div className="w-full">
        <div className="flex flex-col border-b p-2 ">
          <div>💰 Instantly add funds from your bank account</div>
          <Button
            type="button"
            onClick={() => {
              router.push("/transfer");
            }}
          >
            Add Money
          </Button>
        </div>
        <div className="flex flex-col border-b p-2">
          <div>📤 Send money to friends and family instantly</div>
          <Button
            type="button"
            onClick={() => {
              router.push("/p2p");
            }}
          >
            Transfer Money
          </Button>
        </div>
        <div className="flex flex-col  border-b p-2">
          <div>⚙️ Manage your profile and preferences</div>
          <Button
            type="button"
            onClick={() => {
              router.push("/account");
            }}
          >
            Update Account{" "}
          </Button>
        </div>
      </div>
    </Card>
  );
};
