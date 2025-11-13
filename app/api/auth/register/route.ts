
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { UserDelegate } from "../../helpers/user-delegate";
import { create_user_schema } from "../../schemas/user-schema";

const delegate=new UserDelegate();

export async function POST(request: Request){
    const data=await request.json();
    try{
        const { name, email, password }=create_user_schema.parse(data);
        const user=await delegate.fetchByEmail(email);
        if(user){return NextResponse.json({ error: "user already exists"})};
        const hashed_password=await bcrypt.hash(password, 8);
        const new_user=await delegate.createModel({
            name,
            email,
            password: hashed_password,
        });
        console.log("[POST][/users] user created: ", name, " ", email)
        return NextResponse.json({new_user});
    }catch(err){
        console.error("[POST][/users] error: ", err)
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}