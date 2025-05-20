import { getCourses } from '@/actions/course'
import CourseCard from '@/components/CourseCard/CourseCard';
import HeaderComponent from '@/components/Header/HeaderComponent'

import React from 'react'

async function Courses() {

    const courses = await getCourses();
    // const courseImage = await getCourseImage();
    console.log(courses);

  return (
  <>
    <HeaderComponent isFromHome={true}/>
  <section>
        <div className='px-8 py-6'>
            <div className="flex items-center justify-between mb-6">
            <h1 className="text-[32px] text-gray-1">Course Catalog</h1>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

                {
                    courses?.map((course) => (
                        <CourseCard key={course.id} imageUrl={course.imageUrl} title={course.title} description={course.description} price={course.price} category={course.category}   />
                    ))
                }
             
            </div>
            </div>
          </section>
  </>

  
  )
}

export default Courses