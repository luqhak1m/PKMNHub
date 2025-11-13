
import { BaseAIAgents } from "./BaseModel";
import { Annotation } from "@langchain/langgraph";

const GeneralAnnotation = Annotation.Root({
  prompt: Annotation<string>,
  result: Annotation<string>,
});

export class GeneralAgent extends BaseAIAgents<typeof GeneralAnnotation>{
    constructor(state: typeof GeneralAnnotation.State){
        super(state);
    }

    async execute(){
        const { prompt }=this.getState(); // get prompt
        // console.log(prompt);
        const res=await this.llm.invoke(prompt);
        // console.log( res.content );
        this.getState().result=res.content; // set result
        return this.getState();
    }
}