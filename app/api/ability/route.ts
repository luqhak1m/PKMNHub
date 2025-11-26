
import { NextResponse, NextRequest } from "next/server";
import { DBClient } from "../helpers/prisma-client";

const prisma=DBClient.getInstance();
const delegate=prisma.ability;

export async function GET(request: NextResponse, {params}: {params: Promise<string>}){
    try{
        const url=new URL(request.url);
        const page=parseInt(url.searchParams.get("page") || "1");
        const limit=parseInt(url.searchParams.get("limit") || "25");
        const skip=(page-1)*limit;
        const query=url.searchParams.get("q") || "";
        const abilities=await delegate.findMany({
            where: {
                name: {
                    contains: query,
                    mode: "insensitive",
                }
            },
            skip: skip,
            take: limit,
            orderBy: {name: "asc"}
        }); 
        console.log("[GET][/ability] abilities fetched: \n", abilities.length);
        return NextResponse.json({abilities}, {status: 200});
    }catch(err){
        console.log("[GET][/ability] error: \n", err);
        return NextResponse.json({error: err}, {status: 500});
    }
}