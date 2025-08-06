export type Classroom = {
    id: string;
    title: string;
    description: string;
    thumbnail:string;
    instructorId: string;
    studentsId: string[];
    createdAt: Date;
    updatedAt: Date;
    sections: Section[];
};

export type Section = {
    id: string;
    courseId: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    lectures: Lecture[];
};

export type Lecture = {
    id: string;
    sectionId: string;
    title: string;
    description: string;
    videoLink: string;
    createdAt: string;
    updatedAt: string;
};
