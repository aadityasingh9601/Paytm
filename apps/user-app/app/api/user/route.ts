import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

export const GET = async () => {
  try {
    //This function returns the session details of the current logged-in user.
    const session = await getServerSession(authOptions);
    if (session?.user) {
      return NextResponse.json({
        user: session?.user,
      });
    }
  } catch (e) {
    return NextResponse.json(
      {
        message: "You aren't logged in",
      },
      { status: 403 },
    );
  }
};
