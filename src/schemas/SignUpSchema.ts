"use client";

import { z } from "zod";

export const signupSchema = z
  .object({
    username: z
      .string()
      .min(2, "Username must be at least 2 characters.")
      .max(30, "Username cannot exceed 30 characters.")
      .nonempty("Username is required."),
    email: z
      .string()
      .email("Please enter a valid email address.")
      .nonempty("Email is required."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one letter and one number."
      )
      .nonempty("Password is required."),
    confirmPassword: z
      .string()
      .nonempty("Please confirm your password."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });
