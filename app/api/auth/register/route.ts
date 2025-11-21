
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { create_user_schema } from "../../schemas/user-schema";
import { DBClient } from "../../helpers/prisma-client";


const prisma=DBClient.getInstance();
const delegate=prisma.user;

export async function POST(request: Request){
    const data=await request.json();
    try{
        const { name, email, password }=create_user_schema.parse(data);
        const user=await delegate.findUnique({where: {email: email}});
        if(user){return NextResponse.json({ error: "user already exists"})};
        const hashed_password=await bcrypt.hash(password, 8);
        console.log("HASHED PASSWORD: ", hashed_password);
        const new_user=await delegate.create({data: {
            name,
            email,
            password: hashed_password,
        }});
        console.log("[POST][/users] user created: ", name, " ", email)
        return NextResponse.json({new_user});
    }catch(err){
        console.error("[POST][/users] error: ", err)
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}