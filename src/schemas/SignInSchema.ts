"use client"

import { z } from "zod"

export const formSchema = z.object({
    email: z
    .string()
    .email("Please enter a valid email address.")
    .nonempty("Email is required."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .nonempty("Password is required."),
})
