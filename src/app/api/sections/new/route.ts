import { NextRequest, NextResponse } from 'next/server';
import { createSectionWithLesson } from '@/actions/course';

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const courseId = parseInt(formData.get('courseId') as string);
    const name = formData.get('name') as string;
    const lessonTitle = formData.get('lessonTitle') as string;
    const lessonDescription = formData.get('lessonDescription') as string;
    const video = formData.get('video') as File;

    const result = await createSectionWithLesson(courseId, name, lessonTitle, lessonDescription, video);
    return NextResponse.json(result);
}
