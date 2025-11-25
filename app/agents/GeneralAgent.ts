
import { BaseAIAgents } from "./BaseModel";

const system_message: string=`

You are a pokemon expert.
You need to answer questions regarding pokemon.
If you do not have the knowledge to answer the question, response with you do not know the answer.

`

export class GeneralAgent extends BaseAIAgents{
    constructor(){
       
        super();
        this.setSystemMessage(system_message);
    }

    async execute(human_message: string){
        this.setHumanMessage(human_message);
        // console.log(prompt);
        const result=await this.llm.invoke(this.getMemory());
        this.addToMemory(result);
        // console.log( res.content );
        return result;
    }
}