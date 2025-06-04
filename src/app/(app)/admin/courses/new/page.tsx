'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import HeaderComponent from '@/components/Header/HeaderComponent'
import { Input } from '@/components/ui/input';
import { CoursePayload } from '@/actions/course';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
export enum CourseCategory {
  MATH = 'Math',
  ENGLISH = 'English',
  HISTORY = 'History',
  TECH = 'Tech',
  SPORT = 'Sport',
}

type Lesson = { title: string; video: File, description: string };
export type PayloadSection = { name: string; lessons: Lesson[] };

export default function CourseCreationWizard() {
  const [step, setStep] = useState(1);
  const router = useRouter();
  const [course, setCourse] = useState({
    title: '',
    description: '',
    image: null as File | null,
    price: '',
    category: '',
  } as CoursePayload);
  const [sections, setSections] = useState<PayloadSection[]>([]);
  const [sectionName, setSectionName] = useState('');
  const [lessonInputs, setLessonInputs] = useState<{ title: string; description: string; video: File | null }[]>([]);
  const [courseId, setCourseId] = useState<number | null>(null);
  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);


  // Stepper UI
  const steps = [
    { label: 'Course Info', done: step > 1 },
    { label: 'Sections & Lessons', done: step > 2 },
    { label: 'Finish', done: false },
  ];

  // Handlers
  const handleCourseInfoNext = async () => {
    try {
      const formData = new FormData()
      formData.append('title', course.title)
      formData.append('description', course.description)
      formData.append('price', course.price)
      formData.append('category', course.category)
      if (course.image) {
        formData.append('image', course.image)
      }

      const response = await fetch('/api/courses/new', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Failed to create course')
      }

      const courseResult = await response.json()
      setCourseId(courseResult.id)
      setStep(2)
    } catch (error) {
      toast.error('Error creating course:')
    }
  }
  const handleAddSection = () => {
    if (sectionName.trim()) {
      setSections([...sections, { name: sectionName, lessons: [] }]);
      setLessonInputs([...lessonInputs, { title: '', description: '', video: null }]);
      setSectionName('');
    }
  };

  const handleAddLesson = async (sectionIdx: number) => {
    if (
      lessonInputs[sectionIdx]?.title.trim() &&
      lessonInputs[sectionIdx]?.video &&
      lessonInputs[sectionIdx]?.description.trim() &&
      courseId
    ) {
      try {
        const sectionName = sections[sectionIdx].name;
        const formData = new FormData();
        formData.append('courseId', courseId.toString());
        formData.append('name', sectionName);
        formData.append('lessonTitle', lessonInputs[sectionIdx].title);
        formData.append('lessonDescription', lessonInputs[sectionIdx].description);
        if (lessonInputs[sectionIdx].video) {
          formData.append('video', lessonInputs[sectionIdx].video);
        }

        const res = await fetch('/api/sections/new', {
          method: 'POST',
          body: formData,
        });
        if (!res.ok) {
          throw new Error('Failed to create section with lesson');
        }

        // Update UI state
        setSections(sections =>
          sections.map((section, idx) =>
            idx === sectionIdx
              ? { ...section, lessons: [...section.lessons, { title: lessonInputs[idx].title, video: lessonInputs[idx].video!, description: lessonInputs[idx].description }] }
              : section
          )
        );
        setLessonInputs(lessonInputs =>
          lessonInputs.map((input, i) =>
            i === sectionIdx
              ? { ...input, title: '', description: '', video: null }
              : input
          )
        );
        // Reset the file input DOM value
        if (fileInputRefs.current[sectionIdx]) {
          fileInputRefs.current[sectionIdx]!.value = '';
        }
      } catch (err) {
        toast.error('Failed to add lesson');
        console.error(err);
      }
    }
  };

  const handleSubmit = async (course: CoursePayload, sections: PayloadSection[]) => {
    toast.success('Course created successfully');
  };

  return (
    <div>
      <HeaderComponent isFromHome={true} />
      <div className="max-w-2xl mx-auto py-10">
        <h1 className='text-2xl font-bold mb-4'>Create New Course</h1>
        {/* Stepper */}
        <div className="flex items-center mb-8">
          {steps.map((s, idx) => (
            <div key={s.label} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === idx + 1 ? 'bg-blue-600 text-white' : s.done ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {idx + 1}
              </div>
              {idx < steps.length - 1 && <div className="w-8 h-1 bg-gray-300 mx-2" />}
            </div>
          ))}
        </div>

        {/* Step 1: Course Info */}
        {step === 1 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Step 1: Course Info</h2>
            <input
              className="border p-2 w-full mb-2 rounded-md"
              placeholder="Course Title"
              value={course.title}
              onChange={e => setCourse({ ...course, title: e.target.value })}
            />
            <textarea
              className="border p-2 w-full mb-2 rounded-md"
              placeholder="Course Description"
              value={course.description}
              onChange={e => setCourse({ ...course, description: e.target.value })}
            />
            <select
              className="border p-2 w-full mb-4 rounded-md"
              value={course.category}
              onChange={e => setCourse({ ...course, category: e.target.value as CourseCategory })}
            >
              <option value="">Select Category</option>
              {Object.entries(CourseCategory).map(([key, value]) => (
                <option key={key} value={value}>{value}</option>
              ))}
            </select>
            <input
              className="border p-2 w-full mb-2 rounded-md"
              placeholder="Course Price"
              value={course.price !== '' ? `${course.price}$` : ''}
              onChange={e => {
                // Remove all non-numeric and non-dot characters
                let value = e.target.value.replace(/[^0-9.]/g, '');
                setCourse({ ...course, price: value });
              }}
            />

            <label htmlFor="image-upload" className='mb-2 block'>
              <Input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => setCourse({ ...course, image: e.target.files?.[0] ?? null })}
              />
              <Button variant="outline" type="button" asChild>
                <span>Upload Image</span>
              </Button>
            </label>
            {course.image && (
              <p className="text-sm text-muted-foreground">{course.image.name}</p>
            )}
            <div className='flex justify-end'>
              <Button
                className='mt-4'
                onClick={() => handleCourseInfoNext()}
                disabled={!course.title || !course.description || !course.image || !course.category}
              >
                Next
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Sections & Lessons */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Step 2: Sections & Lessons</h2>
            <div className="mb-4 flex justify-between">
              <input
                className="border p-2 w-2/3 mr-2"
                placeholder="Section Name"
                value={sectionName}
                onChange={e => setSectionName(e.target.value)}
              />
              <Button onClick={handleAddSection} disabled={!sectionName}>Add Section</Button>
            </div>
            <div>
              {sections.map((section, idx) => (
                <div key={idx} className="mb-4 border rounded p-2">
                  <div className="font-semibold mb-2">{section.name}</div>
                  <ul className="mb-2">
                    {section.lessons.map((lesson, lidx) => (
                      <li key={lidx} className="ml-4 list-disc">
                        {lesson.title}
                        {lesson.video && (
                          <span className="ml-2 text-xs text-gray-500">
                            ({lesson.video.name})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="mb-6 flex gap-2 flex-col justify-between">
                    <input
                      className="border p-1 block rounded-md max-w-[300px]"
                      placeholder="Lesson Title"
                      value={lessonInputs[idx]?.title || ''}
                      onChange={e => {
                        const newInputs = [...lessonInputs];
                        newInputs[idx].title = e.target.value;
                        setLessonInputs(newInputs);
                      }}
                    />
                    <textarea
                      className="border p-2 w-full mb-2 rounded-md"
                      placeholder="Lesson Description"
                      value={lessonInputs[idx]?.description || ''}
                      onChange={e => {
                        const newInputs = [...lessonInputs];
                        newInputs[idx].description = e.target.value;
                        setLessonInputs(newInputs);
                      }}
                    />
                    <div className='flex justify-between'>

                      <label htmlFor={`video-upload-${idx}`} className='mb-2 block'>
                        <Input
                          ref={el => fileInputRefs.current[idx] = el}
                          id={`video-upload-${idx}`}
                          type="file"
                          accept="video/*"
                          className="hidden"
                          onChange={e => {
                            const newInputs = [...lessonInputs];
                            newInputs[idx].video = e.target.files?.[0] || null;
                            setLessonInputs(newInputs);
                          }}
                        />
                        <Button asChild variant="outline" type="button">
                          <span>Upload Video</span>
                        </Button>
                      </label>

                      <Button className='w-fit'
                        onClick={async () => {
                          await handleAddLesson(idx);
                        }}
                        disabled={
                          !lessonInputs[idx]?.title ||
                          !lessonInputs[idx]?.video ||
                          !lessonInputs[idx]?.description ||
                          !courseId
                        }
                      >
                        Add Lesson
                      </Button>

                    </div>
                  </div>

                  {lessonInputs[idx]?.video && (
                    <div className="text-xs text-gray-500 mt-1">
                      Selected video: {lessonInputs[idx]?.video.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
              <Button onClick={() => setStep(3)} disabled={sections.length === 0}>Finish</Button>
            </div>
          </div>
        )}

        {/* Step 3: Finish */}
        {step === 3 && (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Course Created!</h2>
            <p>Your course has been created successfully.To find out more about your course, please click the button below.</p>
            <Button onClick={() => router.push(`/courses/${courseId}`)}>View Course</Button>
          </div>
        )}
      </div>
    </div >
  );
}