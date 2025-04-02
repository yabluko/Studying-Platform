import React from 'react'
import StarIcon from '../../../../public/icons/StarIcon'
import StartIcon from '../../../../public/icons/StartIcon'
import Scurf from '../../../../public/icons/Scurf'
import BellsIcon from '../../../../public/icons/BellsIcon'
import DotsIcon from '../../../../public/icons/DotsIcon'
import ArrowLeft from '../../../../public/icons/ArrowLeft'
import ArrowRight from '../../../../public/icons/ArrowRight'
import computerPic from '../../../../public/images/ComputerProgrammer.jpg'
import userPic from '../../../../public/images/userProfile.jpg'
import Image from 'next/image'

function HomeContent() {
    const mockedCourses = [
        {
            id: 1,
            val: 2 ,
            courseCounts: 8,
            courseName: 'Product Design',
        },
        {
            id: 2,
            val: 3 ,
            courseCounts: 8,
            courseName: 'Product Managment',
        },
        {
            id: 3,
            val: 6 ,
            courseCounts: 12,
            courseName: 'Data Analytics',
        }
    ]



  return (
    <div className='px-8 pt-5 min-w-5xl'>
        <div className='relative mb-3.5'>
            <input className='w-full border-[1px] border-gray-2 rounded-xl pl-11 pr-4 py-5 focus:outline-none placeholder:text-sm  ' placeholder='Search your course here...'/>
            <Scurf className={'absolute top-[25px] left-[19px]'}/>
        </div>

        {/* Banner */}
        <section className='relative overflow-hidden bg-purple-10 rounded-[20px] px-6 py-5 mb-3'>
            <div className='max-w-80 '>
                <p className='text-xs text-white-1 uppercase '>Online Course</p>
                <h1 className='text-[24px] text-white-1'>
                Sharpen  Your Skills With Professional Online Courses
                </h1>
                <button className='min-w-32 flex items-center bg-black-2 px-3 py-2.5 rounded-[40px] justify-around hover:bg-gray-1'>
                    <span className='text-white-1 text-xs'>Join Now</span>
                    <StartIcon/>
                </button>
            </div>
            <StarIcon className={'absolute top-[-40px] right-[39px]'} />
            <StarIcon fillOpacity={0.5} className={'absolute top-[55px] right-[100px]'} />
            <StarIcon width={60} height={60} className={'absolute top-[25px] right-[191px]'} />
            <StarIcon width={80} height={138} className={'absolute bottom-[-69px] right-[181px]'} />
            <StarIcon width={90} height={90} className={'absolute top-[92px] right-[27px]'} />
        </section>

        {/* Watched courses */}
        <section className='flex justify-between'>
            {mockedCourses.map((item) => (
                
                <div key={item.id} className='flex items-center justify-around rounded-xl p-3 shadow-md min-w-[271px] '>
                <div className='flex  items-center justify-center rounded-full w-10 h-10 bg-pink-1'>
                    <BellsIcon/>
                </div>
                <div>
                    <p className='text-xs text-gray-3 '>2/8 Watched</p>
                    <h2 className= 'text-xs text-black-2'>Product Design</h2>
                </div>
            <DotsIcon/>
            </div>
            ))}
        </section>

        {/* Continue watching courses */}
        <section className='mt-3'>
            <div className='flex items-center justify-between mb-5'>
                <h1 className='text-black-2'>Continue Watching</h1>
                <div className='flex gap-3'>     {/* Dublicating Code Need New Component */}
                    <button className='flex items-center w-6 h-6 border-[1px] border-gray-4 rounded-full p-1.5'>
                        <ArrowLeft/>
                    </button>  
                    <button  className='flex items-center w-6 h-6 border-[1px] border-gray-4 rounded-full p-1.5'>
                        <ArrowRight/>
                    </button>      
                </div>
            </div>
            <div className='flex flex-col justify-between max-w-[268px] min-h-[296px] p-3 shadow-md rounded-[20px]'> {/* Container */}
                <div className='relative w-[244px] h-[113px] rounded-[12px] overflow-hidden'>
                        <Image 
                            src={computerPic}
                            alt='Picture of author'
                            fill
                            style={{
                            objectFit: 'cover',
                            }}
                        />
                </div>
                <div className='flex items-center justify-center px-3 py-1.5 bg-pink-1 max-w-[68px] rounded-[8px]'>
                    <span className='uppercase text-[8px] text-purple-10'>frontend</span>
                </div>    
                <h1 className='text-[14px] font-semibold'>
                Beginner’s Guide to becoming a professional frontend developer
                </h1>
                <a href='#' className='flex gap-2 items-center'>
                        <div className='block relative w-[34px] h-[34px]'>
                            <Image 
                                src={userPic}
                                alt='Picture of author'
                                fill
                                style={{
                                objectFit: 'contain',
                                }}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <h2>Prashat</h2>
                            <p className='text-[8px]'>Python Developer</p>
                        </div>
                    </a>

            </div>

        </section>

    </div>
  )
}

export default HomeContent