'use client';

import Loading from "@/app/_components/Loading";
import { Classroom } from "@/types/classroomsCreated";
import axios from "axios";
import { useEffect, useState } from "react";

function Page() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [courses, setCourses] = useState<Classroom[]>([]);

    useEffect(()=>{
       const fetchData = async () => {
            try {
                const response = await axios.get('/api/courses?id=all');
                setCourses(response.data.data);
            } catch (error) {
                setError("Failed to fetch courses");
            } finally { 
                setLoading(false);
            }
       } 
       fetchData();
    },[])
    console.log(courses);

    if (loading) {
        return <Loading />
    }
    if (error) {
        return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Welcome to the Student Dashboard</h1>
            <p className="text-lg">Here you can view your courses, sections, and lectures.</p>
        </div>
    );
}
export default Page;