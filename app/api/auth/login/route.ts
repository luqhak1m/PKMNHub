import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { UserDelegate } from "../../helpers/user-delegate";
import { login_user_schema } from "../../schemas/user-schema";
import jwt from "jsonwebtoken";
import "dotenv/config";

const delegate=new UserDelegate();

export async function POST(request: Request){
    const data=await request.json();
    console.log("Incoming data:", data);
    const jwt_secret=process.env.JWT_SECRET!;
    console.log("JWT_SECRET:", JSON.stringify(jwt_secret));

    try{
        const { email, password }=login_user_schema.parse(data);

        // check email existence
        const user=await delegate.fetchByEmail(email);
        if(!user){return NextResponse.json({ error: "user not found"})};

        // crosscheck password
        const valid_password=await bcrypt.compare(password, user.password);
        console.log(password, " - password");
        console.log(user.password, " - user.password");
        if(!valid_password){return NextResponse.json({ error: "wrong password"})};

        const token=jwt.sign(
            {userID: user.id}, 
            jwt_secret,
            {expiresIn: "1h"})

        return NextResponse.json({ 
            token: token
        });
    }catch(err){
        console.error("[POST][/login] error: ", err)
        return NextResponse.json({ error: err instanceof Error ? err.message : err }, { status: 500 });
    }
}
