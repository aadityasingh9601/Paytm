import { z, ZodType } from "zod";

export const signupInput = z.object({
  email: z.string().endsWith("@gmail.com", "Invalid email!"),
  phone: z
    .string()
    .min(8, "Must be atleast 8 digits")
    .max(12, "Must be atmost 12 digits"),
  password: z
    .string()
    .min(8, "Must be atleast 8 characters")
    .max(16, "Must be atmost 16 characters"),
});

export const signinInput = z.object({
  phone: z
    .string()
    .min(8, "Must be atleast 8 digits")
    .max(12, "Must be atmost 12 digits"),
  password: z
    .string()
    .min(8, "Must be atleast 8 characters")
    .max(16, "Must be atmost 16 characters"),
});
