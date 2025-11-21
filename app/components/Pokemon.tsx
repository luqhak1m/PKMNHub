
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
    const limit=25;

    useEffect(()=>{
        fetch(`/api/pokemon?page=${page}&limit=${limit}&q=${encodeURIComponent(search)}`)
            .then(response=>response.json())
            .then(data=>{
                setPokemon(data.pokemon.sort(
                    (a: Pokemon, b: Pokemon)=>a.id-b.id)
                )
            })
            .catch(error=>console.error(error));
    }, [page, search]); // runs this every time the page is set or the search bar is being typed on

    const play_cry=(p: Pokemon)=>{
        const audio=getCachedAudio(p.id, p.cry_url);
        audio.play();
    }

    return <div>
        <input
            type="text"
            placeholder="search pokemon name"
            value={search}
            onChange={e=>{
                setSearch(e.target.value);
                setPage(1);
            }}
        >
        </input>
        <h2>Pokemon List:</h2>
        <ul>
            {pokemon.map(
                p=>(
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
                )
            )}
        </ul>
        <button disabled={page===1} onClick={()=>setPage(page-1)}>Previous</button>
        <button onClick={()=>setPage(page+1)}>Next</button>

    </div>

}