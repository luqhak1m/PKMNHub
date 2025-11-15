
"use client";
import { useMutation } from "@tanstack/react-query";

type LoginData={
    email:string;
    password:string;
}

type LoginResponse={
    token:string;
}

export default function useLogin(){
    return useMutation({
        mutationFn: async(data:LoginData): Promise<LoginResponse>=>{
            const response=await fetch("/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data),
            })
            if(!response.ok){throw new Error("[/api/hooks/useLogin.ts][useLogin()] login failed")}
            const json=await response.json();
            if(json.token){localStorage.setItem("token", json.token)};
            return json;
        }
    })

}