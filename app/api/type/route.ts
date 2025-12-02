
import { NextRequest, NextResponse } from "next/server";
import { DBClient } from "../helpers/prisma-client";


const prisma=DBClient.getInstance();

export async function GET(){
    try{
        const types=await prisma.type.findMany();
        return NextResponse.json({types}, {status: 200});
    }catch(error){return NextResponse.json({error: error}, {status: 500})}
}