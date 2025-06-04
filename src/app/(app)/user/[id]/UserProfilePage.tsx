'use client';

import React from 'react';
import HeaderComponent from '@/components/Header/HeaderComponent';
import Image from 'next/image';
import { UserProfileInfo } from '@/models/user';
import { FiInstagram } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';
import { FacebookIcon } from 'lucide-react';
import CourseCard from '@/components/CourseCard/CourseCard';
import Footer from '@/components/Footer.jsx/Footer';

function UserProfilePage({ profile, profileImage }: { profile: UserProfileInfo | null, profileImage?: string }) {
  console.log(profile)

  return (
    <div className="min-h-screen bg-[#f7f9fa]">
      <HeaderComponent isFromHome={true} />
      <div className="max-w-5xl mx-auto pt-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left: Main Info */}
          <div className="flex-1">
            <div className="mb-4">
              <span className="uppercase text-xs text-gray-500 font-semibold">Instructor</span>
              <h1 className="text-3xl font-bold mt-2">{profile?.name} {profile?.surname}</h1>
              <span className="inline-block mt-2 px-3 py-1 bg-purple-100 text-purple-700 rounded text-xs font-semibold">
                {profile?.headline ?? 'Udemy Instructor Partner'}
              </span>
            </div>
            <div className="flex gap-8 mb-6">
              <div>
                <div className="text-xl font-bold">{profile?.totalLearners}</div>
                <div className="text-xs text-gray-500">Total learners</div>
              </div>
              <div>
                <div className="text-xl font-bold">0</div>
                <div className="text-xs text-gray-500">Reviews</div>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">About me</h2>
              <p className="text-gray-700">{profile?.bio ?? '--'}</p>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2">My courses ({profile?.courses?.length})</h2>
              <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                  profile?.courses?.map((course) => (
                    <CourseCard
                      key={course.id}
                      id={course.id}
                      imageUrl={course.imageUrl}
                      title={course.title}
                      description={course.description}
                      price={course.price}
                      category={course.category}
                      width={320}
                      height={320}
                    />
                  ))
                }
              </div>
            </div>
          </div>
          {/* Right: Avatar and Actions */}
          <div className="w-full md:w-80 h-[250px] flex flex-col items-center bg-white rounded-xl shadow p-6">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-4 border-white shadow">
              <Image
                src={profileImage || ''}
                alt={profile?.name || 'User Profile Photo'}
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
            {/* <button className="w-full bg-purple-600 text-white py-2 rounded font-semibold mb-4 hover:bg-purple-700 transition">
              Send message
            </button> */}
            <div className="flex gap-4">
              <button className="p-2 rounded bg-gray-100 hover:bg-gray-200 transition-colors">
                <FiInstagram className="w-5 h-5 stroke-purple-10" />
              </button>
              <button className="p-2 rounded bg-gray-100 hover:bg-gray-200 transition-colors">
                <FaLinkedin className="w-5 h-5 text-purple-10" />
              </button>
              <button className="p-2 rounded bg-gray-100 hover:bg-gray-200 transition-colors">
                <FacebookIcon className="w-5 h-5 stroke-purple-10" />
              </button>
            </div>
          </div>
        </div>
      </div>
       <Footer />
    </div>
  );
};

export default UserProfilePage;
