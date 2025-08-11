import { Card } from "@repo/ui/card";
import { Button } from "@repo/ui/Button";
import AccountCardItem from "./AccountCardItem";

export default function AccountCard() {
  return (
    <div className=" border p-6 bg-white rounded-xl bg-[#ededed] w-full">
      <div className="flex justify-between align-center text-xl border-b pb-2 w-full">
        <div>Personal Info</div>
        <div>
          <Button type="button">Edit</Button>
        </div>
      </div>
      <div className="relative">
        <div className="space-y-4">
          <AccountCardItem field={"Public Id"} value="123" />

          <AccountCardItem field="Name" value="Aaditya Singh" />

          <AccountCardItem field="Email" value="abc@gmail.com" />

          <AccountCardItem field="T-PIN" value="123456" />

          <AccountCardItem field="Country" value="India" />
        </div>
      </div>
    </div>
  );
}
