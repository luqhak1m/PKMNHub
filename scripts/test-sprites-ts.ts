import fs from "fs";
import path from "path";
import { DBClient } from "../app/api/helpers/prisma-client";
import { fileURLToPath } from "url";

const prisma=DBClient.getInstance()
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

async function main(){
    // const sprites_directory=path.join(__dirname, "/public/sprites");
    const sprites_directory=path.join(__dirname, "../app/public/sprites/")
    const sprites_files=fs.readdirSync(sprites_directory);
    // console.log(sprites_directory);
    // console.log(sprites_files);

    for(const file of sprites_files){
        const file_extension=path.extname(file);
        const file_name=path.basename(file, file_extension);
        const sprite_id=parseInt(file_name);

        if(!isNaN(sprite_id)){
            const sprite_file_path=`/sprites/${file}`;
            console.log(`Updating Pokémon ID=${sprite_id} with sprite=${sprite_file_path}`);
            const pokemon = await prisma.pokemon.findUnique({ where: { id: sprite_id } });

            if(pokemon){
                const updated_pokemon_sprite=await prisma.pokemon.update({
                    where: {id: sprite_id},
                    data: {sprite_url: sprite_file_path}
                })
                console.log("updated: ", updated_pokemon_sprite);
            }else{console.log("update fail for id", sprite_id);
}
        }
    }
}

main()