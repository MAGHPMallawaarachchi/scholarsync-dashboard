'use client'
import Image from "next/image";
import React, { ChangeEvent, useState } from "react";
import FormField from "./FormField";
import Button from "./Button";
import { AiFillPlusCircle } from "react-icons/ai";
import Lecturer from "@/app/(server)/models/Lecturer";
import { addLecturer, updateLecturerById } from "@/app/(server)/firebase/firestore/lecturer.firestore";

type Props = {
    type: string;
    lecturer?: Lecturer;
}

const LecturerForm = ({ type, lecturer }: Props) => {

    const [profileImageFile, setProfileImageFile] = useState<File>(new File([], ''));
    const [isImageSelected, setIsImageSelected] = useState(false);

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setIsSubmitting(true);

        try {
            if (type === "add") {
                // add a new lecturer
                if (isImageSelected) {
                    // add a new lecturer with the profileImageFile
                    await addLecturer(form, profileImageFile); 
                    alert("lecturer added successfully!");                   

                    // Clear the form fields
                    setForm({
                        id: "",
                        name: "",
                        email: "",
                        phone: "",
                        department: "",
                        faculty: "",
                        image : "",
                        profileImageURL: "",
                    });

                     // Reset the selected image
                    setProfileImageFile(new File([], ''));
                    setIsImageSelected(false);

                } else {
                    alert("Please select a profile image for the lecturer.");
                }
            }             
            if (type === "edit") {
                await updateLecturerById(lecturer as Lecturer, form, profileImageFile);
                alert("Lecturer details updated successfully!");
            }
        } catch (error) {
            alert(`Failed to ${type === "add" ? "add" : "edit"} lecturer. Try again!`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChangeImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const file = e.target.files?.[0];

        if (!file) return;

        if (!file.type.includes('image')) {
            alert('Please upload an image file');
            return;
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const result = reader.result as string;
            handleStateChange('image', result);
            setIsImageSelected(true);
        };

        setProfileImageFile(file);
        setIsImageSelected(true);
    };

    const handleStateChange = (fieldName: string, value: string) => {
        setForm((prevState) => ({ ...prevState, [fieldName]: value }));
    };

    const [isSubmitting, setIsSubmitting] = useState(false);

    const [form, setForm] = useState({
        image : lecturer?.image || "",
        id: lecturer?.id || "",
        name: lecturer?.name || "",
        email: lecturer?.email || "",
        phone: lecturer?.phone || "",
        department: lecturer?.department || "",
        faculty: lecturer?.faculty || "",
        profileImageURL: lecturer?.profileImageURL || "",
    });    

    return (
        <form 
            onSubmit={handleFormSubmit}
            className="flexStart form"
        >
            <div className="flexStart relative z-10 text-center h-[400px] w-[400px] text-white border-2 border-white border-dashed rounded-full overflow-hidden">
                <label htmlFor="image" className="flex items-center justify-center w-full h-full">
                    {!form.image && 'Choose an image of the lecturer'}
                </label>
                <input 
                    id="image"
                    type="file"
                    accept="image/*"
                    required={type === 'create'}
                    className="absolute z-30 w-full opacity-0 h-full cursor-pointer"
                    onChange={handleChangeImage}
                />
                {form.image && (
                    <div className="rounded-full overflow-hidden w-32 h-32 sm:w-40 sm:h-40">
                        <Image
                            src={form.image}
                            className="object-cover w-full h-full"
                            alt="lecturer image"
                            layout="fill"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                )}
            </div>

            <FormField
                title="Name"
                state={form.name}
                placeholder="name"
                setState={(value) => handleStateChange('name', value)}
            />

            <FormField
                title="Email"
                type="email"
                state={form.email}
                placeholder="email"
                setState={(value) => handleStateChange('email', value)}
            />

            <FormField
                title="Phone"
                state={form.phone}
                placeholder="phone"
                setState={(value) => handleStateChange('phone', value)}
            />

            <FormField
                title="Department"
                state={form.department}
                placeholder="department"
                setState={(value) => handleStateChange('department', value)}
            />

            <FormField
                title="Faculty"
                state={form.faculty}
                placeholder="faculty"
                setState={(value) => handleStateChange('faculty', value)}
            />

            <div className="flex justify-center items-center w-full">
                <Button
                    title={
                        isSubmitting
                            ? `${type === 'add' ? 'Adding New Lecturer' : 'Updating Lecturer'}`
                            : `${type === 'add' ? 'Add New Lecturer' : 'Update Lecturer'}`
                    }
                    type="submit"
                    leftIcon={<AiFillPlusCircle size="20" />}
                    isSubmitting={isSubmitting}
                />
            </div>

        </form>
    )
}

export default LecturerForm;
