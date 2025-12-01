
"use client"
import { useEffect, useState } from "react";
import { Ability } from "../../../generated/prisma";

export default function AbilityList(){

    const [abilities, setAbilities]=useState<Ability[]>([]);
    const [is_loading, setLoadingStatus]=useState<boolean>(true);
    const [page, setPage]=useState<number>(1);
    const [search, setSearch]=useState<string>("");
    const [query, setQuery]=useState<string>("");
    const [limit, setLimit]=useState<number | undefined>()
    

    useEffect(()=>{
        fetch("/api/ability")
        .then(response=>response.json())
        .then(data=>setAbilities(data.abilities))
        .catch(error=>console.error(error))
        .finally(()=>setLoadingStatus(false));
    }, [])

    const handle_search=(e: React.FormEvent)=>{
        e.preventDefault();
    }

    return <div>

        <form onClick={handle_search}></form>

        {is_loading?(<h3>loading abilities...</h3>):(
            abilities.map(ability=>(
                <div key={ability.id}>
                    <p>{ability.id}. {ability.name}</p>
                    <p>{ability.description}</p>
                    <p>Introduced in generation {ability.generation_id}</p>
                </div>
            ))
        )}

    </div>
}
