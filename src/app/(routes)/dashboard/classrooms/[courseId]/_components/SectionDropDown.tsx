import { Section } from "@/types/classroomsCreated"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import SectionDialog from "./SectionDialog"
import { ParamValue } from "next/dist/server/request/params"
import AddLectureDialog from "./AddLectureDialog"

function SectionDropDown({ sections, courseId }: {sections : Section[], courseId: ParamValue}) {
    return (
        <div>
            {sections && sections.length > 0 ? (
                <div className="space-y-3">
                    <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-slate-600">
                            {sections.length} section{sections.length !== 1 ? 's' : ''} available
                        </p>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Click to expand sections</span>
                        </div>
                    </div>
                    
                    <Accordion type="single" collapsible className="w-full space-y-3">
                        {sections.map((section, index) => (
                            <AccordionItem 
                                key={section.id} 
                                value={section.id}
                                className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                                <AccordionTrigger className="px-6 py-4 hover:bg-slate-50 transition-colors duration-200">
                                    <div className="flex items-center gap-4 text-left w-full">
                                        <div className="flex-shrink-0">
                                            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                                                {index + 1}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-slate-900 truncate">
                                                {section.title}
                                            </h3>
                                            <div className="flex items-center gap-4 mt-1 text-sm text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                    {section.lectures.length} lecture{section.lectures.length !== 1 ? 's' : ''}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                    {new Date(section.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-6 pb-6 pt-2">
                                    <div className="space-y-4">
                                        <div className="bg-slate-50 rounded-lg p-4">
                                            <p className="text-slate-700 leading-relaxed">
                                                {section.description}
                                            </p>
                                            <AddLectureDialog sectionId={section.id} />
                                        </div>
                                        
                                        {section.lectures && section.lectures.length > 0 && (
                                            <div>
                                                <h4 className="font-medium text-slate-900 mb-3 flex items-center gap-2">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.563M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    Lectures
                                                </h4>
                                                <div className="space-y-2">
                                                    {section.lectures.map((lecture, lectureIndex) => (
                                                        <div 
                                                            key={lecture.id}
                                                            className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200 cursor-pointer group"
                                                        >
                                                            <div className="flex-shrink-0">
                                                                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-medium">
                                                                    {lectureIndex + 1}
                                                                </div>
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <h5 className="font-medium text-slate-900 truncate group-hover:text-blue-600 transition-colors duration-200">
                                                                    {lecture.title}
                                                                </h5>
                                                                <p className="text-sm text-slate-600 truncate">
                                                                    {lecture.description}
                                                                </p>
                                                            </div>
                                                            <div className="flex-shrink-0">
                                                                <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-600 transition-colors duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15M9 10v4h4m-4-4v0m4 4v0" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                    <SectionDialog courseId={courseId} />
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.563M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h3 className="text-lg font-medium text-slate-900 mb-2">No Sections Available</h3>
                    <SectionDialog courseId={courseId} />
                </div>
            )}
        </div>
    )
}
export default SectionDropDown