
import { NextResponse, NextRequest } from "next/server";
import { DBClient } from "../helpers/prisma-client";


const prisma=DBClient.getInstance();

export async function GET(request: NextRequest){
    try{
        const url=new URL(request.url);
        const page=parseInt(url.searchParams.get("page") || "1"); // get page number
        const limit=parseInt(url.searchParams.get("limit") || "25"); // limit per page
        const skip=(page-1)*limit; // at page 1 skip 0, page 2 skip (2-1)*25=25, basically skips previous entries

        const query=url.searchParams.get("q") || "";

        const ability=url.searchParams.get("ability") || "";
        const pokedex_id=Number(url.searchParams.get("pokedex")) || 1;
        const pokemon_dex_number=await prisma.pokemonDexNumber.findMany({
            where: {pokedex_id: pokedex_id},
            orderBy: {pokedex_number: "asc"},
            include: {
                pokemon: {
                    include: {
                        abilities: true
                    }
                }

            },
            skip: skip,
            take: limit,
        
        });

        console.log("[GET][/pokemon-dex-number] pokemon fetched: \n", pokemon_dex_number.length);
        return NextResponse.json({pokemon_dex_number, page, limit}, {status: 200})
    }catch(error){
        return NextResponse.json({error: error}, {status: 500})
    }
}