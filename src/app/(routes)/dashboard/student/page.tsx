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
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200"
                            >
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                        {course.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm line-clamp-3">
                                        {course.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <span>{course.sections?.length || 0} sections</span>
                                    <span>{course.studentsId?.length || 0} students</span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-400">
                                        Created {new Date(course.createdAt).toLocaleDateString()}
                                    </span>
                                    <Button
                                        className="cursor-pointer"
                                        onClick={() => {
                                            router.push(`/dashboard/student/courses/${course.id}`);
                                        }}
                                    >
                                        View Course
                                    </Button>
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
                                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No courses found</h3>
                        <p className="text-gray-600 mb-6">
                            You are not enrolled in any courses yet
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
export default Page;
