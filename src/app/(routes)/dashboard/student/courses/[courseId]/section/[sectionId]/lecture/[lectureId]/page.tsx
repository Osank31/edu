'use client';

import Loading from "@/app/_components/Loading";
import { Lecture } from "@/types/classroomsCreated";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function Page() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lectureData, setLectureData] = useState<Lecture | null>(null);
    const router = useRouter();
    const { courseId, sectionId, lectureId } = useParams();
    useEffect(()=>{
        const fetchLecture = async () => {
            try {
                const response = await axios.get(`/api/students/lecture?id=${lectureId}`);
                setLectureData(response.data.data);
            }
            catch (err) {
                console.error("Error fetching lecture data:", err);
                setError("Failed to load lecture data");
            }
            finally {
                setLoading(false);
            }
        };
        fetchLecture();
    }, []);
    console.log("Lecture Data:", lectureData);
    if (loading) {
        return <Loading/>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!lectureData) {
        return <div>No lecture data found</div>;
    }
    return (
        <div>
            <h1>{lectureData.title}</h1>
            <p>{lectureData.description}</p>
        </div>
    );
}

export default Page;