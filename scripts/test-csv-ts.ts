
import fs, { read } from "fs";
import { parse } from "csv-parse"
import { error } from "console";

/**
 * Pokemon
 * - pokemon.csv
 */
type Pokemon={
    /**
     * Pokemon ID
     * - row.id
     */
    id: number;
    /**
     * Pokemon Name
     * row.identifier
     */
    name: string;
}

/**
 * Ability
 * - abilities.csv + flavor_text & local_language_id column
 */
type Ability={
    /**
     * Ability ID
     * - row.id
     */
    id: number;
    /**
     * Ability Name
     * - row.identifier
     */
    name: string;
    /**
     * Ability Description
     * - row.flavor_text
     * - where row.local_language_id==="9"
     */
    description: string;
}

/**
 * Nature
 * - natures.csv
 */
type Nature={
    /**
     * Nature ID
     * - row.id
     */
    id: number;
    /**
     * Nature Name
     * - row.identifier
     */
    name: string;
    /**
     * Stat ID of the increased stat of this nature
     * - row.increased_stat_id
     */
    increased_stat_id: number;
    /**
     * Stat ID of the decreased stat of this nature
     * - row.increased_stat_id
     */
    decreased_stat_id: number;
}

/**
 * Stat
 * - stats.csv
 */
type Stat={
    /**
     * Stat ID
     * - row.id
     */
    id: number;
    /**
     * Stat Name
     * - row.identifier
     */
    name: string;
}

/**
 * Type
 * - types.csv
 */
type Type={
    /**
     * Type ID
     * - row.id
     */
    id: number;
    /**
     * Type Name
     * row.identifier
     */
    name: string;
    /**
     * Generation ID of the generation this type was introduced in
     * - row.generation_id
     */
    generation_id: number;
}

/**
 * Type Effectiveness
 * - type_efficacy.csv
 */
type TypeEffectiveness={
    /**
     * Type Effectiveness ID
     * - Unique ID
     */
    id: number;
    /**
     * Type ID of the user
     * - row.damage_type_id
     */
    type_id: number;
    /**
     * Type ID of the target
     * - row.target_type_id
     */
    target_type_id: number; // type_id's target
    /**
     * Damage multiplier to the target
     * - row.damage_factor
     */
    damage_factor: number; // 200, 100, 50, 0
}

 /**
 * Generation
 * - generations.csv
 */
type Generation={
     /**
     * Generation ID
     * - row.id
     */
    id: number;
     /**
     * Generation i - ix
     * - row.identifier
     */
    name: string;
    /**
     * Region ID
     * - row.main_region_id
     */
    region_id: number;
}

 /**
 * Region
 * - regions.csv
 */
type Region={
     /**
     * Region ID
     * - row.id
     */
    id: number;
    /**
     * Region Name
     * - row.identifier
     */
    name: string;
}

/**
 * Version (Specific Game)
 * - versions.csv
 */
type Version={
    /**
     * Version ID
     * - row.id
     */
    id: number;
    /**
     * Version/Game Name
     * row.identifier
     */
    name: string;
    /**
     * Version/Game Group (examples: Red-Blue, FireRed-LeafGreen)
     * row.version_group_id
     */
    version_group_id: number;
}

/**
 * Version/Game Group (Red-Blue, FireRed-LeafGreen, etc.)
 * - version_groups.csv
 */
type VersionGroup={
    /**
     * Version Group ID
     * - row.id
     */
    id: number;
    /**
     * Version Group Name
     * - row.identifier
     */
    name: string;
    /**
     * Generation ID of the version group
     * - row.generation_id
     */
    generation_id: number;
}

/**
 * Version Group Region
 * - version_group_regions.csv
 */
type VersionGroupRegion={
    /**
     * Version Group Region ID
     * - Unique ID
     */
    id: number;
    /**
     * Version Group ID
     * - row.version_group_id
     */
    version_group_id: number;
    /**
     * Version Group ID
     * - row.region_id
     */
    region_id: number;
}

/**
 * Egg Group
 * - egg_groups.csv
 */
type EggGroup={
    /**
     * Egg Group ID
     * - row.id
     */
    id: number;
    /**
     * Egg Group Name
     * - row.identifier
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
 * - pokemon_stats.csv
 */
type PokemonStat={
    /**
     * Pokemon Stat ID
     * - Uniique ID
     */
    id: number;
    /**
     * Pokemon Pokemon ID with stat Stat ID
     * - row.pokemon_id
     */
    pokemon_id: number;
    /**
     * Stat Stat ID with Pokemon Pokemon ID
     * - row.stat_id
     */
    stat_id: number;
    /**
     * Pokemon Pokemon ID base state
     * - row.base_state
     */
    base_stat: number;
}

/**
 * Pokemon Type
 * - pokemon_types.csv
 */
type PokemonType={
    /**
     * Pokemon Type ID
     * - Unique ID
     */
    id: number;
    /**
     * Pokemon Pokemon ID with type Type ID
     * - row.pokemon_id
     */
    pokemon_id: number;
    /**
     * Type Type ID with type Type ID Pokemon Pokemon ID
     * - row.type_id
     */
    type_id: number;
}

/**
 * Pokemon Egg Group
 * - pokemon_egg_groups.csv
 */
type PokemonEggGroup={
    /**
     * Pokemon Egg Group ID
     * - Unique ID
     */
    id: number;
    /**
     * Pokemon Pokemon ID with eggg group Egg Group ID
     * - row.pokemon_id
     */
    pokemon_id: number;
    /**
     * Egg group Egg Group ID with pokemon Pokemon ID
     * - row.egg_group_id
     */
    egg_group_id: number;
}

/**
 * Pokedex
 * - pokedex.csv
 */
type Pokedex={
    /**
     * Pokedex ID
     * - row.id
     */
    id: number;
    /**
     * Pokedex Name
     * - row.identifier
     */
    name: string;
    /**
     * Pokedex Region
     * - row.region_id
     */
    region_id: number
}

/**
 * Pokedex Version Group - which game the pokedex belongs in
 * - pokedex_version_groups.csv
 */
type PokedexVersionGroup={
    /**
     * Pokedex Version Group ID
     * - row.id
     */
    id: number;
    /**
     * Pokedex ID
     * - row.pokedex_id
     */
    pokedex_id: number;
    /**
     * Version Group ID
     * - row.pokedex_id
     */
    version_group_id: number;
}

/**
 * Pokemon Dex Number
 * - pokedmon_dex_number.csv
 */
type PokemonDexNumber={ // use this to check which game (version_group) it is in
    /**
     * Pokemon Dex Number ID
     * - Unique Value
     */
    id: number;
    /**
     * Pokemon ID
     * - row.species_id
     */
    pokemon_id: number;
    /**
     * Pokedex ID
     * - row.pokedex_id
     */
    pokedex_id: number; // national, etc
    /**
     * Pokedex Number
     * - row.pokedex_number
     */
    pokedex_number: number;

}


async function readCSV(filename: string): Promise<any[]>{
    const results: any[]=[];
    // const path="/Users/luq/Documents/projects/PKMNHub/csv/pokemon.csv";
    return new Promise((resolve, reject)=>{
        fs.createReadStream(filename)
        .pipe(
            parse({
            columns: header =>
                header.map(h => h.replace(/^\uFEFF/, "")), // remove BOM here!
            trim: true,
            })
        )
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
function parseGenerationCSV(row: any): Generation{
    return{
        id: Number(row.id),
        name: row.identifier,
        region_id: Number(row.main_region_id)
    }
}
function parseVersionCSV(row: any): Version{
    return{
        id: Number(row.id),
        name: row.identifier,
        version_group_id: Number(row.version_group_id)
    }
}
function parseVersionGroupCSV(row: any): VersionGroup{
    return{
        id: Number(row.id),
        name: row.identifier,
        generation_id: Number(row.generation_id)
    }
}
function parseVersionGroupRegionCSV(row: any, id: number): VersionGroupRegion{
    return{
        id: Number(id),
        version_group_id: Number(row.version_group_id),
        region_id: Number(row.region_id)
    }
}
function parsePokedexCSV(row: any): Pokedex{
    return{
        id: Number(row.id),
        name: row.identifier,
        region_id: Number(row.region_id)
    }
}
function parsePokedexVersionGroupCSV(row: any, id: any): PokedexVersionGroup{
    return{
        id: Number(id),
        pokedex_id: Number(row.pokedex_id),
        version_group_id: Number(row.version_group_id)
    }
}
function parsePokemonDexNumberCSV(row: any, id: any): PokemonDexNumber{
    return{
        id: Number(id),
        pokemon_id: Number(row.species_id),
        pokedex_id: Number(row.pokedex_id),
        pokedex_number: Number(row.pokedex_number),
    }
}

function parseAbilityCSV(row: any): Ability{
    return{
        id: Number(row.id),
        name: row.identifier,
        description: row.flavor_text,
    }
}

function parseNatureCSV(row: any): Nature{
    return{
        id: Number(row.id),
        name: row.identifier,
        increased_stat_id: row.increased_stat_id,
        decreased_stat_id: row.decreased_stat_id,
    }
}

function parseEggGroupCSV(row: any): EggGroup{
    return{
        id: Number(row.id),
        name: row.identifier,
    }
}

function parseStatCSV(row: any): Stat{
    return{
        id: Number(row.id),
        name: row.identifier,
    }
}

function parseTypeCSV(row: any): Type{
    return{
        id: Number(row.id),
        name: row.identifier,
        generation_id: row.generation_id,
    }
}

function parseTypeEffectivenessCSV(row: any, id: number): TypeEffectiveness{
    return{
        id: id,
        type_id: row.damage_type_id,
        target_type_id: row.target_type_id,
        damage_factor: row.damage_factor
    }
}

function parsePokemonStatCSV(row: any, id: number): PokemonStat{
    return{
        id: id,
        pokemon_id: row.pokemon_id,
        stat_id: row.stat_id,
        base_stat: row.base_stat
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

function parsePokemonTypeCSV(row: any, id: number): PokemonType{
    return{
        id: id,
        pokemon_id: row.pokemon_id,
        type_id: row.type_id,
    }
}

function parsePokemonEggGroupCSV(row: any, id: number): PokemonEggGroup{
    return{
        id: id,
        pokemon_id: row.species_id,
        egg_group_id: row.egg_group_id,
    }
}



async function main(){

    // csv file path
    const pokemon_path="/Users/luq/Documents/projects/PKMNHub/csv/pokemon.csv";
    const generation_path="/Users/luq/Documents/projects/PKMNHub/csv/generations.csv";
    const region_path="/Users/luq/Documents/projects/PKMNHub/csv/regions.csv";
    const version_path="/Users/luq/Documents/projects/PKMNHub/csv/versions.csv";
    const version_group_path="/Users/luq/Documents/projects/PKMNHub/csv/version_groups.csv";
    const version_group_region_path="/Users/luq/Documents/projects/PKMNHub/csv/version_group_regions.csv";
    const pokedex_path="/Users/luq/Documents/projects/PKMNHub/csv/pokedexes.csv";
    const pokedex_version_group_path="/Users/luq/Documents/projects/PKMNHub/csv/pokedex_version_groups.csv";
    const pokemon_dex_number_path="/Users/luq/Documents/projects/PKMNHub/csv/pokemon_dex_numbers.csv";
    const abilities_path="/Users/luq/Documents/projects/PKMNHub/csv/abilities.csv";
    const abilities_description_path="/Users/luq/Documents/projects/PKMNHub/csv/ability_flavor_text.csv";
    const nature_path="/Users/luq/Documents/projects/PKMNHub/csv/natures.csv";
    const stat_path="/Users/luq/Documents/projects/PKMNHub/csv/stats.csv";
    const egg_group_path="/Users/luq/Documents/projects/PKMNHub/csv/egg_groups.csv";
    const type_path="/Users/luq/Documents/projects/PKMNHub/csv/types.csv";
    const type_effectiveness_path="/Users/luq/Documents/projects/PKMNHub/csv/type_efficacy.csv";
    const pokemon_abilities_path="/Users/luq/Documents/projects/PKMNHub/csv/pokemon_abilities.csv";
    const pokemon_state_path="/Users/luq/Documents/projects/PKMNHub/csv/pokemon_stats.csv";
    const pokemon_type_path="/Users/luq/Documents/projects/PKMNHub/csv/pokemon_types.csv";
    const pokemon_egg_group_path="/Users/luq/Documents/projects/PKMNHub/csv/pokemon_egg_groups.csv";

    // csv file content
    const pokemon_CSV=await readCSV(pokemon_path);
    const generations_CSV=await readCSV(generation_path);
    const regions_CSV=await readCSV(region_path);
    const versions_CSV=await readCSV(version_path);
    const version_groups_CSV=await readCSV(version_group_path);
    const version_group_regions_CSV=await readCSV(version_group_region_path);
    const pokedexes_CSV=await readCSV(pokedex_path);
    const pokedex_version_groups_CSV=await readCSV(pokedex_version_group_path);
    const pokemon_dex_numbers_CSV=await readCSV(pokemon_dex_number_path);
    const abilities_CSV=await readCSV(abilities_path);
    const abilities_description_CSV=await readCSV(abilities_description_path);
    const natures_CSV=await readCSV(nature_path);
    const stats_CSV=await readCSV(stat_path);
    const egg_groups_CSV=await readCSV(egg_group_path);
    const types_CSV=await readCSV(type_path);
    const types_effectiveness_CSV=await readCSV(type_effectiveness_path);
    const pokemon_abilities_CSV=await readCSV(pokemon_abilities_path);
    const pokemon_stats_CSV=await readCSV(pokemon_state_path);
    const pokemon_types_CSV=await readCSV(pokemon_type_path);
    const pokemon_egg_groups_CSV=await readCSV(pokemon_egg_group_path);

    // csv file content
    const pokemon: Pokemon[]=pokemon_CSV.map(parsePokemonCSV);
    const generations: Generation[]=generations_CSV.map(parseGenerationCSV);
    const regions: Region[]=regions_CSV.map(parseGenerationCSV);
    const versions: Version[]=versions_CSV.map(parseVersionCSV);
    const version_groups: VersionGroup[]=version_groups_CSV.map(parseVersionGroupCSV);
    const version_group_regions: VersionGroupRegion[]=version_group_regions_CSV.map(parseVersionGroupRegionCSV);
    const pokedexes: Pokedex[]=pokedexes_CSV.map(parsePokedexCSV);
    const pokedex_version_groups: PokedexVersionGroup[]=pokedex_version_groups_CSV.map(parsePokedexVersionGroupCSV);
    const pokemon_dex_numbers: PokemonDexNumber[]=pokemon_dex_numbers_CSV.map(parsePokemonDexNumberCSV);
    const abilities: Ability[]=abilities_CSV.map(ability_row=>{
        const description_row=abilities_description_CSV.find(
            row=>row.ability_id===ability_row.id&&row.language_id==='9'
        );

        const combined_ability_row={
            ...ability_row,
            flavor_text: description_row?.flavor_text?? { flavor_text: "no description" },
        }

        return parseAbilityCSV(
            combined_ability_row,  
        );
    })
    
    const natures: Nature[]=natures_CSV.map(parseNatureCSV);
    const stats: Stat[]=stats_CSV.map(parseStatCSV);
    const egg_groups: Stat[]=egg_groups_CSV.map(parseEggGroupCSV);
    const types: Type[]=types_CSV.map(parseTypeCSV);
    const type_effectiveness: TypeEffectiveness[]=types_effectiveness_CSV.map(parseTypeEffectivenessCSV);

    const pokemon_abilities: PokemonAbility[]=pokemon_abilities_CSV.map(parsePokemonAbilityCSV);
    const pokemon_stats: PokemonStat[]=pokemon_stats_CSV.map(parsePokemonStatCSV);
    const pokemon_types: PokemonType[]=pokemon_types_CSV.map(parsePokemonTypeCSV);
    const pokemon_egg_groups: PokemonEggGroup[]=pokemon_egg_groups_CSV.map(parsePokemonEggGroupCSV);

    console.log("pokemon.csv", pokemon.slice(0,3));
    console.log("generations.csv", generations.slice(0,9));
    console.log("regions.csv", regions.slice(0,10));
    console.log("versions.csv", versions.slice(0,10));
    console.log("version_groups.csv", version_groups.slice(0,10));
    console.log("version_group_regions.csv", version_group_regions.slice(0,10));
    console.log("pokedexes.csv", pokedexes.slice(0,10));
    console.log("pokedex_version_groups.csv", pokedex_version_groups.slice(0,10));
    console.log("pokemon_dex_numbers.csv", pokemon_dex_numbers.slice(0,10));
    console.log("natures.csv", natures.slice(0,3));
    console.log("abilities.csv", abilities.slice(0,3));
    console.log("pokemon_abilities.csv", pokemon_abilities.slice(0,3));
    console.log("stats.csv", stats.slice(0,6));
    console.log("egg_groups.csv", egg_groups.slice(0,6));
    console.log("pokemon_egg_groups.csv", pokemon_egg_groups.slice(0,3));
    console.log("pokemon_stats.csv", pokemon_stats.slice(0,3));
    console.log("types.csv", types.slice(0,18));
    console.log("type_efficacy.csv", type_effectiveness.slice(0,18));
    console.log("pokemon_types.csv", pokemon_types.slice(0,18));
}

main();