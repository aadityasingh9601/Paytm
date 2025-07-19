import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import db from "@repo/db/client";
import bcrypt from "bcrypt";
import Email from "next-auth/providers/email";
import { STATUS_CODES } from "http";

//This function returns the session details of the current logged in user.

export const POST = async (req: Request, res: NextApiResponse) => {
  try {
    console.log("inside signup post route on backend.");
    const body = await req.json();
    //Add zod validation here.
    const { email, phone, password } = body;
    console.log(body);

    const existingUser = await db.user.findFirst({
      where: {
        number: phone,
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
        number: phone,
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

    return Response.json({
      message: "User created successfully!",
    });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: "Something went wrong! Try again",
      },
      { status: 400 }
    );
  }
};
