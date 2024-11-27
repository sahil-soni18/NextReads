"use client"

import { z } from "zod"

export const formSchema = z.object({
    Title: z
        .string()
        .min(1, "String cannot be empty"),
    Author: z
        .string()
        .min(1, "String cannot be empty"),
    Year: z
        .number()
        .min(1900, "Year must be a valid year (e.g., 1990)"),
    Genre: z
        .string()
        .min(2, "Genre cannot be empty..."),
    Description: z
        .string()
        .min(20, "Description must be at least 20 characters long"),


})
