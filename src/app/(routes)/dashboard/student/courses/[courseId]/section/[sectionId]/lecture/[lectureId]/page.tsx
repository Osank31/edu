'use client';

import Loading from "@/app/_components/Loading";
import { Lecture } from "@/types/classroomsCreated";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from 'react-player'

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

    const playHandler = async () => {
        console.log('Play')
    }

    const pauseHandler = async () => {
        console.log('Pause')
    }

    useEffect(() => {
        const fetchLectureData = async () => {
            try {
                const response = await axios.get(`/api/students/lecture?id=${lectureId}`);
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
    console.log("Lecture Data:", lectureData);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                {embedUrl ? (
                    <div className="space-y-8">
                        {/* Video Section */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                                {/* <iframe
                                    className="absolute top-0 left-0 w-full h-full"
                                    src={embedUrl}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    referrerPolicy="strict-origin-when-cross-origin"
                                    allowFullScreen
                                ></iframe> */}
                                <div className="absolute top-0 left-0 w-full h-full">
                                    <ReactPlayer src={embedUrl} width={'100%'} height={'100%'} 
                                        onPlay={playHandler}
                                        onPause={pauseHandler}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Lecture Information */}
                        <div className="bg-white rounded-2xl shadow-lg p-8">
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                                <div className="flex-1">
                                    <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                                        {lectureData?.title}
                                    </h1>
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                            Lecture
                                        </div>
                                        <span className="text-gray-500 text-sm">
                                            {lectureData?.createdAt
                                                ? new Date(lectureData.createdAt).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })
                                                : 'Date not available'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            {lectureData?.description && (
                                <div className="border-t border-gray-100 pt-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-3">
                                        Description
                                    </h2>
                                    <p className="text-gray-700 leading-relaxed text-lg">
                                        {lectureData.description}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="min-h-[60vh] flex items-center justify-center">
                        <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-md mx-auto">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.996-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                Video Not Available
                            </h2>
                            <p className="text-gray-600">
                                Invalid or missing video link for this lecture.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}