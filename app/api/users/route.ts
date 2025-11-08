
import { NextResponse } from "next/server";
import { DBClient } from "../helpers/prisma-client"
import { user_delegate, pokemon_delegate } from "../helpers/models-delegate";
import { createModel, fetchOne, fetchMany, deleteOne, deleteMany } from "../helpers/crud-functions";

export async function GET(){
    
}
