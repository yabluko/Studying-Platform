import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Image, { StaticImageData } from 'next/image'
import React from 'react'

interface Props {
    photo: StaticImageData,
    title: string,
    lectors: string ,
    price: number,
}

function StandardCard({photo, title, lectors, price} : Props) {
  return (
    <div>
        <Card className='max-w-[309px] py-[0px] rounded-md overflow-hidden h-[375px] justify-between group cursor-pointer'>
            <div className='relative lg:block border-b ' >
                <Image
                    src={photo}
                    alt='Picture of bird'
                    style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                    }}
                />
                 <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className='py-3 flex flex-col gap-3.5 min-h-[174px] justify-between'>
                <CardContent className='font-semibold text-lg '>
                    <div className=' mb-1.5'>
                        <p className='line-clamp-2'>{title}</p>
                    </div>
                    <p className='text-xs font-light text-gray-3'>
                    {lectors}
                    </p>
                </CardContent>
                <CardFooter>
                    <span className='font-bold'>
                        ${price}
                    </span>
                </CardFooter>
            </div>
        </Card>
    </div>
  )
}

export default StandardCard