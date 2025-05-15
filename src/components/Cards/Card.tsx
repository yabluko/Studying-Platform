import React from 'react'
import userPic from '../../../public/images/userProfile.jpg'
import computerPic from '../../../public/images/ComputerProgrammer.jpg'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'

function Card() {
  return (

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
                <Progress value={33} />
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
  )
}

export default Card