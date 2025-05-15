'use server'

import { API_BASE_URL } from "@/config/http";

interface SignupPayload{
    email: string;
    name: string;
    password: string;
}

export async function signup({email, name, password} : SignupPayload){
    try{
        const res = await fetch(`${API_BASE_URL}/auth/signup`,{
            method: 'POST',
            body: JSON.stringify({
                user: {
                    email: email,
                    name: name, 
                    password: password
                }
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        if(!res.ok){
            console.error(res.statusText);
            return
        }else{
            return await res.json();
        }
    }catch(err){
        console.error('Err -', err)
    }
}