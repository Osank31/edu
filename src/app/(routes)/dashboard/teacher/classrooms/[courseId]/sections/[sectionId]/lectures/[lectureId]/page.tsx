'use client';

import Loading from "@/app/_components/Loading";
import { Lecture } from "@/types/classroomsCreated";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
    const {lectureId} = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lectureData, setLectureData] = useState<Lecture | null>(null);

    useEffect(()=>{
        const fetchLectureData = async () => {
            try {
                const response = await axios.get(`/api/lecture?lectureId=${lectureId}`);
                setLectureData(response.data.data);
            } catch (error) {
                setError("Failed to fetch lecture data");
            } finally {
                setLoading(false);
            }
        };
        fetchLectureData();
    },[lectureId])
    console.log(lectureData)
    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <div className="text-red-500">{error}</div>;
    }
    return (
        <div>page</div>
    )
}