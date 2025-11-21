
import fs, { read } from "fs";
import { parse } from "csv-parse"
import { error } from "console";
import { DBClient } from "../app/api/helpers/prisma-client";

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
 * - locations.csv
 */
type Location={
    /**
     * Location ID
     * - row.id
     */
    id: number;
    /**
     * Location Name
     * - row.identifier
     */
    name: string;
    /**
     * Region ID of the location
     * - row.regtion_id
     */
    region_id: number;
}

/**
 * Location Area - Specific areas within a location such as caves
 * - location_areas.csv
 * 
 */
type LocationArea={
    /**
     * Location Area ID
     * - row.id
     */
    id: number;
    /**
     * Location Area Name
     * - row.identifier
     */
    name: string;
    /**
     * Location ID of the area
     * - row.location_id
     */
    location_id: number;
}

/**
 * Location Area Encounter Rate
 * location_area_encounter_rates.csv
 */
type LocationAreaEncounterRate={
    /**
     * Location Area Encounter Rate ID
     * - Unique Value
     */
    id: number;
    /**
     * Location Area ID of this Location Area Encounter Rate
     * - row.location_area_id
     */
    location_area_id: number;
    /**
     * Encounter Method ID of this Location Area Encounter Rate
     * row.encounter_method_id
     */
    encounter_method_id: number;
    /**
     * Version/Game ID of this Location Area Encounter Rate
     * - row.version_id
     */
    version_id: number;
    /**
     * Encounter Rate
     * row.rate
     */
    rate: number;
}

/**
 * Encounter
 * encounters.csv
 */
type Encounter={
    /**
     * Encounter ID
     * - row.id
     */
    id: number;
    /**
     * Version/Game ID of this encounter
     * - row.version_id
     */
    version_id: number;
    /**
     * Pokemon ID of this encounter
     * - row.pokemon_id
     */
    pokemon_id: number;
    /**
     * Location Area ID of this encounter (in cave floor 2, etc.)
     * - row.location_area_id
     */
    location_area_id: number;
    /**
     * Encounter Slot ID of this encounter
     * - row.encounter_slot_id
     */
    encounter_slot_id: number;
    /**
     * Minimum Level of this encounter
     * - row.min_level
     */
    min_level: number;
    /**
     * Maximum Level of this encounter
     * - row.max_level
     */
    max_level: number;
}

/**
 * Encounter Slot (specific slot number, rarity, and encounter method)
 * - encounter_slots.csv
 */
type EncounterSlot={
    /**
     * Encounter Slot ID
     * - row.id
     */
    id: number;
    /**
     * Version Group of this encounter slot
     * - row.version_group_id
     */
    version_group_id: number;
    /**
     * Encounter Method of this encounter slot
     * - row.encounter_method_id
     */
    encounter_method_id: number;
    /**
     * Encounter Slot number
     * - row.slot
     */
    slot: number;
    /**
     * Rarity of this encounter slot
     * - row.rarity
     */
    rarity: number;
}

/**
 * Methods of encounters (walk, fishing, surf, etc.)
 * - encounter_methods.csv
 */
type EncounterMethod={
    /**
     * Encounter Method ID
     * - row.id
     */
    id: number;
    /**
     * Encounter Method Name
     * - row.identifier
     */
    name: string;
}

/**
 * Encounter Condition (swarm, time, season, etc.)
 * - encounter_conditions.csv
 */
type EncounterCondition={
    /**
     * Encounter Condition ID
     * row.id
     */
    id: number;
    /**
     * Encounter Condition Name
     * row.identifier
     */
    name: string;
}

/**
 * Encounter Condition Value
 * - encounter_condition_values
 */
type EncounterConditionValue={
    /**
     * Encounter Condition Value ID
     * - row.id
     */
    id: number;
    /**
     * Encounter Condition ID of this Encounter Condition Value
     * - row.encounter_condition_id
     */
    encounter_condition_id: number;
    /**
     * Encounter Condition Value Name
     * row.identifier
     */
    name: string;
    /**
     * Encounter Condition Value Default status
     * row.is_default
     */
    is_default: boolean;
}

/**
 * Encounter Condition Value Map with Encounter
 * - encounter_condition_value_map.csv
 */
type EncounterConditionValueMap={
    /**
     * Encounter Condition Value ID
     * - Unique Value
     */
    id: number;
    /**
     * Encounter ID
     * row.encounter_id
     */
    encounter_id: number;
    /**
     * Encounter Condition Value ID
     * row.encounter_condition_value_id
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

/**
 * Move
 * - moves.csv
 */
type Move={
    /**
     * Move ID
     * - row.id
     */
    id: number;
    /**
     * Move Name
     * - row.name
     */
    name: string;
    /**
     * Move Generation
     * - row.generation_id
     */
    generation_id: number
    /**
     * Move Type ID
     * - row.type_id
     */
    type_id: number;
    /**
     * Move PP
     * - row.pp
     */
    pp: number;
    /**
     * Move Accuracy
     * - row.accuracy
     */
    accuracy: number;
    /**
     * Move Priority
     * - row.priority
     */
    priority: number
    /**
     * Move Damage Class (special, physical, status)
     * - row.damage_class_id
     */
    move_damage_class_id: number;
    /**
     * Move Effect ID
     * - row.effect_id
     */
    move_effect_id: number;
}

/**
 * Move Effect
 * - move_effect_prose.csv
 */
type MoveEffect={
    /**
     * Move Effect ID
     * - row.move_effect_id
     */
    id: number;
    /**
     * Move Effect Description
     * - row.short_effect
     */
    description: string;
}

/**
 * Move Damage Class
 * - move_damage_classes.csv
 */
type MoveDamageClass={
     /**
     * Move Damage Class ID
     * - row.id
     */
    id: number;
    /**
     * Move Damage Class Name
     * - row.identifier
     */
    name: string;
}

/**
 * Pokemon Move
 * - pokemon_moves.csv
 */
type PokemonMove={
    /**
     * Pokemon Move ID
     * - row.id
     */
    id: number;
    /**
     * Version Group ID
     * - row.version_group_id
     */
    version_group_id: number;
    /**
     * Method to learn this move by the Pokemon
     * - row.pokemon_move_method_id
     */
    pokemon_move_method_id: number;
    /**
     * Move ID
     * - row.move_id
     */
    move_id: number;
    /**
     * Level to learn this move
     * - row.level
     */
    level: number;
    /**
     * Pokemon ID
     * - row.pokemon_id
     */
    pokemon_id: number
}

/**
 * Move Method
 * - pokemon_move_methods.csv
 */
type MoveMethod={
    /**
     * Move Method ID
     * - row.id
     */
    id: number;
    /**
     * Move Method Name
     * - row.identifier
     */
    name: string
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
function parseLocationCSV(row: any): Location{
    return{
        id: Number(row.id),
        name: row.identifier,
        region_id: Number(row.region_id),
    }
}
function parseLocationAreaCSV(row: any): LocationArea{
    return{
        id: Number(row.id),
        name: row.identifier,
        location_id: Number(row.location_id),
    }
}
function parseEncounterMethodCSV(row: any): EncounterMethod{
    return{
        id: Number(row.id),
        name: row.identifier,
    }
}
function parseEncounterConditionCSV(row: any): EncounterCondition{
    return{
        id: Number(row.id),
        name: row.identifier,
    }
}
function parseEncounterConditionValueCSV(row: any): EncounterConditionValue{
    return{
        id: Number(row.id),
        name: row.identifier,
        encounter_condition_id: Number(row.encounter_condition_id),
        is_default: row.is_default==="1",
    }
}
function parseEncounterConditionValueMapCSV(row: any,id: any): EncounterConditionValueMap{
    return{
        id: Number(id),
        encounter_id: Number(row.encounter_id),
        encounter_condition_value_id: Number(row.encounter_condition_value_id),
    }
}
function parseEncounterSlotCSV(row: any): EncounterSlot{
    return{
        id: Number(row.id),
        version_group_id: Number(row.version_group_id),
        encounter_method_id: Number(row.encounter_method_id),
        slot: Number(row.slot),
        rarity: Number(row.rarity)
    }
}
function parseEncounterCSV(row: any,id: any): Encounter{
    return{
        id: Number(row.id),
        version_id: Number(row.version_id),
        pokemon_id: Number(row.pokemon_id),
        location_area_id: Number(row.location_area_id),
        encounter_slot_id: Number(row.encounter_slot_id),
        min_level: Number(row.min_level),
        max_level: Number(row.max_level),
    }
}
function parseLocationAreaEncounterRateCSV(row: any,id: any): LocationAreaEncounterRate{
    return{
        id: Number(id),
        location_area_id: Number(row.location_area_id),
        encounter_method_id: Number(row.encounter_method_id),
        version_id: Number(row.version_id),
        rate: Number(row.rate),
    }
}

function parsePokemonStatCSV(row: any, id: number): PokemonStat{
    return{
        id: Number(id),
        pokemon_id: Number(row.pokemon_id),
        stat_id: Number(row.stat_id),
        base_stat: Number(row.base_stat)
    }
}

function parsePokemonAbilityCSV(row: any, id: number): PokemonAbility{
    return{
        id: Number(id),
        pokemon_id: Number(row.pokemon_id),
        ability_id: Number(row.ability_id),
        is_hidden: row.is_hidden==="1",
    }
}

function parsePokemonTypeCSV(row: any, id: number): PokemonType{
    return{
        id: Number(id),
        pokemon_id: Number(row.pokemon_id),
        type_id: Number(row.type_id),
    }
}

function parsePokemonEggGroupCSV(row: any, id: number): PokemonEggGroup{
    return{
        id: Number(id),
        pokemon_id: Number(row.species_id),
        egg_group_id: Number(row.egg_group_id),
    }
}

function parseMoveMethodCSV(row: any, id: number): MoveMethod{
    return{
        id: Number(id),
        name: row.identifier,
    }
}
function parseMoveCSV(row: any): Move{
    return{
        id: Number(row.id),
        name: row.identifier,
        generation_id: Number(row.generation_id),
        type_id: Number(row.type_id),
        pp: Number(row.pp),
        accuracy: Number(row.accuracy),
        priority: Number(row.priority),
        move_damage_class_id: Number(row.damage_class_id),
        move_effect_id: Number(row.effect_id),
    }
}
function parseMoveEffectCSV(row: any): MoveEffect{
    return{
        id: Number(row.move_effect_id),
        description: row.short_effect,
    }
}
function parsePokemonMoveCSV(row: any, id: any): PokemonMove{
    return{
        id: Number(id),
        version_group_id: Number(row.version_group_id),
        pokemon_move_method_id: Number(row.pokemon_move_method_id),
        move_id: Number(row.move_id),
        level: Number(row.level),
        pokemon_id: Number(row.pokemon_id)

    }
}
function parseMoveDamageClassCSV(row: any, id: number): MoveDamageClass{
    return{
        id: Number(id),
        name: row.identifier,
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
    const ability_path="/Users/luq/Documents/projects/PKMNHub/csv/abilities.csv";
    const ability_description_path="/Users/luq/Documents/projects/PKMNHub/csv/ability_flavor_text.csv";
    const nature_path="/Users/luq/Documents/projects/PKMNHub/csv/natures.csv";
    const stat_path="/Users/luq/Documents/projects/PKMNHub/csv/stats.csv";
    const egg_group_path="/Users/luq/Documents/projects/PKMNHub/csv/egg_groups.csv";
    const type_path="/Users/luq/Documents/projects/PKMNHub/csv/types.csv";
    const type_effectiveness_path="/Users/luq/Documents/projects/PKMNHub/csv/type_efficacy.csv";
    const location_path="/Users/luq/Documents/projects/PKMNHub/csv/locations.csv";
    const location_area_path="/Users/luq/Documents/projects/PKMNHub/csv/location_areas.csv";
    const encounter_method_path="/Users/luq/Documents/projects/PKMNHub/csv/encounter_methods.csv";
    const encounter_condition_path="/Users/luq/Documents/projects/PKMNHub/csv/encounter_conditions.csv";
    const encounter_condition_value_path="/Users/luq/Documents/projects/PKMNHub/csv/encounter_condition_values.csv";
    const encounter_condition_value_map_path="/Users/luq/Documents/projects/PKMNHub/csv/encounter_condition_value_map.csv";
    const encounter_slot_path="/Users/luq/Documents/projects/PKMNHub/csv/encounter_slots.csv";
    const encounter_path="/Users/luq/Documents/projects/PKMNHub/csv/encounters.csv";
    const location_area_encounter_rate_path="/Users/luq/Documents/projects/PKMNHub/csv/location_area_encounter_rates.csv";
    const pokemon_ability_path="/Users/luq/Documents/projects/PKMNHub/csv/pokemon_abilities.csv";
    const pokemon_state_path="/Users/luq/Documents/projects/PKMNHub/csv/pokemon_stats.csv";
    const pokemon_type_path="/Users/luq/Documents/projects/PKMNHub/csv/pokemon_types.csv";
    const pokemon_egg_group_path="/Users/luq/Documents/projects/PKMNHub/csv/pokemon_egg_groups.csv";
    const move_method_path="/Users/luq/Documents/projects/PKMNHub/csv/pokemon_move_methods.csv";
    const move_effect_path="/Users/luq/Documents/projects/PKMNHub/csv/move_effect_prose.csv";
    const move_path="/Users/luq/Documents/projects/PKMNHub/csv/moves.csv";
    const move_damage_class_path="/Users/luq/Documents/projects/PKMNHub/csv/move_damage_classes.csv";
    const pokemon_move_path="/Users/luq/Documents/projects/PKMNHub/csv/pokemon_moves.csv";

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
    const abilities_CSV=await readCSV(ability_path);
    const abilities_description_CSV=await readCSV(ability_description_path);
    const natures_CSV=await readCSV(nature_path);
    const stats_CSV=await readCSV(stat_path);
    const egg_groups_CSV=await readCSV(egg_group_path);
    const types_CSV=await readCSV(type_path);
    const types_effectiveness_CSV=await readCSV(type_effectiveness_path);
    const locations_CSV=await readCSV(location_path);
    const location_areas_CSV=await readCSV(location_area_path);
    const encounter_methods_CSV=await readCSV(encounter_method_path);
    const encounter_conditions_CSV=await readCSV(encounter_condition_path);
    const encounter_condition_values_CSV=await readCSV(encounter_condition_value_path);
    const encounter_condition_value_maps_CSV=await readCSV(encounter_condition_value_map_path);
    const encounter_slots_CSV=await readCSV(encounter_slot_path);
    const encounters_CSV=await readCSV(encounter_path);
    const location_area_encounter_rates_CSV=await readCSV(location_area_encounter_rate_path);
    const pokemon_abilities_CSV=await readCSV(pokemon_ability_path);
    const pokemon_stats_CSV=await readCSV(pokemon_state_path);
    const pokemon_types_CSV=await readCSV(pokemon_type_path);
    const pokemon_egg_groups_CSV=await readCSV(pokemon_egg_group_path);
    const move_methods_CSV=await readCSV(move_method_path);
    const move_effects_CSV=await readCSV(move_effect_path);
    const moves_CSV=await readCSV(move_path);
    const move_damage_classes_CSV=await readCSV(move_damage_class_path);
    const pokemon_moves_CSV=await readCSV(pokemon_move_path);

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
    const locations: Location[]=locations_CSV.map(parseLocationCSV);
    const location_areas: LocationArea[]=location_areas_CSV.map(parseLocationAreaCSV);
    const encounter_methods: EncounterMethod[]=encounter_methods_CSV.map(parseEncounterMethodCSV);
    const encounter_conditions: EncounterCondition[]=encounter_conditions_CSV.map(parseEncounterConditionCSV);
    const encounter_condition_values: EncounterConditionValue[]=encounter_condition_values_CSV.map(parseEncounterConditionValueCSV);
    const encounter_condition_value_maps: EncounterConditionValueMap[]=encounter_condition_value_maps_CSV.map(parseEncounterConditionValueMapCSV);
    const encounter_slots: EncounterSlot[]=encounter_slots_CSV.map(parseEncounterSlotCSV);
    const encounters: Encounter[]=encounters_CSV.map(parseEncounterCSV);
    const location_area_encounter_rates: LocationAreaEncounterRate[]=location_area_encounter_rates_CSV.map(parseLocationAreaEncounterRateCSV);
    const pokemon_abilities: PokemonAbility[]=pokemon_abilities_CSV.map(parsePokemonAbilityCSV);
    const pokemon_stats: PokemonStat[]=pokemon_stats_CSV.map(parsePokemonStatCSV);
    const pokemon_types: PokemonType[]=pokemon_types_CSV.map(parsePokemonTypeCSV);
    const pokemon_egg_groups: PokemonEggGroup[]=pokemon_egg_groups_CSV.map(parsePokemonEggGroupCSV);
    const move_methods: MoveMethod[]=move_methods_CSV.map(parseMoveMethodCSV);
    const move_effects: MoveEffect[]=move_effects_CSV.map(parseMoveEffectCSV);
    const moves: Move[]=moves_CSV.map(parseMoveCSV);
    const move_damage_classes: MoveDamageClass[]=move_damage_classes_CSV.map(parseMoveDamageClassCSV);
    const pokemon_moves: PokemonMove[]=pokemon_moves_CSV.map(parsePokemonMoveCSV);

    // console.log("pokemon.csv", pokemon.slice(0,3));
    // console.log("generations.csv", generations.slice(0,9));
    // console.log("regions.csv", regions.slice(0,10));
    // console.log("versions.csv", versions.slice(0,10));
    // console.log("version_groups.csv", version_groups.slice(0,10));
    // console.log("version_group_regions.csv", version_group_regions.slice(0,10));
    // console.log("pokedexes.csv", pokedexes.slice(0,10));
    // console.log("pokedex_version_groups.csv", pokedex_version_groups.slice(0,10));
    // console.log("pokemon_dex_numbers.csv", pokemon_dex_numbers.slice(0,10));
    // console.log("natures.csv", natures.slice(0,3));
    // console.log("abilities.csv", abilities.slice(0,3));
    // console.log("pokemon_abilities.csv", pokemon_abilities.slice(0,3));
    // console.log("stats.csv", stats.slice(0,6));
    // console.log("egg_groups.csv", egg_groups.slice(0,6));
    // console.log("pokemon_egg_groups.csv", pokemon_egg_groups.slice(0,3));
    // console.log("pokemon_stats.csv", pokemon_stats.slice(0,3));
    // console.log("types.csv", types.slice(0,18));
    // console.log("type_efficacy.csv", type_effectiveness.slice(0,18));
    // console.log("pokemon_types.csv", pokemon_types.slice(0,18));
    // console.log("locations.csv", locations.slice(0,3));
    // console.log("location_areas.csv", location_areas.slice(0,10));
    // console.log("encounter_methods.csv", encounter_methods.slice(0,3));
    // console.log("encounter_conditions.csv", encounter_conditions.slice(0,3));
    // console.log("encounter_condition_values.csv", encounter_condition_values.slice(0,3));
    // console.log("encounter_condition_value_maps.csv", encounter_condition_value_maps.slice(0,3));
    // console.log("encounter_slots.csv", encounter_slots.slice(0,3));
    // console.log("encounters.csv", encounters.slice(0,3));
    // console.log("location_area_encounter_rates.csv", location_area_encounter_rates.slice(0,3));
    // console.log("pokemon_move_methods.csv", move_methods.slice(0,3));
    // console.log("move_effects.csv", move_effects.slice(0,3));
    // console.log("moves.csv", moves.slice(0,3));
    // console.log("move_damage_classes.csv", move_damage_classes.slice(0,3));
    // console.log("pokemon_moves.csv", pokemon_moves.slice(0,3));
    
    const prisma=DBClient.getInstance();
    
    const pokemon_result=await prisma.pokemon.createMany({
        data: pokemon,
        skipDuplicates: true,
    })

    console.log("Inserted Pokémon:", pokemon_result);
}


main();