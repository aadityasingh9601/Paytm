import { getServerSession } from "next-auth";
import { authOptions } from "./lib/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession(authOptions);
  if (typeof session?.user != "undefined") {
    redirect("/dashboard");
  } else {
    redirect("/auth/signin");
  }
}
