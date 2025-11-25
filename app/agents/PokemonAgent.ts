
import { BaseAIAgents } from "./BaseModel";
import { Annotation } from "@langchain/langgraph";

const PokemonAnnotation=Annotation.Root({
    prompt: Annotation<string>,
    result: Annotation<string>,
})