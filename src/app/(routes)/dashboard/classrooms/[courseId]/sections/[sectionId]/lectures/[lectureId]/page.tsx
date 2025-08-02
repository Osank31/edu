'use client';

import { useParams } from "next/navigation";

function page() {
    const {courseId, sectionId, lectureId} = useParams();
  return (
    <div>page
        {courseId} - {sectionId} - {lectureId}
    </div>
  )
}
export default page