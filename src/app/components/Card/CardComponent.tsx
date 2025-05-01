import React from 'react'
import {
    Card,
    CardContent,
    CardFooter,
  } from "@/components/ui/card"
import Image, { StaticImageData } from 'next/image'
  
interface Props {
    photoUrl: StaticImageData ,
    cardTitle: string,
    cardContent: string,
}
function CardComponent({photoUrl, cardTitle, cardContent} : Props) {
  return (
    <>
    <Card className='w-[420px] p-[18px]'>
        <div className='relative lg:block h-[217px]  rounded-xl overflow-hidden' >
            <Image
                src={photoUrl}
                alt='Picture of bird'
                fill
                style={{
                    objectFit: 'cover',
                }}
            />
        </div>
        <CardContent className='font-semibold text-lg'>
            <p>{cardTitle}</p>
        </CardContent>
        <CardFooter>
            <p>{cardContent}</p>
        </CardFooter>
    </Card>
    </>

  )
}

export default CardComponent