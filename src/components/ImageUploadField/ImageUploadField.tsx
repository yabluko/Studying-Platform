"use client"

import { useState } from "react"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RequiredLabelIcon } from "@/components/RequiredLabelIcon/RequiredLabelIcon"
import Image from "next/image"
import { UseFormReturn } from "react-hook-form"

type ImageUploadFieldProps = {
  form: UseFormReturn<any>
  name: string
  label?: string
}

export const ImageUploadField = ({ form, name, label = "Image" }: ImageUploadFieldProps) => {
  const [preview, setPreview] = useState<string | null>(null)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const file = e.target.files?.[0]
          if (file) {
            field.onChange(file)
            const reader = new FileReader()
            reader.onloadend = () => {
              setPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
          } else {
            field.onChange(null)
            setPreview(null)
          }
        }

        return (
          <FormItem>
            <FormLabel>
              <RequiredLabelIcon />
              {label}
            </FormLabel>
            <FormControl>
              <div className="flex flex-col gap-4">
                {preview && (
                  <Image
                    src={preview}
                    alt="Image preview"
                    width={200}
                    height={200}
                    className="rounded-md border object-cover"
                  />
                )}
                <label htmlFor="image-upload">
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <Button variant="outline" type="button" asChild>
                    <span>Upload Image</span>
                  </Button>
                </label>
                {field.value instanceof File && (
                  <p className="text-sm text-muted-foreground">{field.value.name}</p>
                )}
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
