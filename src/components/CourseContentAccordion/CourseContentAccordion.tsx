'use client'

import { formatDuration } from "@/helpers/datatime";
import { Lesson, Section } from "@/models/course";
import { ChevronDown, ChevronUp, PlayCircle } from "lucide-react";
import { useState } from "react";


export function CourseContentAccordion({ sections }: { sections: Section[] }) {
    const [openSection, setOpenSection] = useState<number | null>(0);

    const courseSecondsDuration = sections.map(section => section.lessons.map(lesson => lesson.videoDuration)
        .reduce((acc, curr) => acc + curr, 0))

    console.log("sections", sections);
    return (
        <div className="space-y-2">
            {sections?.map((section, idx) => {
                return (
                    <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                            className="w-full flex justify-between items-center bg-gray-50 p-4 border-b border-gray-200 font-semibold text-left"
                            onClick={() => setOpenSection(openSection === idx ? null : idx)}
                        >
                            <span>
                                {section.title}
                                <span className="ml-2 text-sm font-normal text-gray-500">
                                    {section.lessons?.length || 0} lections {formatDuration(section.lessons.map(lesson => lesson.videoDuration)
                                        .reduce((acc, curr) => acc + curr, 0))}
                                </span>
                            </span>
                            {openSection === idx ? <ChevronUp /> : <ChevronDown />}
                        </button>
                        {openSection === idx && (
                            <div className="divide-y divide-gray-200">
                                {section.lessons?.map((lesson: Lesson) => (
                                    <div key={lesson.id} className="p-4 flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <PlayCircle className="w-5 h-5 text-gray-500" />
                                            <span className="text-gray-700">{lesson.title}</span>
                                        </div>
                                        <span className="text-gray-500">{formatDuration(lesson.videoDuration)}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
} 