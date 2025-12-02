
"use client"
import { useEffect, useState } from "react";
import { Ability, EggGroup, Encounter, Location, Move, Pokemon, PokemonAbility, PokemonEggGroup, PokemonMove, PokemonStat, PokemonType, Stat, Type } from "../../../../generated/prisma";
import {use} from "react";

type PokemonDetails={
    name: string;
    id: number;
    sprite_url: string | null;
    cry_url: string | null;
    types: (PokemonType&{type: Type})[],
    abilities: (PokemonAbility&{ability: Ability})[],
    egg_groups: (PokemonEggGroup&{egg_group: EggGroup})[],
    stats: (PokemonStat&{stat: Stat})[],
    move: PokemonMove[],
    encounters: Encounter[],   
}

export default function PokemonDetails(
    params: {params: Promise<{id: number}>}
){
    const {id}=use(params.params);
    // const [pokemon_details, setPokemonDetails]=useState<PokemonDetails>();
    const [pokemon_details, setPokemonDetails]=useState<PokemonDetails>();

    useEffect(()=>{
        console.log("fetching....id:", id);
        fetch(`/api/pokemon/${id}`)
        .then(response=>response.json())
        .then(data=>setPokemonDetails(data.pokemon))
        .catch(error=>console.log(error))
    }, [])



    return <>
        <p>{pokemon_details?.name} page id: {id}</p>

        Type:
        {pokemon_details?.types.map(type=>(
            <div>
                <p>{type.type.name}</p>
            </div>
        ))}

        Abilities:
        {pokemon_details?.abilities.map(ability=>(
            <div key={ability.ability_id}>
                <p>Ability: {ability.ability.name}</p>
                <p>{ability.ability.description}</p>
            </div>
        ))}

        Egg Groups:
        {pokemon_details?.egg_groups.map(egg_group=>(
            <p>{egg_group.egg_group.name}</p>
        ))}

        Stat:
        {pokemon_details?.stats.map(stat=>(
            stat.stat_id===stat.stat.id?(
                <p>{stat.stat.name}: {stat.base_stat}</p>
            ):(
                <p></p>
            )
        ))}

    </>
}