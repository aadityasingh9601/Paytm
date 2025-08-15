"use client";
import { Button } from "@repo/ui/Button";
import AccountCardItem from "./AccountCardItem";
import AccountForm from "./AccountForm";
import { useState } from "react";

export default function AccountCard({
  accountInfo,
}: {
  accountInfo: {
    email: string;
    phone: string;
    country: string;
    name: string;
    tpin: string;
  };
}) {
  const [edit, setEdit] = useState(false);
  const updateEdit = (value: boolean) => {
    setEdit(value);
  };
  return (
    <div className=" border p-6 bg-white rounded-xl bg-[#ededed] w-full">
      <div className="flex justify-between align-center text-xl border-b pb-2 w-full">
        <div>Personal Info</div>
        <div>
          <Button
            type="button"
            onClick={() => {
              updateEdit(!edit);
            }}
          >
            {edit ? "Cancel" : "Edit"}
          </Button>
        </div>
      </div>
      <div className="relative">
        {edit ? (
          <AccountForm accountInfo={accountInfo} updateEdit={updateEdit} />
        ) : (
          <div className="space-y-4">
            <AccountCardItem field="Name" value={accountInfo.name} />

            <AccountCardItem field="Email" value={accountInfo.email} />

            <AccountCardItem field="Phone" value={accountInfo.phone} />

            <AccountCardItem field="T-PIN" value={accountInfo.tpin} />

            <AccountCardItem field="Country" value={accountInfo.country} />
          </div>
        )}
      </div>
    </div>
  );
}
