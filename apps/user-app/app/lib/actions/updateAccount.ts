"use server";
import { accountSchema, accountInput } from "@repo/schema/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";

export const updateAccount = async (id: number, data: accountInput) => {
  //console.log("received the request");
  console.log(id, data);
  //First of all do zod validation to ensure data isn't malinformed.
  const result = accountSchema.safeParse(data);
  if (!result.success) {
    console.log(result.error.message);
    return {
      success: false,
      error: result.error.message,
    };
  }

  //Check the login status of the current user.
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  console.log(session);

  if (!userId) {
    return {
      success: false,
      error: "User not logged in!",
    };
  }

  //Check if the user even exists or not.
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return {
      success: false,
      error: "Oops! User not found!",
    };
  }

  //Check if user has the permission to edit the resources (Authorization).
  // console.log(typeof userId, typeof user.id);
  if (Number(userId) !== user.id) {
    return {
      success: false,
      error: "Access denied!",
    };
  }

  const updatedData = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      email: data.email,
      name: data.name,
      country: data.country,
      tpin: data.tpin,
      number: data.phone,
    },
    select: {
      email: true,
      name: true,
      country: true,
      tpin: true,
      number: true,
    },
  });

  console.log(updatedData);

  return {
    success: true,
    message: "Account updated successfully!",
    data: updatedData,
  };
};
