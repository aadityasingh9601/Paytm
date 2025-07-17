"use client";
import { TextInput } from "@repo/ui/TextInput";
import { Button2 } from "@repo/ui/Button2";

export default function page() {
  return (
    <div className="flex justify-center items-center h-[92.5vh]">
      <div className="flex flex-col justify-center items-center border-[2px] rounded-md border-grey-800 bg-white w-[26rem] min-h-[23rem] max-h-[31rem] p-5">
        <div className="text-2xl">Sign up</div>
        <div className="flex flex-col justify-center min-w-[20rem] gap-[1rem]">
          <div className="flex flex-col ">
            <TextInput
              label=""
              placeholder="Enter username"
              onChange={() => {}}
            />
            <TextInput
              label=""
              placeholder="Enter phone number"
              onChange={() => {}}
            />
            <TextInput
              label=""
              placeholder="Enter password"
              onChange={() => {}}
            />
          </div>
          <Button2 onClick={() => {}} type="solid">
            Next
          </Button2>
          <Button2 onClick={() => {}} type="regular">
            Already have an account? Log in
          </Button2>
        </div>
      </div>
    </div>
  );
}
