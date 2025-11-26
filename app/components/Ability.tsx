
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
    const [query, setQuery]=useState<string>("");
    const [page, setPage]=useState<number>(1);
    const [isLoading, setLoadingStatus]=useState<boolean>(true);
    const limit=25;
    useEffect(()=>{
        fetch(`/api/ability?page=${page}&limit=${limit}&q=${encodeURIComponent(query)}`)
            .then(response=>response.json())
            .then(data=>setAbilities(
                data.abilities.sort(
                    (a: Ability, b: Ability)=>a.name.localeCompare(b.name)
                )
            ))
            .catch(error=>console.error(error))
            .finally(()=>setLoadingStatus(false))
    }, [page,query])

    const handle_submit=(e: React.FormEvent)=>{
        e.preventDefault()
        setQuery(search);
    }

    return <>
    
    <div>
        <form onSubmit={handle_submit}>
            <input 
                type="text" 
                value={search}
                onChange={e=>{
                    setSearch(e.target.value);
                    setPage(1);
                }}
                placeholder="enter ability name"

            />
            <button type="submit">search ability</button>
        </form>
        {isLoading?(
            <h3>Loading Abilities...</h3>
        ):(
        <ul>
            {abilities.map(
                a=>(
                    <div className="ability-container-div">
                        <li key={a.id} >
                            <h3>{a.name}</h3>
                            <h3>{a.description}</h3>
                        </li>
                    </div>
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