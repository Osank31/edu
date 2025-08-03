'use client';

import Loading from "@/app/_components/Loading";
import { Classroom } from "@/types/classroomsCreated";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [course, setCourse] = useState<Classroom | null>(null);
    const {courseId} = useParams();

    useEffect(()=>{
        const fetchData = async () => {
            try {
                const response = await axios.get(`/api/courses?id=${courseId}`)
                setCourse(response.data.data);
            }
            catch (error) {
                setError("Failed to fetch course details");
            }
            finally {
                setLoading(false);
            }
        }
        fetchData()
    },[])
    console.log(course);
    if (loading) {
        return <Loading />
    }
    if (error) {
        return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
    }
    
    return (<div>{courseId}</div>)
}

export default Page;