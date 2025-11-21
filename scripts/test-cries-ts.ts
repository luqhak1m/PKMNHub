import fs from "fs";
import path from "path";
import { DBClient } from "../app/api/helpers/prisma-client";
import { fileURLToPath } from "url";

const prisma=DBClient.getInstance()
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

async function main(){
    // const sprites_directory=path.join(__dirname, "/public/sprites");
    const cries_directory=path.join(__dirname, "../app/public/cries/")
    const cries_files=fs.readdirSync(cries_directory);
    // console.log(sprites_directory);
    // console.log(sprites_files);

    for(const file of cries_files){
        const file_extension=path.extname(file);
        const file_name=path.basename(file, file_extension);
        const cry_id=parseInt(file_name);

        if(!isNaN(cry_id)){
            const cry_file_path=`/cries/${file}`;
            console.log(`Updating Pokémon ID=${cry_id} with cries=${cry_file_path}`);
            const pokemon = await prisma.pokemon.findUnique({ where: { id: cry_id } });

            if(pokemon){
                const updated_pokemon_cry=await prisma.pokemon.update({
                    where: {id: cry_id},
                    data: {cry_url: cry_file_path}
                })
                console.log("updated: ", updated_pokemon_cry);
            }else{console.log("update fail for id", cry_id);
}
        }
    }
}

main()