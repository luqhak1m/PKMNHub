
import { NextRequest, NextResponse } from "next/server";
import { DBClient } from "../../helpers/prisma-client";

const prisma=DBClient.getInstance();

export async function GET(
    request: Request, // THIS IS A MUSTTT!!!!!!!! :DDDDDD
    {params}: {params: Promise<{id: number}>}
){
    console.log("[GET][/pokemon/[id]] executing\n");

    try{
        const {id}=await params;     
        const numeric_id=Number(id);
        console.log("id: ", id);
        const pokemon=await prisma.pokemon.findUnique({
            where: {id: numeric_id},
            include: {
                types: {
                    include: {
                        type: true,
                    }
                },
                abilities: {
                    include: {
                        ability:true
                    }
                },
                egg_groups: {
                    include: {
                        egg_group: true
                    }
                },
                stats: {
                    include: {
                        stat: true,
                    }
                },
                move: {
                    include: {
                        move: true,
                    }
                },
                encounters: true
            }
        });
        console.log("[GET][/pokemon/[id]] ability[0] fetched: \n", pokemon?.abilities[0].ability.name);
        return NextResponse.json({pokemon}, {status: 200})

    }catch(error){
        console.log("error: ", error);
        return NextResponse.json({error: error}, {status: 500})
    }
}