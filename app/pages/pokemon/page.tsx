
"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRef } from "react";
import getCachedAudio from "../../utils/Audio-Cache";
import { Pokemon, Ability, Pokedex } from "../../../generated/prisma";
import "./styles.css"

type PokemonDexNumber = {
  id: number;
  pokemon_id: number;
  pokedex_id: number;
  pokedex_number: number;
  pokemon: Pokemon
}


export default function PokemonList(){
    const [pokemon, setPokemon]=useState<Pokemon[]>([]);
    const [abilities, setAbilities]=useState<Ability[]>([]);
    const [pokedexes, setPokedexes]=useState<Pokedex[]>([]);
    const [pokemon_dex_number, setPokemonDexNumber]=useState<PokemonDexNumber[]>([]);

    const [ability, setAbility]=useState<string>("");
    const [pokedex, setPokedex]=useState<number>(1);

    const [page, setPage]=useState<number>(1);
    const [search, setSearch]=useState<string>("");
    const [query, setQuery]=useState<string>("");
    const [isLoading, setLoadingStatus]=useState<boolean>(true)
    const limit=25;

    // useEffect(()=>{
    //     fetch(`
            
    //         /api/pokemon?page=${page}&limit=${limit}&q=${encodeURIComponent(query)}&ability=${ability}&pokedex=${pokedex}
            
    //         `)
    //         .then(response=>response.json())
    //         .then(data=>{
    //             setPokemon(data.pokemon)
    //         })
    //         .catch(error=>console.error(error))
    //         .finally(()=>setLoadingStatus(false))
    // }, [query, search, ability, page, pokedex]); // runs this every time the page is set or the search bar is being typed on

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

    useEffect(()=>{
        fetch("/api/pokedex")
        .then(response=>response.json())
        .then(data=>setPokedexes(data.pokedexes))
        .catch(error=>console.error(error))
        .finally(()=>setLoadingStatus(false))
    }, [])

    useEffect(()=>{
        fetch(`
            /api/pokemon-dex-number?page=${page}&limit=${limit}&q=${encodeURIComponent(query)}&ability=${ability}&pokedex=${pokedex}
            `)
        .then(response=>response.json())
        .then(data=>{
            setPokemonDexNumber(data.pokemon_dex_number);
        })
        .catch(error=>console.error(error))
        .finally(()=>setLoadingStatus(false))
        console.log(pokemon_dex_number);
    }, [query, search, ability, page, pokedex]); // runs this every time the page is set or the search bar is being typed on

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

        <div className="search-filter-container-div">
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
            

            <div id="abilities-filter-div">
                <label htmlFor="abilities">Filter Pokemon by abilities: </label>
                {isLoading?(
                    <h3>Loading Abilities...</h3>
                ):(
                    <select name="abilities" id="abilities" defaultValue="" onChange={e=>{
                            setAbility(e.target.value)
                            setPage(1);

                        }}>
                        <option value="">--select an ability--</option>
                        {abilities.map(ability=>(
                            <option value={ability.name} key={ability.id}>{ability.name}</option>
                        ))}
                    </select>
                )}
            </div>

            <div id="pokedexes-filter-div">
                <label htmlFor="pokedexes">Filter Pokemon by pokedex: </label>
                {isLoading?(
                    <h3>Loading Pokedexes...</h3>
                ):(
                    <select name="pokedexes" id="pokedexes" defaultValue={1} onChange={e=>{
                            setPokedex(parseInt(e.target.value));
                            setPage(1);
                        }}>
                        {pokedexes.map(pokedex=>(
                            <option value={pokedex.id} key={pokedex.id}>{pokedex.name}</option>
                        ))}
                    </select>
                )}
            </div>
        </div>

        {isLoading?(
            <h3>Loading Pokemon...</h3>
        ):(
            <ul>
                {pokemon_dex_number.map(pokemon_dex=>(
                    <button className="sprite-container-clickable-button" onClick={()=>{play_cry(pokemon_dex.pokemon)}} key={pokemon_dex.id}>
                        <div className="sprite-container-div">
                            {pokemon_dex.pokemon.sprite_url && <img className="sprite-img" src={pokemon_dex.pokemon.sprite_url} alt={pokemon_dex.pokemon.name}/>}
                            <div className="sprite-card-lower-div">
                                <h3>{pokemon_dex.pokedex_number}. {pokemon_dex.pokemon.name}</h3>
                                <span className="pokemon-details-span"><a href="#">Details</a></span>
                            </div>
                        </div>
                    </button>
                    )
                )}
            </ul>

        )}
        <button disabled={page===1} onClick={()=>setPage(page-1)}>Previous</button>
        <button onClick={()=>setPage(page+1)}>Next</button>

    </div>

}