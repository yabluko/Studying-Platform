import { NextResponse } from "next/server";

import { getCompletedLessons } from "@/actions/course";

export async function GET() {
    const res = await getCompletedLessons();
    return NextResponse.json(res);
}