'use client'
import { getCourses } from '@/actions/course'
import CourseCard from '@/components/CourseCard/CourseCard';
import HeaderComponent from '@/components/Header/HeaderComponent'
import { Button } from '@/components/ui/button';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Link from 'next/link';
import React, { useState, useEffect } from 'react'
import { UserRole } from '@/models/course';
import { Session } from 'next-auth';
import { Course } from '@/models/course';
import { useSession } from 'next-auth/react';

function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const coursesData = await getCourses();
      setCourses(coursesData || []);
      setFilteredCourses(coursesData || []);
    };
    fetchData();
  }, []);

  const handleSearch = (searchTerm: string) => {
    const filtered = courses.filter((course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  return (
    <>
      <HeaderComponent isFromHome={true} onSearch={handleSearch} />
      <section>
        <div className='px-8 py-6'>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-[32px] text-gray-1">Course Catalog</h1>
            {session?.user?.userRole === UserRole.Teacher && (
              <Button asChild>
                <Link href='/admin/courses/new'>New Course</Link>
              </Button>
            )}
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              filteredCourses?.map((course) => (
                <Link key={course.id} href={`/courses/${course.id}`}>
                  <CourseCard
                    id={course.id}
                    imageUrl={course.imageUrl}
                    title={course.title}
                    description={course.description}
                    price={course.price}
                    category={course.category}
                    minHeight={430}
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