
"use client";
import React from "react";
import useLogin from "../api/hooks/useLogin";
import { useState } from "react";

export default function LoginForm(){
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");

    const mutation=useLogin();

    const handle_submit=(e: React.FormEvent)=>{
        e.preventDefault();
        mutation.mutate({
            email, password
        })
    }

    return(
        <form onSubmit={handle_submit}>
            <h2>Login</h2>
            <input placeholder="Email" value={email} onChange={(e=>setEmail(e.target.value))}></input>
            <input placeholder="Password" value={password} onChange={(e=>setPassword(e.target.value))}></input>
            <button type="submit">Login</button>
            {mutation.isError && <p>{(mutation.error as Error).message}</p>}
            {mutation.isSuccess && <p>Login Successful</p>}
        </form>
    )
}