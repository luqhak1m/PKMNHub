
// import { Annotation, StateDefinition, StateGraph } from "@langchain/langgraph";
// import { ChatGroq } from "@langchain/groq"
// import "dotenv/config";

// console.log("starting...");
// const api_key=process.env.GROQ_API_KEY;
// console.log(api_key);
// const llm: any=new ChatGroq({
//     model: "llama-3.3-70b-versatile",
//     temperature: 0,
//     maxTokens: undefined,
//     apiKey: api_key
// });

// // Graph state
// const StateAnnotation = Annotation.Root({
//   topic: Annotation<string>,
//   joke: Annotation<string>,
//   improvedJoke: Annotation<string>,
//   finalJoke: Annotation<string>,
// });

// // Inspect the entire object
// console.log("StateAnnotation object:", StateAnnotation);

// // Inspect keys
// console.log("Keys in StateAnnotation:", Object.keys(StateAnnotation));

// // Inspect individual properties
// console.log("StateAnnotation Fields:", (StateAnnotation as any).Fields);
// console.log("StateAnnotation State:", (StateAnnotation as any).State);
// // Define noåde functions

// // First LLM call to generate initial joke
// async function generateJoke(state: typeof StateAnnotation.State) {
//   const msg = await llm.invoke(`Write a short joke about ${state.topic}`);
//   return { joke: msg.content };
// }

// // Gate function to check if the joke has a punchline
// function checkPunchline(state: typeof StateAnnotation.State) {
//   // Simple check - does the joke contain "?" or "!"
//   if (state.joke?.includes("?") || state.joke?.includes("!")) {
//     return "Pass";
//   }
//   return "Fail";
// }

//   // Second LLM call to improve the joke
// async function improveJoke(state: typeof StateAnnotation.State) {
//   const msg = await llm.invoke(
//     `Make this joke funnier by adding wordplay: ${state.joke}`
//   );
//   return { improvedJoke: msg.content };
// }

// // Third LLM call for final polish
// async function polishJoke(state: typeof StateAnnotation.State) {
//   const msg = await llm.invoke(
//     `Add a surprising twist to this joke: ${state.improvedJoke}`
//   );
//   return { finalJoke: msg.content };
// }

// // Build workflow
// const chain = new StateGraph(StateAnnotation)
//   .addNode("generateJoke", generateJoke)
//   .addNode("improveJoke", improveJoke)
//   .addNode("polishJoke", polishJoke)
//   .addEdge("__start__", "generateJoke")
//   .addConditionalEdges("generateJoke", checkPunchline, {
//     Pass: "improveJoke",
//     Fail: "__end__"
//   })
//   .addEdge("improveJoke", "polishJoke")
//   .addEdge("polishJoke", "__end__")
//   .compile();

// // Invoke
// const state = await chain.invoke({ topic: "cats" });
// console.log("Initial joke:");
// console.log(state.joke);
// console.log("\n--- --- ---\n");
// if (state.improvedJoke !== undefined) {
//   console.log("Improved joke:");
//   console.log(state.improvedJoke);
//   console.log("\n--- --- ---\n");

//   console.log("Final joke:");
//   console.log(state.finalJoke);
// } else {
//   console.log("Joke failed quality gate - no punchline detected!");
// }

import { GeneralAgent } from "../app/agents/GeneralAgent";

const general_state={
    prompt: "What do you know about pokemon",
    result: ""
}
const general_agent=new GeneralAgent(general_state);
await general_agent.execute();

console.log("result: ", general_state.result);
