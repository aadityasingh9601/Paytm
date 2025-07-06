import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import db from "@repo/db/client";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Phone number",
      credentials: {
        phone: {
          label: "Phone number",
          type: "text",
          placeholder: "123123123",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },
      //Do zod validation or OTP validation here.
      async authorize(credentials: any) {
        //Hash the password sent by user.
        const hashedPassword = await bcrypt.hash(credentials.password, 10);
        const existingUser = await db.user.findFirst({
          where: {
            number: credentials.phone,
          },
        });

        //If user exists, then check their password.
        if (existingUser) {
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            hashedPassword
          );
          if (passwordValidation) {
            return {
              id: existingUser.id.toString(),
              name: existingUser.name,
              email: existingUser.email,
            };
          }
          return null;
        }

        //If user doesn't exists, then create the user.
        //Get the user email from user, also create 2 separate handlers for signin & signup, don't mix them up, it may
        //create confusion in the long run.
        try {
          const user = await db.user.create({
            data: {
              number: credentials.phone,
              email: "abc",
              password: hashedPassword,
            },
          });
          //create a separate signup route & also add some kind of opt validation or email verification there.

          return {
            id: user.id.toString(),
            name: user.name,
            number: user.number,
          };
        } catch (error) {
          console.log(error);
        }

        return null;
      },
    }),
  ],
};
