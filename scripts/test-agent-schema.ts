// import fs from 'fs';
// import path from 'path';

// const schema_path=path.join(process.cwd(), 'prisma', 'schema.prisma');
// const schema_string=fs.readFileSync(schema_path, 'utf-8');


// const start_model="model Pokemon";
// const start_index=schema_string.indexOf(start_model);
// const schema=schema_string.slice(start_index);

// const lines=schema.split("\n");
// let in_model=false;
// let collecting=false;
// let output: string[]=[];
// const output_string: string[]=[];

// for(const line of lines){
//     const trimmed=line.trim();
//     if(trimmed.startsWith('model User')){continue;}

//     if(trimmed.startsWith('model ')){
//         in_model=true;
//         collecting=true;
//         output=[trimmed];
//         continue;
//     }

//     if(in_model){ // lines other than model Model
//         if(trimmed===''){ // start the flag on an empty line after the model
//             collecting=false;
//             continue;
//         }

//         if(trimmed==='}'){
//             in_model=false;
//             collecting=false;
//             output.push(trimmed);
//             output_string.push(output.join("\n"));
//             output=[];
//             continue;
//         }

//         if(collecting){output.push(line);}
//     }
// }
// console.log(`total model: ${output_string.length}`);
// for(const model of output_string){
//     console.log((model));
// }

import { Prisma } from "./../generated/prisma";
import fs from "fs";

console.log(JSON.stringify(Prisma.dmmf.datamodel.models, null, 2));
