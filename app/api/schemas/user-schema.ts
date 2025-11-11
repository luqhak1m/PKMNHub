
import  { z } from "zod";

export const create_user_schema=z.object({
    name: z.string().min(1, "Cannot be empty!"),
    email: z.email("Invalid e-mail format!")
});