
"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import getCachedAudio from "../utils/Audio-Cache";


type Pokemon={
    id: number;
    name: string;
    sprite_url: string;
    cry_url: string;
}

export default function PokemonList(){
    const [pokemon, setPokemon]=useState<Pokemon[]>([]);
    const [page, setPage]=useState<number>(1);
    const [search, setSearch]=useState<string>("");
    const [query, setQuery]=useState<string>("");
    const [isLoading, setLoadingStatus]=useState<boolean>(true)
    const limit=25;

    useEffect(()=>{
        fetch(`/api/pokemon?page=${page}&limit=${limit}&q=${encodeURIComponent(query)}`)
            .then(response=>response.json())
            .then(data=>{
                setPokemon(data.pokemon.sort(
                    (a: Pokemon, b: Pokemon)=>a.id-b.id)
                )
            })
            .catch(error=>console.error(error))
            .finally(()=>setLoadingStatus(false))
    }, [page, query]); // runs this every time the page is set or the search bar is being typed on

    const play_cry=(p: Pokemon)=>{
        const audio=getCachedAudio(p.id, p.cry_url);
        audio.play();
    }

    const search_pokemon=(searched_pokemon: any)=>{
        searched_pokemon.preventDefault();
        setQuery(search);
    }

    return <div>

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
        

        <h2>Pokemon List:</h2>
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