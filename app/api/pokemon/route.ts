
import { NextResponse, NextRequest } from "next/server";
import { DBClient } from "../helpers/prisma-client";

const prisma=DBClient.getInstance();
const delegate=prisma.pokemon;

export async function GET(request: NextRequest){
    try{
        const url=new URL(request.url);
        const page=parseInt(url.searchParams.get("page") || "1"); // get page number
        const limit=parseInt(url.searchParams.get("limit") || "25"); // limit per page
        const skip=(page-1)*limit; // at page 1 skip 0, page 2 skip (2-1)*25=25, basically skips previous entries

        const query=url.searchParams.get("q") || "";

        const pokemon=await delegate.findMany({
            where: {
                name: { contains: query, mode: "insensitive"}
            },
            skip,
            take: limit,
            orderBy: {id:"asc"}, // sort by id here
        });
        console.log("[GET][/pokemon] pokemon fetched: \n", pokemon);
        return NextResponse.json({pokemon, page, limit, query})
    }catch(err){
        console.error("[GET][/pokemon] error: ", err);
        return NextResponse.json({error: err}, {status: 500})
    }
}