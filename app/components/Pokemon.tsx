
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


    useEffect(()=>{
        fetch("/api/pokemon")
            .then(response=>response.json())
            .then(data=>{
                setPokemon(data.pokemon)
            })
            .catch(error=>console.error(error));
    }, []);

    const play_cry=(p: Pokemon)=>{
        const audio=getCachedAudio(p.id, p.cry_url);
        audio.play();
    }

    return <div>
        <h2>Pokemon List:</h2>
        <ul>
            {pokemon.map(
                p=>(
                    <li
                        key={p.id}
                    >
                        {p.name && <h3>{p.name}</h3>}
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

    </div>

}