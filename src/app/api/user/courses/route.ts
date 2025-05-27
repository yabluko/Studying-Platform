import { getUserCourses } from "@/actions/user";

export async function GET(request: Request) {
    const courses = await getUserCourses();
    return Response.json(courses);
}   