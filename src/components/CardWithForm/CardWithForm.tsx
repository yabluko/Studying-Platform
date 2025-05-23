import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bio } from "../Bio/Bio"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { UploadIcon } from "lucide-react"

export function CardWithForm() {
  return (
    <div>

    <Card className="w-[760px] justify-between">
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email</Label>
              <Input id="name" placeholder="Name of your project" />
            </div>
            <div>
                <Bio/>
            </div>
            <div className="flex flex-col items-center gap-4 mt-6">
                <Avatar className="h-20 w-20 border-2 border-primary">
                    <AvatarImage src="/placeholder-user.jpg" alt="Profile Picture" />
                    <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                <UploadIcon className="mr-2 h-4 w-4" />
                    Change Photo
                </Button>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Update Proifle</Button>
      </CardFooter>
    </Card>
    </div>
  )
}
