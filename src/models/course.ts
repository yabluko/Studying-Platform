export enum UserRole {
    Student='student',
    Instructor='instructor',
    Admin='admin'
}

export interface Instructor {
    id: number;
    email: string;
    password: string;
    name: string;
    surname: string;
    userRole: 'student' | 'instructor' | 'admin'; // Extend as needed
}
  
export interface Lesson {
    id: number;
    title: string;
    content: string;
    videoUrl: string;
    order: number;
    createdAt: string; // Use Date if you're parsing these as actual Date objects
    updatedAt: string;
}
  
export interface Course {
    id: number;
    title: string;
    description: string;
    imageUrl: string | null;
    price: number;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
    category: string;
    instructor: Instructor;
    lessons: Lesson[];
  }

export interface CourseInterface {
    title: string;
    description: string;
    imageUrl: string | null;
    price: number;
    category: string;
  }
  