'use client';

import React, { useState, useEffect, use } from 'react';
import { formatDuration } from '@/helpers/datatime';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { Lesson } from '@/models/course';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { FiHome } from 'react-icons/fi';
import { getUserCourses } from '@/actions/user';
import { useRouter } from 'next/navigation';

// You may want to fetch data in a parent layout or use SWR/React Query for real data
export default function CourseViewPage({ params }: { params: Promise<{ courseId: string }> }) {
    const { courseId } = use(params);
    const router = useRouter();
    const [course, setCourse] = React.useState<any>(null);
    const [selectedSectionIdx, setSelectedSectionIdx] = useState(0);
    const [selectedLessonIdx, setSelectedLessonIdx] = useState(0);
    const [lessonVideo, setLessonVideo] = useState<any>(null);
    const [videoLoading, setVideoLoading] = useState(true);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [contentType, setContentType] = useState<any>(null);
    const [expandedSectionIdx, setExpandedSectionIdx] = useState<number | null>(0);

    const [completedLessons, setCompletedLessons] = useState<number[]>([]);

    const checkEnrollment = async () => {
        try {
            const userCourses = await getUserCourses();
            const isUserEnrolled = userCourses?.some(course => course.id === parseInt(courseId));
            setIsEnrolled(isUserEnrolled || false);
            if (!isUserEnrolled) {
                toast.error('You need to enroll in this course to view its content');
                router.push(`/courses/${courseId}`);
            }
        } catch (error) {
            console.error('Error checking enrollment:', error);
            toast.error('Failed to verify course enrollment');
            router.push(`/courses/${courseId}`);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchCompletedLessons = async () => {
        const res = await fetch(`/api/lessons/completed`, { method: 'GET' });
        if (!res.ok) throw new Error('Failed to fetch completed lessons');
        const data = await res.json();
        const completed = data.map((lessonData: { lesson: { id: number } }) => lessonData.lesson.id);
        setCompletedLessons(completed);
    };

    useEffect(() => {
        checkEnrollment();
    }, [courseId]);

    useEffect(() => {
        // Fetch course details here
        async function fetchCourse() {
            const res = await fetch(`/api/courses/${courseId}`, {
                method: 'GET',
            });
            if (!res.ok) {
                throw new Error('Failed to create section with lesson');
            }
            const data = await res.json();
            setCourse(data);
        }
        if (isEnrolled) {
            fetchCourse();
        }
    }, [courseId, isEnrolled]);

    useEffect(() => {
        async function fetchLessonVideo() {
            if (!course) return;
            const selectedSection = course.sections?.[selectedSectionIdx];
            const selectedLesson = selectedSection?.lessons?.[selectedLessonIdx];
            if (!selectedLesson?.videoUrl) return;

            const res = await fetch(`/api/lessons/video?videoName=${selectedLesson.videoUrl}`, {
                method: 'GET',
            });
            if (!res.ok) {
                throw new Error('Failed to fetch lesson video');
            }
            const { src, contentType } = await res.json();
            setLessonVideo(src);
            setContentType(contentType);
        }
        fetchLessonVideo();
    }, [course, selectedSectionIdx, selectedLessonIdx]);

    useEffect(() => {
        if (isEnrolled) {
            fetchCompletedLessons();
        }
    }, [isEnrolled]);

    useEffect(() => {
        setVideoLoading(true); // Start loading when lessonVideo changes
    }, [lessonVideo]);

    const handleMarkAsDone = async (lessonId: number) => {
        const formData = new FormData();
        formData.append("lessonId", lessonId.toString());
        const res = await fetch(`/api/lessons/mark-completed`, {
            method: 'POST',
            body: formData,
        });
        if (!res.ok) {
            throw new Error('Failed to mark lesson as done');
        }
        toast.success('Lesson successfully marked as done');
        await fetchCompletedLessons();
    }

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
            <span className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4"></span>
            <span className="text-purple-700 font-medium text-lg">Loading course content...</span>
        </div>
    );
    if (!isEnrolled) return null;
    if (!course) return (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
            <span className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4"></span>
            <span className="text-purple-700 font-medium text-lg">Loading course content...</span>
        </div>
    );

    const sections = course.sections || [];
    const selectedSection = sections[selectedSectionIdx];
    const lessons = selectedSection?.lessons || [];

    const selectedLesson: Lesson = lessons[selectedLessonIdx];
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-80 bg-gray-50 border-r p-4">
                <Link href="/home" className="flex items-center gap-2 text-gray-600 hover:text-purple-1 mb-6">
                    <FiHome className="w-5 h-5" />
                    <span>Back to Home</span>
                </Link>
                <h2 className="font-bold text-lg mb-4">{course.title}</h2>
                <div>
                    {sections.map((section: any, sIdx: number) => (
                        <div key={section.id} className="mb-2">
                            <button
                                className={`w-full text-left font-semibold py-2 px-2 rounded flex items-center justify-between ${expandedSectionIdx === sIdx ? 'bg-blue-100' : ''}`}
                                onClick={() => setExpandedSectionIdx(expandedSectionIdx === sIdx ? null : sIdx)}
                            >
                                {section.title}
                                <span className="ml-auto text-xs text-gray-400">{formatDuration(section.lessons.reduce((acc: number, lesson: Lesson) => acc + lesson.videoDuration, 0))}</span>
                                {expandedSectionIdx === sIdx ? <FiChevronUp /> : <FiChevronDown />}
                            </button>
                            {expandedSectionIdx === sIdx && (
                                <ul className="ml-4 mt-1">
                                    {section.lessons.map((lesson: any, lIdx: number) => (
                                        <li key={lesson.id}>
                                            <button
                                                className={`flex items-center justify-between w-full text-left py-1 px-2 rounded ${selectedSectionIdx === sIdx && selectedLessonIdx === lIdx ? 'bg-blue-200' : ''} ${completedLessons.includes(lesson.id) ? 'text-green-600' : ''}`}
                                                onClick={() => {
                                                    setSelectedSectionIdx(sIdx);
                                                    setSelectedLessonIdx(lIdx);
                                                }}
                                            >
                                                <span className="mr-2">
                                                    {completedLessons.includes(lesson.id) ? '✔️' : ''}
                                                </span>
                                                {lesson.title}
                                                <span className="ml-[20px] text-xs text-gray-400">{formatDuration(lesson.videoDuration)}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                {selectedLesson ? (
                    <>
                        <div className="relative mb-6 flex justify-center">
                            <div className="w-full max-w-3xl aspect-video bg-black rounded overflow-hidden relative">
                                <video
                                    key={lessonVideo}
                                    src={lessonVideo}
                                    controls
                                    className={`w-full h-full object-contain fade-in${!videoLoading ? ' visible' : ''}`}
                                    onLoadedData={() => setVideoLoading(false)}
                                    style={{ background: '#222' }}
                                >
                                    <source src={lessonVideo} type={contentType} />
                                </video>
                                {videoLoading && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-10">
                                        <span className="loader" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="px-32">
                            <h1 className="text-2xl font-bold mb-2">{selectedLesson.title}</h1>
                            <p className="mb-4">{selectedLesson.content}</p>
                            {selectedLesson && (
                                <Button
                                    className={`mt-4 ${completedLessons.includes(selectedLesson.id) ? "bg-green-500 text-white" : ""}`}
                                    variant="outline"
                                    onClick={async () => {
                                        if (!completedLessons.includes(selectedLesson.id)) {
                                            setCompletedLessons(prev => [...prev, selectedLesson.id]);
                                        }
                                        try {
                                            await handleMarkAsDone(selectedLesson.id);
                                        } catch (err) {
                                            setCompletedLessons(prev => prev.filter(id => id !== selectedLesson.id));
                                            alert('Failed to mark as done');
                                        }
                                    }}
                                    disabled={completedLessons.includes(selectedLesson.id)}
                                >
                                    {completedLessons.includes(selectedLesson.id) ? "Completed" : "Mark as Done"}
                                </Button>
                            )}
                        </div>
                    </>
                ) : (
                    <div>Select a lesson to watch</div>
                )}
            </main>
        </div>
    );
}
