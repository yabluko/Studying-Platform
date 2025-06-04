import { NextRequest } from "next/server";
import { getUserProfileImage } from "@/actions/user";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const image = await getUserProfileImage(id);
        if (!image) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        return NextResponse.json({ image });
    } catch (error) {
        console.error('Error in profile image route:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}           