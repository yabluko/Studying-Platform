import { markLessonAsCompleted } from "@/actions/course";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const formData = await request.formData();
    const lessonId = formData.get("lessonId");

    const res = await markLessonAsCompleted(lessonId as string);
    return NextResponse.json(res);
}