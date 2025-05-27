import { getUserInstructorCourses } from "@/actions/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const courses = await getUserInstructorCourses();
    return NextResponse.json(courses || []);
}