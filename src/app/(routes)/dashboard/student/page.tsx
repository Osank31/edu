'use client';

import Loading from '@/app/_components/Loading';
import { Classroom } from '@/types/classroomsCreated';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function Page() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [coursesArray, setCoursesArray] = useState<Classroom[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/api/courses?id=all');
                setCoursesArray(response.data.data);
            } catch (error) {
                setError('Failed to fetch courses');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    console.log(coursesArray);

    if (loading) {
        return <Loading />;
    }
    if (error) {
        return (
            <div className="flex items-center justify-center h-screen text-red-500">{error}</div>
        );
    }

    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h1>
                    <p className="text-gray-600">View and access your enrolled courses</p>
                </div>

                {coursesArray && coursesArray.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {coursesArray.map((course) => (
                            <div
                                key={course.id}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-0 border border-gray-200 overflow-hidden"
                            >
                                {/* Thumbnail Image */}
                                <div className="h-48 w-full relative bg-gray-100">
                                    {course.thumbnail && course.thumbnail !== 'link' ? (
                                        <img
                                            src={course.thumbnail}
                                            alt={`${course.title} thumbnail`}
                                            className="h-full w-full object-cover"
                                            onError={(e) => {
                                                const target = e.target as HTMLImageElement;
                                                target.style.display = 'none';
                                                target.nextElementSibling?.classList.remove(
                                                    'hidden'
                                                );
                                            }}
                                        />
                                    ) : null}
                                    {/* Fallback placeholder */}
                                    <div
                                        className={`${course.thumbnail && course.thumbnail !== 'link' ? 'hidden' : ''} absolute inset-0 bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center`}
                                    >
                                        <div className="text-white text-center">
                                            <svg
                                                className="h-12 w-12 mx-auto mb-2 opacity-80"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                />
                                            </svg>
                                            <span className="text-sm font-medium opacity-80">
                                                {course.title.substring(0, 20)}
                                                {course.title.length > 20 ? '...' : ''}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Course Progress Badge (Student-specific) */}
                                    <div className="absolute top-3 right-3">
                                        <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-gray-700">
                                            <svg
                                                className="inline h-3 w-3 mr-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            Enrolled
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="mb-4">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                                            {course.title}
                                        </h2>
                                        <p className="text-gray-600 text-sm line-clamp-2">
                                            {course.description}
                                        </p>
                                    </div>

                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1">
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                                    />
                                                </svg>
                                                {course.sections?.length || 0} sections
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <svg
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-.5a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                                                    />
                                                </svg>
                                                {course.studentsId?.length || 0} students
                                            </span>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-xs text-gray-400">
                                            Created{' '}
                                            {new Date(course.createdAt).toLocaleDateString()}
                                        </span>
                                        <Button
                                            className="cursor-pointer"
                                            onClick={() => {
                                                router.push(
                                                    `/dashboard/student/courses/${course.id}`
                                                );
                                            }}
                                        >
                                            View Course
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                            <svg
                                className="h-full w-full"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1}
                                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                        <p className="text-gray-600 mb-6">
                            You are not enrolled in any courses yet. Explore available courses and
                            start learning!
                        </p>
                        <Button
                            onClick={() => router.push('/dashboard/student/browse-courses')}
                            className="inline-flex items-center gap-2"
                        >
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>
                            Browse Courses
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Page;
