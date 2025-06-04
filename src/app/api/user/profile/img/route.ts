import { uploadUserProfileImage } from "@/actions/user";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const image = formData.get('image') as File;
    const result = await uploadUserProfileImage({ image })
    return NextResponse.json(result);
}