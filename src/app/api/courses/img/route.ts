import { getCourseImage } from "@/actions/course";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const image = await getCourseImage(searchParams.get('imageName'));
    return Response.json({ image });
}