import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar';
import ProfileContent from '../../components/ProfileContent/ProfileContent';
import HomeContent from '../../components/HomeContent/HomeContent';


function Home() {
  return (
    <>
    <div className='flex justify-between'>
      <Sidebar/>
      <HomeContent/>
      <ProfileContent />
    </div> 
    </>
  )
}

export default Home