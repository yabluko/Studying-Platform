import React from "react";
import Image from 'next/image'
import personPic from '../../../public/images/person1.jpeg'


const courses = [
  {
    name: "Prashant Kumar Singh",
    date: "25/2/2023",
    image: "https://via.placeholder.com/40", // замінити на реальне зображення
    type: "Frontend",
    title: "Understanding Concept Of React",
  },
  {
    name: "Ravi Kumar",
    date: "25/2/2023",
    image: "https://via.placeholder.com/40",
    type: "Frontend",
    title: "Understanding Concept Of React",
  },
];

function CourseTable () {
  return (
    <div className="overflow-hidden rounded-lg shadow-lg border bg-white">
      <table className="w-full text-left">
        {/* Заголовки */}
        <thead className="text-gray-1 text-[10px] uppercase">
          <tr>
            <th className="px-6 py-3">Instructor Name & Date</th>
            <th className="px-6 py-3">Course Type</th>
            <th className="px-6 py-3">Course Title</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        
        {/* Рядки з даними */}
        <tbody>
          {courses.map((course, index) => (
            <tr key={index} className="border-b">
              <td className="px-6 py-4 flex items-center gap-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image 
                                src={personPic}
                                alt='Picture of author'
                                fill
                                style={{
                                objectFit: 'cover',
                                }}
                            />
                </div>
                <div>
                  <p className="font-medium text-sm">{course.name}</p>
                  <p className="text-gray-500 text-sm">{course.date}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="bg-purple-200 text-purple-600 px-3 py-0.5 text-[10px] rounded-full">
                  {course.type}
                </span>
              </td>
              <td className="px-6 py-4 text-xs font-normal">{course.title}</td>
              <td>
                <button className="bg-blue-100 text-blue-600 px-3 py-0.5 text-[10px] rounded-full hover:bg-blue-200">
                  Show Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseTable;
