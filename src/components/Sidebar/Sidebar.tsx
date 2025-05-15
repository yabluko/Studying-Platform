"use client"

import Image from 'next/image'
import React  from 'react'
import LogoTemplate from '../../components/Logo/Logo'
import HomeIcon from '../../../public/icons/HomeIcon'
import InboxIcon from '../../../public/icons/InboxIcon'
import LessonIcon from '../../../public/icons/LessonIcon'
import TaskIcon from '../../../public/icons/TaskIcon'
import GroupIcon from '../../../public/icons/GroupIcon'
import LogoutIcon from '../../../public/icons/LogoutIcon'
import SettingsIcon from '../../../public/icons/SettingsIcon'
import profilePic from '../../../public/images/userProfile.jpg'
import { useState } from 'react'
import { signOut } from 'next-auth/react'


const mockedValues = [
    {
        id: '1',
        Icon:  HomeIcon,
        name: 'Dashboard',
    },
    {
        id: '2',
        Icon:  InboxIcon,
        name: 'Inbox',
    }, 
    {
        id: '3',
        Icon:   LessonIcon,
        name: 'Lesson',
    },
    {
        id: '4',
        Icon: TaskIcon,
        name: 'Task',    
    },
    {
        id: '5',
        Icon: GroupIcon,
        name: 'Group',

    },
]
function Sidebar() {
    const [selectedItem, setSelectedItem] = useState('Dashboard');



  return (
    <aside className='flex flex-col justify-between bg-white shadow-sm px-12 py-8'>
        <LogoTemplate/>
        <nav className='flex flex-col '>
            <h1 className='pb-2.5'>
                OVERVIEW
            </h1>
            <ul className='flex flex-col gap-2'>
                {
                    mockedValues.map((item) => (
                         <li key={item.id}> 
                            <a href='#' className={'card flex items-center gap-3 pr-2 py-2 group'} onClick={() => setSelectedItem(item.name)}>
                            <item.Icon className={selectedItem === item.name ? 'stroke-purple-10' : 'stroke-black group-hover:stroke-purple-10'} />
                            <span className={selectedItem === item.name ? 'text-purple-10' : 'group-hover:text-purple-10'}>{item.name}</span>
                            </a>
                        </li>
                    ))
                }
            </ul>
        </nav>

        <div>
            <h1 className='pb-2.5'>
                FRIENDS
            </h1>
            <ul>
                <li >
                    <a href='#' className='flex gap-2 items-center'>
                        <div className='block relative w-[34px] h-[34px]'>
                            <Image 
                                src={profilePic}
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
                </li>
            </ul>
        </div>
        <div>
            <h1 className='pb-2.5'>
                SETTINGS
            </h1>
            <ul className='flex flex-col gap-1.5'>
                <li>
                    <a href='#' className='flex items-center gap-3'>
                        <SettingsIcon/>
                        <h2>Settings</h2>
                    </a>
                </li>
                <li>
                    <button className='flex items-center gap-3' onClick={() => signOut({callbackUrl: '/login'})}>
                        <LogoutIcon/>
                        <h2 className='text-red-600'>Logout</h2>
                    </button>
                </li>
            </ul>
        </div>
        
    </aside>
  )
}

export default Sidebar