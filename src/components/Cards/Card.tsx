'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Progress } from '@/components/ui/progress'
import Link from 'next/link'
import profilePic from '../../../public/images/blank-avatar.webp'
import { getUserProfileImage } from '@/actions/user'


interface Props {
    id: number;
    name: string;
    category: string;
    courseImg: string;
    instructorId: number;
    instructorName: string;
    intstructorHeadline: string;
    onProgressUpdate: (id: number, totalLessons: number, completedLessons: number) => void;
}

function Card({ id, name, category, courseImg, instructorName, instructorId, intstructorHeadline, onProgressUpdate }: Props) {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [progress, setProgress] = useState<number>(0);
    const [userImg, setUserImg] = useState<string>();
    
    useEffect(() => {
        async function fetchUserProfileImage(instructorId : number){
            const res = await getUserProfileImage(instructorId.toString())
            if(res) {
                setUserImg(res);
            }
        }
        fetchUserProfileImage(instructorId)
    }, [instructorId])

    // Fetch image
    useEffect(() => {
        async function fetchImage() {
            try {
                const response = await fetch(`/api/courses/img?imageName=${courseImg}`);
                if (!response.ok) throw new Error('Failed to fetch image');
                const data = await response.json();
                setImageUrl(data.image);
            } catch (error) {
                console.error('Error fetching image:', error);
            }
        }

        if (courseImg) {
            fetchImage();
        }
    }, [courseImg]);

    // Fetch progress
    useEffect(() => {
        async function fetchProgress() {
            try {
                const response = await fetch(`/api/courses/progress?courseId=${id}`);
                if (!response.ok) throw new Error('Failed to fetch progress');
                const data = await response.json();
                setProgress(data.progress || 0);
                onProgressUpdate(id, data.totalLessons, data.completedLessons);
            } catch (error) {
                console.error('Error fetching progress:', error);
            }
        }

        fetchProgress();
    }, [id]);

    return (
        
        <div className='flex flex-col justify-around max-w-[268px] min-h-[296px] p-3 shadow-md rounded-[20px]'> {/* Container */}
        <div>
                <Link href={`/courses/${id}/view`}>
                <div className='relative w-[244px] h-[113px] rounded-[12px] overflow-hidden'>
                    {imageUrl && (
                        <Image
                            src={imageUrl || profilePic}
                            alt='Course image'
                            fill
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                    )}
                </div>
                <div className='flex items-center justify-center px-3 py-1.5 bg-pink-1 max-w-[68px] rounded-[8px] mt-3'>
                    <span className='uppercase text-[8px] text-purple-10'>{category}</span>
                </div>
                <h1 className='text-[14px] font-semibold '>
                    {name} 
                </h1>
                <Progress value={progress} />
                {/* <Link href="/home"> */}
                </Link>
                </div>
                <Link href={`/user/${instructorId}`}>
                <div className='flex gap-2 items-center'>
                        <div className='block relative w-[34px] h-[34px]'>
                            <Image
                                src={userImg || profilePic}
                                alt='Picture of author'
                                fill
                                style={{
                                    objectFit: 'cover',
                                }}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <h2>{instructorName}</h2>
                            <p className='text-[8px]'>{intstructorHeadline}</p>
                        </div>                
                </div>
                    </Link>    
                {/* </Link> */}
            </div>
    )
}

export default Card