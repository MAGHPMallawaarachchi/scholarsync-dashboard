'use client'
import { createLecture, updateLecture } from '@/app/(server)/firebase/firestore/lecture.firestore'
import Lecture from '@/app/(server)/models/Lecture'
import React, { useState } from 'react'
import FormField from './FormField'
import Button from './Button'
import { AiFillPlusCircle } from 'react-icons/ai'
import moment from 'moment'

type Props = {
    type: string
    lecture? : Lecture
}

const LectureForm = ({type, lecture}:Props) => {
    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            if (type === "add") {
                // add a new lecture
                await createLecture(form as Lecture); 
                alert("lecture added successfully!");                   

                // Clear the form fields
                setForm({
                    id: "",
                    moduleCode: "",
                    lecturer: "",
                    batch: "",
                    degreeProgram: "",
                    lectureHall: "",
                    day: "",
                    startTime: "",
                    endTime: "",
                });
            }             
            if (type === "edit") {
                await updateLecture(lecture?.id as string, form as Lecture);
                alert("Lecture details updated successfully!");
            }
        } catch (error) {
            alert(`Failed to ${type === "add" ? "add" : "edit"} lecture. Try again!`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prevState) => ({ ...prevState, [fieldName]: value }));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState({
        id: lecture?.id || "",
        moduleCode: lecture?.moduleCode || "",
        lecturer: lecture?.lecturer || "",
        batch: lecture?.batch || "",
        degreeProgram: lecture?.degreeProgram || "",
        lectureHall: lecture?.lectureHall || "",
        day: lecture?.day || "",
        startTime: lecture?.startTime || "",
        endTime: lecture?.endTime || "",
    });    

    return (
        <form 
            onSubmit={handleFormSubmit}
            className="flexStart form"
        >
            <FormField
                title="Module Code"
                state={form.moduleCode}
                placeholder="module code"
                setState={(value) => handleStateChange('moduleCode', value)}
            />
            <FormField
                title="Lecturer"
                state={form.lecturer}
                placeholder="lecturer"
                setState={(value) => handleStateChange('lecturer', value)}
            />
            <FormField
                title="Batch"
                state={form.batch}
                placeholder="batch"
                setState={(value) => handleStateChange('batch', value)}
            />
            <FormField
                title="Degree Program"
                state={form.degreeProgram}
                placeholder="degree program"
                setState={(value) => handleStateChange('degreeProgram', value)}
            />
            <FormField
                title="Lecture Hall"
                state={form.lectureHall}
                placeholder="lecture hall"
                setState={(value) => handleStateChange('lectureHall', value)}
            />
            <FormField
                title="Start Time"
                type="datetime-local"
                state={moment(form.startTime).format("YYYY-MM-DDTHH:mm")}
                placeholder="start time"
                setState={(value) => handleStateChange('startTime', value)}
            />
            <FormField
                title="End Time"
                type="datetime-local"
                state={moment(form.endTime).format("YYYY-MM-DDTHH:mm")}
                placeholder="end time"
                setState={(value) => handleStateChange('endTime', value)}
            />

            <div className="flex justify-center items-center w-full">
                <Button
                    title={
                        isSubmitting
                            ? `${type === 'add' ? 'Adding New Lecture' : 'Editing Lecture'}`
                            : `${type === 'add' ? 'Add New Lecture' : 'Edit Lecture'}`
                    }
                    type="submit"
                    leftIcon={<AiFillPlusCircle size="20" />}
                    isSubmitting={isSubmitting}
                />
            </div>

        </form>
    )
}

export default LectureForm