'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { API_BASE_URL } from "@/config/http";
import { getServerSession } from "next-auth";


export async function getUserById( id: number) : Promise<{ name: string, email: string} | undefined>{
    const session = await getServerSession(authOptions);
    try{
        const res = await fetch(`${API_BASE_URL}/user/${id}`,{
            method: 'GET',
            headers: {
                authorization: `Bearer ${session?.tokens.accessToken}`,
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