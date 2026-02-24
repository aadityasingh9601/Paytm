import { NextApiResponse } from "next";
import { NextResponse } from "next/server";
import db from "@repo/db/client";
import bcrypt from "bcrypt";
import { signupSchema } from "@repo/schema/schema";

//This function returns the session details of the current logged in user.

export const POST = async (req: Request, res: NextApiResponse) => {
  try {
    const body = await req.json();
    const { email, number, password } = body;
    const result = signupSchema.safeParse(body);
    if (!result.success) {
      return new Response(result.error.message, {
        status: 400,
      });
    }

    const existingUser = await db.user.findFirst({
      where: {
        number: number,
      },
    });

    if (existingUser) {
      return Response.json({
        message: "Phone no. already registered, choose a unique one!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await db.user.create({
      data: {
        number: number,
        email: email,
        password: hashedPassword,
      },
    });

    //create a balance entry in the database for the user too, else we will not be able to update the balances of the user.
    const balance = await db.balance.create({
      data: {
        userId: newUser.id,
        amount: 0,
        locked: 0,
      },
    });

    return new Response("User created successfully!", {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      {
        message: "Something went wrong! Try again!",
      },
      { status: 400 },
    );
  }
};
