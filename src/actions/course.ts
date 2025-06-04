'use server'

import { CourseCategory, PayloadSection } from "@/app/(app)/admin/courses/new/page";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { API_BASE_URL } from "@/config/http";
import { Course, CourseProgress } from "@/models/course";
import { getServerSession } from "next-auth";

export interface CoursePayload {
    title: string;
    description: string;
    image?: File | null;
    price: string;
    category: string;
}

export async function insertCourse(info: CoursePayload): Promise<Course | undefined> {
    const session = await getServerSession(authOptions)
    try {
        const formData = new FormData()
        formData.append("title", info.title)
        formData.append("description", info.description)
        if (info.image instanceof File) {
            formData.append("file", info.image)
        }
        formData.append("price", info.price)
        formData.append("category", info.category)
        console.log(session)
        const res = await fetch(`${API_BASE_URL}/courses/new`, {
            method: "POST",
            body: formData,
            headers: {
                authorization: `Bearer ${session?.tokens.accessToken}`,
            },
        })
        if (!res.ok) {
            console.error('Failed to create course:', res.statusText)
            return undefined
        }

        const data = await res.json()
        return data
    } catch (error) {
        console.error('Error creating course:', error)
        return undefined
    }
}

export async function createSectionWithLesson(courseId: number, sectionName: string, lessonTitle: string, lessonDescription: string, video: File) {
    const session = await getServerSession(authOptions)
    const formData = new FormData();
    formData.append('name', sectionName);
    formData.append('lessonTitle', lessonTitle);
    formData.append('lessonDescription', lessonDescription);
    formData.append('video', video);

    try {
        const res = await fetch(`${API_BASE_URL}/courses/${courseId}/sections`, {
            method: 'POST',
            body: formData,
            headers: {
                authorization: `Bearer ${session?.tokens.accessToken}`,
            },
        });

        if (!res.ok) {
            throw new Error('Failed to create section with lesson');
        }
        return await res.json();
    } catch (error) {
        console.error('Error creating section with lesson:', error);
        return undefined;
    }
}

export async function getCourses(): Promise<Course[] | null> {
    const session = await getServerSession(authOptions);
    try {
        const response = await fetch(`${API_BASE_URL}/courses`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.tokens.accessToken}`,
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch courses');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching courses:', error);
        return null;
    }
}

export async function getCourseImage(imageName: string | null): Promise<any> {
    console.log("Starting getCourseImage function");
    const session = await getServerSession(authOptions);
    console.log("Session obtained:", !!session);

    try {
        console.log("Attempting to fetch image with name:", imageName);
        const res = await fetch(`${API_BASE_URL}/courses/course-image/${imageName ?? ''}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${session?.tokens.accessToken}`,
            },
        })
        console.log('Course Image Response Status:', res.status);
        console.log('Course Image Response Headers:', Object.fromEntries(res.headers.entries()));

        if (!res.ok) {
            console.error('Failed to fetch image:', res.statusText);
            return;
        } else {
            console.log('Successfully received image data');
            const buffer = await res.arrayBuffer();
            const base64 = Buffer.from(buffer).toString('base64');
            const contentType = res.headers.get('content-type') || 'image/jpeg';
            console.log('Image converted to base64, content type:', contentType);

            return `data:${contentType};base64,${base64}`;
        }
    } catch (err) {
        console.error('Error in getCourseImage:', err);
        throw err; // Re-throw the error to handle it in the component
    }
}

export async function getCourseDetails(courseId: string): Promise<Course | null> {
    const session = await getServerSession(authOptions);
    try {
        const response = await fetch(`${API_BASE_URL}/course/${courseId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.tokens.accessToken}`,
            },
            cache: 'no-store'
        })

        if (!response.ok) {
            throw new Error('Failed to fetch course details');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching course details:', error);
        return null;
    }
}

export async function getLessonVideo(videoName: string | null): Promise<{ src: string; contentType: string } | null> {
    if (!videoName) return null;
    const session = await getServerSession(authOptions);
    try {
        const res = await fetch(`${API_BASE_URL}/courses/lesson-video/${videoName}`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${session?.tokens.accessToken}`,
            },
        });
        if (!res.ok) {
            console.error(`Failed to fetch video: ${res.status} ${res.statusText}`);
            return null;
        }
        const buffer = await res.arrayBuffer();
        const contentType = res.headers.get('content-type') || 'video/mp4';
        const base64 = Buffer.from(buffer).toString('base64');
        const src = `data:${contentType};base64,${base64}`;
        return { src, contentType };
    } catch (err) {
        console.error('Error fetching lesson video:', err);
        return null;
    }
}

export async function enrollInCourse(courseId: string) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            throw new Error('Unauthorized');
        }
        const response = await fetch(`${API_BASE_URL}/courses/${courseId}/enroll`, {
            method: 'POST',
            body: JSON.stringify({
                courseId: courseId,
                userId: session?.user?.id,
            }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.tokens.accessToken}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to enroll in course');
        }

        return response.json();
    } catch (error) {
        console.error('Error enrolling in course:', error);
        throw error;
    }
}
export async function markLessonAsCompleted(lessonId: string) {
    const session = await getServerSession(authOptions);
    try {
        const response = await fetch(`${API_BASE_URL}/lessons/${lessonId}/complete`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${session?.tokens.accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to mark lesson as completed');
        }
        return await response.json();
    } catch (error) {
        console.error('Error marking lesson as completed:', error);
        throw error;
    }
}

export async function getCompletedLessons() {
    const session = await getServerSession(authOptions);
    const response = await fetch(`${API_BASE_URL}/user/completed/lessons`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${session?.tokens.accessToken}`,
        },
    });
    return response.json();
}

export async function getCourseProgress(courseId: string): Promise<CourseProgress | null> {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            throw new Error('Unauthorized');
        }

        const response = await fetch(`${API_BASE_URL}/courses/${courseId}/progress`, {
            headers: {
                'Authorization': `Bearer ${session.tokens.accessToken}`,
            },
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error('Failed to fetch course progress');
        }

        return response.json();
    } catch (error) {
        console.error('Error fetching course progress:', error);
        return null;
    }
}

// export async function getCourseLessons(courseId: string) {
//     try {
//         const session = await getServerSession(authOptions);

//         if (!session) {
//             throw new Error('Unauthorized');
//         }

//         const response = await fetch(`${API_BASE_URL}/${courseId}/lessons`, {
//             headers: {
//                 'Authorization': `Bearer ${session.tokens.accessToken}`,
//             },
//             cache: 'no-store'
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch course lessons');
//         }

//         return response.json();
//     } catch (error) {
//         console.error('Error fetching course lessons:', error);
//         return null;
//     }
// }

// export async function updateLessonProgress(courseId: string, lessonId: string, progress: number) {
//     try {
//         const session = await getServerSession(authOptions);

//         if (!session) {
//             throw new Error('Unauthorized');
//         }

//         const response = await fetch(`${API_BASE_URL}/courses/${courseId}/lessons/${lessonId}/progress`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${session.tokens.accessToken}`,
//             },
//             body: JSON.stringify({ progress }),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to update lesson progress');
//         }

//         return response.json();
//     } catch (error) {
//         console.error('Error updating lesson progress:', error);
//         throw error;
//     }
// }


// // Add these to your actions file:
// export async function createSection(courseId: string, title: string, order: number) { /* ... */ }

// export async function createLesson(courseId: string, title: string, order: number, videoFile: File) {
//     try {
//         const session = await getServerSession(authOptions);

//         if (!session) {
//             throw new Error('Unauthorized');
//         }
//         const response = await fetch(`${API_BASE_URL}/${courseId}/lessons/`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${session.tokens.accessToken}`,
//             },
//             body: JSON.stringify({
//                 title,
//                 order,
//                 videoFile
//             }),
//         });

//         if (!response.ok) {
//             throw new Error('Failed to update lesson progress');
//         }

//         return response.json();
//     }
//     catch (error) {
//         console.error('Error creating lesson:', error);
//         throw error;
//     }
// }