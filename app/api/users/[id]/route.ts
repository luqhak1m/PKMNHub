
import { NextResponse } from "next/server";
import { UserDelegate } from "../../helpers/user-delegate";

const delegate=new UserDelegate();

export async function GET(
    request: Request,
    { params }: { params: Promise<{id: string}> }
){
    try{
        const resolved_params = await params;
        const fetched_user=await delegate.fetchOne(resolved_params.id);
        console.log("[GET][/:id/users] user fetched: ")
        return NextResponse.json({fetched_user});
    }catch(err){
        console.error("[GET][/:id/users] error: ", err)
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{id: string}> }
){
    try{
        const resolved_params = await params;
        const deleted_user=await delegate.deleteOne(resolved_params.id);
        console.log("[DELETE][/:id/users] user deleted: ")
        return NextResponse.json({deleted_user});
    }catch(err){
        console.error("[DELETE][/:id/users] error: ", err)
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}