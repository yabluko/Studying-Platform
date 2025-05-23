'use client'
import React, { useEffect } from 'react'
import Sidebar from '../../../components/Sidebar/Sidebar';
import ProfileContent from '../../../components/ProfileContent/ProfileContent';
import HomeContent from '../../../components/HomeContent/HomeContent';
import { toast, ToastContainer } from 'react-toastify';
import { useSession } from 'next-auth/react';


function Home() {
  const { data: session, status } = useSession()
  
  useEffect(() => {
    if (status === 'loading') return
    const justLoggedIn = localStorage.getItem('justLoggedIn')
    if (justLoggedIn === 'true' && session?.user?.name) {
    toast.success(`Hi ${session?.user?.name}, welcome to your dashboard`, {
                position: 'top-center',
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
              });}
              setTimeout(() => {
                localStorage.removeItem('justLoggedIn');
              }, 1000);
  }, [session, status])

  return (
    <>
    <ToastContainer position="top-left" />
    <div className="flex h-screen overflow-hidden">
      <div className="h-full">
        <Sidebar />
      </div>

      <div className="flex flex-1 h-full">

        <div className="flex-1 overflow-y-auto">
          <HomeContent />
        </div>
        <div className="h-full">
          <ProfileContent />
        </div>
      </div>
    </div>
    </>
  )
}

export default Home