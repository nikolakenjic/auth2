import { z } from "zod";

export const registerSchema = z.object({
    email: z.string().min(1, "Email is required").max(50),
    password: z.string().min(6, "Password too short").max(50),
    confirmPassword: z.string().min(6, "Password too short").max(50),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export const loginSchema = z.object({
    email: z.string().min(1, "Email is required").max(50),
    password: z.string().min(6, "Password too short").max(50),
});