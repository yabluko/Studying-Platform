import { updateUserProfile, getUserProfileInfo } from "@/actions/user"
import { NextResponse } from "next/server"

async function GET(req: Request) {
    const profile = await getUserProfileInfo()
    return NextResponse.json(profile)
}

async function PUT(req: Request) {
    const { name, userRole, email, headline, bio, surname, website, facebook, instagram, linkedin } = await req.json()
    const response = await updateUserProfile(name, userRole, email, headline, bio, surname, website, facebook, instagram, linkedin)
    return NextResponse.json(response)
}

export { GET, PUT } 