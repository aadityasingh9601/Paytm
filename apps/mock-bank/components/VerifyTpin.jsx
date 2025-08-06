"use client";

//This will handle the client side part for your netbanking ui page, just like addMoney.tsx & p2pTransactions.tsx, etc
//also create a server action here that u can use to handle the backned logic.

export default function VerifyTpin() {
  return (
    <div>
      <Card title="You are transfering ₹100 from your account to Paytm PVT LTD">
        <div className="w-full">
          <TextInput
            label={"Enter you Tpin"}
            placeholder={"Enter your 6 digit Tpin here"}
            onChange={(value) => {}}
          />
          <div className="flex justify-center pt-4">
            <Button onClick={() => {}}>Add Money</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
