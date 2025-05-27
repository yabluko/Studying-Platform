'use server'

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { API_BASE_URL } from "@/config/http";
import { getServerSession } from "next-auth";
import { UserCourse } from "@/models/course";


export async function getUserById(id: number): Promise<{ name: string, email: string } | undefined> {
    const session = await getServerSession(authOptions);
    try {
        console.log("Here is id", id)
        const res = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${session?.tokens.accessToken}`,
                "Content-Type": "application/json",
            },
        })
        console.log("Here is res", res)
        if (!res.ok) {
            console.error(res.statusText);
            return
        } else {
            return await res.json();
        }
    } catch (err) {
        console.error('Err -', err)
    }
}

export async function getUserCourses(): Promise<UserCourse[] | null> {
    const session = await getServerSession(authOptions);
    try {
        const response = await fetch(`${API_BASE_URL}/users/courses`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${session?.tokens.accessToken}`,
                "Content-Type": "application/json",
            },
        })
        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }

        return response.json();

    } catch (error) {
        console.error('Error user courses:', error);
        return null;
    }

}

export async function getUserProfileInfo() {
    const session = await getServerSession(authOptions);
    try {
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${session?.tokens.accessToken}`,
                "Content-Type": "application/json",
            },
        })
        return response.json();
    } catch (error) {
        console.error('Error getting user profile info:', error);
        return null;
    }
}

export async function updateUserProfile(name: string, userRole: string, email: string, headline: string, bio: string, surname: string, website: string, facebook: string, instagram: string, linkedin: string) {
    const session = await getServerSession(authOptions);
    try {
        console.log("Here is name", JSON.stringify({ name, userRole, email, headline, bio, surname, socialLinks: { website, facebook, instagram, linkedin } }))
        const response = await fetch(`${API_BASE_URL}/users/profile`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${session?.tokens.accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, userRole, email, headline, bio, surname, socialLinks: { website, facebook, instagram, linkedin } }),
        })
        if (!response.ok) {
            throw new Error('Failed to update profile');
        }
        return response.json();
    } catch (error) {
        console.error('Error updating profile:', error);
        return null;
    }
}

export async function uploadUserProfileImage({ image }: { image: File }) {
    const session = await getServerSession(authOptions);
    try {
        const formData = new FormData()
        if (image instanceof File) {
            formData.append("image", image)
        }
        const result = await fetch(`${API_BASE_URL}/users/profile/image`, {
            method: "POST",
            body: formData,
            headers: {
                authorization: `Bearer ${session?.tokens.accessToken}`,
            },
        })

        if (!result.ok) {
            console.error('Failed to upload profile image:', result.statusText)
            return undefined
        }

        const data = await result.json()
        console.log(data)
        return data
    } catch (error) {
        console.error('Error uploading profile image:', error)
        return null
    }
}

export async function getUserProfileImage(id: string) {
    const session = await getServerSession(authOptions);
    try {
        console.log("ID", id)
        const result = await fetch(`${API_BASE_URL}/users/${id}/profile/image`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${session?.tokens.accessToken}`,
            },
        })
        if (!result.ok) {
            console.error('Failed to get user profile image:', result.statusText)
            return undefined
        }
        const buffer = await result.arrayBuffer();
        const base64 = Buffer.from(buffer).toString('base64');
        const contentType = result.headers.get('content-type') || 'image/jpeg';

        return `data:${contentType};base64,${base64}`;
    } catch (error) {
        console.error('Error getting user profile image:', error)
        return null
    }
}

export async function getUserInstructorCourses() {
    const session = await getServerSession(authOptions);
    try {
        const response = await fetch(`${API_BASE_URL}/users/courses/instructors`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${session?.tokens.accessToken}`,
                "Content-Type": "application/json",
            },
        })
        if (!response.ok) {
            return [];
        }
        return response.json();
    } catch (error) {
        console.error('Error getting instructor courses:', error);
        return [];
    }
}