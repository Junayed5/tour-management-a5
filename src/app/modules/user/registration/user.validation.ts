import z from "zod";

const createUserWalletZodSchema = z.object({
  name: z
    .string({ error: "Name Must be string" })
    .min(2, { error: "Name atleast 2 characters" })
    .max(50, { error: "Name is longer than 50" }),
  phone: z
    .string({ error: "Phone must be string" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      message: "Number should be 01xxxxxxxxx or +8801xxxxxxx",
    }),
  password: z
    .string({ error: "Password Must be string" })
    .min(8, { message: "Password must be 8 character long" })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password contain must 1 uppercase letter",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password contain must 1 number",
    }),
});

export default createUserWalletZodSchema
