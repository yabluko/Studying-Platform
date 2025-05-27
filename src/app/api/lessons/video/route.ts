import { NextRequest, NextResponse } from 'next/server';
import { getLessonVideo } from '@/actions/course';

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const videoName = searchParams.get('videoName');

    if (!videoName) {
        return NextResponse.json({ error: 'Missing videoName parameter' }, { status: 400 });
    }

    const video = await getLessonVideo(videoName);

    if (!video) {
        return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    return NextResponse.json(video);
}
