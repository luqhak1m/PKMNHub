
import { NextResponse } from "next/server";
import { DBClient } from "../helpers/prisma-client";

const prisma=DBClient.getInstance();
const delegate=prisma.pokemon;

export async function GET(){
    try{
        const pokemon=await delegate.findMany();
        console.log("[GET][/pokemon] pokemon fetched: \n", pokemon);
        return NextResponse.json({pokemon})
    }catch(err){
        console.error("[GET][/pokemon] error: ", err);
        return NextResponse.json({error: err}, {status: 500})
    }
}