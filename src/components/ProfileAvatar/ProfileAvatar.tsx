'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { signOut, useSession } from 'next-auth/react';
import profilePic from '../../../public/images/blank-avatar.webp'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'


function ProfileAvatar() {
  const router = useRouter()
  const { data: session } = useSession();
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const resProfile = await fetch("/api/user/profile");
        const profile = await resProfile.json();
        if (profile?.id) {
          const resImg = await fetch(`/api/user/profile/img/${profile.id}`);
          if (resImg.ok) {
            const data = await resImg.json();
            if (data?.image) {
              setProfileImage(data.image);
            }
          }
        }
      } catch (e) {
        toast.error(`Erro occured ${e}`)
        setProfileImage(null);
      }
    };
    fetchProfileImage();
  }, []);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Image
            src={profileImage || profilePic}
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
        <DropdownMenuItem onClick={() => router.push('/settings')}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem>
          <button onClick={() => signOut({ callbackUrl: '/login' })} className='text-red-500'>
            Logout
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ProfileAvatar