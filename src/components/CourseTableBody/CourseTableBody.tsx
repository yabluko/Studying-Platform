import React from 'react'
import Image from 'next/image';
import profilePic from '../../../public/images/blank-avatar.webp'

interface TablePayload {
    instructorId : number;
    instructorName : string;
    instructorSurname: string;
    courseCreatedAt : string;
    courseCategory : string;
    courseTitle: string;
   profileImage? :string ;
}

function CourseTableBody({ instructorId, instructorName, instructorSurname, courseCreatedAt, courseCategory, courseTitle, profileImage} : TablePayload ) {

  return (
    <>
     <tr key={`course-${instructorId}`} className="border-b">
              <td className="px-6 py-4 flex items-center gap-4">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={profileImage || profilePic}
                    alt={`Picture of ${instructorName}`}
                    fill
                    style={{
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <div>
                  <p className="font-medium text-sm">{instructorName} {instructorSurname}</p>
                  <p className="text-gray-500 text-sm">{new Date(courseCreatedAt).toLocaleDateString()}</p>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="bg-purple-200 text-purple-600 px-3 py-0.5 text-[10px] rounded-full">
                  {courseCategory}
                </span>
              </td>
              <td className="px-6 py-4 text-xs font-normal">{courseTitle}</td>
              <td>
                <button className="bg-purple-100 text-purple-600 px-3 py-0.5 text-[10px] rounded-full hover:bg-purple-200">
                  Show Details
                </button>
              </td>
            </tr>
    </>
  )
}

export default CourseTableBody