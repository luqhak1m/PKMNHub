
import { ChatGroq } from "@langchain/groq"
import { SystemMessage, HumanMessage, AIMessage, BaseMessage, ContentBlock } from "langchain";
import "dotenv/config";
import { memo } from "react";

export abstract class BaseAIAgents{
    private api_key: string;
    readonly llm: any;
    private memory: BaseMessage[]=[];

    constructor(){
        const api_key=process.env.GROQ_API_KEY;
        if(!api_key){throw new Error("No Groq API Key in .env")}
        this.api_key=api_key;
        this.llm=new ChatGroq({
            model: "llama-3.3-70b-versatile",
            temperature: 0,
            maxTokens: undefined,
            apiKey: this.api_key
        }) as any;
    }

    getLLM(){
        return this.llm;
    }

    getMemory(): BaseMessage[]{
        return [...this.memory];
    }

    addToMemory(message: BaseMessage){
        this.memory.push(message);
    }

    setSystemMessage(system_message: string){
        const system_message_object=new SystemMessage(system_message);
        this.addToMemory(system_message_object);
    }

    setHumanMessage(human_message: string){
        const human_message_object=new HumanMessage(human_message);
        this.addToMemory(human_message_object);
    }

    getMemoryContent(){
        return this.memory.map(message=>`${message.constructor.name}: ${message.content}`)
    }

    getMemoryLog(){
        console.log(this.getMemoryContent().join("\n"));
    }
}