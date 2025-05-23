'use client'

import React from 'react'
import LogoTemplate from '../../components/Logo/Logo'
import HomeIcon from '../../../public/icons/HomeIcon'
import InboxIcon from '../../../public/icons/InboxIcon'
import LessonIcon from '../../../public/icons/LessonIcon'
import TaskIcon from '../../../public/icons/TaskIcon'
import GroupIcon from '../../../public/icons/GroupIcon'
import LogoutIcon from '../../../public/icons/LogoutIcon'
import SettingsIcon from '../../../public/icons/SettingsIcon'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation' // 💡 новий хук
import { useSession } from 'next-auth/react'
import { UserRole } from '@/models/course'

const mockedValues = [
    {
        id: '1',
        Icon: HomeIcon,
        name: 'Dashboard',
        href: '/home'
    },
    {
        id: '2',
        Icon: InboxIcon,
        name: 'Courses',
        href: '/courses'
    },
    {
        id: '3',
        Icon: LessonIcon,
        name: 'Lesson',
        href: '/lesson'
    },
    // {
    //     id: '4',
    //     Icon: TaskIcon,
    //     name: 'Task',
    //     href: '/task'
    // },
    // {
    //     id: '5',
    //     Icon: GroupIcon,
    //     name: 'Group',
    //     href: '/group'
    // },
]

function Sidebar() {
    const pathname = usePathname(); // отримуємо поточний шлях
    const { data: session } = useSession();
    const userRole = session?.user?.userRole; // or session?.user?.role depending on your user object
    console.log("userRole", userRole);
    return (
        <aside className='flex flex-col justify-between bg-white shadow-sm px-12 py-8 min-h-screen'>
            <LogoTemplate />
            <nav className='flex flex-col '>
                <h1 className='pb-2.5'>OVERVIEW</h1>
                <ul className='flex flex-col gap-2'>
                    {mockedValues.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <li key={item.id}>
                                <Link href={item.href} className='card flex items-center gap-3 pr-2 py-2 group'>
                                    <item.Icon className={isActive ? 'stroke-purple-10' : 'stroke-black group-hover:stroke-purple-10'} />
                                    <span className={isActive ? 'text-purple-10' : 'group-hover:text-purple-10'}>
                                        {item.name}
                                    </span>
                                </Link>
                            </li>
                        );
                    })}
                    {/* Show My Courses and Create Course for teacher/admin */}
                    {(userRole === UserRole.Teacher || userRole === UserRole.Admin) && (
                        <>
                            <li>
                                <Link href="/my-courses" className='card flex items-center gap-3 pr-2 py-2 group'>
                                    <InboxIcon className={pathname === '/my-courses' ? 'stroke-purple-10' : 'stroke-black group-hover:stroke-purple-10'} />
                                    <span className={pathname === '/my-courses' ? 'text-purple-10' : 'group-hover:text-purple-10'}>
                                        My Courses
                                    </span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/admin/courses/new" className='card flex items-center gap-3 pr-2 py-2 group'>
                                    <span className="text-green-600 font-bold">+ Create Course</span>
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            <div>
                <h1 className='pb-2.5'>SETTINGS</h1>
                <ul className='flex flex-col gap-1.5'>
                    <li>
                        <Link href='/settings' className='flex items-center gap-3 group'>
                            <SettingsIcon className={pathname === '/settings' ? 'stroke-purple-10' : 'stroke-black group-hover:stroke-purple-10'} />
                            <span className={pathname === '/settings' ? 'text-purple-10' : 'group-hover:text-purple-10'}>
                                Settings
                            </span>
                        </Link>
                    </li>
                    <li>
                        <button
                            className='flex items-center gap-3'
                            onClick={() => {
                                localStorage.removeItem('justLoggedIn')
                                signOut({ callbackUrl: '/login' })
                            }}
                        >
                            <LogoutIcon />
                            <h2 className='text-red-600'>Logout</h2>
                        </button>
                    </li>
                </ul>
            </div>
        </aside>
    );
}

export default Sidebar;
