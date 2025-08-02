'use client';

import { Classroom } from "@/types/classroomsCreated";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CreateClassroomDialog from "./_components/CreateClassroomDialog";
import Loading from "../_components/Loading";

function DashboardPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Classroom[] | null>(null);

    useEffect(() => {
        const fetchClassRoomData = async () => {
            try {
                const response = await axios.get('/api/course?courseId=all')
                setData(response.data.data);
            } catch (error) {
                setError("Failed to fetch classroom data");
            } finally {
                setLoading(false);
            }
        }
        fetchClassRoomData();
    }, [])
    console.log('Data', data)
    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div className="min-h-screen p-6">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Classrooms</h1>
                        <p className="text-gray-600">Manage and access your courses</p>
                    </div>
                    <div>
                        <CreateClassroomDialog />
                    </div>
                </div>

                {data && data.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.map((classroom) => (
                            <div
                                key={classroom.id}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-200"
                            >
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                        {classroom.title}
                                    </h2>
                                    <p className="text-gray-600 text-sm line-clamp-3">
                                        {classroom.description}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                                    <span>
                                        {classroom.sections?.length || 0} sections
                                    </span>
                                    <span>
                                        {classroom.studentsId?.length || 0} students
                                    </span>
                                </div>

                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-gray-400">
                                        Created {new Date(classroom.createdAt).toLocaleDateString()}
                                    </span>
                                    <Button onClick={() => {
                                        router.push(`/dashboard/classrooms/${classroom.id}`);
                                    }}>View Course</Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="mx-auto h-24 w-24 text-gray-300 mb-4">
                            <svg className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No classrooms found</h3>
                        <p className="text-gray-600 mb-6">Get started by creating your first classroom</p>
                        <CreateClassroomDialog />
                    </div>
                )}
            </div>
        </div>
    )
}
export default DashboardPage