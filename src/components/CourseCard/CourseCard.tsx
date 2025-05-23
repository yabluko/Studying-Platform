import React from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { CourseInterface } from '@/models/course'
import Image from 'next/image'
import { getCourseImage } from '@/actions/course'



async function CourseCard({ imageUrl, title, description, price, category }: CourseInterface) {
  const courseImage = await getCourseImage(imageUrl);

  return (
    <Card className='h-[400px]'>
      <CardHeader>
        <Image
          src={courseImage}
          width={400}
          height={200}
          alt="Course thumbnail"
          className="rounded-t-lg object-cover w-full aspect-[2/1]"
        />
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="font-medium">{title}</div>
          <Badge variant="default">{category}</Badge>
        </div>
        <p className="text-muted-foreground text-sm line-clamp-2">
          {description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <div className="font-medium">{price}$</div>
          <Button variant="outline">Enroll</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default CourseCard