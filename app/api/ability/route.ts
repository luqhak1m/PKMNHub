
import { NextResponse, NextRequest } from "next/server";
import { DBClient } from "../helpers/prisma-client";

const prisma=DBClient.getInstance();
const delegate=prisma.ability;

export async function GET(){
    try{
        const abilities=await delegate.findMany({
            orderBy: {name: "asc"}
        }); 
        console.log("[GET][/ability] abilities fetched: \n", abilities.length);
        return NextResponse.json({abilities}, {status: 200});
    }catch(err){
        console.log("[GET][/ability] error: \n", err);
        return NextResponse.json({error: err}, {status: 500});
    }
}