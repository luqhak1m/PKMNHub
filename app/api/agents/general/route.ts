
import { NextRequest, NextResponse } from "next/server";
import { GeneralAgent } from "../../../agents/GeneralAgent";

const general_agent=new GeneralAgent();

export async function POST(request: NextRequest){
    console.log("[POST][/agents/general] handling POST request: \n");
    try{
        const data=await request.json();
        const human_message=data.human_message;
        console.log("[POST][/agents/general] received human message: \n", human_message);
        const result=await general_agent.execute(human_message);
        const updated_memory=general_agent.getMemoryContent();
        console.log("[POST][/agents/general] returning POST request with messages length: \n", updated_memory.length);
        return NextResponse.json({updated_memory: updated_memory}, {status: 200})
    }catch(error){
        return NextResponse.json({error: error}, {status: 500})
    }
}

export async function GET(){
    try{
        console.log("[GET][/agents/general] handling GET request: \n");
        const message_history=general_agent.getMemoryContent();
        console.log("[GET][/agents/general] returning message history: \n");
        return NextResponse.json({message_history: message_history}, {status: 200})
    }catch(error){return NextResponse.json({error: error}, {status: 500})}
}