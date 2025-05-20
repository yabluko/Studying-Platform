import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { API_BASE_URL } from "@/config/http";
import { Course } from "@/models/course";
import { getServerSession } from "next-auth";



export async function getCourses() : Promise<Course[] | undefined>{
 const session = await getServerSession(authOptions);
    try{
        const res = await fetch(`${API_BASE_URL}/courses`,{
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

export async function getCourseImage(imageName: string | null) : Promise<any>{
    const session = await getServerSession(authOptions);
    try{
        console.log("Sended", imageName)
        const res = await fetch(`${API_BASE_URL}/courses/course-image/${imageName ?? ''}`,{
            method: 'GET',
            headers: {
                authorization: `Bearer ${session?.tokens.accessToken}`,
            },
        })
        if(!res.ok){
            console.error(res.statusText);
            return
        }else{
            const buffer = await res.arrayBuffer();
            const base64 = Buffer.from(buffer).toString('base64');
            const contentType = res.headers.get('content-type') || 'image/jpeg';
          
            return `data:${contentType};base64,${base64}`;
        }
    }catch(err){
        console.error('Err -', err)
    }
}