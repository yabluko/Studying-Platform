'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function CourseEnrollButton({ isEnrolled, courseId }: { isEnrolled: boolean, courseId: string }) {
    const router = useRouter();

    const handleViewCourse = () => {
        if (isEnrolled) {
            router.push(`/courses/${courseId}/view`);
        } else {
            toast.success('You successfully enrolled in the course!');
            setTimeout(() => {
                router.push(`/courses/${courseId}/view`);
            }, 1500);
        }
    };

    return (
        <>
            <ToastContainer position="top-center" />
            <Button
                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                onClick={handleViewCourse}
            >
                {isEnrolled ? 'View Course' : 'Enroll Now'}
            </Button>
        </>
    );
}
