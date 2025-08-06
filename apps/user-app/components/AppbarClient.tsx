"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/Appbar";
//We've created this separate as in layout, we were facing error again & again, can't provide context to server componenents
//etc, we can't make the root layout componenet a client component.

export function AppbarClient() {
  const session = useSession();
  console.log(session);

  return (
    <div>
      <Appbar
        onSignin={signIn}
        onSignout={async () => {
          await signOut({ callbackUrl: "/auth/signin" });
        }}
        user={session.data?.user}
      />
    </div>
  );
}
