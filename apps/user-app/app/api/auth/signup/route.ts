import db from "@repo/db/client";
import bcrypt from "bcrypt";
import { signupSchema } from "@repo/schema/schema";

//This function returns the session details of the current logged in user.

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const { email, number, password } = body;
    const result = signupSchema.safeParse(body);
    if (!result.success) {
      return new Response(JSON.stringify({ message: result.error.message }), {
        status: 400,
      });
    }
    //Check if phone number already exists or not.
    const existingNumber = await db.user.findFirst({
      where: {
        number: number,
      },
    });

    if (existingNumber) {
      return new Response(
        JSON.stringify({
          message: "Phone no. already registered, choose new one!",
        }),
        { status: 400 },
      );
    }

    //Check if email already exists or not.
    const existingEmail = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingEmail) {
      return new Response(
        JSON.stringify({ message: "Email already registered! Choose new one!" }),
        { status: 400 },
      );
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

    return new Response(
      JSON.stringify({ message: "User created successfully!" }),
      { status: 200 },
    );
  } catch (e) {
    console.log(e);
    return new Response(
      JSON.stringify({ message: "Something went wrong! Try again!" }),
      { status: 400 },
    );
  }
};
