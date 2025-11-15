
"use client";
import { useMutation } from "@tanstack/react-query";

type RegisterData={
    name: string; 
    email: string; 
    password: string
}

export function useRegister(){
    return useMutation(
        {mutationFn: async(data: RegisterData)=>{
        const response=await fetch("/api/auth/register", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data),
        });
        if(!response.ok){throw new Error("[/api/hooks/useRegister.ts][useRegister()] registration failed")};
        return response.json();
    }, });
}