
import { Annotation, StateDefinition } from "@langchain/langgraph";
import { ChatGroq } from "@langchain/groq"
import "dotenv/config";

export abstract class BaseAIAgents <T extends {State: any}>{
    private api_key: string;
    readonly llm: any;
    private state: T["State"];

    constructor(state: T["State"]){
        const api_key=process.env.GROQ_API_KEY;
        if(!api_key){throw new Error("No Groq API Key in .env")}
        this.api_key=api_key;
        this.state=state;
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

    getState(): T["State"]{
        return this.state;
    }
}