
import { NextResponse } from "next/server";
import { UserDelegate } from "../helpers/user-delegate";

const delegate=new UserDelegate();

export async function GET(){
    const users=await delegate.fetchMany();
    return NextResponse.json(users);
}
