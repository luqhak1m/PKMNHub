
import { NextResponse, NextRequest } from "next/server";
import { DBClient } from "../helpers/prisma-client";

const prisma=DBClient.getInstance();
const delegate=prisma.ability;

export async function GET(request: NextResponse, {params}: {params: Promise<string>}){
    try{
        const url=new URL(request.url);
        const page=parseInt(url.searchParams.get("page") || "1");
        const limit=Number(url.searchParams.get("limit"));
        const skip=limit&&isNaN(limit)?((page-1)*limit):(undefined);
        const query=url.searchParams.get("q") || "";
        const abilities=await delegate.findMany({
            where: {
                name: {
                    contains: query,
                    mode: "insensitive",
                }
            },
            ...(limit&&isNaN(limit)?{take:limit}:{}),
            ...(limit&&isNaN(limit)?{skip:skip}:{}),
            orderBy: {name: "asc"}
        }); 
        console.log("[GET][/ability] abilities fetched: \n", abilities.length);
        return NextResponse.json({abilities}, {status: 200});
    }catch(err){
        console.log("[GET][/ability] error: \n", err);
        return NextResponse.json({error: err}, {status: 500});
    }
}