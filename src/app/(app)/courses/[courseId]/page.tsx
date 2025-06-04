import { notFound } from 'next/navigation';
import HeaderComponent from '@/components/Header/HeaderComponent';
import Footer from '@/components/Footer.jsx/Footer';
import { enrollInCourse, getCourseDetails, getCourseImage } from '@/actions/course';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Clock, Users, BookOpen } from 'lucide-react';
import { redirect } from 'next/navigation';
import React from 'react';
import { CourseContentAccordion } from '@/components/CourseContentAccordion/CourseContentAccordion';
import { formatDuration } from '@/helpers/datatime';
import { toast } from 'react-toastify';
import { CourseEnrollButton } from '@/components/CourseEnrollButton/CourseEnrollButton';


export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const courseDetails = await getCourseDetails(courseId);
  if (!courseDetails) {
    notFound();
  }
  const courseImageUrl = await getCourseImage(courseDetails.imageUrl);

  const courseSecondsDuration = courseDetails?.sections.map(section => section.lessons.map(lesson => lesson.videoDuration)
    .reduce((acc, curr) => acc + curr, 0))
    .reduce((acc, curr) => acc + curr, 0);

  const isEnrolled = courseDetails.enrolledStudents.some(student => student.id === session?.user?.id);
  if (!courseDetails) {
    throw new Error('Failed to fetch course details');
  }

  return (
    <>
      <HeaderComponent isFromHome={true} />
      <main className="px-14">
        <div className="max-w-[1340px] mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8" style={{ boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.05), 0 4px 10px rgba(0, 0, 0, 0.05)' }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Course Info */}
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{courseDetails.title}</h1>
                <div className="flex items-center gap-4 text-gray-600 mb-6">
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {courseDetails.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {'N/A'}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {courseDetails?.enrolledStudents?.length || 0} students
                  </span>
                </div>

                <div className="prose max-w-none mb-8">
                  <p className="text-lg text-gray-700">{courseDetails.description}</p>
                </div>

                {courseDetails.imageUrl && (
                  <div className="mb-8">
                    <img
                      src={courseImageUrl}
                      alt={courseDetails.title}
                      className="w-full h-[400px] object-cover rounded-lg"
                    />
                  </div>
                )}

                {/* Course Content */}
                <div className="border-t border-gray-200 pt-8">
                  <h2 className="text-2xl font-semibold mb-6">Course Content</h2>
                  <CourseContentAccordion sections={courseDetails?.sections || []} />
                </div>
              </div>

              {/* Right Column - Enrollment Card */}
              <div className="lg:col-span-1">
                <div className="top-8 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                  <div className="text-2xl font-bold text-gray-900 mb-4">
                    ${courseDetails.price}
                  </div>

                  <form action={async () => {
                    'use server';
                    try {
                      const res = await enrollInCourse(courseId);
                      if (res.status === 201) {
                        toast.success(`You successfully enrolled in course - ${res.title}`);
                        redirect(`/courses/${courseId}/view`);
                      }

                    } catch (error) {
                      console.error('Enrollment failed:', error);
                    }
                  }}>
                    <CourseEnrollButton isEnrolled={isEnrolled} courseId={courseId} />
                  </form>

                  <div className="mt-6 space-y-4">
                    <h3 className="font-semibold">This course includes:</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li>• {courseDetails?.sections.map(section => section.lessons.length).reduce((acc, curr) => acc + curr, 0)} lessons</li>
                      <li>• {formatDuration(courseSecondsDuration)} hours of content</li>
                      <li>• Certificate of completion</li>
                      <li>• Lifetime access</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}