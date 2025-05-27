import { getUserById } from "@/actions/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params;
        const user = await getUserById(Number(id));
        console.log("Here user", user)
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        return NextResponse.json(user);
    } catch (error) {
        console.error("API error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
