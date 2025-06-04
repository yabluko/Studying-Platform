'use client'
import React, { useEffect, useState } from 'react'
import StarIcon from '../../../public/icons/StarIcon'
import StartIcon from '../../../public/icons/StartIcon'
import Scurf from '../../../public/icons/Scurf'
import BellsIcon from '../../../public/icons/BellsIcon'
import DotsIcon from '../../../public/icons/DotsIcon'
import ArrowLeft from '../../../public/icons/ArrowLeft'
import ArrowRight from '../../../public/icons/ArrowRight'
import Card from '../../components/Cards/Card'
import CourseTable from '../../components/CourseTable/CourseTable'
import { UserCourse } from '@/models/course'
import Link from 'next/link'

function HomeContent() {
    const [courses, setCourses] = useState<UserCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [courseProgress, setCourseProgress] = useState<Record<number, { totalLessons: number; completedLessons: number }>>({});
    const [carouselIndex, setCarouselIndex] = useState(0);
    const maxVisible = 3;
    const [watchedCarouselIndex, setWatchedCarouselIndex] = useState(0);
    const watchedMaxVisible = 3;

    const handleProgressUpdate = (courseId: number, totalLessons: number, completedLessons: number) => {
        setCourseProgress(prev => ({ ...prev, [courseId]: { totalLessons, completedLessons } }));
    };

    const handlePrev = () => {
        setCarouselIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleNext = () => {
        setCarouselIndex((prev) =>
            Math.min(prev + 1, courses.length - maxVisible)
        );
    };

    const handleWatchedPrev = () => {
        setWatchedCarouselIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleWatchedNext = () => {
        setWatchedCarouselIndex((prev) =>
            Math.min(prev + 1, courses.length - watchedMaxVisible)
        );
    };

    useEffect(() => {
        async function fetchCourses() {
            try {
                const response = await fetch('/api/user/courses');
                if (!response.ok) throw new Error('Failed to fetch courses');
                const data = await response.json();
                setCourses(data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchCourses();
    }, []); // Only fetch once on mount

    if (loading) return (
        <div className="flex flex-col items-center justify-center min-h-[300px]">
            <span className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4"></span>
            <span className="text-purple-700 font-medium text-lg">Loading your dashboard...</span>
        </div>
    );

    const visibleCourses = courses.slice(carouselIndex, carouselIndex + maxVisible);
    const visibleWatchedCourses = courses.slice(watchedCarouselIndex, watchedCarouselIndex + watchedMaxVisible);

    return (
        <div className='flex flex-col px-8 py-5'>
            <div className='relative mb-6'>
                <input className='w-full border-[1px] border-gray-2 rounded-xl pl-11 pr-4 py-5 focus:outline-none placeholder:text-sm max-h-14 ' placeholder='Search your course here...' />
                <Scurf className={'absolute top-[18px] left-[19px]'} />
            </div>
            {/* Banner */}
            <section className='relative overflow-hidden bg-purple-10 rounded-[20px] px-6 py-5 mb-6'>
                <div className='max-w-80 '>
                    <p className='text-xs text-white-1 uppercase '>Online Course</p>
                    <h1 className='text-[24px] text-white-1'>
                        Sharpen  Your Skills With Professional Online Courses
                    </h1>
                    <button className='min-w-32 flex items-center bg-black-2 px-3 py-2.5 rounded-[40px] justify-around hover:bg-gray-1'>
                        <span className='text-white-1 text-xs'>Join Now</span>
                        <StartIcon />
                    </button>
                </div>
                <StarIcon className={'absolute top-[-40px] right-[39px]'} />
                <StarIcon fillOpacity={0.5} className={'absolute top-[55px] right-[100px]'} />
                <StarIcon width={60} height={60} className={'absolute top-[25px] right-[191px]'} />
                <StarIcon width={80} height={138} className={'absolute bottom-[-69px] right-[181px]'} />
                <StarIcon width={90} height={90} className={'absolute top-[92px] right-[27px]'} />
            </section>

            {/* Watched courses */}
            <section className='flex flex-col mb-6 gap-3.5'>
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold">Watched Courses</h2>
                    {courses.length > watchedMaxVisible && (
                        <div className="flex gap-2">
                            <button
                                className="flex items-center w-6 h-6 border-[1px] border-gray-4 rounded-full p-1.5"
                                onClick={handleWatchedPrev}
                                disabled={watchedCarouselIndex === 0}
                            >
                                <ArrowLeft />
                            </button>
                            <button
                                className="flex items-center w-6 h-6 border-[1px] border-gray-4 rounded-full p-1.5"
                                onClick={handleWatchedNext}
                                disabled={watchedCarouselIndex >= courses.length - watchedMaxVisible}
                            >
                                <ArrowRight />
                            </button>
                        </div>
                    )}
                </div>
                <div className="flex gap-3.5">
                    {courses?.length > 0 ? (
                        visibleWatchedCourses.map((course) => (
                            <div key={course.id} className='flex items-center justify-around rounded-xl p-3 shadow-md min-w-[271px]'>
                                <div className='flex items-center justify-center rounded-full w-10 h-10 bg-pink-1'>
                                    <BellsIcon strokeColor='#702DFF' />
                                </div>
                                <div>
                                    <p className='text-xs text-gray-3'>
                                        {courseProgress[course.id]
                                            ? `${courseProgress[course.id].completedLessons}/${courseProgress[course.id].totalLessons} Watched`
                                            : 'Loading...'}
                                    </p>
                                    <h2 className='text-xs text-black-2'>{course.title}</h2>
                                </div>
                                <DotsIcon />
                            </div>
                        ))
                    ) : (
                        <div className='w-full text-center p-6 bg-white rounded-xl border-2 border-purple-2 shadow-[0_0_15px_rgba(112,45,255,0.1)] hover:shadow-[0_0_20px_rgba(112,45,255,0.2)] transition-all duration-300'>
                            <p className='text-gray-600'>You have not enrolled in any courses yet.</p>
                            <Link href="/courses" className='text-purple-1 hover:text-purple-2 mt-2 inline-block'>Browse available courses</Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Continue watching courses */}
            <section className='mb-6'>
                <div className='flex items-center justify-between '>
                    <h1 className='text-black-2'>Continue Watching</h1>
                    {courses?.length > 0 && (
                        <div className='flex gap-3'>
                            <button
                                className="flex items-center w-6 h-6 border-[1px] border-gray-4 rounded-full p-1.5"
                                onClick={handlePrev}
                                disabled={carouselIndex === 0}
                            >
                                <ArrowLeft />
                            </button>
                            <button
                                className="flex items-center w-6 h-6 border-[1px] border-gray-4 rounded-full p-1.5"
                                onClick={handleNext}
                                disabled={carouselIndex >= courses.length - maxVisible}
                            >
                                <ArrowRight />
                            </button>
                        </div>
                    )}
                </div>
                <div className='flex justify-between w-full'>
                    {courses?.length > 0 ? (
                        visibleCourses.map((course) => (
                            <Card
                                key={course.id}
                                id={course.id}
                                name={course.title}
                                category={course.category}
                                courseImg={course.imageUrl}
                                instructorId={course.instructor.id}
                                instructorName={course.instructor.name}
                                intstructorHeadline={course.instructor.headline}
                                onProgressUpdate={(id, totalLessons, completedLessons) => handleProgressUpdate(id, totalLessons, completedLessons)}
                            />
                        ))
                    ) : (
                        <div className='w-full text-center p-8 bg-white rounded-xl border-2 border-purple-2 shadow-[0_0_15px_rgba(112,45,255,0.1)] hover:shadow-[0_0_20px_rgba(112,45,255,0.2)] transition-all duration-300'>
                            <p className='text-gray-600 mb-4'>Start your learning journey today!</p>
                            <Link href="/courses" className='inline-block bg-purple-1 text-white-1 px-6 py-2 rounded-lg hover:bg-purple-2 transition-colors'>
                                Explore Courses
                            </Link>
                        </div>
                    )}
                </div>
            </section>
            <section className='flex flex-col justify-between max-h-[216px]'>
                <div className='flex justify-between'>
                    <h1>Your Mentor</h1>
                    <Link href='#' className='text-sky-500'> See All </Link>
                </div>

                <CourseTable />
            </section>
        </div>
    )
}

export default HomeContent