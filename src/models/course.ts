export enum UserRole {
    Student = 'student',
    Teacher = 'teacher',
    Admin = 'admin'
}

export interface User {
    id: number;
    email: string;
    name?: string;
    surname?: string;
    userRole: UserRole;
    role?: {
        id: number;
        name: string;
    };
    group?: {
        id: number;
        name: string;
    };
    courses?: {
        id: number;
        title: string;
    }[];
}

export interface Instructor {
    id: number;
    email: string;
    password: string;
    name: string;
    surname: string;
    userRole: 'student' | 'teacher' | 'admin';
    headline: string;
    profileImage: string;

}

export interface Section {
    id: string; // UUID
    title: string;
    order: number;
    createdAt: string;
    updatedAt: string;
    lessons: Lesson[];
}

export interface Lesson {
    id: number;
    title: string;
    content: string;
    videoUrl: string;
    videoDuration: number;
    order: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}

export interface Course {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    price: number;
    isPublished: boolean;
    createdAt: string;
    updatedAt: string;
    category: string;
    instructor: Instructor;
    sections: Section[];
    enrolledStudents: User[];
}


export type UserCourse = Omit<Course, | 'sections' | 'enrolledStudents'>;

export interface CourseProgress {
    totalLessons: number;
    completedLessons: number;
    progress: number;
    completedLessonsIds: number[];
}

export interface CourseInterface {
    id: number;
    title: string;
    description: string;
    imageUrl: string | null;
    price: number;
    category: string;
}


export interface InstructorCourses {
    course: {
        id: number,
        title: string,
        description: string,
        imageUrl: string,
        price: number,
        isPublished: boolean,
        category: string,
        createdAt: string,
        updatedAt: string
      },
      instructor: {
        id: number,
        name: string,
        surname: string,
        email: string,
        profileImage:string,
        headline: string
      }
}