import { z } from "zod";

const RegisterSchema = z.object({
  username: z.string().max(24),
  email: z.string(),
  password: z.string().min(8).max(55),
  fistName: z.string().min(1).max(24),
  lastName: z.string().min(1).max(24)
})

export type RegisterDTO = z.infer<typeof RegisterSchema>