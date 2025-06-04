import { Course, UserRole } from "./course"

interface SocialLinks {
    facebook: string,
    website: string,
    linkedin: string,
    instagram: string,
}


export interface UserProfileInfo {
    id: number,
    email: string,
    name: string,
    surname: string,
    bio: string,
    profileImage: string,
    headline: string,
    socialLinks: SocialLinks,
    totalLearners: number;
    userRole: UserRole,
    courses: Course[],
}