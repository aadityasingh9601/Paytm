import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import db from "@repo/db/client";
import { signinSchema } from "@repo/schema/schema";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Phone number",
      credentials: {
        number: {
          label: "Phone number",
          type: "text",
          placeholder: "123123123",
          required: true,
        },
        password: { label: "Password", type: "password", required: true },
      },

      async authorize(credentials: any) {
        try {
          //Do zod validation or OTP validation here.
          const result = signinSchema.safeParse({
            number: credentials.number,
            password: credentials.password,
          });
          if (!result.success) {
            throw new Error(result.error.message);
          }

          const existingUser = await db.user.findFirst({
            where: {
              number: credentials.number,
            },
          });

          if (!existingUser) {
            throw new Error("Invalid credentials!");
          }
          //If user exists, then check their password.
          const passwordValidation = await bcrypt.compare(
            credentials.password,
            existingUser.password,
          );

          if (!passwordValidation) {
            throw new Error("Incorrect Password!");
          }
          return {
            id: existingUser.id.toString(),
            name: existingUser.name,
            email: existingUser.email,
          };
        } catch (error) {
          // Re-throw your own known errors so NextAuth receives them
          if (error instanceof Error) {
            throw error;
          }
          throw new Error("Something went wrong. Please try again.");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  //We've added this callback here to include the id of the user in the session data too, you can also use other similar
  //callbacks to perform various tasks, see on NextAuth docs.
  callbacks: {
    session: ({ session, token }: { session: any; token: any }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
  pages: {
    signIn: "/auth/signin",
  },
};
