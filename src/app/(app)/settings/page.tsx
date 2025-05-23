import { CardWithForm } from '@/components/CardWithForm/CardWithForm'
import { NavigationMenuWithActiveItem } from '@/components/NavigationMenu/NavigationMenu'
import Sidebar from '@/components/Sidebar/Sidebar'
import React from 'react'

function Settings() {
  return (
    <div className='flex'>
        <Sidebar/>
        <main className='w-full'>
            <div className='p-7'>
                <div className='mb-3.5'>
                    <h1 className='text-2xl font-bold tracking-tight'>Settings</h1>
                    <h3 className='text-muted-foreground'>Manage your account settings and set e-mail preferences.</h3>  
                </div>
                <div className='flex gap-7'>
                    <CardWithForm/>
                    <NavigationMenuWithActiveItem/>
                </div>

            </div>
        </main>
    </div>
  )
}

export default Settings