
import  { z } from "zod";

export const create_user_schema=z.object({
    name: z.string().min(1, "Cannot be empty!"),
    email: z.email("Invalid e-mail format!"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        // .regex(/[0-9]/, "Password must contain at least one number")
        // .regex(/[\W_]/, "Password must contain at least one special character")
});

export const login_user_schema=z.object({
    email: z.email("Invalid e-mail format!"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        // .regex(/[0-9]/, "Password must contain at least one number")
        // .regex(/[\W_]/, "Password must contain at least one special character")
});