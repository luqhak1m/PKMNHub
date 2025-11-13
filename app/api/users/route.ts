
import { NextResponse } from "next/server";
import { UserDelegate } from "../helpers/user-delegate";
import { create_user_schema } from "../schemas/user-schema";

const delegate=new UserDelegate();

export async function GET(){
    try{
        const users=await delegate.fetchMany();
        console.log("[GET][/users] users fetched: ")
        return NextResponse.json({users});
    }catch(err){
        console.error("[GET][/users] error: ", err)
        return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
    }
}

export async function POST(request: Request){
    const data=await request.json();
    try{
        const { name, email, password }=create_user_schema.parse(data);
        const new_user=await delegate.createModel({
            name,
            email,
            password,
        });
        console.log("[POST][/users] user created: ", name, " ", email)
        return NextResponse.json({new_user});
    }catch(err){
        console.error("[POST][/users] error: ", err)
        return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
    }
}

export async function DELETE(){
    try{
        const deleted_users_count=delegate.deleteMany();
        console.log("[DELETE][/users] total users deleted: ")
        return NextResponse.json({deleted_users_count});
    }catch(err){
        console.error("[DELETE][/users] error: ", err)
        return NextResponse.json({ error: "Failed to delete users" }, { status: 500 });
    }
}
