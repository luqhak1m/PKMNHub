
import { NextResponse, NextRequest } from "next/server";
import { DBClient } from "../helpers/prisma-client";

const prisma=DBClient.getInstance();
const delegate=prisma.ability;

export async function GET(request: NextRequest){
    try{
        const url=new URL(request.url);
        const query=url.searchParams.get("q") || "";
        const limit=parseInt(url.searchParams.get("limit") || "25");
        const page=parseInt(url.searchParams.get("page") || "1");
        const skip=limit*(page-1)
        const abilities=await delegate.findMany({
            where: {
                name: {contains: query, mode: "insensitive"},
            },
            skip: skip,
            take: limit,
            orderBy: {id: "asc"}
        }); 
        console.log("[GET][/ability] abilities fetched: \n", abilities);
        return NextResponse.json({abilities, page, limit, query});
    }catch(err){
        console.log("[GET][/ability] error: \n", err);
        return NextResponse.json({error: err}, {status: 500});
    }
}