
import { DBClient } from "../helpers/prisma-client";

const prisma=DBClient.getInstance(); // using the singleton instance

// models delegate
export const user_delegate=prisma.user;
export const pokemon_delegate=prisma.pokemon;