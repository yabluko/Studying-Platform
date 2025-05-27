'use client'
import CardWithForm from '@/components/CardWithForm/CardWithForm'
import PhotoWithForm from '@/components/CardWithForm/PhotoWithForm'
import { NavigationMenuWithActiveItem } from '@/components/NavigationMenu/NavigationMenu'
import Sidebar from '@/components/Sidebar/Sidebar'
import React, { useState } from 'react'

function Settings() {
    const [activeItem, setActiveItem] = useState('Profile')

    let content
    if (activeItem === 'View public profile') {
        content = <div>Public profile content here</div>
    } else if (activeItem === 'Profile') {
        content = <CardWithForm />
    } else if (activeItem === 'Photo') {
        content = <PhotoWithForm />
    }

    return (
        <div className='flex'>
            <Sidebar />
            <main className='w-full'>
                <div className='p-7'>
                    <div className='mb-3.5'>
                        <h1 className='text-2xl font-bold tracking-tight'>Settings</h1>
                        <h3 className='text-muted-foreground'>Manage your account settings and set e-mail preferences.</h3>
                    </div>
                    <div className='flex gap-7'>
                        <div className="flex-1">{content}</div>
                        <NavigationMenuWithActiveItem active={activeItem} setActive={setActiveItem} />
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Settings