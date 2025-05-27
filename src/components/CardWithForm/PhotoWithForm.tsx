import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { UploadIcon } from 'lucide-react'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { toast, ToastContainer } from 'react-toastify'

function PhotoWithForm() {
    const [preview, setPreview] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    // Handle file selection and preview
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setPreview(URL.createObjectURL(file))
            uploadImage(file)
        }
    }

    // Upload image to API
    const uploadImage = async (file: File) => {
        setLoading(true)
        const formData = new FormData()
        formData.append('image', file)
        try {
            const res = await fetch('/api/user/profile/img', {
                method: 'POST',
                body: formData,
            })
            const data = await res.json()
            if (res.ok) {
                toast.success('Profile image updated!')
            } else {
                toast.error(data?.error || 'Failed to upload image')
            }
        } catch (err) {
            toast.error('An error occurred while uploading.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <ToastContainer />
            <Card className="w-[760px] flex flex-col items-center justify-center">
                <CardContent className="flex flex-col items-center gap-4 mt-6">
                    <Avatar className="h-20 w-20 border-2 border-primary">
                        <AvatarImage src={preview || "/placeholder-user.jpg"} alt="Profile Picture" />
                        <AvatarFallback>JP</AvatarFallback>
                    </Avatar>
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                        disabled={loading}
                    />
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={loading}
                    >
                        <UploadIcon className="mr-2 h-4 w-4" />
                        {loading ? "Uploading..." : "Change Photo"}
                    </Button>
                </CardContent>
                <CardFooter>
                    {/* You can add more actions here if needed */}
                </CardFooter>
            </Card>
        </div>
    )
}

export default PhotoWithForm