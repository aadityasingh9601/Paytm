"use server";
import { accountSchema, accountInput } from "@repo/schema/schema";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import db from "@repo/db/client";

export const updateAccount = async (id: number, data: accountInput) => {
  //First of all do zod validation to ensure data isn't malinformed.
  const result = accountSchema.safeParse(data);
  if (!result.success) {
    return {
      success: false,
      message: result.error.message,
    };
  }

  //Check the login status of the current user.
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return {
      success: false,
      message: "User not logged in!",
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
      message: "Oops! User not found!",
    };
  }

  //Check if user has the permission to edit the resources (Authorization).
  if (Number(userId) !== user.id) {
    return {
      success: false,
      message: "Access denied!",
    };
  }

  const updatedData = await db.user.update({
    where: {
      id: user.id,
    },
    data: data,
    select: {
      email: true,
      name: true,
      country: true,
      tpin: true,
      number: true,
    },
  });

  const newData = {
    ...updatedData,
    tpin: updatedData.tpin ?? "",
    name: updatedData.name ?? "",
    country: updatedData.country ?? "",
  };

  return {
    success: true,
    message: "Account updated successfully!",
    data: newData,
  };
};
