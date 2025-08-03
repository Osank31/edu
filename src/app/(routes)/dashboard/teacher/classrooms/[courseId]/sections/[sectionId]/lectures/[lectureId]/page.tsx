'use client';

import Loading from "@/app/_components/Loading";
import { Lecture } from "@/types/classroomsCreated";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

function getEmbedUrlFromYouTubeLink(link: string): string | null {
    const videoIdMatch = link.match(
        /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([^?&/]+)/
    );
    const videoId = videoIdMatch ? videoIdMatch[1] : null;
    return videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : null;
}

export default function Page() {
    const { lectureId } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [lectureData, setLectureData] = useState<Lecture | null>(null);

    useEffect(() => {
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
    }, [lectureId]);

    const embedUrl = lectureData?.videoLink ? getEmbedUrlFromYouTubeLink(lectureData.videoLink) : null;

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div>
            {embedUrl ? (
                <iframe
                    width="560"
                    height="315"
                    src={embedUrl}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            ) : (
                <div className="text-red-500">Invalid or missing video link</div>
            )}
        </div>
    );
}
