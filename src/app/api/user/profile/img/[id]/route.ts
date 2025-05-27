import { NextRequest } from "next/server";

import { getUserProfileImage } from "@/actions/user";
import { NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const image = await getUserProfileImage(id)
    return NextResponse.json({ image });
}           