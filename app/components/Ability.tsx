
"use client"

import { useEffect, useState } from "react"

type Ability={
    id: number;
    name: string;
    description: string;
}

export default function AbilitiesList(){
    const [abilities, setAbilities]=useState<Ability[]>([]);
    const [search, setSearch]=useState<string>("");
    const [page, setPage]=useState<number>(1);
    const [isLoading, setLoadingStatus]=useState<boolean>(true);
    const limit=25;
    useEffect(()=>{
        fetch(`/api/ability?page=${page}&limit=${limit}&q=${encodeURIComponent(search)}`)
            .then(response=>response.json())
            .then(data=>setAbilities(
                data.abilities.sort(
                    (a: Ability, b: Ability)=>a.id-b.id
                )
            ))
            .catch(error=>console.error(error))
            .finally(()=>setLoadingStatus(false))
    }, [page,search])

    return <>
    
    <div>
        <input 
            type="text" 
            value={search}
            onChange={e=>{
                setSearch(e.target.value);
            }}
            placeholder="enter ability name"

        />
        {isLoading?(
            <h3>Loading Abilities...</h3>
        ):(
        <ul>
            {abilities.map(
                a=>(
                    <li key={a.id} >
                        <h3>{a.id}. {a.name}</h3>
                        <h3>{a.description}</h3>
                    </li>
                )
            )}
        </ul>

        )}
        <button
            onClick={()=>{ setPage(page+1) }}>
            Next
        </button>

        <button
            disabled={page===1}
            onClick={()=>{
                setPage(page-1)
            }}
        >
            Previous
        </button>

    </div>

    </>
}