import { getCourseProgress } from "@/actions/course";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
        return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    try {
        const progress = await getCourseProgress(courseId);
        return NextResponse.json(progress);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
    }
}