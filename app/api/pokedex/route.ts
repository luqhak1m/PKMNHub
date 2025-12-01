import { NextRequest, NextResponse } from "next/server";
import { DBClient } from "../helpers/prisma-client";

const prisma=DBClient.getInstance();

export async function GET(request: NextRequest){ // expect URL
    try{
        const url=new URL(request.url);
        const pokedexes=await prisma.pokedex.findMany();
        console.log("[GET][/pokedex] pokedexes fetched: \n", pokedexes.length);
        return NextResponse.json({pokedexes}, {status: 200})

    }catch(error){
        return NextResponse.json({error: error}, {status: 500});
    }
}