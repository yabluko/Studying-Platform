'use client'

import React, { useEffect, useState } from "react";
import { getUserInstructorCourses, getUserProfileImage } from "@/actions/user";
import { InstructorCourses } from "@/models/course";
import CourseTableBody from "../CourseTableBody/CourseTableBody";

function CourseTable() {
  const [instructorCourses, setInstructorCourses] = useState<InstructorCourses[]>([]);
  const [instructorImages, setInstructorImages] = useState<{ [id: string]: string | undefined }>({})
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInstructorCourses() {
      try {
        const response = await getUserInstructorCourses();
        if (response) {
          setInstructorCourses(response);

          // Fetch images for each unique instructor
          const uniqueInstructors = new Map<number, InstructorCourses>();
          response.forEach((course) => {
            if (!uniqueInstructors.has(course.instructor.id)) {
              uniqueInstructors.set(course.instructor.id, course);
            }
          });

          const images: { [id: string]: string | undefined } = {};
          await Promise.all(
            Array.from(uniqueInstructors.values()).map(async (course) => {
              const img = await getUserProfileImage(course.instructor.id.toString());
              if (img) {
                images[course.instructor.id.toString()] = img;
              }
            })
          );
          setInstructorImages(images);
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

  // Залишити лише унікальних інструкторів
  const uniqueInstructorMap = new Map<number, InstructorCourses>();
  instructorCourses.forEach(course => {
    if (!uniqueInstructorMap.has(course.instructor.id)) {
      uniqueInstructorMap.set(course.instructor.id, course);
    }
  });
  const uniqueInstructors = Array.from(uniqueInstructorMap.values());

  return (
    <div className="rounded-lg shadow-lg border bg-white">
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
          {uniqueInstructors.map((course) => (
            <CourseTableBody
              key={course.instructor.id}
              instructorId={course.instructor.id}
              instructorName={course.instructor.name}
              instructorSurname={course.instructor.surname}
              courseCreatedAt={course.course.createdAt}
              courseCategory={course.course.category}
              courseTitle={course.course.title}
              profileImage={instructorImages[course.instructor.id]}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CourseTable;
