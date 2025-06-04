'use client'
import React, { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { CourseInterface } from '@/models/course'
import Image from 'next/image'
import { getCourseImage } from '@/actions/course'

type CourseCardProps = CourseInterface & {
  width?: number;
  height?: number;
  minHeight?: number;
};



function CourseCard({ imageUrl, title, description, price, category, width, height, minHeight }: CourseCardProps) {
  const [imgUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!imageUrl) {
      setLoading(false);
      return;
    }
    async function fetchCourseImage() {
      try {
        setLoading(true);
        const res = await getCourseImage(imageUrl);
        if (res) {
          setImageUrl(res);
        }
      } catch (err) {
        console.error("CourseCard: Error getting image", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCourseImage();
  }, [imageUrl]);

  return (
    <Card style={{width, height, minHeight}}>
      <CardHeader>
        {loading ? (
          <div className="w-full h-[133px] flex items-center justify-center bg-gray-100 rounded-t-lg">
            {/* Replace with your spinner or skeleton */}
            <span className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></span>
          </div>
        ) : imgUrl ? (
          <Image
            src={imgUrl}
            width={400}
            height={200}
            alt="Course thumbnail"
            className="rounded-t-lg object-cover w-full aspect-[2/1]"
          />
        ) : (
          <div className="w-full h-[200px] flex items-center justify-center bg-gray-100 rounded-t-lg text-gray-400">
            No image
          </div>
        )}
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