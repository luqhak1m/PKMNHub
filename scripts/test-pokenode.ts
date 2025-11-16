import {
  PokemonClient,
} from "pokenode-ts";

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

// async function getCachedAbilities(
//     abilities_cache: Record<string, Ability>, 
//     name: string): Promise<Ability>{
//         if(abilities_cache[name]{return abilities_cache[name]})
// }


async function inspectPokemon(client: PokemonClient, id: number) {
    const pokemon=await client.getPokemonById(id)
    // const ability=await client.getAbilityById(id)

    // pokemon table
    const pokemon_id=pokemon.id;
    const pokemon_name=pokemon.name;

    const pokemon_object: Pokemon={
        id: pokemon_id,
        name: pokemon_name
    }

    // // ability table
    // const ability_id=ability.id;
    // const ability_name=ability.name;
    // const effect_entries=ability.effect_entries;
    // let ability_description='desc not found';

    // for(const entry of effect_entries){
    //     if(entry.language.name==='en'){
    //         ability_description=entry.effect;
    //         break;
    //     }
    // }

    // const ability_object: Ability={
    //     id: ability_id,
    //     name: ability_name,
    //     description: ability_description,
    // }

    // pokemon + ability
    let pokemon_abilities: PokemonAbility[]=[];
    let temp_id: number;
    for(temp_id=0; temp_id<pokemon.abilities.length; temp_id++){
        pokemon_abilities.push({
            id: temp_id,
            pokemon_id: pokemon_id,
            ability_id: (await client.getAbilityByName(pokemon.abilities[temp_id].ability.name)).id, // get the pokemon's ability id using its name from the pokemon ability response
            is_hidden: pokemon.abilities[temp_id].is_hidden,
        });
    }
    
    console.log(pokemon_abilities);
    return pokemon;
}

async function main(){
    const pokemonAPI = new PokemonClient();
    const abilities_cache: Record<string, Ability>={}
    for(let n=1; n<3; n++){
        await inspectPokemon(pokemonAPI, n);
    }
}

main();
// inspectPokemon(n);
