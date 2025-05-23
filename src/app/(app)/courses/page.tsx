import { getCourses } from '@/actions/course'
import CourseCard from '@/components/CourseCard/CourseCard';
import HeaderComponent from '@/components/Header/HeaderComponent'
import { Button } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';

import React from 'react'

async function Courses() {
  const session = await getServerSession(authOptions);
  const courses = await getCourses();


  return (
    <>
      <HeaderComponent isFromHome={true} />
      <section>
        <div className='px-8 py-6'>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-[32px] text-gray-1">Course Catalog</h1>
            {session?.user?.userRole === 'admin' && (
              <Button asChild>
                <Link href='/admin/courses/new'>New Course</Link>
              </Button>
            )}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              courses?.map((course) => (
                <Link key={course.id} href={`/courses/${course.id}`}>
                  <CourseCard
                    id={course.id}
                    imageUrl={course.imageUrl}
                    title={course.title}
                    description={course.description}
                    price={course.price}
                    category={course.category}
                  />
                </Link>
              ))
            }
          </div>
        </div>
      </section>
    </>


  )
}

export default Courses