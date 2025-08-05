'use client';

import Loading from '@/app/_components/Loading';
import { Button } from '@/components/ui/button';
import { Classroom } from '@/types/classroomsCreated';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function Page() {
    const router = useRouter();
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [course, setCourse] = useState<Classroom | null>(null);
    const { courseId } = useParams();

    const handleEnroll = async () => {
        try {
            await axios.post(`/api/courses/enroll`, { courseId });
            window.location.reload();
        } catch (error) {
            setError('Failed to enroll in the course. Please try again later.');
            window.location.reload();
        }
    };

    const handleDeEnroll = async () => {
        try {
            await axios.post(`/api/courses/deenroll`, { courseId });
            window.location.reload();
        } catch (error) {
            setError('Failed to enroll in the course. Please try again later.');
            window.location.reload();
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/courses?id=${courseId}`);
                setCourse(response.data.data);
            } catch (error) {
                setError('Failed to fetch course details');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    console.log(course);
    if (loading) {
        return <Loading />;
    }
    if (error) {
        return (
            <div className="flex items-center justify-center h-screen text-red-500">{error}</div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
            <div className="max-w-6xl mx-auto">
                {course ? (
                    <div className="space-y-8">
                        {/* Header Section */}
                        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                            <svg
                                                className="w-6 h-6 text-white"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                />
                                            </svg>
                                        </div>
                                        <div>
                                            {user && course.studentsId.includes(user.id) ? (
                                                <div>
                                                    <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                                        Enrolled Course
                                                    </span>
                                                    <Button
                                                        variant={'outline'}
                                                        className="ml-2 cursor-pointer"
                                                        onClick={handleDeEnroll}
                                                    >
                                                        DeEnroll
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div>
                                                    <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                                                        Not Enrolled
                                                    </span>
                                                    <Button
                                                        variant="outline"
                                                        className="ml-2 cursor-pointer"
                                                        onClick={handleEnroll}
                                                    >
                                                        Enroll Now
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <h1 className="text-4xl font-bold text-slate-900 mb-4 leading-tight">
                                        {course.title}
                                    </h1>

                                    <p className="text-lg text-slate-600 leading-relaxed max-w-3xl">
                                        {course.description}
                                    </p>

                                    <div className="flex items-center gap-6 mt-6 text-sm text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                                />
                                            </svg>
                                            <span>
                                                {course.studentsId.length} Students Enrolled
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                                />
                                            </svg>
                                            <span>{course.sections.length} Sections</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            <span>
                                                Enrolled{' '}
                                                {new Date(course.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Course Content Section */}
                        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center">
                                    <svg
                                        className="w-5 h-5 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    Course Content
                                </h2>
                            </div>

                            <div className="bg-slate-50 rounded-lg p-6">
                                {course.sections && course.sections.length > 0 ? (
                                    <div className="space-y-4">
                                        {course.sections.map((section, index) => (
                                            <div
                                                key={section.id}
                                                className="bg-white rounded-lg border border-slate-200 p-4"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-sm font-semibold">
                                                            {index + 1}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-semibold text-slate-900">
                                                                {section.title}
                                                            </h3>
                                                            <p className="text-sm text-slate-600">
                                                                {section.description}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm text-slate-500">
                                                        {section.lectures?.length || 0} lectures
                                                    </div>
                                                </div>

                                                {section.lectures &&
                                                    section.lectures.length > 0 && (
                                                        <div className="mt-4 ml-11 space-y-2">
                                                            {section.lectures.map((lecture) => (
                                                                <div
                                                                    key={lecture.id}
                                                                    className="flex justify-between gap-3 p-3 bg-slate-50 rounded-lg"
                                                                >
                                                                    <div className="flex items-center gap-2">
                                                                        <svg
                                                                            className="w-4 h-4 text-slate-400"
                                                                            fill="none"
                                                                            stroke="currentColor"
                                                                            viewBox="0 0 24 24"
                                                                        >
                                                                            <path
                                                                                strokeLinecap="round"
                                                                                strokeLinejoin="round"
                                                                                strokeWidth={2}
                                                                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h1m4 0h1m6-4a9 9 0 11-18 0 9 9 0 0118 0z"
                                                                            />
                                                                        </svg>
                                                                        <span className="text-sm text-slate-700">
                                                                            {lecture.title}
                                                                        </span>
                                                                    </div>
                                                                    <Button
                                                                        variant={'link'}
                                                                        onClick={() => {
                                                                            router.push(
                                                                                `/dashboard/student/courses/${courseId}/section/${section.id}/lecture/${lecture.id}`
                                                                            );
                                                                        }}
                                                                    >
                                                                        Watch Now
                                                                    </Button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg
                                                className="w-8 h-8 text-slate-400"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.563M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                            No Content Available
                                        </h3>
                                        <p className="text-slate-600">
                                            Course content will appear here once it's added by your
                                            instructor.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="min-h-[60vh] flex items-center justify-center">
                        <div className="text-center">
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg
                                    className="w-12 h-12 text-slate-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.563M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-900 mb-2">
                                Course Not Found
                            </h3>
                            <p className="text-slate-600">
                                This course might not exist or you don't have access to it.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Page;
