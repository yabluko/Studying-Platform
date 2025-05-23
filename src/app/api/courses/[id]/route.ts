import { NextRequest, NextResponse } from 'next/server';
import { getCourseDetails } from '@/actions/course';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const course = await getCourseDetails(id);
        if (!course) {
            return NextResponse.json({ error: 'Course not found' }, { status: 404 });
        }
        return NextResponse.json(course);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch course details' }, { status: 500 });
    }
}
