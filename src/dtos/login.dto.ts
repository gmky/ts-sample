import { z } from "zod"

const LoginSchema = z.object({
  username: z.string().max(24),
  password: z.string().max(55),
  rememberMe: z.boolean().default(false)
})

export type LoginDTO = z.infer<typeof LoginSchema>