'use client';

import { Classroom } from "@/types/classroomsCreated";
import { useEffect, useState } from "react";
import axios from "axios";

function DashboardPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [data, setData] = useState<Classroom[] | null>(null);

    useEffect(()=>{
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
    },[])
    console.log('Data',data)
    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div>
            {data && data.length > 0 ? (
                <div>
                    {data.map((classroom) => (
                        <div key={classroom.id}>
                            <h1>{classroom.title}</h1>
                        </div>
                    ))}
                </div>
            ):(
                <div>No data found</div>
            )}
        </div>
    )
}
export default DashboardPage