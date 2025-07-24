import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../../lib/auth";

//This function returns the session details of the current logged in user.

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    console.log(session);
    if (session?.user) {
      return NextResponse.json({
        user: session?.user,
      });
    }
  } catch (e) {
    return NextResponse.json(
      {
        message: "You are not logged in",
      },
      { status: 403 }
    );
  }
};
