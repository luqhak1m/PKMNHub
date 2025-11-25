
"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import getCachedAudio from "../utils/Audio-Cache";
import { Pokemon, Ability } from "../../generated/prisma";


export default function PokemonList(){
    const [pokemon, setPokemon]=useState<Pokemon[]>([]);
    const [abilities, setAbilities]=useState<Ability[]>([]);
    const [ability, setAbility]=useState<string>("");
    const [page, setPage]=useState<number>(1);
    const [search, setSearch]=useState<string>("");
    const [query, setQuery]=useState<string>("");
    const [isLoading, setLoadingStatus]=useState<boolean>(true)
    const limit=25;

    useEffect(()=>{
        fetch(`/api/pokemon?page=${page}&limit=${limit}&q=${encodeURIComponent(query)}&ability=${ability}`)
            .then(response=>response.json())
            .then(data=>{
                setPokemon(data.pokemon.sort(
                    (a: Pokemon, b: Pokemon)=>a.id-b.id)
                )
            })
            .catch(error=>console.error(error))
            .finally(()=>setLoadingStatus(false))
        console.log("ability selected: ", ability);
    }, [query, search, ability, page]); // runs this every time the page is set or the search bar is being typed on

    useEffect(()=>{
        fetch(`/api/ability`)
            .then(response=>response.json())
            .then(data=>{
                setAbilities(data.abilities.sort(
                    (a: Ability, b: Ability)=>a.name.localeCompare(b.name))
                )
            })
            .catch(error=>console.error(error))
            .finally(()=>setLoadingStatus(false))
    }, [])

    const play_cry=(p: Pokemon)=>{
        const audio=getCachedAudio(p.id, p.cry_url || "");
        audio.play();
    }

    const search_pokemon=(searched_pokemon: any)=>{
        searched_pokemon.preventDefault();
        setQuery(search);
    }

    return <div>

        <h2>Pokemon List:</h2>
        <form onSubmit={search_pokemon}>
            <input
                type="text"
                placeholder="search pokemon name"
                value={search}
                onChange={e=>{
                    setSearch(e.target.value);
                    setPage(1);
                }}
                />
            <button type="submit">search pokemon</button>
        </form>
        


        <label htmlFor="abilities">Filter Pokemon by abilities: </label>
            {isLoading?(
                <h3>Loading Abilities...</h3>
            ):(
                <select name="abilities" id="abilities" defaultValue="" onChange={e=>setAbility(e.target.value)}>
                    <option value="">--select an ability--</option>
                    {abilities.map(ability=>(
                        <option value={ability.name} key={ability.id}>{ability.name}</option>
                    ))}
                 </select>
            )}

        {isLoading?(
            <h3>Loading Pokemon...</h3>
        ):(
            
            <ul>
                    {pokemon.map(
                        p=>(
                            <div className="sprite-container-div">
                                <li
                                    key={p.id}
                                >
                                    <h3>{p.id}. {p.name}</h3>
                                    {p.sprite_url && <img src={p.sprite_url} alt={p.name}/>}
                                    {/* {p.cry_url && <audio controls src={p.cry_url}/>} */}
                                    <button
                                        onClick={()=>{
                                            play_cry(p);
                                        }}
                                    >Cry</button>
                                </li>
                            </div>
                        )
                    )}
            </ul>

        )}
        <button disabled={page===1} onClick={()=>setPage(page-1)}>Previous</button>
        <button onClick={()=>setPage(page+1)}>Next</button>

    </div>

}