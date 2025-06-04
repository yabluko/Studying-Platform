import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { API_BASE_URL } from "@/config/http";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.tokens?.accessToken) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const response = await fetch(`${API_BASE_URL}/user/daily-progress`, {
            headers: {
                'Authorization': `Bearer ${session.tokens.accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch daily progress');
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching daily progress:', error);
        return NextResponse.json({ error: "Failed to fetch daily progress" }, { status: 500 });
    }
} 