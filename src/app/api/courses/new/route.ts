import { NextRequest, NextResponse } from 'next/server';
import { insertCourse } from '@/actions/course';

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const image = formData.get('image') as File;
    const price = formData.get('price') as string;
    const category = formData.get('category') as string;

    const result = await insertCourse({ title, description, image, price, category });
    return NextResponse.json(result);
}
