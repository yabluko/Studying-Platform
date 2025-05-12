import React from 'react'
import DotsIcon from '../../../public/icons/DotsIcon'
import BellsIcon from '../../../public/icons/BellsIcon'
import InboxIcon from '../../../public/icons/InboxIcon'
import TaskIcon from '../../../public/icons/TaskIcon'
import userPic from '../../../../public/images/userProfile.jpg'
import personPic from '../../../../public/images/person1.jpeg'
import Image from 'next/image'
import PieChart from '@/components/ui/PieChart'
import BarChartComponent from '@/components/ui/BarChart'

function ProfileContent() {
    const arrNumbers = [1,2,3,4];

    const mockedArr = [
        {
            id: 1,
            icon: BellsIcon,
        },
        {
            id: 2,
            icon: InboxIcon,
        },
        {
            id: 3,
            icon: TaskIcon
        }

    ]
  return (
    <div className='flex flex-col gap-9 bg-white-1 px-6 py-8 shadow-sm'>
        <div className='flex justify-between items-center gap-[134px]'>
        <h1 className='font-medium'>Your Profile</h1>
        <DotsIcon strokeColor={'black'}/>
        </div>

        {/* Profile Section */}
        <section className='max-w-[248px] flex flex-col gap-4 items-center  px-5'>
            <div className='w-[100px] relative'>

                <PieChart/>
                <div className='absolute top-[15px] left-[15px] w-[72px] h-[72px] overflow-hidden rounded-full'>
                <Image 
                            src={userPic}
                            alt='Picture of author'
                            fill
                            style={{
                            objectFit: 'cover',
                            }}
                        />
                </div>  
            </div>
            <div className='text-center'>
                <h1>
                Good Morning Prashant
                </h1>
                <p className='text-gray-4 font-medium text-xs'>Continue Your Journey And Achieve Your Target</p>
            </div>
            <div >
                <ul className='flex gap-6'>
                    {
                        mockedArr.map((item) =>  (
                        <li className='border border-black p-3 rounded-full' key={item.id}>
                            <item.icon/>
                        </li>
                        ))
                    }
                </ul>
            </div>
        </section>
        <BarChartComponent/>
        <section className='flex flex-col min-h-[369px]'>
            <div className='mb-2'>
                <h1>Your Mentor</h1>       
            </div>
            <div className='flex flex-1 flex-col justify-between'>
            <div>
                <ul className='flex flex-col gap-3'>
                    {
                        arrNumbers.map((_, index) => (
                            <li key={index}>
                                <a href='#' className='flex justify-between items-center'>
                                <div className='flex gap-2'>
                                    <div className='relative w-10 h-10 rounded-full overflow-hidden '>
                                        <Image 
                                            src={personPic}
                                            alt='Picture of author'
                                            fill
                                            style={{
                                                objectFit: 'cover',
                                            }}
                                            />
                                    </div>
                                    <div className='flex flex-col'>
                                    <h2>Prashat</h2>
                                    <p className='text-[8px]'>Python Developer</p>
                                    </div>
                                </div>    
                                    <button className='max-h-[18px] bg-[var(--chart-1)] rounded-[8px] text-white-1 text-[8px] px-2 py-1 '>Follow</button>
                                </a>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <a className="flex justify-center align-center bg-purple-200 rounded-2xl px-24 py-2 text-xs text-purple-500" href='#'> See All </a>
            </div>
        </section>
    </div>
  )
}

export default ProfileContent