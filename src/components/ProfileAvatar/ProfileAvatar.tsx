'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { signOut, useSession } from 'next-auth/react';
import profilePic from '../../../public/images/career-card-digitalmarketer.webp'

function ProfileAvatar() {
  const {data : session} = useSession();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-full">
            <Image
              src={profilePic}
              width={32}
              height={32}
              alt="Avatar"
              className="rounded-full"
              style={{ aspectRatio: "32/32", objectFit: "cover" }}
            />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{session?.user?.email}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem> 
            <button onClick={() => signOut({callbackUrl: '/login'})} className='text-red-500'>
            Logout
            </button>
            </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
        </> 
  )
}

export default ProfileAvatar