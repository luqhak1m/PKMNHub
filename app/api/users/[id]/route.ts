
import { NextResponse } from "next/server";
import { withAuth } from "../../middleware/auth";
import { DBClient } from "../../helpers/prisma-client";


const prisma=DBClient.getInstance();
const delegate=prisma.user;

// export async function GET(
//     request: Request,
//     { params }: { params: Promise<{id: string}> }
// ){
//     try{
//         const resolved_params = await params;
//         const fetched_user=await delegate.fetchOne(resolved_params.id);
//         console.log("[GET][/:id/users] user fetched: ")
//         return NextResponse.json({fetched_user});
//     }catch(err){
//         console.error("[GET][/:id/users] error: ", err)
//         return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
//     }
// }

export const GET=withAuth<{params: Promise<{id: number}>}>(
    async(request, context)=>{
    if(!context?.params){
        return NextResponse.json({error: "missing ID in params"}, {status: 400})
    }
    
    const resolved_params = await context.params;
    const user_id=resolved_params.id;
    console.log("user_id", user_id);
    const user=await delegate.findUnique({where: {id: user_id}});
    console.log("[GET][/:id/users] user fetched: ", user?.name)
    return NextResponse.json({user});
})

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{id: number}> }
){
    try{
        const resolved_params = await params;
        const deleted_user=await delegate.delete({where: {id: resolved_params.id}});
        console.log("[DELETE][/:id/users] user deleted: ")
        return NextResponse.json({deleted_user});
    }catch(err){
        console.error("[DELETE][/:id/users] error: ", err)
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}