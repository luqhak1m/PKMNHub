
import fs, { read } from "fs";
import { parse } from "csv-parse"
import { error } from "console";

/**
 * Pokemon
 */
type Pokemon={
    /**
     * Pokemon ID
     */
    id: number;
    /**
     * Pokemon Name
     */
    name: string;
}

/**
 * Ability
 */
type Ability={
    /**
     * Ability ID
     */
    id: number;
    /**
     * Ability Name
     */
    name: string;
    /**
     * Ability Description
     */
    description: string; // where local_language_id==="9"
}

/**
 * Nature
 */
type Nature={
    /**
     * Nature ID
     */
    id: number;
    /**
     * Nature Name
     */
    name: string;
    /**
     * Stat ID of the increased stat of this nature
     */
    increased_stat_id: number;
    /**
     * Stat ID of the decreased stat of this nature
     */
    decreased_stat_id: number;
}

/**
 * Stat
 */
type Stat={
    /**
     * Stat ID
     */
    id: number;
    /**
     * Stat Name
     */
    name: string;
}

/**
 * Type
 */
type Type={
    /**
     * Type ID
     */
    id: number;
    /**
     * Type Name
     */
    name: string;
    /**
     * Generation ID of the generation this type was introduced in
     */
    generation_id: number;
}

/**
 * Type Effectiveness
 */
type TypeEffectiveness={
    /**
     * Type Effectiveness ID
     */
    id: number;
    /**
     * Type ID of the user
     */
    type_id: number;
    /**
     * Type ID of the target
     */
    target_type_id: number; // type_id's target
    /**
     * Damage multiplier to the target
     */
    damage_factor: number; // 200, 100, 50, 0
}

 /**
 * Generation
 */
type Generation={
     /**
     * Generation ID
     */
    id: number;
     /**
     * Generation i - ix
     */
    name: string;   
}

 /**
 * Region
 */
type Region={
     /**
     * Region ID
     */
    id: number;
    /**
     * Region Name
     */
    name: string;
}

/**
 * Version (Specific Game)
 */
type Version={
    /**
     * Version ID
     */
    id: number;
    /**
     * Version/Game Name
     */
    name: string;
    /**
     * Version/Game Group (examples: Red-Blue, FireRed-LeafGreen)
     */
    version_group_id: number;
}

/**
 * Version/Game Group (Red-Blue, FireRed-LeafGreen, etc.)
 */
type VersionGroup={
    /**
     * Version Group ID
     */
    id: number;
    /**
     * Version Group Name
     */
    name: string;
    /**
     * Generation ID of the version group
     */
    generation_id: number;
}

/**
 * Generation ID of the version group
 */
type VersionGroupRegions={
    version_group_id: number;
    region_id: number;
}

/**
 * Egg Group
 */
type EggGroup={
    /**
     * Egg Group ID
     */
    id: number;
    /**
     * Egg Group Name
     */
    name: string;
}

/**
 * Location
 */
type Location={
    /**
     * Location ID
     */
    id: number;
    /**
     * Location Name
     */
    name: string;
    /**
     * Region ID of the location
     */
    region_id: number;
}

/**
 * Location Area - Specific areas within a location such as caves
 */
type LocationArea={
    /**
     * Location Area ID
     */
    id: number;
    /**
     * Location Area Name
     */
    name: string;
    /**
     * Location ID of the area
     */
    location_id: number;
}

/**
 * Location Area Encounter Rate
 */
type LocationAreaEncounterRate={
    /**
     * Location Area Encounter Rate ID
     */
    id: number;
    /**
     * Location Area ID of this Location Area Encounter Rate
     */
    location_area_id: number;
    /**
     * Encounter Method ID of this Location Area Encounter Rate
     */
    encounter_method_id: number;
    /**
     * Version/Game ID of this Location Area Encounter Rate
     */
    version_id: number;
    /**
     * Encounter Rate
     */
    rate: number;
}

/**
 * Encounter
 */
type Encounter={
    /**
     * Encounter ID
     */
    id: number;
    /**
     * Version/Game ID of this encounter
     */
    version_id: number;
    /**
     * Pokemon ID of this encounter
     */
    pokemon_id: number;
    /**
     * Location Area ID of this encounter (in cave floor 2, etc.)
     */
    location_area_id: number;
    /**
     * Encounter Slot ID of this encounter
     */
    encounter_slot_id: number;
    /**
     * Minimum Level of this encounter
     */
    min_level: number;
    /**
     * Maximum Level of this encounter
     */
    max_level: number;
}

/**
 * Encounter Slot (specific slot number, rarity, and encounter method)
 */
type EncounterSlot={
    /**
     * Encounter Slot ID
     */
    id: number;
    /**
     * Version Group of this encounter slot
     */
    version_group_id: number;
    /**
     * Encounter Method of this encounter slot
     */
    encounter_method_id: number;
    /**
     * Encounter Slot number
     */
    slot: number;
    /**
     * Rarity of this encounter slot
     */
    rarity: number;
}

/**
 * Methods of encounters (walk, fishing, surf, etc.)
 */
type EncounterMethods={
    /**
     * Encounter Method ID
     */
    id: number;
    /**
     * Encounter Method Name
     */
    name: string;
}

/**
 * Encounter Condition (swarm, time, season, etc.)
 */
type EncounterCondition={
    /**
     * Encounter Condition ID
     */
    id: number;
    /**
     * Encounter Condition Name
     */
    name: string;
}

/**
 * Encounter Condition Value
 */
type EncounterConditionValue={
    /**
     * Encounter Condition Value ID
     */
    id: number;
    /**
     * Encounter Condition ID of this Encounter Condition Value
     */
    encounter_condition_id: number;
    /**
     * Encounter Condition Value Name
     */
    name: string;
    /**
     * Encounter Condition Value Default status
     */
    is_default: number;
}

/**
 * Encounter Condition Value Map with Encounter
 */
type EncounterConditionValueMap={
    /**
     * Encounter Condition Value ID
     */
    id: number;
    /**
     * Encounter ID
     */
    encounter_id: number;
    /**
     * Encounter Condition Value ID
     */
    encounter_condition_value_id: number;
}

/**
 * Pokemon Ability
 */
type PokemonAbility={
    /**
     * Pokemon Ability ID
     */
    id: number;
    /**
     * Pokemon Pokemon ID with ability Ability ID
     */
    pokemon_id: number;
    /**
     * Ability Ability ID with ability Pokemon ID
     */
    ability_id: number;
    /**
     * Hidden Ability?
     */
    is_hidden: boolean;
}

/**
 * Pokemon Nature
 */
type PokemonNature={
    /**
     * Pokemon Nature ID
     */
    id: number;
    /**
     * Pokemon Pokemon ID with nature Nature ID
     */
    pokemon_id: number;
    /**
     * Nature Nature ID with pokemon Pokemon ID
     */
    nature_id: number;
}

/**
 * Pokemon Stat
 */
type PokemonStat={
    /**
     * Pokemon Stat ID
     */
    id: number;
    /**
     * Pokemon Pokemon ID with stat Stat ID
     */
    pokemon_id: number;
    /**
     * Stat Stat ID with Pokemon Pokemon ID
     */
    stat_id: number;
    /**
     * Stat Value
     */
    value: number;
    /**
     * Pokemon Pokemon ID base state
     */
    base_stat: number;
}

/**
 * Pokemon Type
 */
type PokemonType={
    /**
     * Pokemon Type ID
     */
    id: number;
    /**
     * Pokemon Pokemon ID with type Type ID
     */
    pokemon_id: number;
    /**
     * Type Type ID with type Type ID Pokemon Pokemon ID
     */
    type_id: number;
}

/**
 * Pokemon Region
 */
type PokemonRegion={
    /**
     * Pokemon Region ID
     */
    id: number;
    /**
     * Pokemon Pokemon ID with region Region ID
     */
    pokemon_id: number;
    /**
     * Region Region ID with pokemon Pokemon ID
     */
    region_id: number;
}

/**
 * Pokemon Egg Group
 */
type PokemonEggGroup={
    /**
     * Pokemon Egg Group ID
     */
    id: number;
    /**
     * Pokemon Pokemon ID with eggg group Egg Group ID
     */
    pokemon_id: number;
    /**
     * Egg group Egg Group ID with pokemon Pokemon ID
     */
    egg_group_id: number;
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

    // csv file path
    const pokemon_path="/Users/luq/Documents/projects/PKMNHub/csv/pokemon.csv";
    const pokemon_abilities_path="/Users/luq/Documents/projects/PKMNHub/csv/pokemon_abilities.csv";
    const abilities_path="/Users/luq/Documents/projects/PKMNHub/csv/abilities.csv";
    const abilities_description_path="/Users/luq/Documents/projects/PKMNHub/csv/ability_flavor_text.csv";

    // csv file content
    const pokemon_CSV=await readPokemonCSV(pokemon_path);
    const pokemon_abilities_CSV=await readPokemonCSV(pokemon_abilities_path);
    const abilities_CSV=await readPokemonCSV(abilities_path);
    const abilities_description_CSV=await readPokemonCSV(abilities_description_path);

    // csv file content
    const pokemon: Pokemon[]=pokemon_CSV.map(parsePokemonCSV);
    const abilities: Ability[]=abilities_CSV.map(ability_row=>{
        const description_row=abilities_description_CSV.find(
            row=>row.ability_id===ability_row.id&&row.language_id==="9"
        );
        return parseAbilityCSV(ability_row, description_row);
    })

    // for(const ability_row of abilities_CSV){
    //     const description_row=abilities_description_CSV.find(
    //         row=>row.ability_id===ability_row.id && row.language_id==='9'
    //     );

    //     const ability: Ability={
    //         id: Number(ability_row.id),
    //         name: ability_row.identifier,
    //         description: description_row ? description_row.flavor_text:"no description"
    //     };

    //     abilities.push(ability);
    // }
    const pokemon_abilities: PokemonAbility[]=pokemon_abilities_CSV.map(parsePokemonAbilityCSV);


    console.log("pokemon.csv", pokemon.slice(0,100));
    console.log("pokemon_abilities.csv", pokemon_abilities.slice(0,100));
    console.log("abilities.csv", abilities.slice(0,100));
}

main();