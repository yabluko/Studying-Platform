'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function CourseEnrollButton({ courseId }: { courseId: string }) {
    const router = useRouter();
    return (
        <Button
            className="w-full bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => router.push(`/courses/${courseId}/view`)}
        >
            View Course
        </Button>
    )
}
