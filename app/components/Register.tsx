
"use client";
import React, { useState } from "react";
import { useRegister } from "../api/hooks/useRegister";


export default function RegisterForm(){
    const [name, setName]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const mutation=useRegister();

    const handle_submit=(e: React.FormEvent)=>{
        e.preventDefault();
        mutation.mutate({
            name, email, password
        })
    }

    return(
        <form onSubmit={handle_submit}>
            <h2>Register an account</h2>
            <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
            <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <input placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
            <button type="submit">Register</button>
            {mutation.isError && <p>{(mutation.error as Error).message}</p>}
            {mutation.isSuccess && <p>Registration Successful</p>}
        </form>
    )
}