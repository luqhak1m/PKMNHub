
import { Annotation, StateDefinition } from "@langchain/langgraph";
import { ChatGroq } from "@langchain/groq"

export abstract class BaseAIAgents<S extends StateDefinition>{
    private api_key: string;
    private llm: any;
    private state: ReturnType<typeof Annotation.Root<S>>;

    constructor(state: ReturnType<typeof Annotation.Root<S>>){
        const api_key=process.env.API_KEY;
        if(!api_key){throw new Error("No Groq API Key in .env")}
        this.api_key=api_key;
        this.state=state;
        this.llm=new ChatGroq({
            model: "llama-3.3-70b-versatile",
            temperature: 0,
            maxTokens: undefined,
        }) as any; // notttt recommended but  this wont work unless it's in js so is it what is it
    }

    getLLM(){
        return this.llm;
    }

    getState(): ReturnType<typeof Annotation.Root<S>>{
        return this.state;
    }
}