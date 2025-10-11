import { z, ZodType } from "zod";

export const signupSchema = z.object({
  email: z.string().endsWith("@gmail.com", "Invalid email!"),
  number: z
    .string()
    .min(8, "Must be atleast 8 digits")
    .max(12, "Must be atmost 12 digits"),
  password: z
    .string()
    .min(8, "Must be atleast 8 characters")
    .max(16, "Must be atmost 16 characters"),
});

export const signinSchema = z.object({
  number: z
    .string()
    .min(8, "Must be atleast 8 digits")
    .max(12, "Must be atmost 12 digits"),
  password: z
    .string()
    .min(8, "Must be atleast 8 characters")
    .max(16, "Must be atmost 16 characters"),
});

export const p2pSchema = z.object({
  number: z
    .string()
    .min(8, "Must be atleast 8 digits")
    .max(12, "Must be atmost 12 digits"),
  amount: z
    .number()
    .min(10, "Minimum amount ₹10")
    .max(50000, "Maximum amount ₹50000"),
});

export const addMoneySchema = z.object({
  amount: z
    .number()
    .min(100, "Minimum amount ₹100")
    .max(50000, "Maximum amount ₹50000"),
  provider: z.string().min(1, "Can't be empty!"),
});

export const verifyOnrampsSchema = z.object({
  tpin: z.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits"),
});

export const bankWebhookSchema = z.object({
  token: z.string().min(1),
  userId: z.number(),
  amount: z
    .number()
    .min(100, "Minimum amount ₹100")
    .max(50000, "Maximum amount ₹50000"),
});

// Combined schema using extend
export const bankWithOnrampSchema = bankWebhookSchema.extend({
  ...verifyOnrampsSchema.shape,
});

export const accountSchema = z.object({
  email: z.string().endsWith("@gmail.com", "Invalid email!"),
  number: z
    .string()
    .min(8, "Must be atleast 8 digits")
    .max(12, "Must be atmost 12 digits"),
  tpin: z.string().regex(/^\d{6}$/, "OTP must be exactly 6 digits"),

  name: z.string(),
  country: z.string(),
});

export type signupInput = z.infer<typeof signupSchema>;
export type signinInput = z.infer<typeof signinSchema>;
export type p2pInput = z.infer<typeof p2pSchema>;
export type addMoneyInput = z.infer<typeof addMoneySchema>;
export type verifyOnrampsInput = z.infer<typeof verifyOnrampsSchema>;
export type bankWebhookInput = z.infer<typeof bankWebhookSchema>;
export type bankWithOnRampInput = z.infer<typeof bankWithOnrampSchema>;
export type accountInput = z.infer<typeof accountSchema>;
