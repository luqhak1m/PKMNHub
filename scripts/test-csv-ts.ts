
import fs, { read } from "fs";
import { parse } from "csv-parse"
import { error } from "console";

type Pokemon={
    id: number;
    name: string;
}

type Ability={
    id: number;
    name: string;
    description: string;
}

type PokemonAbility={
    id: number;
    pokemon_id: number;
    ability_id: number;
    is_hidden: boolean;
}

async function readPokemonCSV(filename: string): Promise<any[]>{
    const results: any[]=[];
    // const path="/Users/luq/Documents/projects/PKMNHub/csv/pokemon.csv";
    return new Promise((resolve, reject)=>{
        fs.createReadStream(filename)
            .pipe(parse({columns:true}))
            .on("data", (row)=>results.push(row))
            .on("end", ()=>resolve(results))
            .on("error", (err)=>reject(err));
    });
}

function parsePokemonCSV(row: any): Pokemon{
    return{
        id: Number(row.id),
        name: row.identifier,
    }
}

function parseAbilityCSV(ability_row: any, description_row: any): Ability{
    return{
        id: Number(ability_row.id),
        name: ability_row.identifier,
        description: description_row.flavor_text,
    }
}

function parsePokemonAbilityCSV(row: any, id: number): PokemonAbility{
    return{
        id: id,
        pokemon_id: row.pokemon_id,
        ability_id: row.ability_id,
        is_hidden: row.is_hidden==="1",
    }
}

async function main(){
    const pokemon_path="/Users/luq/Documents/projects/PKMNHub/csv/pokemon.csv";
    const pokemon_abilities_path="/Users/luq/Documents/projects/PKMNHub/csv/pokemon_abilities.csv";
    const abilities_path="/Users/luq/Documents/projects/PKMNHub/csv/abilities.csv";
    const abilities_description_path="/Users/luq/Documents/projects/PKMNHub/csv/ability_flavor_text.csv";

    const pokemon_CSV=await readPokemonCSV(pokemon_path);
    const pokemon_abilities_CSV=await readPokemonCSV(pokemon_abilities_path);
    const abilities_CSV=await readPokemonCSV(abilities_path);
    const abilities_description_CSV=await readPokemonCSV(abilities_description_path);

    const pokemon: Pokemon[]=pokemon_CSV.map(parsePokemonCSV);
    const abilities: Ability[]=[]
    for(const ability_row of abilities_CSV){
        const description_row=abilities_description_CSV.find(
            row=>row.ability_id===ability_row.id && row.language_id==='9'
        );

        const ability: Ability={
            id: Number(ability_row.id),
            name: ability_row.identifier,
            description: description_row ? description_row.flavor_text:"no description"
        };

        abilities.push(ability);
    }
    const pokemon_abilities: PokemonAbility[]=pokemon_abilities_CSV.map(parsePokemonAbilityCSV);


    console.log("pokemon.csv", pokemon.slice(0,5));
    console.log("pokemon_abilities.csv", pokemon_abilities.slice(0,5));
    console.log("abilities.csv", abilities.slice(0,5));
}

main();