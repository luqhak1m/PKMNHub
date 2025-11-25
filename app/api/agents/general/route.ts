
import { NextRequest, NextResponse } from "next/server";
import { GeneralAgent } from "../../../agents/GeneralAgent";

const general_agent=new GeneralAgent();

export async function POST(request: NextRequest){
    try{
        const data=await request.json();
        const human_message=data.human_message;
        const result=await general_agent.execute(human_message);
        return NextResponse.json({ai_message: result.content}, {status: 200})
    }catch(error){
        return NextResponse.json({error: error}, {status: 500})
    }
}