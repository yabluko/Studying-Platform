import React, { useEffect, useState } from "react";
import Image from 'next/image'
import profilePic from '../../../public/images/blank-avatar.webp'

interface InstructorCourse {
  id: number;
  title: string;
  category: string;
  instructor: {
    name: string;
    imageUrl?: string;
  };
  createdAt: string;
}

function CourseTable() {
  const [instructorCourses, setInstructorCourses] = useState<InstructorCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInstructorCourses() {
      try {
        const response = await fetch('/api/user/insturctor');
        const data = await response.json();
        if (response.ok) {
          setInstructorCourses(data);
        }
      } catch (error) {
        console.error("Error fetching instructor courses:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInstructorCourses();
  }, []);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (instructorCourses.length === 0) {
    return (
      <div className="text-center py-4 bg-white rounded-xl border-2 border-purple-2 shadow-[0_0_15px_rgba(112,45,255,0.1)]">
        <p className="text-gray-600">No instructor courses found</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg shadow-lg border bg-white">
      <table className="w-full text-left">
        <thead className="text-gray-1 text-[10px] uppercase">
          <tr>
            <th className="px-6 py-3">Instructor Name & Date</th>
            <th className="px-6 py-3">Course Type</th>
            <th className="px-6 py-3">Course Title</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {instructorCourses.map((course) => (
            <tr key={`course-${course.id}`} className="border-b">
              <td className="px-6 py-4 flex items-center gap-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={course.instructor.imageUrl || profilePic}
                    alt={`Picture of ${course.instructor.name}`}
                    fill
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div>
                  <p className="font-medium text-sm">{course.instructor.name}</p>
                  <p className="text-gray-500 text-sm">{new Date(course.createdAt).toLocaleDateString()}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="bg-purple-200 text-purple-600 px-3 py-0.5 text-[10px] rounded-full">
                  {course.category}
                </span>
              </td>
              <td className="px-6 py-4 text-xs font-normal">{course.title}</td>
              <td>
                <button className="bg-purple-100 text-purple-600 px-3 py-0.5 text-[10px] rounded-full hover:bg-purple-200">
                  Show Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseTable;
